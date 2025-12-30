import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemProps {
  value: string;
  question: string;
  answer: string;
}

export const FaqItem = ({ value, question, answer }: FaqItemProps) => {
  return (
    <AccordionItem
      value={value}
      className="mb-8 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-md transition-shadow hover:shadow-lg"
    >
      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pt-2 text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};
