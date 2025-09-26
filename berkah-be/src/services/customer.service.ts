import { prismaClient } from "./../config/db.config";
import { Paging } from "./../dto/base.dto";
import { CustomerDto, CustomerFilterDto } from "./../dto/customer.dto";
import { CustomerSchema } from "./../validation/customer.schema";
import { Validation } from "./../validation/validation";

export class CustomerService {
  static async getAllCustomers(query: CustomerFilterDto): Promise<{
    data: CustomerDto[];
    paging: Paging;
  }> {
    const validatedQuery: CustomerFilterDto = Validation.validate(
      CustomerSchema.CustomerFilter,
      query
    );

    const filters = [];

    if (validatedQuery.name) {
      filters.push({
        name: {
          contains: validatedQuery.name,
        },
      });
    }

    const customers = await prismaClient.users.findMany({
      where: {
        AND: filters,
        role: "user",
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validatedQuery.page! - 1) * validatedQuery.size!,
      take: validatedQuery.size!,
      include: {
        Transactions: {
          where: {
            status: "success",
          },
          select: {
            _count: true,
          },
        },
      },
    });

    const count = await prismaClient.users.count({
      where: {
        AND: filters,
      },
    });

    const totalPages = Math.ceil(count / validatedQuery.size!);

    return {
      data: customers.map(
        (customer) =>
          ({
            name: customer.name,
            email: customer.email,
            transactionCount: customer.Transactions.length,
            createdAt: customer.createdAt,
          } as CustomerDto)
      ),
      paging: {
        page: validatedQuery.page!,
        size: validatedQuery.size!,
        current_page: Math.ceil(customers.length / validatedQuery.size!),
        total_page: totalPages,
      },
    };
  }
}
