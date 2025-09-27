import { prismaClient } from "./../config/db.config";
import {
  CheckoutDto,
  CheckoutHistoryDto,
  CheckoutResponseDto,
} from "./../dto/checkout.dto";
import { Status } from "@prisma/client";
import { ResponseError } from "./../utils/response.util";
import { CheckoutSchema } from "./../validation/checkout.schema";
import { Validation } from "./../validation/validation";
import crypto from "crypto";

export class CheckoutService {
  /**
   * Checkout Service
   */
  static async checkout(
    userId: string,
    data: CheckoutDto
  ): Promise<CheckoutResponseDto> {
    const validateData: CheckoutDto = Validation.validate(
      CheckoutSchema.CHECKOUT,
      data
    );

    /**
     * 1. Get the cart data
     * 2. Validate the cart data
     * 3. (Transaction Mode) Create the Transaction & Transaction Details
     * 4. (Transaction Mode) Update Stocks Product & Delete Cart Items
     */

    // Validate & Check Cart Items is Valid
    const { cartIds } = validateData;
    const cartItems = await prismaClient.carts.findMany({
      where: {
        id: { in: cartIds },
        user_id: userId,
      },
      select: {
        id: true,
        product_id: true,
        qty: true,
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      throw new ResponseError("error", 400, "No Cart Items Found");
    }

    // Check Product is Valid
    const productIds = cartItems.map((item) => item.product_id);
    const products = await prismaClient.products.findMany({
      where: {
        id: { in: productIds },
        stock: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new ResponseError("error", 400, "Some products are not available");
    }

    // Check Product Stock
    const unavailableItems = cartItems.filter((item) => {
      const product = products.find((p) => p.id === item.product_id);
      return product && product.stock < item.qty;
    });

    if (unavailableItems.length > 0) {
      throw new ResponseError("error", 400, "Some products are not available");
    }

    try {
      const transaction = await prismaClient.$transaction(async (prisma) => {
        // Create Transaction & Transaction Detail
        const newTransaction = await prismaClient.transactions.create({
          data: {
            code: "ORD-" + crypto.randomUUID().substring(0, 3).toUpperCase(),
            user_id: userId,
            total_price: cartItems.reduce((acc, item) => {
              const product = products.find((p) => p.id === item.product_id);
              return acc + (product ? product.price * item.qty : 0);
            }, 0),
            status: Status.pending,
            TransactionDetails: {
              create: cartItems.map((item) => ({
                product_id: item.product_id,
                qty: item.qty,
                price: item.product.price,
                sub_total: item.qty * item.product.price,
              })),
            },
          },
        });

        // Update Product Stocks
        for (const item of cartItems) {
          await prisma.products.update({
            where: {
              id: item.product_id,
            },
            data: {
              stock: {
                decrement: item.qty, // Decrease the stock by the quantity purchased
              },
            },
          });
        }

        // Clear Purchased Carts
        await prisma.carts.deleteMany({
          where: {
            id: { in: cartIds },
            user_id: userId,
          },
        });

        return newTransaction;
      });

      return {
        id: transaction.id,
        code: transaction.code,
        userId: transaction.user_id,
        total: transaction.total_price,
        status: transaction.status,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      };
    } catch (error) {
      console.error("Transaction failed:", error);
      throw new ResponseError(
        "error",
        500,
        "Transaction failed. Please try again."
      );
    }
  }

  static async checkoutHistory(userId: string): Promise<CheckoutHistoryDto[]> {
    const transactions = await prismaClient.transactions.findMany({
      where: {
        user_id: userId,
      },
      include: {
        TransactionDetails: {
          select: {
            id: true,
            product_id: true,
            qty: true,
            price: true,
            sub_total: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (transactions.length === 0) {
      throw new ResponseError("error", 400, "No Transaction History Found");
    }

    return transactions.map((transaction) => ({
      id: transaction.id,
      code: transaction.code,
      userId: transaction.user_id,
      total: transaction.total_price,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      TransactionDetails: transaction.TransactionDetails.map((detail) => ({
        id: detail.id,
        product_id: detail.product_id,
        qty: detail.qty,
        price: detail.price,
        sub_total: detail.sub_total,
        product: {
          id: detail.product.id,
          name: detail.product.name,
          image: detail.product.image,
        },
      })),
    }));
  }
}
