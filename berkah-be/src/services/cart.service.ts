import { prismaClient } from "./../config/db.config";
import { AddCartDto, CartResponseDto, UpdateCartDto } from "./../dto/cart.dto";
import { ResponseError } from "./../utils/response.util";
import { CartSchema } from "./../validation/cart.schema";
import { Validation } from "./../validation/validation";

export class CartService {
	static async getCart(userId: string): Promise<CartResponseDto[]> {
		const cartData = await prismaClient.carts.findMany({
			where: {
				user_id: userId,
			},
			include: {
				product: true,
			},
		});

		const cartResponse = cartData.map((item) => ({
			id: item.id,
			product_name: item.product.name,
			product_image: item.product.image,
			qty: item.qty,
			price: item.product.price,
			subtotal: item.product.price * item.qty,
		}));

		return cartResponse;
	}

	static async addToCart(
		userId: string,
		data: AddCartDto
	): Promise<CartResponseDto> {
		const validatedData: AddCartDto = Validation.validate(
			CartSchema.CREATE,
			data
		);

		const productData = await prismaClient.products.findUnique({
			where: {
				id: validatedData.product_id,
			},
		});
		if (!productData) {
			throw new ResponseError("error", 404, "Product not found");
		}

		const existingCart = await prismaClient.carts.findFirst({
			where: {
				user_id: userId,
				product_id: validatedData.product_id,
			},
			select: {
				id: true,
			},
		});

		let cartData = null; // Correct variable name
		if (existingCart) {
			cartData = await prismaClient.carts.update({
				where: {
					id: existingCart.id,
				},
				data: {
					qty: {
						increment: validatedData.qty,
					},
				},
			});
		} else {
			cartData = await prismaClient.carts.create({
				data: {
					user_id: userId,
					product_id: validatedData.product_id,
					qty: validatedData.qty,
				},
			});
		}

		return {
			id: cartData.id,
			product_name: productData.name,
			qty: cartData.qty,
			price: productData.price,
			subtotal: productData.price * cartData.qty,
		};
	}

	static async updateCart(
		userId: string,
		cartId: string,
		data: UpdateCartDto
	): Promise<CartResponseDto> {
		const validatedData: UpdateCartDto = Validation.validate(
			CartSchema.UPDATE,
			data
		);

		const cartData = await prismaClient.carts.findFirst({
			where: {
				id: cartId,
				user_id: userId,
			},
			include: {
				product: true,
			},
		});
		if (!cartData) {
			throw new ResponseError("error", 404, "Cart not found");
		}

		const updatedCart = await prismaClient.carts.update({
			where: {
				id: cartId,
			},
			data: {
				qty: validatedData.qty,
			},
		});

		return {
			id: updatedCart.id,
			product_name: cartData.product.name,
			qty: updatedCart.qty,
			price: cartData.product.price,
			subtotal: cartData.product.price * updatedCart.qty,
		};
	}

	static async deleteCart(userId: string, cartId: string): Promise<void> {
		const cartData = await prismaClient.carts.findFirst({
			where: {
				id: cartId,
				user_id: userId,
			},
		});
		if (!cartData) {
			throw new ResponseError("error", 404, "Cart not found");
		}

		await prismaClient.carts.delete({
			where: {
				id: cartId,
			},
		});
	}
}
