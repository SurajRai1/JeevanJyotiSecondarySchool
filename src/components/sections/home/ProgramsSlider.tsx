'use client';

/**
 * @file ProgramsSlider.tsx
 * @description Framer Motion upgraded drag slider with physics-based momentum
 * and buttery smooth progress tracking.
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useT } from '@/hooks/useT';

const PROGRAMS = [
  {
    num: '01', title: 'Management Stream',
    desc: 'Accounting, Economics, and Business Studies preparing the next generation of entrepreneurs and business leaders.',
    href: '/academics', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
  },
  {
    num: '02', title: 'Education Stream',
    desc: 'Child Development, Pedagogy, and Education methods shaping the educators of tomorrow.',
    href: '/academics', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
  },
  {
    num: '03', title: 'Humanities Stream',
    desc: 'Social Studies, Major English, and Major Nepali — building critical thinkers and communicators.',
    href: '/academics', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
  },
];

export function ProgramsSlider() {
  const { t, tArr } = useT();
  const tItems = tArr<{ title: string, desc: string }>('home.streams.items');
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState(0);

  // Framer Motion values for physics
  const x = useMotionValue(0);

  // Calculate drag boundaries on mount & resize
  useEffect(() => {
    const calcConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        // The maximum we can drag to the left is the difference in width
        setConstraints(Math.min(containerWidth - trackWidth, 0));
      }
    };
    calcConstraints();
    window.addEventListener('resize', calcConstraints);
    return () => window.removeEventListener('resize', calcConstraints);
  }, []);

  // Transform x position into scaleX for the progress bar.
  // x starts at 0 and goes negative as user drags left, so input range is [0, -constraints].
  // Clamp prevents overshoot. progressScaleX starts at 0.1 (not dragged) → 1 (fully dragged).
  const progressScaleX = useTransform(x, () => {
    if (constraints === 0) return 0.1;
    const progress = Math.abs(x.get()) / constraints;
    return Math.max(0.1, Math.min(1, 0.1 + progress * 0.9));
  });

  // Manage cursor state during drag
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section
      style={{
        backgroundColor: '#0d1f1a',
        paddingTop: 'clamp(4rem, 10vw, 10rem)',
        paddingBottom: 'clamp(4rem, 11vw, 11rem)',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        className="container-page"
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem,4vw,4rem)',
          marginBottom: 'clamp(3rem, 7.2vw, 7.2rem)',
          alignItems: 'end',
        }}
      >
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(1.5rem,3vw,3rem)' }}>
            <div style={{ width: 48, height: 1, backgroundColor: 'var(--color-accent)' }} />
            <span style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.625rem, 0.83vw, 0.75rem)', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Academic Streams
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.6vw, 3.6rem)', fontWeight: 300,
              lineHeight: 1, letterSpacing: '-0.02em',
              color: 'var(--color-sand)',
            }}
          >
            Find your path.
            <br />Choose your stream.
          </h2>
        </div>

        <p
          className="reveal"
          style={{
            fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)', fontWeight: 300,
            lineHeight: 1.5, color: 'rgba(209,204,191,0.6)',
            alignSelf: 'end',
          }}
        >
          Three NEB-approved programmes designed for ambition. Drag to explore all streams.
        </p>
      </div>

      {/* ── Physics-based Drag Slider ── */}
      <div
        ref={containerRef}
        style={{
          paddingLeft: 'clamp(1rem, 4.4vw, 4rem)',
          paddingRight: 'clamp(1rem, 4.4vw, 4rem)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: constraints, right: 0 }}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ x, display: 'flex', gap: 'clamp(0.75rem, 1.1vw, 1rem)', width: 'max-content', cursor: isDragging ? 'grabbing' : 'grab' }}
          className="touch-pan-y"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {PROGRAMS.map((prog, i) => (
            <div
              key={prog.num}
              style={{
                display: 'flex', flexDirection: 'column',
                width: 'clamp(260px, 25.8vw, 372px)',
                flexShrink: 0,
              }}
            >
              {/* Note: We disable pointer events on the link WHILE dragging so it doesn't click accidentally */}
              <Link
                href={prog.href}
                style={{ textDecoration: 'none', color: 'var(--color-sand)', pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                <div style={{
                  fontSize: 'clamp(0.7rem, 0.83vw, 0.75rem)', fontWeight: 300,
                  color: 'rgba(209,204,191,0.4)', marginBottom: 'clamp(1rem, 1.67vw, 1.5rem)',
                }}>
                  {prog.num}
                </div>

                {/* Image with Framer Motion hover scale */}
                <div style={{
                  position: 'relative', height: 'clamp(160px, 18.4vw, 265px)',
                  marginBottom: 'clamp(1.5rem, 2.78vw, 2.5rem)', overflow: 'hidden', flexShrink: 0,
                }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.24, 0.43, 0.15, 0.97] }}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    <Image src={prog.img} alt={prog.title} fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 260px, 372px" />
                  </motion.div>
                </div>

                <h3
                  className="font-light leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', color: 'var(--color-sand)' }}
                >
                  {tItems[i]?.title || prog.title}
                </h3>

                <p
                  className="font-light leading-relaxed mb-10 flex-1"
                  style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
                >
                  {tItems[i]?.desc || prog.desc}
                </p>

                <div style={{
                  marginTop: 'clamp(1rem, 1.67vw, 1.5rem)', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: 'clamp(0.7rem, 0.83vw, 0.75rem)', fontWeight: 300, color: 'rgba(209,204,191,0.4)',
                }}>
                  <span className="text-xs uppercase tracking-widest">{t('home.programs.learnMore') || 'Learn More'}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Motion Progress bar ── */}
      <div
        className="container-page"
        style={{ marginTop: 'clamp(3rem, 7.6vw, 7.6rem)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 'clamp(200px, 64vw, 924px)', position: 'relative' }}>
            <div style={{
              height: 2, backgroundColor: 'rgba(209,204,191,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Link the scaleX directly to the drag position x */}
              <motion.div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'var(--color-sand)',
                  scaleX: progressScaleX,
                  transformOrigin: 'left',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
