/**
 * @file PrincipalMessage.tsx
 * @description Elementis-style full-bleed principal section on dark background.
 */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useT } from '@/hooks/useT';

const PRINCIPAL = {
  name: 'Dr. Ram Prasad Sharma',
  title: 'Principal & Academic Director',
  qualification: 'Ph.D. (Education), M.Ed., TU Gold Medalist',
  quote:
    'Education is not the filling of a pail, but the lighting of a fire. At Jeevan Jyoti, we have spent four decades ensuring that every student who walks through our doors leaves with not just knowledge, but with wisdom, character, and the courage to shape a better world.',
  signature: 'Dr. R.P. Sharma',
  imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=85&fit=crop&crop=face',
};

export function PrincipalMessage() {
  const { t } = useT();
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Message from the Principal"
      style={{ backgroundColor: 'var(--color-bg-alt)', paddingTop: 'clamp(5rem, 11vw, 11rem)', paddingBottom: 'clamp(5rem, 11vw, 11rem)' }}
    >
      <div className="container-page">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">

          {/* ─── LEFT: Massive Portrait ─── */}
          <div className="w-full lg:w-5/12 reveal-slow">
            <div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={PRINCIPAL.imageUrl}
                alt={PRINCIPAL.name}
                fill
                className="object-cover object-top transition-transform duration-[3s] hover:scale-105"
                style={{ filter: 'grayscale(30%)' }}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: 'rgba(10,15,30,0.3)' }} />
            </div>
          </div>

          {/* ─── RIGHT: Quote & Details ─── */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center animate-slow-reveal">

            <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase mb-8 block">
              {t('home.principal.overline')}
            </span>

            {/* Giant decorative quote mark */}
            <div
              className="font-light leading-none select-none pointer-events-none -ml-2 -mb-8"
              aria-hidden="true"
              style={{ fontSize: 'clamp(8rem, 15vw, 15rem)', color: 'rgba(209,204,191,0.06)', lineHeight: 0.8 }}
            >
              &ldquo;
            </div>

            {/* Huge Elementis Serif Quote */}
            <blockquote
              className="text-white mb-10"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: 1.3,
              }}
            >
              "{t('home.principal.quote')}"
            </blockquote>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-sand/10 pt-6">
              <div>
                <h3 className="text-sand text-xl font-medium tracking-wide mb-1">
                  {t('home.principal.name')}
                </h3>
                <p className="text-sand/70 text-sm font-light mb-1">
                  {t('home.principal.title')}
                </p>
                <p className="text-sand/50 text-xs font-light uppercase tracking-widest">
                  {t('home.principal.qualification')}
                </p>
              </div>
            </div>

            <Link
              href="/admissions"
              className="el-link inline-flex items-center gap-4 font-light hover:opacity-100 transition-opacity"
              style={{ color: 'var(--color-sand)', opacity: 0.6, fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}
            >
              <span>Read Full Message</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
