"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

import { signUpSchema, SignUpFormData } from "@/lib/schemas/auth-schema";
import { signUpAction } from "@/lib/actions/form-actions";
import SocialSignIn from "../SocialSignIn";
import SwitchOption from "../SwitchOption";
import MagicLink from "../MagicLink";
import Loader from "@/components/Common/Loader";
import { FadeIn } from "@/components/motion/fade-in";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = watch("acceptTerms");

  const onSubmit = async (data: SignUpFormData) => {
    setSuccessMessage("");
    
    startTransition(async () => {
      try {
        const result = await signUpAction(data);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setSuccessMessage(result.message);
        toast.success("Account created successfully!");
        
        // Redirect to sign in page after 2 seconds
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Sign up error:", error);
      }
    });
  };

  return (
    <section className="bg-primary-50 py-14 dark:bg-dark lg:py-[90px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <FadeIn direction="up" delay={0.15}>
              <div className="shadow-form relative mx-auto max-w-[525px] overflow-hidden rounded-xl bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center">
                  <Link href="/" className="mx-auto inline-block max-w-[160px]">
                    <Image
                      src="/images/logo/logo.svg"
                      alt="logo"
                      width={140}
                      height={30}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/logo/logo-white.svg"
                      alt="logo"
                      width={140}
                      height={30}
                      className="hidden dark:block"
                    />
                  </Link>
                </div>

                <SocialSignIn />

                <span className="z-1 relative my-8 block text-center">
                  <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-stroke dark:bg-dark-3"></span>
                  <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-dark-2">
                    OR
                  </span>
                </span>

                <SwitchOption
                  isPassword={isPassword}
                  setIsPassword={setIsPassword}
                />

                {isPassword ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {successMessage && <FormSuccess message={successMessage} />}

                    <div className="space-y-2 text-left">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                        disabled={isPending}
                      />
                      {errors.name && (
                        <FormError message={errors.name.message} />
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        disabled={isPending}
                      />
                      {errors.email && (
                        <FormError message={errors.email.message} />
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        {...register("password")}
                        aria-invalid={!!errors.password}
                        disabled={isPending}
                      />
                      {errors.password && (
                        <FormError message={errors.password.message} />
                      )}
                    </div>

                    <div className="space-y-2 text-left">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                        aria-invalid={!!errors.confirmPassword}
                        disabled={isPending}
                      />
                      {errors.confirmPassword && (
                        <FormError message={errors.confirmPassword.message} />
                      )}
                    </div>

                    <div className="flex items-start space-x-2 text-left">
                      <Checkbox
                        id="acceptTerms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) =>
                          setValue("acceptTerms", checked as boolean)
                        }
                        disabled={isPending}
                      />
                      <Label
                        htmlFor="acceptTerms"
                        className="text-sm font-normal cursor-pointer leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <FormError message={errors.acceptTerms.message} />
                    )}

                    <div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            Creating Account... <Loader />
                          </>
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <MagicLink />
                )}

                <p className="text-body-secondary mt-6 text-base">
                  Already have an account?
                  <Link
                    href="/signin"
                    className="pl-2 text-primary hover:underline"
                  >
                    Sign In
                  </Link>
                </p>

                <div>
                  <span className="absolute right-1 top-1">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.39737"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 1.39737 38.6026)"
                        className="fill-primary"
                      />
                      <circle
                        cx="1.39737"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 1.39737 1.99122)"
                        className="fill-primary"
                      />
                      <circle
                        cx="13.6943"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 13.6943 38.6026)"
                        className="fill-primary"
                      />
                      <circle
                        cx="13.6943"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 13.6943 1.99122)"
                        className="fill-primary"
                      />
                      <circle
                        cx="25.9911"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 25.9911 38.6026)"
                        className="fill-primary"
                      />
                      <circle
                        cx="25.9911"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 25.9911 1.99122)"
                        className="fill-primary"
                      />
                      <circle
                        cx="38.288"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 38.288 38.6026)"
                        className="fill-primary"
                      />
                      <circle
                        cx="38.288"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 38.288 1.99122)"
                        className="fill-primary"
                      />
                      <circle
                        cx="1.39737"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 1.39737 26.3057)"
                        className="fill-primary"
                      />
                      <circle
                        cx="13.6943"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 13.6943 26.3057)"
                        className="fill-primary"
                      />
                      <circle
                        cx="25.9911"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 25.9911 26.3057)"
                        className="fill-primary"
                      />
                      <circle
                        cx="38.288"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 38.288 26.3057)"
                        className="fill-primary"
                      />
                      <circle
                        cx="1.39737"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 1.39737 14.0086)"
                        className="fill-primary"
                      />
                      <circle
                        cx="13.6943"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 13.6943 14.0086)"
                        className="fill-primary"
                      />
                      <circle
                        cx="25.9911"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 25.9911 14.0086)"
                        className="fill-primary"
                      />
                      <circle
                        cx="38.288"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 38.288 14.0086)"
                        className="fill-primary"
                      />
                    </svg>
                  </span>
                  <span className="absolute bottom-1 left-1">
                    <svg
                      width="29"
                      height="40"
                      viewBox="0 0 29 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2.288"
                        cy="25.9912"
                        r="1.39737"
                        transform="rotate(-90 2.288 25.9912)"
                        className="fill-primary"
                      />
                      <circle
                        cx="14.5849"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 14.5849 25.9911)"
                        className="fill-primary"
                      />
                      <circle
                        cx="26.7216"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 26.7216 25.9911)"
                        className="fill-primary"
                      />
                      <circle
                        cx="2.288"
                        cy="13.6944"
                        r="1.39737"
                        transform="rotate(-90 2.288 13.6944)"
                        className="fill-primary"
                      />
                      <circle
                        cx="14.5849"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 14.5849 13.6943)"
                        className="fill-primary"
                      />
                      <circle
                        cx="26.7216"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 26.7216 13.6943)"
                        className="fill-primary"
                      />
                      <circle
                        cx="2.288"
                        cy="38.0087"
                        r="1.39737"
                        transform="rotate(-90 2.288 38.0087)"
                        className="fill-primary"
                      />
                      <circle
                        cx="2.288"
                        cy="1.39739"
                        r="1.39737"
                        transform="rotate(-90 2.288 1.39739)"
                        className="fill-primary"
                      />
                      <circle
                        cx="14.5849"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 14.5849 38.0089)"
                        className="fill-primary"
                      />
                      <circle
                        cx="26.7216"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 26.7216 38.0089)"
                        className="fill-primary"
                      />
                      <circle
                        cx="14.5849"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 14.5849 1.39761)"
                        className="fill-primary"
                      />
                      <circle
                        cx="26.7216"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 26.7216 1.39761)"
                        className="fill-primary"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
