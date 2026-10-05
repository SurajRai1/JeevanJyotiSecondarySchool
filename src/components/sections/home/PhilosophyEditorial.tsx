/**
 * @file PhilosophyEditorial.tsx
 * @description Elementis-style asymmetric editorial layout for school philosophy.
 * Dark navy background, massive light-weight type, staggered imagery.
 */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useT } from '@/hooks/useT';

export function PhilosophyEditorial() {
  const { t } = useT();
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', paddingTop: 'clamp(5rem, 11vw, 11rem)', paddingBottom: 'clamp(5rem, 11vw, 11rem)' }}
    >
      <div className="container-page">
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-16 xl:gap-24">

          {/* ─── Left: Sticky Editorial Typography ─── */}
          <div className="lg:w-5/12">
            <div className="sticky top-40 reveal-slow">
              <span
                className="block tracking-[0.2em] uppercase mb-10"
                style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.625rem, 0.83vw, 0.75rem)', fontWeight: 300 }}
              >
                {t('home.philosophy.label')}
              </span>

              <h2
                className="font-light leading-none tracking-tight mb-10"
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                  color: 'var(--color-sand)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('home.philosophy.line1')}
                <br />
                {t('home.philosophy.line2')}
                <br />
                <em className="not-italic" style={{ opacity: 0.5, fontWeight: 200 }}>{t('home.philosophy.line3')}</em>
                <br />
                {t('home.philosophy.line4')}
              </h2>

              <p
                className="font-light leading-relaxed mb-12 max-w-sm whitespace-pre-line"
                style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)' }}
              >
                {t('home.philosophy.body')}
              </p>

              <Link
                href="/academics"
                className="inline-flex items-center gap-4 el-link font-light transition-opacity hover:opacity-100"
                style={{ color: 'var(--color-sand)', opacity: 0.7, fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}
              >
                <span>{t('home.philosophy.readStory')}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* ─── Right: Staggered Imagery ─── */}
          <div className="lg:w-7/12 flex flex-col gap-20 lg:gap-32 pt-4 lg:pt-20">

            {/* Image 1 */}
            <div className="reveal-slow">
              <div
                className="relative overflow-hidden w-full max-w-xl ml-auto"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw"
                  alt="Students engaged in collaborative learning"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2.5s] ease-out"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(10,15,30,0.15)' }} />
              </div>
              <div className="mt-8 max-w-xs ml-auto">
                <h3
                  className="font-light mb-3"
                  style={{ color: 'var(--color-sand)', fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)' }}
                >
                  {t('home.philosophy.image1Title')}
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)' }}>
                  {t('home.philosophy.image1Desc')}
                </p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="reveal-slow">
              <div
                className="relative overflow-hidden w-full"
                style={{ aspectRatio: '16/9' }}
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ"
                  alt="Modern campus and innovation hub"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2.5s] ease-out grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(10,15,30,0.3)' }} />
              </div>
              <div className="mt-8 max-w-xs">
                <h3
                  className="font-light mb-3"
                  style={{ color: 'var(--color-sand)', fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)' }}
                >
                  {t('home.philosophy.image2Title')}
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)' }}>
                  {t('home.philosophy.image2Desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Elementis-style hairline separator at the bottom */}
      <div className="container-page mt-24 lg:mt-40">
        <div className="el-border" />
      </div>
    </section>
  );
}
