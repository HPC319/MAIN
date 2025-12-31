import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import {
  HeroSection,
  HeroContent,
  HeroHeading,
  HeroDescription,
  HeroActions,
  HeroActionItem,
  HeroBadges,
  HeroBadgeItem,
} from "./primitives";

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <FadeIn /* direction="up" */ delay={0.2}>
          <HeroHeading>
            Trade-Agnostic Business Template for Next.js
          </HeroHeading>

          <HeroDescription>
            Trade-agnostic Next.js template designed and built for any business
            vertical. It comes with all necessary integrations, pages, and
            components you need to launch a feature-rich application.
          </HeroDescription>

          <HeroActions>
            <HeroActionItem>
              <Link
                href="https://nextjstemplates.com/templates/play"
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
              >
                Download Now
              </Link>
            </HeroActionItem>
            <HeroActionItem>
              <Link
                href="https://github.com/nextjsTemplates/play-nextjs"
                target="_blank"
                className="flex items-center gap-4 rounded-md bg-white/[0.12] px-6 py-[14px] text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark"
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2005_10818)">
                    <path d="M12 0.674805C5.625 0.674805 0.375 5.8498 0.375 12.2998C0.375 17.3998 3.7125 21.7498 8.3625 23.3248C8.9625 23.4373 9.15 23.0623 9.15 22.7998C9.15 22.5373 9.15 21.7873 9.1125 20.7748C5.8875 21.5248 5.2125 19.1998 5.2125 19.1998C4.6875 17.8873 3.9 17.5123 3.9 17.5123C2.85 16.7623 3.9375 16.7623 3.9375 16.7623C5.1 16.7998 5.7375 17.9623 5.7375 17.9623C6.75 19.7623 8.475 19.2373 9.1125 18.8998C9.225 18.1498 9.525 17.6248 9.8625 17.3248C7.3125 17.0623 4.575 16.0498 4.575 11.6248C4.575 10.3498 5.0625 9.3373 5.775 8.5498C5.6625 8.2873 5.25 7.0873 5.8875 5.4748C5.8875 5.4748 6.9 5.1748 9.1125 6.6748C10.05 6.4123 11.025 6.2623 12.0375 6.2623C13.05 6.2623 14.0625 6.3748 14.9625 6.6748C17.175 5.2123 18.15 5.4748 18.15 5.4748C18.7875 7.0498 18.4125 8.2873 18.2625 8.5498C19.0125 9.3373 19.4625 10.3873 19.4625 11.6248C19.4625 16.0498 16.725 17.0623 14.175 17.3248C14.5875 17.6998 14.9625 18.4498 14.9625 19.4998C14.9625 21.0748 14.925 22.3123 14.925 22.6873C14.925 22.9873 15.15 23.3248 15.7125 23.2123C20.2875 21.6748 23.625 17.3623 23.625 12.2248C23.5875 5.8498 18.375 0.674805 12 0.674805Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2005_10818">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Star on Github
              </Link>
            </HeroActionItem>
          </HeroActions>

          <FadeIn /* direction="up" */ delay={0.3}>
            <HeroBadges label="Play is now available for all popular frameworks">
              <HeroBadgeItem href="https://github.com/uideck/play-bootstrap/">
                <svg
                  className="fill-current"
                  width="41"
                  height="32"
                  viewBox="0 0 41 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_2005_10788"
                    
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="41"
                    height="32"
                  >
                    <path d="M0.521393 0.0454102H40.5214V31.9174H0.521393V0.0454102Z" />
                  </mask>
                  <g mask="url(#mask0_2005_10788)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.82951 0.048584C6.54719 0.048584 4.85835 2.04626 4.93395 4.21266C5.00655 6.29398 4.91223 8.98962 4.23366 11.1879C3.55264 13.3923 2.4017 14.7893 0.521393 14.9686V16.993C2.4017 17.1727 3.55264 18.5689 4.23358 20.7737C4.91223 22.9719 5.00647 25.6676 4.93387 27.7489C4.85827 29.915 6.54711 31.913 8.82983 31.913H32.2163C34.4987 31.913 36.1872 29.9153 36.1116 27.7489C36.039 25.6676 36.1333 22.9719 36.8119 20.7737C37.4929 18.5689 38.641 17.1721 40.5214 16.993V14.9686C38.6411 14.7889 37.493 13.3927 36.8119 11.1879C36.1332 8.9899 36.039 6.29398 36.1116 4.21266C36.1872 2.04654 34.4987 0.048584 32.2163 0.048584H8.82951ZM27.6401 19.6632C27.6401 22.6463 25.415 24.4554 21.7224 24.4554H15.4366C15.2568 24.4554 15.0844 24.3839 14.9572 24.2568C14.8301 24.1297 14.7587 23.9572 14.7587 23.7774V8.18422C14.7587 8.00442 14.8301 7.83194 14.9572 7.70482C15.0844 7.57766 15.2568 7.50626 15.4366 7.50626H21.6866C24.7656 7.50626 26.7863 9.17406 26.7863 11.7347C26.7863 13.5319 25.427 15.1409 23.6952 15.4228V15.5165C26.0526 15.7751 27.6401 17.408 27.6401 19.6632ZM21.037 9.65538H17.453V14.7179H20.4716C22.8052 14.7179 24.092 13.7782 24.092 12.0986C24.0917 10.5245 22.9855 9.65538 21.037 9.65538ZM17.453 16.7265V22.3055H21.1689C23.5986 22.3055 24.8856 21.3306 24.8856 19.4984C24.8856 17.6663 23.5625 16.7263 21.0126 16.7263L17.453 16.7265Z"
                    />
                  </g>
                </svg>
              </HeroBadgeItem>

              <HeroBadgeItem href="https://github.com/TailGrids/play-tailwind/">
                <svg
                  className="fill-current"
                  width="41"
                  height="26"
                  viewBox="0 0 41 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_2005_10783"
                    
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="41"
                    height="26"
                  >
                    <path d="M0.521393 0.949463H40.5214V25.0135H0.521393V0.949463Z" />
                  </mask>
                  <g mask="url(#mask0_2005_10783)">
                    <path d="M20.5214 0.980713C15.1882 0.980713 11.8546 3.64743 10.5214 8.98071C12.5214 6.31399 14.8546 5.31399 17.5214 5.98071C19.043 6.36103 20.1302 7.46495 21.3342 8.68667C23.295 10.6771 25.5642 12.9807 30.5214 12.9807C35.8546 12.9807 39.1882 10.314 40.5214 4.98071C38.5214 7.64743 36.1882 8.64743 33.5214 7.98071C31.9998 7.60039 30.9126 6.49651 29.7086 5.27479C27.7478 3.28431 25.4786 0.980713 20.5214 0.980713ZM10.5214 12.9807C5.18819 12.9807 1.85459 15.6474 0.521393 20.9807C2.52139 18.314 4.85459 17.314 7.52139 17.9807C9.04299 18.361 10.1302 19.465 11.3342 20.6867C13.295 22.6771 15.5642 24.9807 20.5214 24.9807C25.8546 24.9807 29.1882 22.314 30.5214 16.9807C28.5214 19.6474 26.1882 20.6474 23.5214 19.9807C21.9998 19.6004 20.9126 18.4965 19.7086 17.2748C17.7478 15.2843 15.4786 12.9807 10.5214 12.9807Z" />
                  </g>
                </svg>
              </HeroBadgeItem>

              <HeroBadgeItem href="https://github.com/NextJSTemplates/play-nextjs">
                <svg
                  className="fill-current"
                  width="41"
                  height="36"
                  viewBox="0 0 41 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24.0214 35.9814L0.521393 7.48145V35.9814H24.0214Z" />
                  <path d="M26.5214 0.98147H0.521393L40.5214 35.4814V0.98147H26.5214Z" />
                  <path d="M40.5214 33.2314L16.5214 0.98147H12.5214L40.5214 38.4814V33.2314Z" />
                </svg>
              </HeroBadgeItem>
            </HeroBadges>
          </FadeIn>
        </FadeIn>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
