import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatisticCardProps = {
  title: string;
  value: string | number;
};

export default function StatisticCard({ title, value }: StatisticCardProps) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-normal text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">{value}</CardContent>
    </Card>
  );
}
