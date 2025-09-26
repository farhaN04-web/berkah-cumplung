import { prismaClient } from "./../config/db.config";

export class DashboardService {
  static async getTotalTransaction() {
    const response = await prismaClient.transactions.aggregate({
      _sum: {
        total_price: true,
      },
      where: {
        status: "success",
      },
    });

    return response._sum.total_price ?? 0;
  }

  static async getCountTransaction() {
    const response = await prismaClient.transactions.count({
      where: {
        status: "pending",
      },
    });

    return response;
  }

  static async getProductTotal() {
    const response = await prismaClient.products.count();
    return response;
  }

  static async getCustomersTotal() {
    const response = await prismaClient.users.count({
      where: {
        role: "user",
      },
    });
    return response;
  }
}
