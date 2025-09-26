import { Card, CardContent } from "../ui/card";

type ValueCardProps = {
  icon: string | JSX.Element;
  title: string;
  description: string;
};

export const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <Card className="h-[250px] w-[300px]">
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <div className="rounded-full bg-amber-50 p-2">{icon}</div>
        <h3 className="text-sm font-semibold text-black md:text-base">
          {title}
        </h3>
        <p className="text-xs text-neutral_500 md:text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};
