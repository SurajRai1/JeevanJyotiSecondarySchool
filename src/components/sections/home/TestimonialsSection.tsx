/**
 * @file TestimonialsSection.tsx
 * @description Student and parent testimonials — dark-themed editorial layout
 * consistent with the Elementis design system.
 */

'use client';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/constants';
import { useT } from '@/hooks/useT';

export function TestimonialsSection() {
  const { t, tArr } = useT();
  const tItems = tArr<{ quote: string, name: string, role: string }>('home.testimonials.items');
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', paddingTop: 'clamp(5rem, 11vw, 11rem)', paddingBottom: 'clamp(5rem, 11vw, 11rem)' }}
    >
      <div className="container-page">

        {/* ─── Header ─── */}
        <div className="reveal mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div style={{ width: 48, height: 1, backgroundColor: 'var(--color-accent)' }} />
            <span style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.625rem, 0.83vw, 0.75rem)', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {t('home.testimonials.overline')}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
            <h2
              className="font-light leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', color: 'var(--color-sand)', letterSpacing: '-0.02em', maxWidth: '16ch' }}
            >
              {t('home.testimonials.headline')}
            </h2>
            <p
              className="font-light leading-relaxed max-w-xs"
              style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)' }}
            >
              {t('home.testimonials.subtitle')}
            </p>
          </div>
        </div>

        {/* ─── Hairline ─── */}
        <div className="el-border mb-16" />

        {/* ─── Testimonial Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.id}
              className="reveal flex flex-col"
              style={{
                transitionDelay: `${i * 120}ms`,
                border: '1px solid rgba(209,204,191,0.1)',
                padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              {/* Giant quote mark */}
              <div
                aria-hidden="true"
                className="font-light leading-none select-none pointer-events-none -mt-2 -ml-1 mb-4"
                style={{ fontSize: '5rem', color: 'rgba(209,204,191,0.08)', lineHeight: 0.8 }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} style={{ color: 'var(--color-accent)', fontSize: '14px' }}>★</span>
                ))}
              </div>

              {/* Quote text */}
              <p
                className="font-light leading-relaxed flex-1 mb-8"
                style={{ color: 'var(--color-sand)', fontSize: 'clamp(0.875rem, 1.1vw, 1rem)' }}
              >
                &ldquo;{tItems[i]?.quote || item.quote}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: 'rgba(209,204,191,0.1)', marginBottom: '1.5rem' }} />

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.avatarUrl}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover shrink-0"
                  style={{ border: '1px solid rgba(209,204,191,0.2)' }}
                />
                <div>
                  <p className="font-light" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>{tItems[i]?.name || item.name}</p>
                  <p className="font-light" style={{ color: 'var(--color-sand-dim)', fontSize: '0.75rem' }}>{tItems[i]?.role || item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
