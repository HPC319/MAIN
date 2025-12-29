'use client';

import { useState, type FormEvent } from 'react';

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error';

interface ContactFormProps {
  readonly onSubmit?: (data: FormData) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('pending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Submission failed');
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const isPending = status === 'pending';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-center font-medium">Message sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center font-medium">Failed to send message. Please try again.</p>
      )}
    </form>
  );
}
