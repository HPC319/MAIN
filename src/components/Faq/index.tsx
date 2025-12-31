import SectionTitle from "../Common/SectionTitle";
import { Accordion } from "@/components/ui/accordion";
import { FaqItem } from "./FaqItem";

const faqData = [
  {
    id: "1",
    question: "How to use TailGrids?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
  {
    id: "2",
    question: "How to download icons from LineIcons?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
  {
    id: "3",
    question: "Is GrayGrids part of UIdeck?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
  {
    id: "4",
    question: "Can I use this template for commercial project?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
  {
    id: "5",
    question: "Do you offer commercial support?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
  {
    id: "6",
    question: "Where and how to host this template?",
    answer: "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
  },
];

const Faq = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-background pb-8 pt-20 lg:pb-[50px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Any Questions? Answered"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="-mx-4 mt-[60px] flex flex-wrap lg:mt-20">
          <div className="w-full px-4 lg:w-1/2">
            <Accordion type="single" collapsible className="w-full">
              {faqData.slice(0, 3).map((faq) => (
                <FaqItem
                  key={faq.id}
                  value={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <Accordion type="single" collapsible className="w-full">
              {faqData.slice(3, 6).map((faq) => (
                <FaqItem
                  key={faq.id}
                  value={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div>
        <span className="absolute left-4 top-4 -z-[1]">
          <svg
            width="48"
            height="134"
            viewBox="0 0 48 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <circle cx="1.66732" cy="1.66683" r="1.66667" transform="rotate(180 1.66732 1.66683)" fill="currentColor" />
            <circle cx="1.66732" cy="16.3335" r="1.66667" transform="rotate(180 1.66732 16.3335)" fill="currentColor" />
            <circle cx="1.66732" cy="31.0001" r="1.66667" transform="rotate(180 1.66732 31.0001)" fill="currentColor" />
            <circle cx="1.66732" cy="45.6668" r="1.66667" transform="rotate(180 1.66732 45.6668)" fill="currentColor" />
            <circle cx="1.66732" cy="60.3335" r="1.66667" transform="rotate(180 1.66732 60.3335)" fill="currentColor" />
            <circle cx="1.66732" cy="88.6668" r="1.66667" transform="rotate(180 1.66732 88.6668)" fill="currentColor" />
            <circle cx="1.66732" cy="117.667" r="1.66667" transform="rotate(180 1.66732 117.667)" fill="currentColor" />
            <circle cx="1.66732" cy="74.6668" r="1.66667" transform="rotate(180 1.66732 74.6668)" fill="currentColor" />
            <circle cx="1.66732" cy="103" r="1.66667" transform="rotate(180 1.66732 103)" fill="currentColor" />
            <circle cx="1.66732" cy="132" r="1.66667" transform="rotate(180 1.66732 132)" fill="currentColor" />
          </svg>
        </span>
        <span className="absolute bottom-4 right-4 -z-[1]">
          <svg
            width="48"
            height="134"
            viewBox="0 0 48 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            <circle cx="45.6673" cy="132" r="1.66667" transform="rotate(180 45.6673 132)" fill="currentColor" />
            <circle cx="45.6673" cy="117.333" r="1.66667" transform="rotate(180 45.6673 117.333)" fill="currentColor" />
            <circle cx="45.6673" cy="102.667" r="1.66667" transform="rotate(180 45.6673 102.667)" fill="currentColor" />
            <circle cx="45.6673" cy="88.0001" r="1.66667" transform="rotate(180 45.6673 88.0001)" fill="currentColor" />
            <circle cx="45.6673" cy="73.3333" r="1.66667" transform="rotate(180 45.6673 73.3333)" fill="currentColor" />
            <circle cx="45.6673" cy="45.0001" r="1.66667" transform="rotate(180 45.6673 45.0001)" fill="currentColor" />
            <circle cx="45.6673" cy="16.0001" r="1.66667" transform="rotate(180 45.6673 16.0001)" fill="currentColor" />
            <circle cx="45.6673" cy="59.0001" r="1.66667" transform="rotate(180 45.6673 59.0001)" fill="currentColor" />
            <circle cx="45.6673" cy="30.6668" r="1.66667" transform="rotate(180 45.6673 30.6668)" fill="currentColor" />
            <circle cx="45.6673" cy="1.66683" r="1.66667" transform="rotate(180 45.6673 1.66683)" fill="currentColor" />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default Faq;
