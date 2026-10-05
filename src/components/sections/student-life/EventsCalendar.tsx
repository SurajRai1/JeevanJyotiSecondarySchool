'use client';

/**
 * @file EventsCalendar.tsx
 * @description Elementis-style campus events and calendar section,
 * featuring an architectural mini calendar and sleek event cards.
 */

import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function EventsCalendar() {
  const { t, tArr } = useT();

  const events = [
    {
      id: 1,
      day: '10',
      month: 'OCT',
      time: '6:00 PM – 9:00 PM',
      category: 'Arts & Culture',
      title: 'Autumn Arts Showcase',
      description:
        'Annual exhibition of student artwork in the Main Gallery, featuring live music from the Jazz Ensemble.',
    },
    {
      id: 2,
      day: '15',
      month: 'OCT',
      time: '2:00 PM – 5:00 PM',
      category: 'Athletics',
      title: 'Varsity Football Regional Finals',
      description:
        'Come support the Lions as they face off against regional contenders in the championship game.',
    },
    {
      id: 3,
      day: '22',
      month: 'OCT',
      time: '3:30 PM – 5:00 PM',
      category: 'Academics',
      title: 'Debate Club Prep Session',
      description:
        'Open preparation session for all students interested in joining the winter National Championship team.',
    },
  ];

  const tEvents = tArr<{ category: string; title: string; description: string }>(
    'studentLife.events.items'
  );

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-8 md:w-12 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                Campus Agenda
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('studentLife.events.headline')}
            </h2>
          </div>

          <a
            href="#calendar"
            className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100"
            style={{
              color: 'var(--color-sand)',
              border: '1px solid rgba(209,204,191,0.3)',
              padding: '0.75rem 1.5rem',
              fontSize: '0.85rem',
              opacity: 0.85,
            }}
          >
            <span>{t('studentLife.events.viewCalendar')}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </a>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-4 p-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(209, 204, 191, 0.12)',
            }}
          >
            <div
              className="flex justify-between items-center mb-6 pb-4"
              style={{ borderBottom: '1px solid rgba(209, 204, 191, 0.1)' }}
            >
              <h3 className="text-sand text-base font-medium">October 2025</h3>
              <div className="flex gap-2 text-sand/50">
                <button aria-label="Previous month" className="hover:text-sand transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    chevron_left
                  </span>
                </button>
                <button aria-label="Next month" className="hover:text-sand transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-3 text-[10px] text-sand/40 uppercase tracking-widest font-light">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-light text-sand/80">
              <div className="p-2 text-sand/20">29</div>
              <div className="p-2 text-sand/20">30</div>
              <div className="p-2 hover:bg-white/5 transition-colors">1</div>
              <div className="p-2 hover:bg-white/5 transition-colors">2</div>
              <div className="p-2 hover:bg-white/5 transition-colors">3</div>
              <div className="p-2 hover:bg-white/5 transition-colors">4</div>
              <div className="p-2 hover:bg-white/5 transition-colors">5</div>
              <div className="p-2 hover:bg-white/5 transition-colors">6</div>
              <div className="p-2 hover:bg-white/5 transition-colors">7</div>
              <div className="p-2 hover:bg-white/5 transition-colors">8</div>
              <div className="p-2 hover:bg-white/5 transition-colors">9</div>
              <div
                className="p-2 font-medium"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
              >
                10
              </div>
              <div className="p-2 hover:bg-white/5 transition-colors">11</div>
              <div className="p-2 hover:bg-white/5 transition-colors">12</div>
              <div className="p-2 hover:bg-white/5 transition-colors">13</div>
              <div className="p-2 hover:bg-white/5 transition-colors">14</div>
              <div
                className="p-2 font-medium"
                style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-bg)' }}
              >
                15
              </div>
              <div className="p-2 hover:bg-white/5 transition-colors">16</div>
              <div className="p-2 hover:bg-white/5 transition-colors">17</div>
              <div className="p-2 hover:bg-white/5 transition-colors">18</div>
              <div className="p-2 hover:bg-white/5 transition-colors">19</div>
              <div className="p-2 hover:bg-white/5 transition-colors">20</div>
              <div className="p-2 hover:bg-white/5 transition-colors">21</div>
              <div
                className="p-2 font-medium"
                style={{ backgroundColor: 'rgba(254, 166, 25, 0.3)', color: 'var(--color-accent)' }}
              >
                22
              </div>
              <div className="p-2 hover:bg-white/5 transition-colors">23</div>
              <div className="p-2 hover:bg-white/5 transition-colors">24</div>
              <div className="p-2 hover:bg-white/5 transition-colors">25</div>
              <div className="p-2 hover:bg-white/5 transition-colors">26</div>
              <div className="p-2 hover:bg-white/5 transition-colors">27</div>
              <div className="p-2 hover:bg-white/5 transition-colors">28</div>
              <div className="p-2 hover:bg-white/5 transition-colors">29</div>
              <div className="p-2 hover:bg-white/5 transition-colors">30</div>
              <div className="p-2 hover:bg-white/5 transition-colors">31</div>
            </div>
          </motion.div>

          {/* Event List */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
                className="p-7 flex flex-col sm:flex-row gap-6 items-start sm:items-center group transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(209, 204, 191, 0.12)',
                }}
              >
                {/* Accent top hover line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />

                {/* Date indicator block */}
                <div
                  className="flex flex-col items-center justify-center shrink-0 w-16 h-16"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(209, 204, 191, 0.1)',
                  }}
                >
                  <span className="text-xl font-light text-accent leading-none">
                    {event.day}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-sand/60 mt-1">
                    {event.month}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] text-accent uppercase tracking-widest font-light">
                      {tEvents[index]?.category || event.category}
                    </span>
                    <span className="text-sand/30 text-xs">·</span>
                    <span className="text-sand/50 text-xs font-light">{event.time}</span>
                  </div>
                  <h4 className="text-sand text-lg font-normal mb-1">
                    {tEvents[index]?.title || event.title}
                  </h4>
                  <p className="text-sand/65 text-sm font-light leading-relaxed">
                    {tEvents[index]?.description || event.description}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className="shrink-0 text-sand/40 group-hover:text-sand group-hover:translate-x-1 transition-all">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
