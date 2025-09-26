/**
 * Centralized query keys for React Query
 * This file contains all the query keys used in the application
 * to ensure consistency and avoid duplication.
 */

export const QueryKeys = {
  // Admin related query keys
  Admin: {
    Orders: {
      all: ["admin", "dashboard", "orders", "transaction", "total", "count"],
      detail: (id: string) => [...QueryKeys.Admin.Orders.all, id],
      list: (status: string, page: number, size: number) => [
        ...QueryKeys.Admin.Orders.all,
        status,
        page,
        size,
      ],
    },
    Products: {
      all: ["admin", "products", "list"],
      detail: (id: string) => [...QueryKeys.Admin.Products.all, id],
    },
    Categories: {
      all: ["admin", "categories", "list"],
      detail: (id: string) => [...QueryKeys.Admin.Categories.all, id],
    },
    SalesByCategory: {
      all: ["admin", "SalesByCategory", "list"],
      detail: (id: string) => [...QueryKeys.Admin.SalesByCategory.all, id],
    },
    SalesStats: {
      all: ["admin", "SalesStats", "list"],
      detail: (period: string, value: string) => [
        ...QueryKeys.Admin.SalesStats.all,
        period,
        value,
      ],
    },
  },

  // User related query keys
  User: {
    Profile: ["profile"],
    All: ["users"],
  },

  // Product related query keys
  Products: {
    all: ["products", "list"],
    detail: (id: string) => [...QueryKeys.Products.all, id],
  },
  Categories: {
    all: ["categories"],
  },

  // Cart related query keys
  Cart: {
    all: ["carts"],
  },

  // Customer related query keys
  Customers: {
    all: ["customers"],
  },

  // Order history related query keys
  OrderHistory: {
    all: ["history"],
  },

  // Dashboard related query keys
  Dashboard: {
    all: ["dashboard"],
    totalTransaction: ["dashboard", "transaction", "total"],
  },
};
