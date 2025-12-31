import Link from "next/link";
import type { Route } from "next";

const NotFound = () => {
  return (
    <>
      <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[530px] text-center">
                <div className="mx-auto text-center mb-9">
                  <svg
                    width="184"
                    height="120"
                    viewBox="0 0 184 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1176_541)">
                      <path
                        d="M30.6467 116.422C30.2077 117.042 29.5366 117.481 28.7538 117.481H3.01509C1.34797 117.481 0 116.133 0 114.466V4.87838C0 3.21126 1.34797 1.86328 3.01509 1.86328H28.7439C29.5366 1.86328 30.1978 2.30232 30.6368 2.92229C31.0758 3.54227 31.2341 4.31502 30.9841 5.02803L17.2434 58.3625C17.0049 59.0457 17.0049 59.7982 17.2434 60.4814L30.9841 113.816C31.2341 114.529 31.0758 115.302 30.6467 115.922V116.422Z"
                        className="fill-primary"
                      />
                      <path
                        opacity="0.5"
                        d="M118.891 113.816L132.632 60.4815C132.87 59.7983 132.87 59.0458 132.632 58.3626L118.891 5.02809C118.641 4.31508 118.799 3.54233 119.238 2.92235C119.677 2.30238 120.348 1.86334 121.131 1.86334H146.86C148.527 1.86334 149.875 3.21132 149.875 4.87844V114.466C149.875 116.133 148.527 117.481 146.86 117.481H121.131C120.339 117.481 119.677 117.042 119.238 116.422C118.799 115.802 118.641 115.029 118.891 114.316V113.816Z"
                        className="fill-primary"
                      />
                      <path
                        d="M70.7485 113.816L84.4892 60.4815C84.7277 59.7983 84.7277 59.0458 84.4892 58.3626L70.7485 5.02809C70.4985 4.31508 70.6568 3.54233 71.0958 2.92235C71.5348 2.30238 72.206 1.86334 72.9887 1.86334H98.7176C100.385 1.86334 101.733 3.21132 101.733 4.87844V114.466C101.733 116.133 100.385 117.481 98.7176 117.481H72.9887C72.196 117.481 71.5348 117.042 71.0958 116.422C70.6568 115.802 70.4985 115.029 70.7485 114.316V113.816Z"
                        className="fill-primary"
                      />
                      <path
                        opacity="0.5"
                        d="M156.507 78.7793C153.467 78.7793 150.997 76.3091 150.997 73.2692C150.997 70.2294 153.467 67.7592 156.507 67.7592C159.547 67.7592 162.017 70.2294 162.017 73.2692C162.017 76.3091 159.547 78.7793 156.507 78.7793Z"
                        className="fill-primary"
                      />
                      <path
                        d="M177.866 78.7793C174.826 78.7793 172.356 76.3091 172.356 73.2692C172.356 70.2294 174.826 67.7592 177.866 67.7592C180.906 67.7592 183.376 70.2294 183.376 73.2692C183.376 76.3091 180.906 78.7793 177.866 78.7793Z"
                        className="fill-primary"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1176_541">
                        <rect width="183.376" height="119.344" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  Sorry, the page can't be found
                </h3>
                <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  The page you were looking for appears to have been moved,
                  deleted or does not exist.
                </p>
                <Link
                  href={"/" as Route}
                  className="px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out bg-primary rounded-md hover:bg-primary/80"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-[-1] hidden sm:block">
          <svg
            width="406"
            height="286"
            viewBox="0 0 406 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <rect
                opacity="0.5"
                x="56.25"
                y="110.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint0_linear_1176_543)"
              />
              <rect
                opacity="0.1"
                x="56.25"
                y="110.344"
                width="116.719"
                height="116.438"
                fill="url(#paint1_linear_1176_543)"
              />
              <path
                opacity="0.5"
                d="M172.688 110.344L228.318 165.693L172.688 221.042L117.058 165.693L172.688 110.344Z"
                stroke="url(#paint2_linear_1176_543)"
              />
              <path
                opacity="0.1"
                d="M172.688 110.344L228.318 165.693L172.688 221.042L117.058 165.693L172.688 110.344Z"
                fill="url(#paint3_linear_1176_543)"
              />
              <path
                opacity="0.5"
                d="M0 110.344L55.6298 165.693L0 221.042L-55.6298 165.693L0 110.344Z"
                stroke="url(#paint4_linear_1176_543)"
              />
              <path
                opacity="0.1"
                d="M0 110.344L55.6298 165.693L0 221.042L-55.6298 165.693L0 110.344Z"
                fill="url(#paint5_linear_1176_543)"
              />
              <rect
                opacity="0.5"
                x="228.938"
                y="110.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint6_linear_1176_543)"
              />
              <rect
                opacity="0.1"
                x="228.938"
                y="110.344"
                width="116.719"
                height="116.438"
                fill="url(#paint7_linear_1176_543)"
              />
              <path
                opacity="0.5"
                d="M345.375 110.344L401.005 165.693L345.375 221.042L289.745 165.693L345.375 110.344Z"
                stroke="url(#paint8_linear_1176_543)"
              />
              <path
                opacity="0.1"
                d="M345.375 110.344L401.005 165.693L345.375 221.042L289.745 165.693L345.375 110.344Z"
                fill="url(#paint9_linear_1176_543)"
              />
              <path
                opacity="0.5"
                d="M172.688 -62.0312L228.318 -6.68234L172.688 48.6665L117.058 -6.68234L172.688 -62.0312Z"
                stroke="url(#paint10_linear_1176_543)"
              />
              <path
                opacity="0.1"
                d="M172.688 -62.0312L228.318 -6.68234L172.688 48.6665L117.058 -6.68234L172.688 -62.0312Z"
                fill="url(#paint11_linear_1176_543)"
              />
              <rect
                opacity="0.5"
                x="228.938"
                y="-62.0312"
                width="116.719"
                height="116.438"
                stroke="url(#paint12_linear_1176_543)"
              />
              <rect
                opacity="0.1"
                x="228.938"
                y="-62.0312"
                width="116.719"
                height="116.438"
                fill="url(#paint13_linear_1176_543)"
              />
              <path
                opacity="0.5"
                d="M345.375 -62.0312L401.005 -6.68234L345.375 48.6665L289.745 -6.68234L345.375 -62.0312Z"
                stroke="url(#paint14_linear_1176_543)"
              />
              <path
                opacity="0.1"
                d="M345.375 -62.0312L401.005 -6.68234L345.375 48.6665L289.745 -6.68234L345.375 -62.0312Z"
                fill="url(#paint15_linear_1176_543)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1176_543"
                x1="49.0781"
                y1="112.313"
                x2="148.922"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1176_543"
                x1="179.141"
                y1="209.062"
                x2="32.6026"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1176_543"
                x1="110.886"
                y1="112.313"
                x2="210.73"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1176_543"
                x1="240.949"
                y1="209.062"
                x2="94.4102"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_1176_543"
                x1="-61.8017"
                y1="112.313"
                x2="37.8583"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_1176_543"
                x1="68.2615"
                y1="209.062"
                x2="-139.277"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_1176_543"
                x1="221.766"
                y1="112.313"
                x2="321.609"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_1176_543"
                x1="351.828"
                y1="209.062"
                x2="205.29"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_1176_543"
                x1="283.573"
                y1="112.313"
                x2="383.417"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_1176_543"
                x1="413.636"
                y1="209.062"
                x2="267.097"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_1176_543"
                x1="110.886"
                y1="-60.0625"
                x2="210.73"
                y2="-40.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint11_linear_1176_543"
                x1="240.949"
                y1="36.6875"
                x2="94.4102"
                y2="-26.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint12_linear_1176_543"
                x1="221.766"
                y1="-60.0625"
                x2="321.609"
                y2="-40.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_1176_543"
                x1="351.828"
                y1="36.6875"
                x2="205.29"
                y2="-26.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint14_linear_1176_543"
                x1="283.573"
                y1="-60.0625"
                x2="383.417"
                y2="-40.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint15_linear_1176_543"
                x1="413.636"
                y1="36.6875"
                x2="267.097"
                y2="-26.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute right-0 top-0 z-[-1] hidden sm:block">
          <svg
            width="406"
            height="286"
            viewBox="0 0 406 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <rect
                opacity="0.5"
                x="57.25"
                y="108.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint0_linear_1176_550)"
              />
              <rect
                opacity="0.1"
                x="57.25"
                y="108.344"
                width="116.719"
                height="116.438"
                fill="url(#paint1_linear_1176_550)"
              />
              <path
                opacity="0.5"
                d="M173.688 108.344L229.318 163.693L173.688 219.042L118.058 163.693L173.688 108.344Z"
                stroke="url(#paint2_linear_1176_550)"
              />
              <path
                opacity="0.1"
                d="M173.688 108.344L229.318 163.693L173.688 219.042L118.058 163.693L173.688 108.344Z"
                fill="url(#paint3_linear_1176_550)"
              />
              <path
                opacity="0.5"
                d="M1 108.344L56.6298 163.693L1 219.042L-54.6298 163.693L1 108.344Z"
                stroke="url(#paint4_linear_1176_550)"
              />
              <path
                opacity="0.1"
                d="M1 108.344L56.6298 163.693L1 219.042L-54.6298 163.693L1 108.344Z"
                fill="url(#paint5_linear_1176_550)"
              />
              <rect
                opacity="0.5"
                x="229.938"
                y="108.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint6_linear_1176_550)"
              />
              <rect
                opacity="0.1"
                x="229.938"
                y="108.344"
                width="116.719"
                height="116.438"
                fill="url(#paint7_linear_1176_550)"
              />
              <path
                opacity="0.5"
                d="M346.375 108.344L402.005 163.693L346.375 219.042L290.745 163.693L346.375 108.344Z"
                stroke="url(#paint8_linear_1176_550)"
              />
              <path
                opacity="0.1"
                d="M346.375 108.344L402.005 163.693L346.375 219.042L290.745 163.693L346.375 108.344Z"
                fill="url(#paint9_linear_1176_550)"
              />
              <path
                opacity="0.5"
                d="M173.688 -64.0312L229.318 -8.68234L173.688 46.6665L118.058 -8.68234L173.688 -64.0312Z"
                stroke="url(#paint10_linear_1176_550)"
              />
              <path
                opacity="0.1"
                d="M173.688 -64.0312L229.318 -8.68234L173.688 46.6665L118.058 -8.68234L173.688 -64.0312Z"
                fill="url(#paint11_linear_1176_550)"
              />
              <rect
                opacity="0.5"
                x="229.938"
                y="-64.0312"
                width="116.719"
                height="116.438"
                stroke="url(#paint12_linear_1176_550)"
              />
              <rect
                opacity="0.1"
                x="229.938"
                y="-64.0312"
                width="116.719"
                height="116.438"
                fill="url(#paint13_linear_1176_550)"
              />
              <path
                opacity="0.5"
                d="M346.375 -64.0312L402.005 -8.68234L346.375 46.6665L290.745 -8.68234L346.375 -64.0312Z"
                stroke="url(#paint14_linear_1176_550)"
              />
              <path
                opacity="0.1"
                d="M346.375 -64.0312L402.005 -8.68234L346.375 46.6665L290.745 -8.68234L346.375 -64.0312Z"
                fill="url(#paint15_linear_1176_550)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1176_550"
                x1="50.0781"
                y1="110.313"
                x2="149.922"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1176_550"
                x1="180.141"
                y1="207.063"
                x2="33.6026"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1176_550"
                x1="111.886"
                y1="110.313"
                x2="211.73"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1176_550"
                x1="241.949"
                y1="207.063"
                x2="95.4102"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_1176_550"
                x1="-60.8017"
                y1="110.313"
                x2="38.8583"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_1176_550"
                x1="69.2615"
                y1="207.063"
                x2="-138.277"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_1176_550"
                x1="222.766"
                y1="110.313"
                x2="322.609"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_1176_550"
                x1="352.828"
                y1="207.063"
                x2="206.29"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_1176_550"
                x1="284.573"
                y1="110.313"
                x2="384.417"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_1176_550"
                x1="414.636"
                y1="207.063"
                x2="268.097"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_1176_550"
                x1="111.886"
                y1="-62.0625"
                x2="211.73"
                y2="-42.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint11_linear_1176_550"
                x1="241.949"
                y1="34.6875"
                x2="95.4102"
                y2="-28.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint12_linear_1176_550"
                x1="222.766"
                y1="-62.0625"
                x2="322.609"
                y2="-42.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_1176_550"
                x1="352.828"
                y1="34.6875"
                x2="206.29"
                y2="-28.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint14_linear_1176_550"
                x1="284.573"
                y1="-62.0625"
                x2="384.417"
                y2="-42.5163"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" />
              </linearGradient>
              <linearGradient
                id="paint15_linear_1176_550"
                x1="414.636"
                y1="34.6875"
                x2="268.097"
                y2="-28.9045"
                gradientUnits="userSpaceOnUse"
              >
                <stop className="[stop-color:theme(colors.primary)]" />
                <stop offset="1" className="[stop-color:theme(colors.primary)]" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default NotFound;
