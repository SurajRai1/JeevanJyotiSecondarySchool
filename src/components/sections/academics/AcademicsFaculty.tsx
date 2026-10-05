'use client';

/**
 * @file AcademicsFaculty.tsx
 * @description Elementis-style faculty spotlight with bento photography cards,
 * editorial quote box, and crisp credentials typography.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function AcademicsFaculty() {
  const { t } = useT();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-8 md:w-12 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                {t('academics.faculty.overline')}
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('academics.faculty.headline')}
            </h2>
            <p className="text-sand/70 font-light text-sm mt-3 leading-relaxed">
              {t('academics.faculty.subtitle')}
            </p>
          </div>

          <button
            className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100 shrink-0"
            style={{
              color: 'var(--color-sand)',
              border: '1px solid rgba(209, 204, 191, 0.3)',
              padding: '0.75rem 1.5rem',
              fontSize: '0.85rem',
              opacity: 0.85,
            }}
          >
            <span>{t('academics.faculty.viewAll')}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Faculty 1 (Large - Spans 2 cols) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-2 md:row-span-2 relative group overflow-hidden min-h-[380px] md:min-h-0"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <Image
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOL0D9DWhALqg4S6V3Z9FLL-ruTfJdwbSxzwEqYaFuMC80UpZxDDzTnFa5-EmJ3V5euJuuLVomd_2pAdDIhdF3i76GwyKOSB0C56AS-Tho2x6V7jQwUXL1m8nuWHVKVbKT14ZGIWm30AurUMuVnWRNAYf4BqsLFOe-p40Kys2IWOFAdDS9KsZl70Z-LjpbCJKtIC5NyQeFFlbZpBk7KHi10D6rgl6NLROoLZALSsw6cZ4NikCeOaeJgQ"
              alt="Distinguished senior female educator"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,30,0.15) 0%, rgba(10,15,30,0.6) 50%, rgba(10,15,30,0.95) 100%)',
              }}
            />

            {/* Accent top line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <span className="text-accent text-[10px] uppercase tracking-widest font-light mb-2 block">
                {t('academics.faculty.member1Dept')}
              </span>
              <h3
                className="text-sand font-light leading-snug mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}
              >
                {t('academics.faculty.member1Name')}
              </h3>
              <p className="text-sand/70 text-sm font-light mb-6 max-w-md leading-relaxed">
                {t('academics.faculty.member1Quote')}
              </p>
              <div
                className="flex gap-6 text-sand/60 text-xs font-light pt-4"
                style={{ borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 16 }}>
                    school
                  </span>
                  {t('academics.faculty.member1Qual')}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 16 }}>
                    history
                  </span>
                  {t('academics.faculty.member1Exp')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Faculty 2 */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1 relative group overflow-hidden min-h-[250px]"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <Image
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLEho7wNMXKUH8Xsc7D85F5qxe8xntG0YA0IJAFXrB9ButMvJHtQoa22etBKZY-igtmpUAmm9Dr1QMvgot-r4ZFNyIvHVhmeeo0qR11MJmZ0MToKyV8Vx_DU741k6buS0rGICFGTA-aQ2NdmWGH3Xs1i5fkw1t5uPiKHBJvcLgOORCtLzU0Y84zUme93fwqo76w_dfe_IsORdAjvb_hso3Hzd-yKcFG9Rs_iINKmCsKJQKbnBF27q5cQ"
              alt="Mathematics teacher"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.85) 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 p-6 w-full z-10">
              <h3 className="text-sand font-medium text-base mb-0.5">
                {t('academics.faculty.member2Name')}
              </h3>
              <p className="text-xs text-accent font-light">
                {t('academics.faculty.member2Dept')}
              </p>
            </div>
          </motion.div>

          {/* Quote Box */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1 p-8 flex flex-col justify-center min-h-[220px]"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <span
              className="material-symbols-outlined text-accent mb-4 block"
              style={{ fontSize: 32 }}
            >
              format_quote
            </span>
            <p
              className="text-sand/85 italic font-light leading-relaxed text-sm"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('academics.faculty.quoteText')}
            </p>
          </motion.div>

          {/* Faculty 3 */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1 relative group overflow-hidden min-h-[250px]"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <Image
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm0BVXE8zcbbfS5SnV3IUqPgNR5pxCNMFylx37UvlFyCppMYlCJ-RMF_Gc5PITQpLVyqQkqXYtw7rfCQI-R3YnM-R4UxUClFjIM17JdkGRHgEPUBFkJEE0BhJt5uepeKlK6_lEcrfAqXG2hPJgWxUA0POV5P1j5Cf0y0zHGq9tel8WI1KDKwHFI8gw5h3KR3MK8xfalBmtlQfoC3cfBtt1aKItX6vEmaMDAquBVl_9p4VyjwDhXc9LmA"
              alt="Creative Arts teacher"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.85) 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 p-6 w-full z-10">
              <h3 className="text-sand font-medium text-base mb-0.5">
                {t('academics.faculty.member3Name')}
              </h3>
              <p className="text-xs text-accent font-light">
                {t('academics.faculty.member3Dept')}
              </p>
            </div>
          </motion.div>

          {/* Faculty 4 */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1 relative group overflow-hidden min-h-[250px]"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <Image
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQe8sNG6woH880W8hjhY8YVgzMnG1VT7f-jBoXPiA-cLzxXlHhbsltReCvbVmJyCO2SyZK63OPOPhcIrrigTUAMgq0RcHgPQ-6PrjxX-gmzzUvUlQ5ctRJAAqpkJcIf5FuVpgQs7tVigayEfhPV368Pp2xQjWav2oE-f_WSArumw-AhT8ONGByR2QAPi-ZgJ-1ziqvqANFRWH7NFMnVf_1-VrrpxD2JAlsvXKP_TL2MHTE4MejW9OVg"
              alt="Literature Professor"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.85) 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 p-6 w-full z-10">
              <h3 className="text-sand font-medium text-base mb-0.5">
                {t('academics.faculty.member4Name')}
              </h3>
              <p className="text-xs text-accent font-light">
                {t('academics.faculty.member4Dept')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
