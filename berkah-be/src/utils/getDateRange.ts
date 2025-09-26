export function getDateRange(
  period: string,
  value: string
): { gte: Date; lte: Date } {
  if (period === "daily") {
    const date = new Date(value);
    const gte = new Date(date.setHours(0, 0, 0, 0));
    const lte = new Date(date.setHours(23, 59, 59, 999));
    return { gte, lte };
  }

  if (period === "monthly") {
    const [year, month] = value.split("-").map(Number);
    const gte = new Date(year, month - 1, 1);
    const lte = new Date(year, month, 0, 23, 59, 59, 999); // hari terakhir bulan itu
    return { gte, lte };
  }

  if (period === "yearly") {
    const year = parseInt(value, 10);
    const gte = new Date(year, 0, 1);
    const lte = new Date(year, 11, 31, 23, 59, 59, 999);
    return { gte, lte };
  }

  throw new Error("Invalid period");
}
