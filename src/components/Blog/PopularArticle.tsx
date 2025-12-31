import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { FadeIn } from "@/components/motion/fade-in";

const PopularArticle = (props: {
  image: string;
  title: string;
  name: string;
}) => {
  const { image, title, name } = props;
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-full">
      <FadeIn /* direction="up" */ delay={0.1}>
        <div className="mb-5 flex w-full items-center border-b border-stroke pb-5 dark:border-dark-3">
          <div className={`mr-5 overflow-hidden rounded`}>
            <Image
              src={image}
              alt="image"
              width={80}
              height={80}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="w-full">
            <h4>
              <Link
                href={"/#" as Route}
                className="mb-1 inline-block text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
              >
                {title}
              </Link>
            </h4>
            <p className="text-sm text-body-color dark:text-dark-6">{name}</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default PopularArticle;
