import { prismaClient } from "./../config/db.config";
import { Paging } from "./../dto/base.dto";
import {
  TransactionDetailDto,
  TransactionDto,
  TransactionFilterDto,
  UpdateStatusTransactionDto,
} from "./../dto/transaction.dto";
import { Status } from "@prisma/client";
import { getDateRange } from "./../utils/getDateRange";
import { ResponseError } from "./../utils/response.util";
import { TransactionSchema } from "./../validation/transaction.schema";
import { Validation } from "./../validation/validation";

export class TransactionService {
  /**
   * Admin Endpoint
   */

  static async getAllTransactions(query: TransactionFilterDto): Promise<{
    data: TransactionDto[];
    paging: Paging;
  }> {
    const validatedQuery: TransactionFilterDto = Validation.validate(
      TransactionSchema.TRANSACTION_FILTER_SCHEMA,
      query
    );

    const filters = [];

    if (validatedQuery.status) {
      filters.push({
        status: validatedQuery.status as Status,
      });
    }

    const transactions = await prismaClient.transactions.findMany({
      where: {
        AND: filters,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validatedQuery.page! - 1) * validatedQuery.size!,
      take: validatedQuery.size!,
    });

    const count = await prismaClient.transactions.count({
      where: {
        AND: filters,
      },
    });
    const totalPages = Math.ceil(count / validatedQuery.size!);

    return {
      data: transactions.map(
        (transaction) =>
          ({
            id: transaction.id,
            orderId: transaction.code,
            name: transaction.user.name,
            total: transaction.total_price,
            status: transaction.status,
            shipping_status: transaction.shipping_status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
          } as TransactionDto)
      ),
      paging: {
        page: validatedQuery.page!,
        size: validatedQuery.size!,
        current_page: Math.ceil(transactions.length / validatedQuery.size!),
        total_page: totalPages,
      },
    };
  }

  static async getDetailTransaction(
    transId: string
  ): Promise<TransactionDetailDto> {
    const transaction = await prismaClient.transactions.findUnique({
      where: {
        id: transId,
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
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      throw new ResponseError("error", 404, "Transaction Not Found");
    }

    return {
      id: transaction.id,
      orderId: transaction.code,
      total: transaction.total_price,
      status: transaction.status,
      shipping_status: transaction.shipping_status,
      shipping_number: transaction.shipping_number,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      TransactionDetails: transaction.TransactionDetails.map((detail) => ({
        id: detail.id,
        product_id: detail.product_id,
        product_name: detail.product.name,
        product_image: detail.product.image,
        qty: detail.qty,
        price: detail.price,
        sub_total: detail.sub_total,
      })),
    };
  }

  static async updateStatusTransaction(
    transactionId: string,
    data: UpdateStatusTransactionDto
  ): Promise<any> {
    const validateData: UpdateStatusTransactionDto = Validation.validate(
      TransactionSchema.UPDATE_STATUS_TRANSACTION,
      data
    );

    // Use a database transaction
    const result = await prismaClient.$transaction(async (prisma) => {
      const transaction = await prisma.transactions.findUnique({
        where: {
          id: transactionId,
        },
        include: {
          TransactionDetails: true,
        },
      });

      if (!transaction) {
        throw new ResponseError("error", 404, "Transaction Not Found");
      }

      if (validateData.status === "failed") {
        for (const item of transaction.TransactionDetails) {
          await prisma.products.update({
            where: {
              id: item.product_id,
            },
            data: {
              stock: {
                increment: item.qty, // Add the quantity back to the stock
              },
            },
          });
        }
      }

      const updatedTransaction = await prisma.transactions.update({
        where: {
          id: transactionId,
        },
        data: {
          status: validateData.status as Status,
          shipping_status: validateData.shipping_status as Status,
          shipping_number: validateData.shipping_number,
        },
      });

      return updatedTransaction;
    });

    return result;
  }

  static async getSalesByCategory(period: string, value: string) {
    const range = getDateRange(period, value);

    const categories = await prismaClient.category.findMany({
      include: {
        products: {
          include: {
            TransactionDetails: {
              include: {
                transaction: true,
              },
            },
          },
        },
      },
    });

    return categories.map((category) => {
      let totalSold = 0;
      let totalRevenue = 0;

      category.products.forEach((product) => {
        product.TransactionDetails.forEach((detail) => {
          const transaction = detail.transaction;

          if (
            transaction.status === "success" &&
            transaction.createdAt >= range.gte &&
            transaction.createdAt <= range.lte
          ) {
            totalSold += detail.qty;
            totalRevenue += detail.sub_total;
          }
        });
      });

      return {
        categoryId: category.id,
        categoryName: category.name,
        totalSold,
        totalRevenue,
      };
    });
  }

  static async getSalesStats(period: string, value: string) {
    const range = getDateRange(period, value);

    const stats = await prismaClient.transactionDetails.findMany({
      where: {
        transaction: {
          createdAt: {
            gte: range.gte,
            lte: range.lte,
          },
          status: "success", // hanya transaksi sukses
        },
      },
      select: {
        transaction: {
          select: {
            createdAt: true,
          },
        },
        sub_total: true,
        qty: true, // tambahkan qty di sini
      },
    });

    const result: Record<string, { total: number; totalQty: number }> = {};

    stats.forEach((item) => {
      const date = new Date(item.transaction.createdAt);
      let dateKey = "";

      if (period === "daily") {
        // Group per jam misal: "2025-06-27 14"
        dateKey = `${date.toISOString().split("T")[0]} ${date.getHours()}h`;
      } else if (period === "monthly") {
        // Group per hari: "2025-06-01"
        dateKey = date.toISOString().split("T")[0];
      } else if (period === "yearly") {
        // Group per bulan: "2025-06"
        dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      }

      if (!result[dateKey]) {
        result[dateKey] = { total: 0, totalQty: 0 };
      }

      result[dateKey].total += item.sub_total;
      result[dateKey].totalQty += item.qty;
    });

    return Object.entries(result).map(([date, value]) => ({
      date,
      total: value.total,
      totalQty: value.totalQty,
    }));
  }
}
