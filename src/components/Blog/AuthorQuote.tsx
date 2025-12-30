import Image from "next/image";

const AuthorQuote = () => {
  return (
    <div className="mb-10 overflow-hidden rounded-[10px] bg-primary/[0.05] px-7 py-8 sm:p-9">
      <div className="mb-6 flex flex-wrap items-center">
        <div className="mb-6 mr-6 flex items-center md:mb-0">
          <div className="mr-5 h-20 w-20 overflow-hidden rounded-full">
            <Image
              src="/images/blog/author-05.png"
              alt="author"
              className="w-full"
              width={80}
              height={80}
            />
          </div>
          <div>
            <h4 className="mb-2 text-lg font-semibold text-dark dark:text-white">
              Samuyl Joshi
            </h4>
            <p className="text-body-color text-base">
              CEO &amp; Founder at <span>Lineicons</span>
            </p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm leading-relaxed text-body-color">
            Rating
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-[#FBB040]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  className="fill-current inline-block"
                >
                  <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
                </svg>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-8 text-base italic leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          ipsum suspendisse ultrices gravida. Risus commodo viverra
        </p>
        <a
          href="/#"
          className="text-dark dark:text-white text-base font-medium underline underline-offset-2 transition hover:text-primary dark:hover:text-primary"
        >
          View More Details
        </a>
      </div>

      <div>
        <span className="absolute right-8 top-6">
          <svg
            width="103"
            height="78"
            viewBox="0 0 103 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4687 28.1406C7.46875 33.1406 3.53125 39.6094 0.65625 47.5469C6.71875 44.6719 12.7812 43.2344 18.8437 43.2344C23.3854 43.2344 27.4062 44.4115 30.9062 46.7656C34.4062 49.0156 37.125 52.1302 39.0625 56.1094C40.8958 59.9844 41.8125 64.3646 41.8125 69.25C41.8125 74.5521 40.6875 79.2969 38.4375 83.4844C36.1875 87.6719 33.0208 90.9323 29.9375 93.2656C26.8542 95.4948 22.8229 96.6094 17.8438 96.6094C12.2396 96.6094 7.46875 95.0781 3.53125 92.0156C-0.40625 88.9531 -3.38542 84.9219 -5.40625 79.9219C-7.42708 74.9219 -8.4375 69.1615 -8.4375 62.6406C-8.4375 54.8073 -6.65625 46.9219 -3.09375 38.9844C0.46875 31.0469 5.67708 23.4219 12.5312 16.1094L12.4687 28.1406ZM73.0312 28.1406C68.0312 33.1406 64.0938 39.6094 61.2188 47.5469C67.2812 44.6719 73.3438 43.2344 79.4063 43.2344C83.9479 43.2344 87.9688 44.4115 91.4688 46.7656C94.9688 49.0156 97.6875 52.1302 99.625 56.1094C101.458 59.9844 102.375 64.3646 102.375 69.25C102.375 74.5521 101.25 79.2969 99 83.4844C96.75 87.6719 93.5833 90.9323 90.5 93.2656C87.4167 95.4948 83.3854 96.6094 78.4063 96.6094C72.8021 96.6094 68.0312 95.0781 64.0938 92.0156C60.1562 88.9531 57.1771 84.9219 55.1563 79.9219C53.1354 74.9219 52.125 69.1615 52.125 62.6406C52.125 54.8073 53.9062 46.9219 57.4688 38.9844C61.0312 31.0469 66.2396 23.4219 73.0938 16.1094L73.0312 28.1406Z"
              className="fill-primary"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AuthorQuote;
