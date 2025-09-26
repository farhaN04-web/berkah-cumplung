import { Card, CardContent } from "../ui/card";

type FaqCardProps = {
  question: string;
  answer: string;
};

export const FaqCard = ({ question, answer }: FaqCardProps) => {
  return (
    <Card className="w-full max-w-3xl text-left">
      <CardContent className="p-6">
        <h3 className="mb-2 text-base font-semibold text-black md:text-lg">
          {question}
        </h3>
        <p className="text-sm text-neutral_500 md:text-base">{answer}</p>
      </CardContent>
    </Card>
  );
};
