"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { magicLinkSchema, MagicLinkFormData } from "@/lib/schemas/auth-schema";
import { sendMagicLink } from "@/lib/actions/form-actions";
import Loader from "@/components/Common/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

const MagicLink = () => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MagicLinkFormData>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: MagicLinkFormData) => {
    setSuccessMessage("");
    
    startTransition(async () => {
      try {
        // Use next-auth's email provider for magic link
        const result = await signIn("email", {
          email: data.email,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Unable to send magic link");
          return;
        }

        if (result?.ok) {
          setSuccessMessage("Magic link sent! Check your email.");
          toast.success("Magic link sent!");
          reset();
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Magic link error:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {successMessage && <FormSuccess message={successMessage} />}

      <div className="space-y-2 text-left">
        <Label htmlFor="email">Email Address</Label>
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

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Sending Magic Link... <Loader />
            </>
          ) : (
            "Send Magic Link"
          )}
        </Button>
      </div>
    </form>
  );
};

export default MagicLink;
