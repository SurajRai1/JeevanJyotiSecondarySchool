'use client';

/**
 * @file ContactForm.tsx
 * @description Elementis-style contact section with high-contrast minimalist form,
 * dark luxury contact info card, and crisp department contact bento cards.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';
import { SITE } from '@/lib/constants';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ContactForm() {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      className="py-16 md:py-28 relative z-20"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container-page">
        {/* Form & Contact Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-28">
          {/* Contact Form (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7 p-8 md:p-12 relative"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(209, 204, 191, 0.12)',
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-8 bg-accent" />
              <h2
                className="text-sand font-light leading-none tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
              >
                {t('contact.form.headline')}
              </h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    border: '1px solid var(--color-accent)',
                    backgroundColor: 'rgba(254, 166, 25, 0.1)',
                  }}
                >
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 28 }}>
                    check
                  </span>
                </div>
                <div>
                  <p className="text-sand text-lg font-medium mb-2">
                    {t('contact.form.successTitle')}
                  </p>
                  <p className="text-sand/70 text-sm font-light max-w-sm">
                    {t('contact.form.successBody')}
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-accent hover:underline text-xs tracking-wider uppercase font-light mt-4"
                >
                  {t('contact.form.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-[11px] text-sand/50 uppercase tracking-widest mb-2 font-light"
                      htmlFor="name"
                    >
                      {t('contact.form.labelName')}
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-sand/20 focus:border-accent focus:ring-0 px-0 py-2.5 text-sand transition-colors placeholder:text-sand/25 font-light text-sm outline-none"
                      id="name"
                      name="name"
                      placeholder={t('contact.form.placeholderName')}
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] text-sand/50 uppercase tracking-widest mb-2 font-light"
                      htmlFor="email"
                    >
                      {t('contact.form.labelEmail')}
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-sand/20 focus:border-accent focus:ring-0 px-0 py-2.5 text-sand transition-colors placeholder:text-sand/25 font-light text-sm outline-none"
                      id="email"
                      name="email"
                      placeholder={t('contact.form.placeholderEmail')}
                      required
                      type="email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[11px] text-sand/50 uppercase tracking-widest mb-2 font-light"
                    htmlFor="subject"
                  >
                    {t('contact.form.labelSubject')}
                  </label>
                  <select
                    className="w-full bg-transparent border-0 border-b border-sand/20 focus:border-accent focus:ring-0 px-0 py-2.5 text-sand transition-colors cursor-pointer font-light text-sm outline-none"
                    id="subject"
                    name="subject"
                    defaultValue=""
                    style={{ backgroundColor: 'var(--color-bg)' }}
                  >
                    <option disabled value="" className="text-sand/50">
                      {t('contact.form.selectDefault')}
                    </option>
                    <option value="admissions">{t('contact.form.optionAdmissions')}</option>
                    <option value="academics">{t('contact.form.optionAcademics')}</option>
                    <option value="general">{t('contact.form.optionGeneral')}</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-[11px] text-sand/50 uppercase tracking-widest mb-2 font-light"
                    htmlFor="message"
                  >
                    {t('contact.form.labelMessage')}
                  </label>
                  <textarea
                    className="w-full bg-transparent border-0 border-b border-sand/20 focus:border-accent focus:ring-0 px-0 py-2.5 text-sand transition-colors resize-none placeholder:text-sand/25 font-light text-sm outline-none"
                    id="message"
                    name="message"
                    placeholder={t('contact.form.placeholderMessage')}
                    required
                    rows={4}
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    className="inline-flex items-center gap-3 font-light transition-all hover:opacity-90"
                    type="submit"
                    style={{
                      backgroundColor: 'var(--color-sand)',
                      color: 'var(--color-bg)',
                      padding: 'clamp(0.75rem, 1vw, 0.95rem) clamp(1.75rem, 2.5vw, 2.5rem)',
                      fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                      fontWeight: 500,
                    }}
                  >
                    {t('contact.form.submit')}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Details (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div
              className="p-8 md:p-12 h-full flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(209, 204, 191, 0.12)',
              }}
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-light mb-3 block">
                  Campus Presence
                </span>
                <h3
                  className="text-sand font-light leading-snug mb-10"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}
                >
                  {t('contact.info.headline')}
                </h3>

                <ul className="space-y-8">
                  <li className="flex items-start gap-5">
                    <span
                      className="material-symbols-outlined text-accent shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      location_on
                    </span>
                    <div>
                      <p className="text-[10px] text-sand/40 uppercase tracking-widest mb-1 font-light">
                        {t('contact.info.addressLabel')}
                      </p>
                      <p className="text-sand text-sm font-normal leading-relaxed">{SITE.address}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-5">
                    <span
                      className="material-symbols-outlined text-accent shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      call
                    </span>
                    <div>
                      <p className="text-[10px] text-sand/40 uppercase tracking-widest mb-1 font-light">
                        {t('contact.info.phoneLabel')}
                      </p>
                      <a
                        className="text-sand text-sm font-normal hover:text-accent transition-colors block"
                        href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}
                      >
                        {SITE.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-5">
                    <span
                      className="material-symbols-outlined text-accent shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                    >
                      mail
                    </span>
                    <div>
                      <p className="text-[10px] text-sand/40 uppercase tracking-widest mb-1 font-light">
                        {t('contact.info.emailLabel')}
                      </p>
                      <a
                        className="text-sand text-sm font-normal hover:text-accent transition-colors block"
                        href={`mailto:${SITE.email}`}
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                className="mt-12 pt-8"
                style={{ borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
              >
                <p className="text-[10px] text-sand/40 uppercase tracking-widest mb-2 font-light">
                  {t('contact.info.officeHoursLabel')}
                </p>
                <p className="text-sand text-sm font-normal">{t('contact.info.weekdays')}</p>
                <p className="text-xs text-sand/60 mt-1 font-light">{t('contact.info.saturday')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Department Contacts (Bento Grid) */}
        <div className="pt-20" style={{ borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="block h-px w-8 bg-accent" />
                <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                  Departments
                </span>
              </div>
              <h2
                className="text-sand font-light leading-none tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {t('contact.departments.headline')}
              </h2>
            </div>
            <p className="text-sand/70 font-light text-sm max-w-md">
              {t('contact.departments.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Admissions */}
            <motion.div
              variants={itemVariants}
              className="p-8 flex flex-col justify-between group transition-all duration-500"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(209, 204, 191, 0.12)',
                minHeight: '260px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 24 }}>
                    school
                  </span>
                  <span className="text-[10px] text-sand/40 uppercase tracking-widest font-light">
                    01
                  </span>
                </div>
                <h3 className="text-sand font-normal text-lg mb-2">
                  {t('contact.departments.dept1Title')}
                </h3>
                <p className="text-sand/65 text-sm font-light leading-relaxed mb-6">
                  {t('contact.departments.dept1Body')}
                </p>
              </div>
              <a
                className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-light hover:underline pt-4"
                style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>
            </motion.div>

            {/* Administration */}
            <motion.div
              variants={itemVariants}
              className="p-8 flex flex-col justify-between group transition-all duration-500"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(209, 204, 191, 0.12)',
                minHeight: '260px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 24 }}>
                    admin_panel_settings
                  </span>
                  <span className="text-[10px] text-sand/40 uppercase tracking-widest font-light">
                    02
                  </span>
                </div>
                <h3 className="text-sand font-normal text-lg mb-2">
                  {t('contact.departments.dept2Title')}
                </h3>
                <p className="text-sand/65 text-sm font-light leading-relaxed mb-6">
                  {t('contact.departments.dept2Body')}
                </p>
              </div>
              <a
                className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-light hover:underline pt-4"
                style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                href="mailto:admin@jjhss.edu"
              >
                admin@jjhss.edu
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>
            </motion.div>

            {/* Careers */}
            <motion.div
              variants={itemVariants}
              className="p-8 flex flex-col justify-between group transition-all duration-500"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(209, 204, 191, 0.12)',
                minHeight: '260px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 24 }}>
                    work
                  </span>
                  <span className="text-[10px] text-sand/40 uppercase tracking-widest font-light">
                    03
                  </span>
                </div>
                <h3 className="text-sand font-normal text-lg mb-2">
                  {t('contact.departments.dept3Title')}
                </h3>
                <p className="text-sand/65 text-sm font-light leading-relaxed mb-6">
                  {t('contact.departments.dept3Body')}
                </p>
              </div>
              <a
                className="inline-flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-light hover:underline pt-4"
                style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                href="mailto:hr@jjhss.edu"
              >
                hr@jjhss.edu
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
