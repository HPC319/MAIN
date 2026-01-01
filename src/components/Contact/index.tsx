"use client";

import { useFormState } from "react-dom";
import { submitContactFormAction } from "@/kernel/actions/contact.action";
import { useState, useEffect } from "react";

export default function Contact() {
  const [state, formAction] = useFormState(submitContactFormAction, {
    success: false,
    error: { message: "" },
  });

  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (state.success) {
      setFormStatus("success");
    } else if (state.error?.message) {
      setFormStatus("error");
    }
  }, [state]);

  const getFieldError = (field: string): string | undefined => {
    if (!state.success && state.error?.field === field) {
      return state.error.message;
    }
    return undefined;
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          
          {formStatus === "success" && state.success && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              Message sent successfully! We&apos;ll get back to you soon.
            </div>
          )}
          
          {formStatus === "error" && !state.success && state.error?.message && !state.error.field && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
              {state.error.message}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-invalid={!!getFieldError("name")}
                aria-describedby={getFieldError("name") ? "name-error" : undefined}
              />
              {getFieldError("name") && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-invalid={!!getFieldError("email")}
                aria-describedby={getFieldError("email") ? "email-error" : undefined}
              />
              {getFieldError("email") && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-invalid={!!getFieldError("subject")}
                aria-describedby={getFieldError("subject") ? "subject-error" : undefined}
              />
              {getFieldError("subject") && (
                <p id="subject-error" className="mt-1 text-sm text-red-600">
                  {getFieldError("subject")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-invalid={!!getFieldError("message")}
                aria-describedby={getFieldError("message") ? "message-error" : undefined}
              />
              {getFieldError("message") && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {getFieldError("message")}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
