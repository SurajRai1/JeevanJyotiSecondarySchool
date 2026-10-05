'use client';

/**
 * @file ResourceList.tsx
 * @description Elementis-style resource repository list with clean tabular hierarchy,
 * hairline borders, and polished hover states.
 */

import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ResourceList() {
  const { t, tArr } = useT();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const resources = [
    { id: 1, title: 'Class 11 Accountancy Syllabus 2025-26', type: 'PDF', size: '2.4 MB', author: 'Dr. M. Sharma', date: 'Oct 5, 2025' },
    { id: 2, title: 'Economics Practice Worksheets (Ch 1–3)', type: 'PDF', size: '1.8 MB', author: 'R. Verma', date: 'Oct 3, 2025' },
    { id: 3, title: 'Social Studies: Comprehensive Exam Guide', type: 'DOCX', size: '3.1 MB', author: 'A. Desai', date: 'Sep 28, 2025' },
    { id: 4, title: 'Child Development & Pedagogy Manual', type: 'PDF', size: '4.5 MB', author: 'Dr. M. Sharma', date: 'Sep 25, 2025' },
    { id: 5, title: 'Major English Reading List & Critical Essays', type: 'PDF', size: '1.2 MB', author: 'S. Raj', date: 'Sep 20, 2025' },
  ];

  const tResources = tArr<{ title: string }>('resources.list.items');

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-8 md:w-12 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                Downloads
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('resources.list.headline')}
            </h2>
            <p className="text-sand/70 font-light text-sm max-w-lg">
              {t('resources.list.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="flex gap-3"
          >
            <button
              className="flex items-center gap-2 px-5 py-2.5 text-sand text-xs tracking-wider uppercase font-light transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(209, 204, 191, 0.2)' }}
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              {t('resources.list.filter')}
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 text-sand text-xs tracking-wider uppercase font-light transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(209, 204, 191, 0.2)' }}
            >
              <span className="material-symbols-outlined text-[16px]">sort</span>
              {t('resources.list.sort')}
            </button>
          </motion.div>
        </div>

        {/* Resources Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            border: '1px solid rgba(209, 204, 191, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          {/* Table Header (Desktop) */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 p-5 text-sand/40 text-[10px] uppercase tracking-widest font-light"
            style={{ borderBottom: '1px solid rgba(209, 204, 191, 0.12)' }}
          >
            <div className="col-span-5">{t('resources.list.headerFileName')}</div>
            <div className="col-span-2">{t('resources.list.headerTypeSize')}</div>
            <div className="col-span-2">{t('resources.list.headerUploadedBy')}</div>
            <div className="col-span-2">{t('resources.list.headerDate')}</div>
            <div className="col-span-1 text-right">{t('resources.list.headerAction')}</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center group transition-colors hover:bg-white/5 cursor-pointer"
              >
                <div className="md:col-span-5 flex items-center gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{
                      border: '1px solid rgba(209, 204, 191, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <span className="material-symbols-outlined text-accent text-[18px]">
                      {resource.type === 'PDF' ? 'picture_as_pdf' : 'description'}
                    </span>
                  </div>
                  <span className="text-sand text-sm font-normal group-hover:text-accent transition-colors line-clamp-1">
                    {tResources[index]?.title || resource.title}
                  </span>
                </div>

                <div className="md:col-span-2 text-xs text-sand/70 font-light">
                  <span className="md:hidden font-medium text-sand mr-2">Format:</span>
                  <span>{resource.type}</span>
                  <span className="text-sand/40 text-xs ml-2">({resource.size})</span>
                </div>

                <div className="md:col-span-2 text-xs text-sand/70 font-light">
                  <span className="md:hidden font-medium text-sand mr-2">Author:</span>
                  <span>{resource.author}</span>
                </div>

                <div className="md:col-span-2 text-xs text-sand/50 font-light">
                  <span className="md:hidden font-medium text-sand mr-2">Date:</span>
                  <span>{resource.date}</span>
                </div>

                <div className="md:col-span-1 text-right">
                  <button
                    aria-label="Download document"
                    className="text-sand/40 group-hover:text-accent transition-colors p-1"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                      download
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100"
            style={{
              color: 'var(--color-sand)',
              border: '1px solid rgba(209, 204, 191, 0.3)',
              padding: '0.85rem 2rem',
              fontSize: '0.85rem',
              opacity: 0.85,
            }}
          >
            <span>{t('resources.list.loadMore')}</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
