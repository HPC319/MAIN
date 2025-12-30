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
    <AccordionItem value={value} className="mb-8 border-b border-stroke/40 pb-8">
      <AccordionTrigger className="text-left text-base font-semibold text-dark hover:text-primary sm:text-lg">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pt-4 text-base text-body-color">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};
