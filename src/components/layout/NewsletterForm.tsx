'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 py-2">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 16, color: 'var(--color-accent)', fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <span className="font-light" style={{ color: 'var(--color-sand)', fontSize: '0.875rem' }}>
          You&apos;re subscribed — thank you!
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="Your email address"
        className="flex-1 min-w-0 bg-transparent px-0 py-3 font-light text-sand placeholder:text-sand/30 focus:outline-none transition-colors"
        style={{
          borderBottom: '1px solid rgba(209,204,191,0.2)',
          fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
        }}
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        className="ml-4 shrink-0 flex items-center gap-2 font-light transition-opacity hover:opacity-100"
        style={{ color: 'var(--color-accent)', opacity: 0.8, fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}
        aria-label="Subscribe"
      >
        <span>Subscribe</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
      </button>
    </form>
  );
}
