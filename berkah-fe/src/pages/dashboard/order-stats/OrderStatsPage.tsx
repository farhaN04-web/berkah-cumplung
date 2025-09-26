import { EmptyState, ErrorState, LoadingState } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useSalesStats } from "@/hooks/useSalesStats";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SalesFilter } from "./components/SalesFilter";
import { formatRupiah } from "@/lib/utils";

export default function OrderStatsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const period = (searchParams.get("period") || "daily") as
    | "daily"
    | "monthly"
    | "yearly";
  const value =
    searchParams.get("value") || new Date().toISOString().split("T")[0];

  const { data, isLoading, isError, errorMessage } = useSalesStats(
    period,
    value,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Semua Penjualan</CardTitle>
      </CardHeader>
      <CardContent>
        <SalesFilter
          period={period}
          value={value}
          onChange={(newPeriod, newValue) => {
            navigate(`?period=${newPeriod}&value=${newValue}`);
          }}
        />
        {isLoading ? (
          <LoadingState className="min-h-64" />
        ) : isError ? (
          <ErrorState
            message={errorMessage || "Terjadi kesalahan saat memuat data"}
          />
        ) : !data || data.length === 0 ? (
          <EmptyState message="Belum ada data penjualan" />
        ) : (
          <ResponsiveContainer width="100%" height={400} className={"py-4"}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "Total Pendapatan") {
                    return [formatRupiah(value), name];
                  }
                  return [value, name];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Pendapatan"
                stroke="#e34a99"
                fill="#e34a99"
              />
              <Area
                type="monotone"
                dataKey="totalQty"
                name="Jumlah Item"
                stroke="#82ca9d"
                // fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
