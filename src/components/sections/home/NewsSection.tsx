/**
 * @file NewsSection.tsx
 * @description Latest news and announcements section on the Home page.
 * Dark-themed news cards consistent with the Elementis design system.
 */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NEWS_ITEMS } from '@/lib/constants';
import { useT } from '@/hooks/useT';

export function NewsSection() {
  const { t, tArr } = useT();
  const tItems = tArr<{ tag: string, title: string, excerpt: string, date: string }>('home.news.items');
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-alt)', paddingTop: 'clamp(5rem, 11vw, 11rem)', paddingBottom: 'clamp(5rem, 11vw, 11rem)' }}
    >
      <div className="container-page">
        {/* ─── Header row ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 48, height: 1, backgroundColor: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.625rem, 0.83vw, 0.75rem)', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {t('home.news.overline')}
              </span>
            </div>
            <h2
              className="font-light leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-sand)', letterSpacing: '-0.02em' }}
            >
              {t('home.news.headline')}
            </h2>
          </div>
          <Link
            href="/resources"
            className="el-link inline-flex items-center gap-3 font-light shrink-0"
            style={{ color: 'var(--color-sand)', opacity: 0.6, fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}
          >
            <span>{t('home.news.viewAll')}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
          </Link>
        </div>

        {/* ─── Hairline ─── */}
        <div className="el-border mb-16" />

        {/* ─── News Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item, i) => (
            <article
              key={item.id}
              className="reveal flex flex-col overflow-hidden"
              style={{ transitionDelay: `${i * 120}ms`, border: '1px solid rgba(209,204,191,0.1)' }}
            >
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Amber accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'var(--color-accent)' }} />
                <div className="absolute inset-0" style={{ background: 'rgba(10,15,30,0.3)' }} />
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 p-6" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <span
                  className="inline-block mb-4 uppercase tracking-[0.12em] font-light"
                  style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}
                >
                  {tItems[i]?.tag || item.tag}
                </span>
                <h3
                  className="font-light leading-snug mb-3 line-clamp-2"
                  style={{ color: 'var(--color-sand)', fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
                >
                  {tItems[i]?.title || item.title}
                </h3>
                <p
                  className="font-light leading-relaxed mb-6 line-clamp-3 flex-1"
                  style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)' }}
                >
                  {tItems[i]?.excerpt || item.excerpt}
                </p>
                <div className="flex items-center justify-between" style={{ borderTop: '1px solid rgba(209,204,191,0.12)', paddingTop: '1rem' }}>
                  <span style={{ color: 'rgba(209,204,191,0.4)', fontSize: '0.75rem', fontWeight: 300 }}>{tItems[i]?.date || item.date}</span>
                  <Link
                    href="/resources"
                    className="el-link inline-flex items-center gap-2 font-light"
                    style={{ color: 'var(--color-sand)', opacity: 0.6, fontSize: '0.8rem' }}
                  >
                    {t('home.news.readMore')}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
