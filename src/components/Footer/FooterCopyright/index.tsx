import Link from "next/link";

export const FooterCopyright = () => {
  return (
    <div className="mt-12 border-t border-border py-8 lg:mt-[60px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-2/3 lg:w-1/2">
            <div className="my-1">
              <p className="text-base text-muted-foreground">
                &copy; {new Date().getFullYear()} StartupPro. All rights reserved.{" "}
                <Link
                  href="https://tailgrids.com"
                  rel="nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  TailGrids
                </Link>{" "}
                and{" "}
                <Link
                  href="https://nextjstemplates.com"
                  rel="nofollow noopener"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  NextJS Templates
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/3 lg:w-1/2">
            <div className="my-1 flex justify-end space-x-5">
              <Link
                href="/#"
                className="text-base text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/#"
                className="text-base text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
