/**
 * @file SectionHeading.tsx
 * @description Reusable section heading pattern used across all pages.
 * Renders an optional overline (label-caps) + headline + optional subtitle.
 * 
 * Usage:
 *   <SectionHeading
 *     overline="CORE PHILOSOPHY"
 *     title="Our Vision"
 *     subtitle="Cultivating intellectual curiosity..."
 *     align="center"
 *   />
 */

interface SectionHeadingProps {
  /** Small all-caps overline label */
  overline?: string;
  /** Main headline (rendered in Libre Caslon Text via font-serif class) */
  title: string;
  /** Optional supporting paragraph beneath the headline */
  subtitle?: string;
  /** Text alignment — defaults to 'left' */
  align?: 'left' | 'center';
  /** Additional CSS classes for the wrapper div */
  className?: string;
}

/** Consistent two-line section header with overline, title, and subtitle. */
export function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`${alignClasses} ${className}`}>
      {overline && (
        <span
          className="
            inline-block mb-3
            text-[var(--color-secondary)] font-bold
            text-[12px] leading-[16px] tracking-[0.1em] uppercase
            font-sans
          "
        >
          {overline}
        </span>
      )}

      <h2
        className="
          font-serif font-semibold
          text-[clamp(1.75rem,4vw,2rem)] leading-tight
          text-[var(--color-primary)] mb-4
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            text-[var(--color-on-surface-variant)]
            text-[18px] leading-[28px] max-w-2xl
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
