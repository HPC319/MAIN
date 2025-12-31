import type { Route } from "next";
const SharePost = () => {
  return (
    <>
      <div className="flex items-center justify-between py-10">
        <div>
          <h5 className="mb-3 text-sm font-medium text-body-color">
            Popular Tags :
          </h5>

          <div className="flex items-center">
            <a
              href={"/#" as Route}
              className="mb-3 mr-3 inline-flex items-center justify-center rounded-md bg-primary/[0.08] px-4 py-2 duration-300 hover:bg-primary hover:text-white"
            >
              Design
            </a>
            <a
              href={"/#" as Route}
              className="mb-3 mr-3 inline-flex items-center justify-center rounded-md bg-primary/[0.08] px-4 py-2 duration-300 hover:bg-primary hover:text-white"
            >
              Development
            </a>
            <a
              href={"/#" as Route}
              className="mb-3 mr-3 inline-flex items-center justify-center rounded-md bg-primary/[0.08] px-4 py-2 duration-300 hover:bg-primary hover:text-white"
            >
              Info
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
            Share this post :
          </h5>
          <div className="mb-3 flex items-center sm:justify-end">
            <a
              href={"/#" as Route}
              aria-label="social-link"
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-md border border-stroke text-body-color duration-300 hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6 dark:hover:border-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="fill-current"
              >
                <path d="M14.3442 0H1.12455C0.499798 0 0 0.497491 0 1.11936V14.3029C0 14.8999 0.499798 15.4222 1.12455 15.4222H14.2942C14.919 15.4222 15.4188 14.9247 15.4188 14.3029V1.09448C15.4688 0.497491 14.969 0 14.3442 0ZM4.57316 13.1089H2.29907V5.7709H4.57316V13.1089ZM3.42362 4.75104C2.67392 4.75104 2.09915 4.15405 2.09915 3.43269C2.09915 2.71133 2.69891 2.11434 3.42362 2.11434C4.14833 2.11434 4.74809 2.71133 4.74809 3.43269C4.74809 4.15405 4.19831 4.75104 3.42362 4.75104ZM13.1696 13.1089H10.8955V9.55183C10.8955 8.7061 10.8955 7.58674 9.72108 7.58674C8.52164 7.58674 8.34651 8.53198 8.34651 9.47721V13.1089H6.07241V5.7709H8.29654V6.79076H8.32152C8.64651 6.19377 9.37122 5.59678 10.4456 5.59678C12.7697 5.59678 13.2196 7.08925 13.2196 9.12897V13.1089H13.1696Z" />
              </svg>
            </a>
            <a
              href={"/#" as Route}
              aria-label="social-link"
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-md border border-stroke text-body-color duration-300 hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6 dark:hover:border-primary"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                className="fill-current"
              >
                <path d="M15.5524 2.26027L16.625 1.0274C16.9355 0.693493 17.0202 0.436644 17.0484 0.308219C16.2016 0.770548 15.4113 0.924658 14.9032 0.924658H14.7056L14.5927 0.821918C13.9153 0.282534 13.0685 0 12.1653 0C10.1895 0 8.6371 1.48973 8.6371 3.21062C8.6371 3.31336 8.6371 3.46747 8.66532 3.57021L8.75 4.0839L8.15726 4.05822C4.54435 3.95548 1.58065 1.13014 1.10081 0.642123C0.310484 1.92637 0.762097 3.15925 1.24194 3.92979L2.20161 5.36815L0.677419 4.5976C0.705645 5.67637 1.15726 6.52397 2.03226 7.14041L2.79435 7.65411L2.03226 7.93665C2.5121 9.24658 3.58468 9.78596 4.375 9.99144L5.41935 10.2483L4.43145 10.8647C2.85081 11.8921 0.875 11.8151 0 11.738C1.77823 12.8682 3.89516 13.125 5.3629 13.125C6.46371 13.125 7.28226 13.0223 7.47984 12.9452C15.3831 11.25 15.75 4.82877 15.75 3.54452V3.36473L15.9194 3.26199C16.879 2.44007 17.2742 2.00342 17.5 1.74658C17.4153 1.77226 17.3024 1.82363 17.1895 1.84932L15.5524 2.26027Z" />
              </svg>
            </a>
            <a
              href={"/#" as Route}
              aria-label="social-link"
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-md border border-stroke text-body-color duration-300 hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6 dark:hover:border-primary"
            >
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                className="fill-current"
              >
                <path d="M9.00007 6.82105H7.50006H6.96434V6.27097V4.56571V4.01562H7.50006H8.62507C8.91971 4.01562 9.16078 3.79559 9.16078 3.46554V0.550085C9.16078 0.247538 8.9465 0 8.62507 0H6.66969C4.55361 0 3.08038 1.54024 3.08038 3.82309V6.21596V6.76605H2.54466H0.72322C0.348217 6.76605 0 7.06859 0 7.50866V9.48897C0 9.87402 0.294645 10.2316 0.72322 10.2316H2.49109H3.02681V10.7817V16.31C3.02681 16.6951 3.32145 17.0526 3.75003 17.0526H6.26791C6.42862 17.0526 6.56255 16.9701 6.66969 16.8601C6.77684 16.7501 6.8572 16.5576 6.8572 16.3925V10.8092V10.2591H7.4197H8.62507C8.97328 10.2591 9.24114 10.0391 9.29471 9.709V9.6815V9.65399L9.66972 7.7562C9.6965 7.56367 9.66972 7.34363 9.509 7.1236C9.45543 6.98608 9.21436 6.84856 9.00007 6.82105Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePost;
