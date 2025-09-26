export interface CheckoutDto {
	cartIds: string[];
}

export interface CheckoutResponseDto {
	id: string;
	code: string;
	userId: string;
	total: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CheckoutHistoryDto {
	id: string;
	code: string;
	userId: string;
	total: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	TransactionDetails: {
		id: string;
		product_id: string;
		qty: number;
		price: number;
		sub_total: number;
	}[];
}
