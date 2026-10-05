/**
 * @file constants.ts
 * @description All static site data for Jeevan Jyoti Digital Campus.
 *
 * HOW TO EDIT CONTENT:
 *  - Nav links, stats, news items, etc. are all defined here.
 *  - Update values here and the UI updates automatically — no JSX hunting needed.
 */

import type {
  NavLink,
  Stat,
  NewsItem,
  Testimonial,
  UpcomingEvent,
  AdmissionStep,
  Department,
  Activity,
  Club,
  ContactDetail,
  OfficeHour,
  ResourceCategory,
  Resource,
} from './types';

// ---------------------------------------------------------------------------
// SITE META
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Jeevan Jyoti',
  fullName: 'Jeevan Jyoti Higher Secondary School',
  tagline: 'Illuminating the Path to Excellence.',
  description:
    'At Jeevan Jyoti Higher Secondary School, we blend rigorous academics with a nurturing environment to cultivate the leaders of tomorrow.',
  email: 'jes.sunsari@gmail.com',
  phone: '+977 981-9383850',
  address: 'Barahakshetra-8, Bagjhora, Sunsari',
  mapUrl: 'https://maps.app.goo.gl/mENnSrc4iaVETjL5A',
  founded: '1985',
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  },
} as const;

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Student Life', href: '/student-life' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

// ---------------------------------------------------------------------------
// HOME PAGE
// ---------------------------------------------------------------------------

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'entrance-exam',
    title: 'Entrance Exam',
    date: 'August 15, 2025',
    icon: 'calendar_month',
    iconBg: 'bg-primary-container',
  },
  {
    id: 'scholarship-drive',
    title: 'Scholarship Drive',
    date: 'Apply by July 30, 2025',
    icon: 'school',
    iconBg: 'bg-secondary-container',
  },
  {
    id: 'open-house',
    title: 'Campus Open House',
    date: 'September 5, 2025',
    icon: 'home_work',
    iconBg: 'bg-surface-container-high',
  },
];

export const STATS: Stat[] = [
  { value: '3,200+', label: 'Students Enrolled', icon: 'groups' },
  { value: '98%', label: 'Board Pass Rate', icon: 'workspace_premium' },
  { value: '180+', label: 'Faculty Members', icon: 'psychology' },
  { value: '40 yrs', label: 'Years of Excellence', icon: 'history_edu' },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    tag: 'ACHIEVEMENT',
    title: 'Students Shine at National Debate Championship',
    excerpt:
      'Our students brought home 3 gold and 2 silver medals in the 2025 National Debate Championship, continuing our tradition of academic excellence.',
    date: 'July 28, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
    imageAlt: 'Students holding medals at the National Debate Championship',
  },
  {
    id: 'news-2',
    tag: 'ADMISSIONS',
    title: 'Admissions Open for Academic Year 2025-26',
    excerpt:
      'Applications are now being accepted for Grade 11 in Management, Education, and Humanities streams. Early bird scholarships available.',
    date: 'July 15, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
    imageAlt: 'Students walking through the campus on admissions day',
  },
  {
    id: 'news-3',
    tag: 'EVENTS',
    title: 'Annual Cultural Festival "Utsav 2025" Announced',
    excerpt:
      'Get ready for three days of performances, exhibitions, and competitions celebrating the diverse talents of our student community.',
    date: 'June 20, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
    imageAlt: 'Students performing at the annual cultural festival',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote:
      'Jeevan Jyoti didn\'t just prepare me for university — it prepared me for life. The teachers here genuinely care about your growth, and it shows in every result.',
    name: 'Priya Sharma',
    role: 'Alumni — Engineering, TU',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80&fit=crop&crop=face',
  },
  {
    id: 't-2',
    quote:
      'The holistic curriculum here exposed me to arts, commerce, and leadership — all of which I use daily in my career. I owe my success to this school.',
    name: 'Rahul Joshi',
    role: 'Alumni — Management, PU',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80&fit=crop&crop=face',
  },
  {
    id: 't-3',
    quote:
      'As a parent, I couldn\'t be more satisfied. My daughter blossomed here — both academically and personally. The faculty truly goes above and beyond.',
    name: 'Sunita Karmacharya',
    role: 'Parent of a Current Student',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80&fit=crop&crop=face',
  },
];

// ---------------------------------------------------------------------------
// ADMISSIONS PAGE
// ---------------------------------------------------------------------------

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    step: 1,
    title: 'Download & Fill Form',
    description:
      'Download the admission form from the portal or collect it in person. Fill in all required details accurately.',
    icon: 'download',
  },
  {
    step: 2,
    title: 'Submit Documents',
    description:
      'Submit your completed form along with SLC/SEE mark sheets, character certificate, and citizenship copy.',
    icon: 'upload_file',
  },
  {
    step: 3,
    title: 'Entrance Examination',
    description:
      'Appear for the entrance exam (for Management stream). Education and Humanities streams are merit-based.',
    icon: 'edit_note',
  },
  {
    step: 4,
    title: 'Result & Enrollment',
    description:
      'Results are published within 3 working days. Selected candidates must complete enrollment within 7 days.',
    icon: 'celebration',
  },
];

// ---------------------------------------------------------------------------
// ACADEMICS PAGE
// ---------------------------------------------------------------------------

export const DEPARTMENTS: Department[] = [
  {
    id: 'management',
    name: 'Management',
    description:
      'Equipping future leaders with core economic, accounting, and organizational skills.',
    icon: 'account_balance',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Compulsory English', 'Compulsory Nepali', 'Social Studies', 'Computer Science'],
    color: 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] border-[var(--color-accent)]/20',
  },
  {
    id: 'education',
    name: 'Education',
    description:
      'Fostering future educators through Child Development, Pedagogy, and Educational methods.',
    icon: 'school',
    subjects: ['Education & Development', 'Child Development', 'Pedagogy', 'Major English', 'Major Nepali', 'Compulsory English', 'Compulsory Nepali'],
    color: 'bg-white/5 text-[var(--color-sand-dim)] border-white/10',
  },
  {
    id: 'humanities',
    name: 'Humanities',
    description:
      'Fostering critical thinking through Social Studies, Languages, and Literature.',
    icon: 'auto_stories',
    subjects: ['Social Studies', 'Major English', 'Major Nepali', 'Compulsory English', 'Compulsory Nepali', 'Computer Science'],
    color: 'bg-white/5 text-[var(--color-sand)] border-white/10',
  },
];

// ---------------------------------------------------------------------------
// STUDENT LIFE PAGE
// ---------------------------------------------------------------------------

export const ACTIVITIES: Activity[] = [
  {
    id: 'a-1',
    title: 'Computer Lab',
    description: 'Hands-on programming in our state-of-the-art computer laboratories.',
    category: 'Academics',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
    imageAlt: 'Students working in the computer lab',
    span: 'tall',
  },
  {
    id: 'a-2',
    title: 'Sports Day',
    description: 'Annual inter-house sports competition.',
    category: 'Sports',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
    imageAlt: 'Students participating in sports day events',
    span: 'wide',
  },
  {
    id: 'a-3',
    title: 'Cultural Programs',
    description: 'Showcasing diverse talents and traditions.',
    category: 'Culture',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
    imageAlt: 'Students in cultural program',
    span: 'normal',
  },
  {
    id: 'a-4',
    title: 'Library & Study',
    description: 'Our library has 20,000+ books and digital resources.',
    category: 'Academics',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
    imageAlt: 'Students studying in library',
    span: 'normal',
  },
];

export const CLUBS: Club[] = [
  { id: 'c-1', name: 'IT Club', icon: 'computer', members: 120, description: 'Code, explore, innovate.' },
  { id: 'c-2', name: 'Debate Society', icon: 'forum', members: 85, description: 'Sharpen your oratory skills.' },
  { id: 'c-3', name: 'Photography Club', icon: 'photo_camera', members: 60, description: 'Capture moments that matter.' },
  { id: 'c-4', name: 'Music & Arts', icon: 'music_note', members: 95, description: 'Express through creativity.' },
  { id: 'c-5', name: 'Eco Warriors', icon: 'eco', members: 75, description: 'Building a sustainable future.' },
  { id: 'c-6', name: 'Tech & Robotics', icon: 'memory', members: 50, description: 'Code, build, innovate.' },
];

// ---------------------------------------------------------------------------
// CONTACT PAGE
// ---------------------------------------------------------------------------

export const CONTACT_DETAILS: ContactDetail[] = [
  { icon: 'location_on', label: 'Address', value: 'Barahakshetra-8, Bagjhora, Sunsari' },
  { icon: 'call', label: 'Phone', value: '+977 981-9383850' },
  { icon: 'mail', label: 'Email', value: 'jes.sunsari@gmail.com' },
  { icon: 'language', label: 'Website', value: 'www.jjhss.edu.np' },
];

export const OFFICE_HOURS: OfficeHour[] = [
  { days: 'Sunday – Friday', hours: '9:00 AM – 4:00 PM' },
  { days: 'Saturday', hours: '10:00 AM – 2:00 PM (Admissions Only)' },
  { days: 'Public Holidays', hours: 'Closed' },
];

// ---------------------------------------------------------------------------
// RESOURCES PAGE
// ---------------------------------------------------------------------------

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: 'all', label: 'All Resources', icon: 'grid_view' },
  { id: 'syllabus', label: 'Syllabi', icon: 'menu_book' },
  { id: 'notes', label: 'Study Notes', icon: 'description' },
  { id: 'past-papers', label: 'Past Papers', icon: 'history_edu' },
  { id: 'forms', label: 'Forms', icon: 'assignment' },
  { id: 'notices', label: 'Notices', icon: 'campaign' },
];

export const RESOURCES: Resource[] = [
  {
    id: 'r-1',
    title: 'Grade 11 Accountancy Syllabus 2025',
    description: 'Full NEB syllabus for Accountancy — Grade 11, including practical hours.',
    category: 'syllabus',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '#',
    icon: 'picture_as_pdf',
  },
  {
    id: 'r-2',
    title: 'Grade 12 Economics Notes',
    description: 'Comprehensive chapter-wise notes compiled by our faculty.',
    category: 'notes',
    fileType: 'PDF',
    fileSize: '4.5 MB',
    downloadUrl: '#',
    icon: 'picture_as_pdf',
  },
  {
    id: 'r-3',
    title: 'NEB Past Papers — Management 2024',
    description: 'Official NEB Board Exam question papers — 2024 batch.',
    category: 'past-papers',
    fileType: 'ZIP',
    fileSize: '8.1 MB',
    downloadUrl: '#',
    icon: 'folder_zip',
  },
  {
    id: 'r-4',
    title: 'Admission Form 2025-26',
    description: 'Downloadable admission form for the upcoming academic year.',
    category: 'forms',
    fileType: 'PDF',
    fileSize: '0.5 MB',
    downloadUrl: '#',
    icon: 'picture_as_pdf',
  },
  {
    id: 'r-5',
    title: 'Scholarship Application Form',
    description: 'Apply for merit-based and need-based scholarships.',
    category: 'forms',
    fileType: 'PDF',
    fileSize: '0.3 MB',
    downloadUrl: '#',
    icon: 'picture_as_pdf',
  },
  {
    id: 'r-6',
    title: 'Examination Schedule — Term I 2025',
    description: 'Internal exam timetable for Term I, AY 2025-26.',
    category: 'notices',
    fileType: 'PDF',
    fileSize: '0.2 MB',
    downloadUrl: '#',
    icon: 'picture_as_pdf',
  },
];
