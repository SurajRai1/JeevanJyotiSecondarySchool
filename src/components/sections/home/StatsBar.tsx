/**
 * @file StatsBar.tsx
 * @description Elementis-style stats section: massive typography on dark background.
 */

'use client';
import { STATS } from '@/lib/constants';
import { useT } from '@/hooks/useT';

export function StatsBar() {
  const { t, tArr } = useT();
  const statLabels = tArr<{ label: string }>('home.stats.items');
  return (
    <section
      className="relative overflow-hidden"
      aria-label="School statistics"
      style={{ backgroundColor: 'var(--color-bg)', paddingTop: 'clamp(5rem, 11vw, 11rem)', paddingBottom: 'clamp(5rem, 11vw, 11rem)' }}
    >
      <div className="container-page">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 reveal">
          <div style={{ width: 48, height: 1, backgroundColor: 'var(--color-accent)' }} />
          <span
            className="uppercase tracking-[0.2em] font-light"
            style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.625rem, 0.83vw, 0.75rem)' }}
          >
            {t('home.stats.overline')}
          </span>
        </div>

        {/* Intro text */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 reveal">
          <h2
            className="font-light leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
              color: 'var(--color-sand)',
              letterSpacing: '-0.02em',
              maxWidth: '20ch',
            }}
          >
            {t('home.stats.headline')}
          </h2>
          <p
            className="font-light leading-relaxed max-w-xs"
            style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)' }}
          >
            {t('home.stats.body')}
          </p>
        </div>

        {/* Hairline top border */}
        <div className="el-border mb-16" />

        {/* Stats grid — Elementis large number style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 16,
                    color: 'var(--color-accent)',
                    fontVariationSettings: "'FILL' 0",
                  }}
                >
                  {stat.icon}
                </span>
                <p
                  className="font-light uppercase tracking-[0.15em]"
                  style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.625rem, 0.75vw, 0.75rem)' }}
                >
                  {statLabels[i]?.label || stat.label}
                </p>
              </div>

              {/* Massive number — Elementis signature */}
              <p
                className="font-light leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(3.5rem, 6vw, 6rem)',
                  color: 'var(--color-sand)',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
