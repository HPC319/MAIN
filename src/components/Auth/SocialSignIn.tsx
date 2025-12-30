import { signIn } from "next-auth/react";

const SocialSignIn = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center">
        <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
        <p className="w-full px-5 text-center text-base font-medium text-body-color">
          Or, sign in with your email
        </p>
        <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
      </div>
      <div className="mb-8 flex items-center justify-center">
        <a
          onClick={() => signIn("google")}
          aria-label="Sign in with Google"
          className="text-body-color hover:text-primary mr-3 flex h-9 w-9 items-center justify-center rounded-sm border border-stroke hover:border-primary dark:border-dark-3 dark:hover:border-primary cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8477 8.17132H9.29628V10.643H14.4342C13.9342 13.0145 11.7667 14.3285 9.29628 14.3285C6.29628 14.3285 3.83439 11.8595 3.83439 8.85249C3.83439 5.84549 6.29628 3.37646 9.29628 3.37646C10.7345 3.37646 12.0213 3.90696 12.9585 4.80696L14.7414 2.99849C13.3251 1.74849 11.4797 1 9.29628 1C4.88628 1 1.33301 4.55249 1.33301 8.85249C1.33301 13.1525 4.88628 16.7142 9.29628 16.7142C13.4668 16.7142 17.1661 13.9575 17.1661 8.85249C17.1661 8.47249 17.1312 8.16249 17.0625 7.82549L17.8477 8.17132Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a
          onClick={() => signIn("github")}
          aria-label="Sign in with Github"
          className="text-body-color hover:text-primary mr-3 flex h-9 w-9 items-center justify-center rounded-sm border border-stroke hover:border-primary dark:border-dark-3 dark:hover:border-primary cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 12.405 3.645 15.285 6.645 16.29C7.035 16.365 7.185 16.125 7.185 15.915C7.185 15.72 7.17 15.045 7.17 14.325C5.25 14.745 4.725 13.845 4.575 13.38C4.485 13.14 4.11 12.375 3.78 12.18C3.51 12.03 3.12 11.61 3.765 11.595C4.365 11.58 4.815 12.24 4.95 12.48C5.73 13.8 6.975 13.425 7.215 13.215C7.29 12.69 7.515 12.3 7.755 12.105C5.895 11.91 3.945 11.16 3.945 8.145C3.945 7.26 4.485 6.525 4.965 5.955C4.875 5.76 4.575 4.875 5.055 3.69C5.055 3.69 5.775 3.48 7.185 4.425C7.875 4.245 8.61 4.155 9.345 4.155C10.08 4.155 10.815 4.245 11.505 4.425C12.915 3.465 13.635 3.69 13.635 3.69C14.115 4.875 13.815 5.76 13.725 5.955C14.205 6.525 14.745 7.245 14.745 8.145C14.745 11.175 12.78 11.91 10.92 12.105C11.22 12.375 11.49 12.885 11.49 13.68C11.49 14.82 11.475 15.72 11.475 15.915C11.475 16.125 11.625 16.38 12.015 16.29C15.015 15.285 17.1 12.39 17.1 9C17.1 4.86 13.74 1.5 9 1.5Z" />
          </svg>
        </a>
      </div>
    </>
  );
};

export default SocialSignIn;
