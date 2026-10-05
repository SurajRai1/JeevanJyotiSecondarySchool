'use client';

/**
 * @file ActivitiesGrid.tsx
 * @description Elementis-style bento grid for co-curricular activities,
 * featuring smooth cinematic image hover states and crisp typography.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ActivitiesGrid() {
  const { t, tArr } = useT();

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

  const activities = [
    {
      id: 'sports',
      icon: 'sports_basketball',
      category: 'Athletics',
      title: 'Varsity Sports',
      description: 'Competing at the highest regional and national levels in basketball, soccer, and athletics.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8wxFH3wwZ_BH-qOM8jRwmqw5X_7dVCwTcPzDr7sLs5NSKWZk5kJgCuUhOfvvm2XhLtwRUhAYb9g8ItOXlZ-rkWR0GCxFlkGQDY-chpY1RHOYUdTfti1xaCqEc194TA96tsPkvPshHm3oSavp9gKn7uPJfVtO9spTIQj1uxQmvivLGafZhKUA7EEWnOdpVQmE2vkTFxQvpCi9VQh7avDUWKbSdko9k7UkNQd6Jn13iu5a3ymDVYt41tw',
      className: 'md:col-span-2 lg:col-span-2 min-h-[380px]',
    },
    {
      id: 'arts',
      icon: 'palette',
      category: 'Fine Arts',
      title: 'Studio Arts',
      description: 'Traditional painting, sculpture, pottery, and contemporary digital media.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAKhnJDC-gUkMlqAi3NRggWyrnvYIk1NxYuLSR5pGXRxQ6jO7ReIfSMxFapu4KTgqHv-c_M8o0iYyixVqpepnCKw9pzQB3BkJhPwgdELQtrkdZwbgTcSjfjDm37ezvjoLhgKG2gB01I0ex1H_ktv_Ta_-MFKK4mv95OUIwW0xp32F_Gtd8hq3UjApDSgI56aHUQnbIdkvGb98fyGHpAMweWHeClFvsACmJhUCTP4Kg9RfTCveKKlNpnA',
      className: 'md:col-span-1 lg:col-span-1 min-h-[380px]',
    },
    {
      id: 'music',
      icon: 'music_note',
      category: 'Music Program',
      title: 'Symphony Ensemble',
      description: 'Award-winning classical and folk ensembles, choirs, and instrument mentorship.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjW5X2RUDdTwCWyIRGky7qrRuPk0o-rwXi3Bmt7DgKvLO6S20o_Jkx8gpRP_TD857iJY_FtPN6b8WHgHniNN7K8dfTaBTHbegmTzFZ9FB15uG1Nsj0QU4xYqYJKUIRUeL7M5o5miTc_nnzQELII0bNsXz1HNoMP1ghUAKDP9eP2a8-OLCH1n-aiIcdMjc2eS0SzzxQzi3kCLuk7o9P_YkQdW8fvkbxFBLO0EmOn9YHUVMZLnDgsK-osQ',
      className: 'md:col-span-1 lg:col-span-1 min-h-[380px]',
    },
    {
      id: 'tech',
      icon: 'memory',
      category: 'STEM Clubs',
      title: 'Robotics Team',
      description: 'Building the future with embedded electronics, competitive robotics, and algorithms.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI6kEsTHbU_YYZXwxb4eq9qf01rB5ug90Vy6BvKs2qu65YlWhP7oD7uosvnM6bV-VpXHWxIhBvPpIafpEPh_ciObxm--uGtyAooThtagtrjIqn8RCn-OksdmHntBFkxEr8gCWq_3ntYZGoXG8pOAWPWdCxaVkPO9Pcaobxjgy09TkuUVLQav92P4FvbIzRhisCGGVVYxU55cttyBQzwFcHAWPeomg2qEkJHfqrRjqH47zIJPJTNonwzg',
      className: 'md:col-span-2 lg:col-span-2 min-h-[380px]',
    },
  ];

  const tActivities = tArr<{ category: string; title: string; description: string }>(
    'studentLife.activities.items'
  );

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      id="activities"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-8 md:w-12 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                Extracurricular Life
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight max-w-2xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('studentLife.activities.headline')}
            </h2>
          </div>
          <p
            className="text-sand/70 font-light leading-relaxed max-w-md"
            style={{ fontSize: 'clamp(0.875rem, 1vw, 1.05rem)' }}
          >
            {t('studentLife.activities.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {activities.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative overflow-hidden group ${item.className}`}
              style={{
                border: '1px solid rgba(209, 204, 191, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <Image
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,15,30,0.15) 0%, rgba(10,15,30,0.6) 60%, rgba(10,15,30,0.95) 100%)',
                }}
              />

              {/* Accent top line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined text-accent"
                    style={{ fontSize: 18 }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-light">
                    {tActivities[idx]?.category || item.category}
                  </span>
                </div>

                <h3
                  className="text-sand font-light leading-tight mb-2"
                  style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)' }}
                >
                  {tActivities[idx]?.title || item.title}
                </h3>

                <p
                  className="text-sand/70 text-sm font-light leading-relaxed max-w-lg transition-opacity duration-300"
                >
                  {tActivities[idx]?.description || item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
