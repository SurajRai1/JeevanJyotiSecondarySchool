'use client';

/**
 * @file Footer.tsx
 * @description Elementis-style footer — dark navy, light typography,
 * hairline separators, matching the homepage design language exactly.
 */

import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { useT } from '@/hooks/useT';

const QUICK_LINKS = [
  { key: 'academics',   href: '/academics' },
  { key: 'admissions',  href: '/admissions' },
  { key: 'studentLife', href: '/student-life' },
  { key: 'resources',   href: '/resources' },
  { key: 'contact',     href: '/contact' },
];

export function Footer() {
  const { t } = useT();
  return (
    <footer
      aria-label="Site footer"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid rgba(209,204,191,0.1)' }}
    >
      {/* ─── Main content ─── */}
      <div className="container-page" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>

        {/* Top row — brand + newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16 lg:mb-24">

          {/* Brand */}
          <div className="lg:w-5/12">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #fea619, #ffb95f)' }}
              >
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <span
                className="font-medium tracking-tight"
                style={{ color: 'var(--color-sand)', fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}
              >
                {t('site.name')}
              </span>
            </Link>
            <p
              className="font-light leading-relaxed max-w-sm"
              style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
            >
              {t('footer.tagline')}
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:w-5/12">
            <h3
              className="font-light mb-3"
              style={{ color: 'var(--color-sand)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}
            >
              {t('footer.newsletter')}
            </h3>
            <p
              className="font-light leading-relaxed mb-6"
              style={{ color: 'var(--color-sand-dim)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}
            >
              {t('footer.newsletterDesc')}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Hairline */}
        <div className="el-border" />

        {/* Middle row — links + contact */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}
        >
          {/* Quick Links */}
          <div>
            <h4
              className="font-light uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)' }}
            >
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="el-link font-light"
                    style={{ color: 'var(--color-sand)', opacity: 0.6, fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
                  >
                    {t(`nav.${link.key}` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-light uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)' }}
            >
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined shrink-0 mt-0.5"
                  style={{ fontSize: 16, color: 'var(--color-accent)', fontVariationSettings: "'FILL' 0" }}
                >
                  location_on
                </span>
                <span className="font-light leading-relaxed" style={{ color: 'rgba(209,204,191,0.6)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}>
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined shrink-0"
                  style={{ fontSize: 16, color: 'var(--color-accent)', fontVariationSettings: "'FILL' 0" }}
                >
                  call
                </span>
                <a
                  href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}
                  className="el-link font-light"
                  style={{ color: 'rgba(209,204,191,0.6)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined shrink-0"
                  style={{ fontSize: 16, color: 'var(--color-accent)', fontVariationSettings: "'FILL' 0" }}
                >
                  mail
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="el-link font-light"
                  style={{ color: 'rgba(209,204,191,0.6)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4
              className="font-light uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)' }}
            >
              {t('contact.info.officeHoursLabel')}
            </h4>
            <div className="space-y-3">
              <p className="font-light" style={{ color: 'rgba(209,204,191,0.6)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}>
                {t('contact.info.weekdays')}
              </p>
              <p className="font-light" style={{ color: 'rgba(209,204,191,0.6)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)' }}>
                {t('contact.info.saturday')}
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-light uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--color-accent)', fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)' }}
            >
              Stay Connected
            </h4>
            <div className="flex items-center gap-5">
              {[
                { name: 'Facebook', href: SITE.social.facebook, icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
                { name: 'Instagram', href: SITE.social.instagram, icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
                { name: 'YouTube', href: SITE.social.youtube, icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.5" fill="none"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/></> },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="transition-opacity"
                  style={{ color: 'var(--color-sand)', opacity: 0.4 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="el-border" />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ paddingTop: 'clamp(1.5rem, 2vw, 2rem)' }}
        >
          <p
            className="font-light"
            style={{ color: 'rgba(209,204,191,0.35)', fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}
          >
            © {new Date().getFullYear()} {t('site.fullName')}. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="el-link font-light"
              style={{ color: 'rgba(209,204,191,0.35)', fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}
            >
              {t('footer.privacyPolicy')}
            </Link>
            <Link
              href="/contact"
              className="el-link font-light"
              style={{ color: 'rgba(209,204,191,0.35)', fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}
            >
              {t('footer.termsOfUse')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
