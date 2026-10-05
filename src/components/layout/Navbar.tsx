'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SITE } from '@/lib/constants';

import { useT } from '@/hooks/useT';
import { useLanguage } from '@/context/LanguageContext';

const NAV_ITEMS = [
  { key: 'academics',   href: '/academics',    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw' },
  { key: 'admissions',  href: '/admissions',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ' },
  { key: 'studentLife', href: '/student-life', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw' },
  { key: 'resources',   href: '/resources',    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ' },
  { key: 'contact',     href: '/contact',      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw' },
];

const EASE = 'cubic-bezier(0.24, 0.43, 0.15, 0.97)';

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLang } = useLanguageSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      if (y > 200 && y > lastScrollY.current) setIsHidden(true);
      else setIsHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // The currently displayed image = hovered item or active item
  const displayedImg = hoveredItem
    ? NAV_ITEMS.find(i => i.href === hoveredItem)?.img
    : NAV_ITEMS.find(i => i.href === pathname)?.img ?? NAV_ITEMS[0].img;

  const navBg = isScrolled || isOpen ? 'var(--color-popup-bg)' : 'transparent';
  const navColor = isScrolled || isOpen ? 'var(--color-popup-text)' : 'white';

  return (
    <>
      {/* ══════════════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════════════ */}
      <header
        id="mainNav"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999,
          backgroundColor: navBg, color: navColor,
          transform: isHidden && !isOpen ? 'translate3d(0,-120%,0)' : 'translate3d(0,0,0)',
          transition: `background-color .6s ${EASE} .1s, color .6s ${EASE} .1s, transform .8s ${EASE}`,
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: isScrolled || isOpen
              ? `clamp(0.5rem,0.56vw,0.8rem) clamp(1rem,4.4vw,4rem)`
              : `clamp(1.5rem,2.3vw,2.1rem) clamp(1rem,4.4vw,4rem)`,
            transition: `padding .6s ${EASE} .1s`, position: 'relative',
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="Jeevan Jyoti — home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#fea619,#ffb95f)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 'clamp(1rem,1.15vw,1.2rem)', letterSpacing: '-0.01em', color: 'currentColor' }}>
              {t('site.name')}
            </span>
          </Link>

          {/* Centre nav links — desktop */}
          <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', gap: 'clamp(1.5rem,1.67vw,2rem)', fontSize: 'clamp(0.875rem,1vw,1.1rem)', fontWeight: 300 }} className="hidden md:flex">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href}
                style={{ color: 'currentColor', position: 'relative', opacity: pathname === item.href ? 1 : 0.65, transition: 'opacity .3s ease' }}
                className="el-link"
              >
                {t(`nav.${item.key}` as any)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem,2.78vw,2.5rem)' }}>
            
            {/* Language Switcher Pill */}
            <div className="hidden md:flex items-center rounded-full overflow-hidden" style={{ border: `1px solid ${navColor}`, opacity: 0.7 }}>
              <button
                onClick={() => setLang('en')}
                className="px-3 py-1 text-xs font-medium transition-colors"
                style={{ backgroundColor: lang === 'en' ? navColor : 'transparent', color: lang === 'en' ? navBg : navColor }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ne')}
                className="px-3 py-1 text-xs font-medium transition-colors"
                style={{ backgroundColor: lang === 'ne' ? navColor : 'transparent', color: lang === 'ne' ? navBg : navColor }}
              >
                NE
              </button>
            </div>

            <Link href="/auth/login" className="el-link hidden lg:block" style={{ fontSize: 'clamp(0.875rem,1vw,1.1rem)', fontWeight: 300, opacity: 0.75, color: 'currentColor' }}>
              {t('nav.portalLogin')}
            </Link>

            {/* Hamburger — sliding lines, exact Elementis */}
            <button
              onClick={() => setIsOpen(v => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,0.56vw,8px)', cursor: 'pointer', width: 'clamp(22px,1.94vw,28px)', overflow: 'hidden' }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '100%', height: 1, backgroundColor: 'currentColor',
                  transformOrigin: 'right',
                  transform: isOpen ? 'translateX(170%)' : 'translateX(0)',
                  transition: `transform .8s ${EASE} ${i * 0.15}s`,
                  position: 'relative',
                }}>
                  {/* The before pseudo — slides in from left when hovered */}
                  <span style={{
                    position: 'absolute', inset: 0, height: 1, backgroundColor: 'currentColor',
                    transform: 'translateX(-170%)',
                    transition: `transform .8s ${EASE} ${i * 0.15}s`,
                  }} />
                </span>
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          FULL-SCREEN POPUP — Elementis exact replica
          - clip-path reveal from top
          - Left col: image (changes on hover)
          - Right col: "Discover Pages" + menu + contact + social
          - Top-right: animated X close button
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute', inset: 0, backgroundColor: 'black',
            opacity: isOpen ? 0.35 : 0, transition: `opacity .8s ${EASE}`,
          }}
        />

        {/* Popup Panel */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, minHeight: '100vh',
            backgroundColor: 'var(--color-popup-bg)', color: 'var(--color-popup-text)',
            display: 'grid', gridTemplateColumns: 'repeat(12,1fr)',
            columnGap: 'clamp(1rem,1.67vw,1.5rem)',
            paddingLeft: 'clamp(1rem,4.4vw,4rem)',
            paddingRight: 'clamp(1rem,4.4vw,4rem)',
            clipPath: isOpen ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transition: `clip-path .8s ${EASE}`,
            willChange: 'clip-path',
          }}
        >
          {/* ── LEFT: Image panel — changes on menu hover ── */}
          <div
            className="hidden lg:block"
            style={{
              gridColumn: '1 / 6',
              marginLeft: 'clamp(-1rem,-4.4vw,-4rem)',
              position: 'relative', overflow: 'hidden',
              clipPath: isOpen ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
              transition: `clip-path 1s ${EASE} .1s`,
              willChange: 'clip-path',
            }}
          >
            {NAV_ITEMS.map(item => (
              <div key={item.href} style={{
                position: 'absolute', inset: 0,
                opacity: displayedImg === item.img ? 1 : 0,
                transition: `opacity .6s ${EASE}`,
              }}>
                <Image src={item.img} alt={t(`nav.${item.key}` as any)} fill className="object-cover" />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,30,0.25)' }} />
              </div>
            ))}
            {/* Fallback base image */}
            {!displayedImg && (
              <Image src={NAV_ITEMS[0].img} alt="" fill className="object-cover" />
            )}
          </div>

          {/* ── RIGHT: Menu Content ── */}
          <div
            className="col-span-12 lg:col-start-7 lg:col-span-6"
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              paddingTop: 'clamp(6rem,8.68vw,7.5rem)',
              paddingBottom: 'clamp(2.5rem,4.86vw,4.2rem)',
              position: 'relative',
            }}
          >
            {/* ══ Elementis X Close Button ══ */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                right: 'clamp(1rem,4.4vw,4rem)',
                top: 'clamp(1.5rem,2.08vw,1.8rem)',
                width: 28,
                height: 28,
                cursor: 'pointer',
                zIndex: 50,
              }}
              className="flex items-center justify-center"
            >
              <svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                style={{
                  color: 'var(--color-popup-text)',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: `opacity .5s ${EASE} .3s, transform .6s ${EASE} .3s`,
                }}
              >
                <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* "Discover Pages" subtitle — exact Elementis label */}
            <p style={{ fontSize: 'clamp(0.75rem,1.25vw,1.1rem)', opacity: 0.5, marginBottom: 'clamp(2rem,4.4vw,4rem)', fontWeight: 300 }}>
              {t('site.name')}
            </p>

            {/* ══ Menu Items ══ */}
            <ul className="grid grid-cols-1 lg:grid-cols-2" style={{ marginBottom: 'clamp(2rem,5.6vw,5rem)' }}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} style={{ gridColumn: 'span 1' }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontSize: 'clamp(1.2rem,2.08vw,1.8rem)', fontWeight: 300,
                        padding: 'clamp(1rem,1vw,1rem) 0', // larger touch target for mobile
                        color: 'var(--color-popup-text)',
                        position: 'relative',
                        opacity: isActive ? 1 : 0.9,
                        textDecoration: 'none',
                      }}
                    >
                      {/* Animated border bottom */}
                      <span style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                        backgroundColor: 'rgba(10,15,30,0.2)',
                        overflow: 'hidden',
                      }}>
                        <span style={{
                          display: 'block', height: '100%',
                          backgroundColor: 'var(--color-popup-text)',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: isActive ? 'left' : 'right',
                          transition: `transform .8s ${EASE}`,
                        }} className="menu-border-fill" />
                      </span>

                      {/* Text */}
                      <span style={{
                        position: 'relative',
                        transition: `transform .5s ${EASE}`,
                        display: 'inline-flex', alignItems: 'center',
                      }}>
                        {t(`nav.${item.key}` as any)}
                      </span>

                      {/* Arrow icon — always visible on mobile, appears on hover on desktop */}
                      <span style={{
                        overflow: 'hidden', height: 16, width: 16, flexShrink: 0,
                        display: 'flex', alignItems: 'center',
                      }}>
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          className="menu-arrow-icon"
                          style={{ transition: `transform .5s ${EASE}` }}
                        >
                          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* Join us / Apply CTA — bottom spanning both columns */}
              <li className="col-span-1 lg:col-span-2" style={{ marginTop: 'clamp(1.5rem,2.78vw,2.5rem)', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <Link
                  href="/admissions"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: 'var(--color-popup-text)', color: 'var(--color-sand)',
                    padding: 'clamp(1.2rem,1.39vw,1.25rem)',
                    fontSize: 'clamp(0.9rem,1.1vw,1rem)', fontWeight: 300,
                    textDecoration: 'none',
                  }}
                >
                  <span>{t('admissions.hero.startApplication')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H1M13 1V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                  </svg>
                </Link>

                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: 'var(--color-accent, #fea619)', color: 'var(--color-navy, #0a0f1e)',
                    padding: 'clamp(1.2rem,1.39vw,1.25rem)',
                    fontSize: 'clamp(0.9rem,1.1vw,1rem)', fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>{t('nav.portalLogin')}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                </Link>
              </li>
            </ul>

            {/* ══ Contact section ══ */}
            <div style={{ marginBottom: 'clamp(1.5rem,2.78vw,2.5rem)' }}>
              <p style={{ fontSize: 'clamp(0.7rem,0.97vw,0.875rem)', opacity: 0.5, marginBottom: 'clamp(0.75rem,1.11vw,1rem)', fontWeight: 300 }}>
                {t('nav.contactUs')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1rem,2.78vw,2.5rem)', fontSize: 'clamp(0.8rem,1.11vw,1rem)', fontWeight: 300 }}>
                <a href={`mailto:${SITE.email}`} className="el-link" style={{ color: 'var(--color-popup-text)', opacity: 0.8 }}>
                  {SITE.email}
                </a>
                <span style={{ opacity: 0.3 }} className="hidden md:inline">|</span>
                <a href={`tel:${SITE.phone.replace(/-/g, '')}`} className="el-link" style={{ color: 'var(--color-popup-text)', opacity: 0.8 }}>
                  {SITE.phone}
                </a>
              </div>
            </div>

            {/* ══ Social links — exactly like Elementis ══ */}
            <div>
              <p style={{ fontSize: 'clamp(0.7rem,0.97vw,0.875rem)', opacity: 0.5, marginBottom: 'clamp(0.75rem,1.11vw,1rem)', fontWeight: 300 }}>
                Stay Connected
              </p>
              <div style={{ display: 'flex', gap: 'clamp(1.5rem,2.78vw,2.5rem)', alignItems: 'center' }}>
                {[
                  { name: 'Facebook', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
                  { name: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></> },
                  { name: 'YouTube', icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="1.5" fill="none"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/></> },
                ].map(s => (
                  <a
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    style={{ color: 'var(--color-popup-text)', opacity: 0.7, transition: 'opacity .3s ease', display: 'flex' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

// Helper to easily get the setLang function alongside t
function useLanguageSwitcher() {
  const { t, lang } = useT();
  const { setLang } = useLanguage();
  return { t, lang, setLang };
}
