/**
 * @file translations.ts
 * @description Complete EN + NE translation dictionary for Jeevan Jyoti Digital Campus.
 *
 * HOW TO ADD A NEW LANGUAGE:
 *   1. Add a new key to the `translations` object (e.g., `hi: { ... }`)
 *   2. Copy the `en` block and translate all values.
 *   3. Add the language code to the `Language` union type.
 *   4. Add the language option to the Navbar switcher.
 *
 * HOW TO ADD A NEW STRING:
 *   1. Add the key + English value to `en`.
 *   2. Add the translated value to every other language block.
 *   3. Use `t('your.new.key')` in the component.
 */

export type Language = 'en' | 'ne';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  ne: 'नेपाली',
};

// ---------------------------------------------------------------------------
// Full Translation Dictionary
// ---------------------------------------------------------------------------

const en = {
  // ─── Shared / Global ───────────────────────────────────────────────────
  site: {
    name: 'Jeevan Jyoti',
    fullName: 'Jeevan Jyoti Higher Secondary School',
    tagline: 'Illuminating the Path to Excellence.',
    description:
      'At Jeevan Jyoti Higher Secondary School, we blend rigorous academics with a nurturing environment to cultivate the leaders of tomorrow.',
  },

  // ─── Navigation ────────────────────────────────────────────────────────
  nav: {
    academics: 'Academics',
    admissions: 'Admissions',
    studentLife: 'Student Life',
    resources: 'Resources',
    contact: 'Contact',
    visitSchool: 'Visit School',
    contactUs: 'Contact Us',
    language: 'Language',
    changeLanguage: 'Change language',
    portalLogin: 'Portal Login',
  },

  // ─── Footer ────────────────────────────────────────────────────────────
  footer: {
    tagline: 'Illuminating minds, building futures across generations.',
    quickLinks: 'Quick Links',
    contactInfo: 'Get In Touch',
    newsletter: 'Stay Updated',
    newsletterDesc: 'Subscribe for the latest news, events, and announcements from the campus.',
    newsletterPlaceholder: 'Your email address',
    newsletterSubscribe: 'Subscribe',
    newsletterSuccess: "You're subscribed — thank you!",
    copyright: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    admissions: 'Admissions',
    address: 'Barahakshetra-8, Bagjhora, Sunsari',
    email: 'jes.sunsari@gmail.com',
    phone: '+977 981-9383850',
    founded: 'Est. 1985',
  },

  // ─── Home Page ─────────────────────────────────────────────────────────
  home: {
    hero: {
      slide1: {
        label: "Shaping Nepal's Future Leaders",
        line1: 'Illuminating',
        line2: 'Minds,',
        line3: 'Building',
        line4: 'Futures.',
        cta: 'Explore Programs',
      },
      slide2: {
        label: 'A Legacy of Academic Excellence',
        line1: 'Where',
        line2: 'Curiosity',
        line3: 'Meets',
        line4: 'Excellence.',
        cta: 'Our Academics',
      },
      slide3: {
        label: 'Your Bright Future Starts Here',
        line1: 'Your',
        line2: 'Journey',
        line3: 'Starts',
        line4: 'Here.',
        cta: 'Apply Now',
      },
      dragHint: 'Scroll to Explore',
    },
    features: {
      overline: 'WHY CHOOSE US',
      headline: 'An Education Built on Excellence',
      items: [
        {
          label: 'ACADEMIC RIGOR',
          title: 'World-Class Curriculum',
          body: 'Our NEB-aligned curriculum is crafted by leading educators to challenge and inspire every student, fostering deep understanding over rote memorization.',
        },
        {
          label: 'HOLISTIC GROWTH',
          title: 'Beyond the Textbook',
          body: 'From athletics to arts, our robust extracurricular programs develop the whole person — building character, resilience, and social intelligence.',
        },
        {
          label: 'EXPERT FACULTY',
          title: 'Mentors, Not Just Teachers',
          body: 'Our faculty are accomplished professionals and passionate mentors who invest in each student\'s individual journey and academic success.',
        },
        {
          label: 'MODERN FACILITIES',
          title: 'State-of-the-Art Campus',
          body: 'Computer labs, digital libraries, performance spaces, and sports facilities — our campus is built to support every dimension of student life.',
        },
      ],
    },
    programs: {
      overline: 'OUR PROGRAMS',
      headline: 'Choose Your Path',
      dragHint: 'Drag to Explore',
      learnMore: 'Learn More',
      items: [
        { label: 'Business & Commerce', title: 'Where innovation\nmeets strategy.', desc: 'Our Business & Commerce programme equips students with hands-on entrepreneurial experience, financial thinking, and the analytical skills to thrive in a rapidly evolving world.', cta: 'Explore Business' },
        { label: 'Arts & Humanities', title: 'Creativity that\nshapes the world.', desc: 'From literature and philosophy to fine arts and music, our Humanities programme nurtures empathy, critical thought, and the ability to communicate with power and clarity.', cta: 'Explore Humanities' },
        { label: 'Sports & Wellbeing', title: 'A strong body,\na stronger mind.', desc: 'World-class facilities for football, basketball, swimming, and athletics. We believe physical excellence and mental resilience are the foundation of a complete education.', cta: 'Explore Student Life' },
        { label: 'Leadership & Community', title: 'Leaders who\nserve and inspire.', desc: 'Through student councils, social initiatives, and mentorship programmes, we develop confident young leaders who understand their responsibility to the wider community.', cta: 'See Community' },
      ],
    },
    streams: {
      items: [
        { title: 'Management Stream', desc: 'Accounting, Economics, and Business Studies preparing the next generation of entrepreneurs and business leaders.' },
        { title: 'Education Stream', desc: 'Child Development, Pedagogy, and Education methods shaping the educators of tomorrow.' },
        { title: 'Humanities Stream', desc: 'Social Studies, Major English, and Major Nepali — building critical thinkers and communicators.' },
      ],
    },
    principal: {
      overline: 'FROM THE PRINCIPAL',
      quote:
        'Education is not the filling of a pail, but the lighting of a fire. At Jeevan Jyoti, we have spent four decades ensuring that every student who walks through our doors leaves with not just knowledge, but with wisdom, character, and the courage to shape a better world.',
      name: 'Dr. Ram Prasad Sharma',
      title: 'Principal & Academic Director',
      qualification: 'Ph.D. (Education), M.Ed., TU Gold Medalist',
      readMore: 'Read Full Message',
    },
    philosophy: {
      label: 'OUR PHILOSOPHY',
      line1: 'Cultivating',
      line2: 'intellectual',
      line3: 'curiosity &',
      line4: 'moral integrity.',
      body: 'We envision a world where academic rigour and holistic development thrive in harmony. At Jeevan Jyoti, every student leaves with wisdom, character, and the courage to shape a better world.',
      readStory: 'Read The Story',
      image1Title: 'Holistic Growth',
      image1Desc: 'Emotional, social, and academic development in harmony — preparing students for global challenges beyond standard metrics.',
      image2Title: 'Innovation First',
      image2Desc: 'Integrating cutting-edge technology into everyday learning — a dynamic environment that fosters creativity and critical thinking.',
    },
    stats: {
      overline: 'BY THE NUMBERS',
      headline: 'Four Decades of Impact',
      body: 'Our numbers reflect our unwavering commitment to shaping the leaders of tomorrow.',
      items: [
        { label: 'Students Enrolled' },
        { label: 'Board Pass Rate' },
        { label: 'Faculty Members' },
        { label: 'Years of Excellence' },
      ],
    },
    news: {
      overline: 'Latest Updates',
      headline: 'News & Announcements',
      viewAll: 'View All News',
      readMore: 'Read more',
      items: [
        {
          tag: 'ACHIEVEMENT',
          title: 'Students Shine at National Debate Championship',
          excerpt: 'Our students brought home 3 gold and 2 silver medals in the 2025 National Debate Championship, continuing our tradition of academic excellence.',
          date: 'July 28, 2025',
        },
        {
          tag: 'ADMISSIONS',
          title: 'Admissions Open for Academic Year 2025-26',
          excerpt: 'Applications are now being accepted for Grade 11 in Management, Education, and Humanities streams. Early bird scholarships available.',
          date: 'July 15, 2025',
        },
        {
          tag: 'EVENTS',
          title: 'Annual Cultural Festival "Utsav 2025" Announced',
          excerpt: 'Get ready for three days of performances, exhibitions, and competitions celebrating the diverse talents of our student community.',
          date: 'June 20, 2025',
        },
      ],
    },
    testimonials: {
      overline: 'Voices',
      headline: 'What Our Community Says',
      subtitle: 'Hear from alumni, students, and parents who have experienced the Jeevan Jyoti difference.',
      items: [
        {
          quote: 'Jeevan Jyoti didn\'t just prepare me for university — it prepared me for life. The teachers here genuinely care about your growth, and it shows in every result.',
          name: 'Priya Sharma',
          role: 'Alumni — Engineering, TU',
        },
        {
          quote: 'The holistic curriculum here exposed me to arts, commerce, and leadership — all of which I use daily in my career. I owe my success to this school.',
          name: 'Rahul Joshi',
          role: 'Alumni — Management, PU',
        },
        {
          quote: 'As a parent, I couldn\'t be more satisfied. My daughter blossomed here — both academically and personally. The faculty truly goes above and beyond.',
          name: 'Sunita Karmacharya',
          role: 'Parent of a Current Student',
        },
      ],
    },
  },

  // ─── Academics Page ────────────────────────────────────────────────────
  academics: {
    hero: {
      label: 'Educational Excellence',
      headline1: 'Illuminating',
      headline2: 'Minds.',
      body: 'Our curriculum is designed to foster critical thinking, creativity, and a lifelong love of learning. We blend rigorous academic standards with a nurturing environment to prepare students for the complexities of the modern world.',
      downloadProspectus: 'Download Prospectus',
      viewSyllabus: 'View Syllabus',
      cardTitle: 'Holistic Approach',
      cardBody: 'Integrating academics with emotional intelligence.',
    },
    curriculum: {
      headline: 'Our Academic Pathways',
      subtitle: 'Explore the educational journey from foundational learning to advanced specialized studies.',
      tabPrimary: 'Primary (I–V)',
      tabMiddle: 'Middle School (VI–VIII)',
      tabSenior: 'Senior Secondary (IX–XII)',
      primaryTitle: 'Building the Foundation',
      primaryBody:
        'The primary years focus on experiential learning, instilling curiosity, and developing core literacy and numeracy skills. We utilize play-based methodologies to make learning joyous and effective.',
      primarySubjects: ['Language Arts', 'Mathematics', 'Environmental Sci.', 'Creative Arts'],
      middleTitle: 'Exploration & Inquiry',
      middleBody:
        'Transitioning into deeper academic disciplines, our middle school curriculum encourages critical analysis, independent research, and collaborative projects. Students begin to identify their academic interests.',
      middleSubject1Title: 'Integrated Studies',
      middleSubject1Body:
        'Physics, Chemistry, and Biology fundamentals taught through practical application.',
      middleSubject2Title: 'Humanities',
      middleSubject2Body:
        'Deep dives into History, Geography, and Civics to understand global contexts.',
      seniorTitle: 'Specialization & Mastery',
      seniorBody:
        'The senior years offer specialized streams allowing students to focus intensely on their chosen career paths. Rigorous preparation for board examinations and higher education is balanced with leadership development.',
      educationStream: 'Education Stream',
      educationBody:
        'Child Development, Pedagogy, Major English/Nepali. Prepares students for careers in teaching and educational administration.',
      commerceStream: 'Management Stream',
      commerceBody:
        'Accountancy, Economics, Business Studies, Mathematics, English, Computer. Prepares students for business and commerce careers.',
      humanitiesStream: 'Humanities Stream',
      humanitiesBody:
        'Sociology, Political Science, English Literature, History, Rural Development, Nepali. Develops critical thinkers and communicators.',
    },
    faculty: {
      overline: 'Our Educators',
      headline: 'Faculty Spotlight',
      subtitle: 'Learn from experienced professionals dedicated to student success and innovative teaching.',
      viewAll: 'View All Faculty',
      quoteText: '"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."',
      member1Name: 'Dr. Meera Sharma',
      member1Dept: 'Head of Management',
      member1Quote: '"My goal is to make management not just a subject to be learned, but a lens through which to view and understand the world."',
      member1Qual: 'Ph.D. in Physics',
      member1Exp: '15+ Years Exp.',
      member2Name: 'Mr. Rahul Verma',
      member2Dept: 'Mathematics Dept.',
      member3Name: 'Ms. Anita Desai',
      member3Dept: 'Creative Arts',
      member4Name: 'Mr. Samuel Raj',
      member4Dept: 'Language Arts',
    },
  },

  // ─── Admissions Page ───────────────────────────────────────────────────
  admissions: {
    hero: {
      badge: 'Admissions 2025-26',
      headline1: 'Begin Your Journey of',
      headline2: 'Illumination.',
      body: 'We welcome ambitious minds to a vibrant community dedicated to academic excellence and holistic growth. Our admissions process is designed to discover the unique potential in every applicant.',
      startApplication: 'Start Application',
      downloadProspectus: 'Download Prospectus',
      keyDates: 'Key Dates',
      date1Label: 'Early Applications Open',
      date1Value: 'October 15, 2025',
      date2Label: 'Entrance Assessment',
      date2Value: 'December 5-10, 2025',
      date3Label: 'Final Decisions Announced',
      date3Value: 'January 20, 2026',
    },
    process: {
      headline: 'A Transparent Admission Process',
      subtitle: 'We value clarity and support at every step of your journey to joining Jeevan Jyoti.',
      step1Title: 'Online Inquiry',
      step1Body: 'Submit the initial form to receive detailed program information.',
      step2Title: 'Application Submission',
      step2Body: 'Complete the comprehensive online application and upload documents.',
      step3Title: 'Assessment & Interview',
      step3Body: 'Engage in our holistic evaluation process on campus.',
      step4Title: 'Enrollment Offer',
      step4Body: 'Receive your formal acceptance and welcome package.',
    },
  },

  // ─── Contact Page ──────────────────────────────────────────────────────
  contact: {
    hero: {
      label: 'Connect With Us',
      headline1: 'Get in',
      headline2: 'Touch.',
      body: 'We welcome inquiries from prospective families, alumni, and community members. Reach out to discuss how Jeevan Jyoti can illuminate your child\'s future.',
    },
    form: {
      headline: 'Send a Message',
      labelName: 'Full Name',
      labelEmail: 'Email Address',
      labelSubject: 'Subject',
      labelMessage: 'Message',
      placeholderName: 'Jane Doe',
      placeholderEmail: 'jane@example.com',
      placeholderMessage: 'How can we help you?',
      selectDefault: 'Select an inquiry type',
      optionAdmissions: 'Admissions',
      optionAcademics: 'Academics',
      optionGeneral: 'General Inquiry',
      submit: 'Send Message',
      successTitle: 'Message Sent!',
      successBody: "Thank you for reaching out. We'll get back to you within 2 working days.",
      sendAnother: 'Send another message',
    },
    info: {
      headline: 'Contact Information',
      addressLabel: 'Campus Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      officeHoursLabel: 'Office Hours',
      weekdays: 'Sunday – Friday: 9:00 AM – 4:00 PM',
      saturday: 'Saturday: 10:00 AM – 2:00 PM (Admissions Only)',
    },
    departments: {
      headline: 'Direct Contacts',
      subtitle: 'Reach out to specific departments for specialized inquiries.',
      dept1Title: 'Admissions',
      dept1Body: 'For enrollment, tours, and application status.',
      dept2Title: 'Administration',
      dept2Body: 'For general operational inquiries and billing.',
      dept3Title: 'Careers',
      dept3Body: 'For faculty and staff employment opportunities.',
    },
    map: {
      headline: 'Visit Our Campus',
      subtitle: 'Experience our nurturing environment firsthand. Schedule a tour or drop by during office hours.',
      cardTitle: 'Main Campus',
      getDirections: 'Get Directions',
    },
  },

  // ─── Student Life Page ─────────────────────────────────────────────────
  studentLife: {
    hero: {
      headline1: 'Beyond the',
      headline2: 'Classroom.',
      body: 'Discover a vibrant community where passions are ignited, talents are nurtured, and lifelong friendships are forged through our diverse extracurricular programs.',
      exploreActivities: 'Explore Activities',
      captionBadge: 'Drama Club',
      captionTitle: 'Spring Production Rehearsals',
    },
    activities: {
      headline: 'Vibrant Student Life',
      subtitle: 'From competitive sports to creative arts and innovative clubs, find your place in our dynamic school community.',
      items: [
        { category: 'Athletics', title: 'Varsity Sports', description: 'Competing at the highest levels in basketball, soccer, and track.' },
        { category: 'Fine Arts', title: 'Studio Arts', description: 'Painting, sculpture, and digital media.' },
        { category: 'Music Program', title: 'Symphony Orchestra', description: 'Award-winning classical and contemporary ensembles.' },
        { category: 'STEM Clubs', title: 'Robotics Team', description: 'Building the future with advanced engineering.' },
      ],
    },
    events: {
      headline: 'Upcoming Events',
      subtitle: "Don't miss out on what's happening around campus.",
      viewCalendar: 'View Full Calendar',
      month: 'October',
      items: [
        {
          date: 'Oct 10',
          time: '6:00 PM - 9:00 PM',
          category: 'Arts',
          title: 'Autumn Arts Showcase',
          description: 'Annual exhibition of student artwork in the Main Gallery, featuring live music from the Jazz Ensemble.',
        },
        {
          date: 'Oct 15',
          time: 'City Stadium',
          category: 'Sports',
          title: 'Varsity Football Regional Finals',
          description: 'Come support the Lions as they face off against Riverside High in the regional championship game.',
        },
        {
          date: 'Oct 22',
          time: '3:30 PM - 5:00 PM',
          category: 'Academic',
          title: 'Debate Club Prep Session',
          description: 'Open preparation session for all students interested in joining the winter Debate Championship team.',
        },
      ],
    },
  },

  // ─── Resources Page ────────────────────────────────────────────────────
  resources: {
    hero: {
      headline1: 'Academic',
      headline2: 'Resources.',
      body: 'Access study materials, syllabi, and departmental guidelines carefully curated by our faculty to support your educational journey.',
      searchPlaceholder: 'Search resources, subjects, or teachers...',
    },
    departments: {
      headline: 'Browse Departments',
      dept1Title: 'Mathematics',
      dept1Body: 'Algebra, Geometry, Calculus, and Statistical Analysis modules.',
      dept1Cta: 'Explore Curricula',
      dept2Title: 'Education',
      dept2Body: 'Physics, Chemistry, and Biological laboratory resources.',
      dept2Cta: 'Explore',
      dept3Title: 'Humanities',
      dept3Body: 'Literature, History, and Social Science literature.',
      dept3Cta: 'Explore',
      promoBadge: 'NEW FEATURE',
      promoTitle: 'Global Digital Library Access',
      promoBody: 'Students now have unlimited access to over 10,000 peer-reviewed journals and academic texts via our new institutional portal.',
      promoCta: 'Access Portal',
    },
    list: {
      headline: 'Recent Uploads',
      subtitle: 'Latest study materials added by faculty.',
      filter: 'Filter',
      sort: 'Sort',
      headerFileName: 'File Name',
      headerTypeSize: 'Type / Size',
      headerUploadedBy: 'Uploaded By',
      headerDate: 'Date',
      headerAction: 'Action',
      loadMore: 'Load More Resources',
      detailsLabel: 'Details:',
      authorLabel: 'Author:',
      dateLabel: 'Date:',
      items: [
        { title: 'Class 10 Physics Syllabus 2024-25', type: 'PDF', size: '2.4 MB', author: 'Dr. M. Sharma', date: 'Oct 5, 2024' },
        { title: 'Algebra Practice Worksheets (Ch 1-3)', type: 'PDF', size: '1.8 MB', author: 'R. Verma', date: 'Oct 3, 2024' },
        { title: 'History: World War II Study Guide', type: 'DOCX', size: '3.1 MB', author: 'A. Desai', date: 'Sep 28, 2024' },
        { title: 'Biology Lab Safety Manual', type: 'PDF', size: '4.5 MB', author: 'Dr. M. Sharma', date: 'Sep 25, 2024' },
        { title: 'English Literature Reading List', type: 'PDF', size: '1.2 MB', author: 'S. Raj', date: 'Sep 20, 2024' },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// NEPALI TRANSLATIONS
// ---------------------------------------------------------------------------

const ne: typeof en = {
  site: {
    name: 'जीवन ज्योति',
    fullName: 'जीवन ज्योति उच्च माध्यमिक विद्यालय',
    tagline: 'उत्कृष्टताको मार्ग प्रकाशित गर्दै।',
    description:
      'जीवन ज्योति उच्च माध्यमिक विद्यालयमा हामी कठोर शैक्षणिक अभ्यास र पोषणशील वातावरणलाई मिलाएर भोलिका नेताहरू निर्माण गर्छौं।',
  },

  nav: {
    academics: 'शैक्षणिक',
    admissions: 'भर्ना',
    studentLife: 'विद्यार्थी जीवन',
    resources: 'स्रोत सामग्री',
    contact: 'सम्पर्क',
    visitSchool: 'विद्यालय भ्रमण',
    contactUs: 'सम्पर्क गर्नुहोस्',
    language: 'भाषा',
    changeLanguage: 'भाषा परिवर्तन',
    portalLogin: 'पोर्टल लगइन',
  },

  footer: {
    tagline: 'मन प्रकाशित गर्दै, पुस्तापछि पुस्ता भविष्य निर्माण गर्दै।',
    quickLinks: 'द्रुत लिंकहरू',
    contactInfo: 'सम्पर्कमा आउनुहोस्',
    newsletter: 'अपडेट रहनुहोस्',
    newsletterDesc: 'परिसरबाट पछिल्लो समाचार, कार्यक्रमहरू र घोषणाहरूको लागि सदस्यता लिनुहोस्।',
    newsletterPlaceholder: 'तपाईंको इमेल ठेगाना',
    newsletterSubscribe: 'सदस्यता लिनुहोस्',
    newsletterSuccess: 'तपाईं सदस्य हुनुभयो — धन्यवाद!',
    copyright: 'सर्वाधिकार सुरक्षित।',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'प्रयोगका सर्तहरू',
    admissions: 'भर्ना',
    address: 'वराहक्षेत्र-८, बाँगझोरा, सुनसरी',
    email: 'jes.sunsari@gmail.com',
    phone: '+९७७ ९८१-९३८३८५०',
    founded: 'स्थापना: १९८५',
  },

  home: {
    hero: {
      slide1: {
        label: 'नेपालका भावी नेताहरू गढ्दै',
        line1: 'मन',
        line2: 'प्रकाशित',
        line3: 'गर्दै,',
        line4: 'भविष्य।',
        cta: 'कार्यक्रमहरू हेर्नुहोस्',
      },
      slide2: {
        label: 'शैक्षणिक उत्कृष्टताको विरासत',
        line1: 'जहाँ',
        line2: 'जिज्ञासा',
        line3: 'उत्कृष्टतासँग',
        line4: 'मिल्छ।',
        cta: 'हाम्रा शैक्षणिक',
      },
      slide3: {
        label: 'तपाईंको उज्ज्वल भविष्य यहाँबाट सुरु',
        line1: 'तपाईंको',
        line2: 'यात्रा',
        line3: 'यहाँबाट',
        line4: 'सुरु।',
        cta: 'अहिले आवेदन दिनुहोस्',
      },
      dragHint: 'अन्वेषण गर्न स्क्रोल गर्नुहोस्',
    },
    features: {
      overline: 'हामीलाई किन रोज्ने',
      headline: 'उत्कृष्टतामा आधारित शिक्षा',
      items: [
        {
          label: 'शैक्षणिक कठोरता',
          title: 'विश्वस्तरीय पाठ्यक्रम',
          body: 'हाम्रो NEB-संरेखित पाठ्यक्रम अग्रणी शिक्षकहरूद्वारा तयार पारिएको छ जसले प्रत्येक विद्यार्थीलाई चुनौती दिन्छ र प्रेरित गर्छ।',
        },
        {
          label: 'समग्र विकास',
          title: 'पाठ्यपुस्तकभन्दा पर',
          body: 'खेलकुददेखि कलासम्म, हाम्रा पाठ्येतर कार्यक्रमहरूले सम्पूर्ण व्यक्तित्व विकास गर्छन् — चरित्र, लचिलोपन र सामाजिक बुद्धिमत्ता निर्माण गर्दै।',
        },
        {
          label: 'विशेषज्ञ शिक्षकगण',
          title: 'शिक्षक मात्र होइन, मार्गदर्शक',
          body: 'हाम्रा शिक्षकहरू कुशल पेशाकर्मी र उत्साही मार्गदर्शक हुन् जो प्रत्येक विद्यार्थीको व्यक्तिगत यात्रामा लगानी गर्छन्।',
        },
        {
          label: 'आधुनिक सुविधाहरू',
          title: 'अत्याधुनिक परिसर',
          body: 'विज्ञान प्रयोगशाला, डिजिटल पुस्तकालय, कार्यक्षमता स्थान र खेलकुद सुविधाहरू — हाम्रो परिसर विद्यार्थी जीवनको हरेक आयामलाई समर्थन गर्न बनाइएको छ।',
        },
      ],
    },
    programs: {
      overline: 'हाम्रा कार्यक्रमहरू',
      headline: 'आफ्नो मार्ग रोज्नुहोस्',
      dragHint: 'अन्वेषण गर्न तान्नुहोस्',
      learnMore: 'थप जान्नुहोस्',
      items: [
        { label: 'विज्ञान र प्रविधि', title: 'जहाँ जिज्ञासाले\nआविष्कारलाई भेट्छ।', desc: 'हाम्रो विज्ञान र प्रविधि कार्यक्रमले विद्यार्थीहरूलाई व्यावहारिक प्रयोगशाला अनुभव, कम्प्युटेसनल सोच र द्रुत रूपमा विकसित संसारमा फस्टाउन विश्लेषणात्मक सीपहरू प्रदान गर्दछ।', cta: 'विज्ञान अन्वेषण गर्नुहोस्' },
        { label: 'कला र मानविकी', title: 'संसारलाई आकार\nदिने सिर्जनशीलता।', desc: 'साहित्य र दर्शनदेखि ललित कला र संगीतसम्म, हाम्रो मानविकी कार्यक्रमले समानुभूति, आलोचनात्मक विचार र स्पष्टताका साथ सञ्चार गर्ने क्षमताको विकास गर्छ।', cta: 'मानविकी अन्वेषण गर्नुहोस्' },
        { label: 'खेलकुद र कल्याण', title: 'स्वस्थ शरीर,\nसशक्त दिमाग।', desc: 'फुटबल, बास्केटबल, पौडी र एथलेटिक्सका लागि विश्वस्तरीय सुविधाहरू। हामी विश्वास गर्छौं कि शारीरिक उत्कृष्टता र मानसिक लचिलोपन पूर्ण शिक्षाको आधार हुन्।', cta: 'विद्यार्थी जीवन अन्वेषण गर्नुहोस्' },
        { label: 'नेतृत्व र समुदाय', title: 'सेवा गर्ने र\nप्रेरित गर्ने नेताहरू।', desc: 'विद्यार्थी परिषद्, सामाजिक पहल र सल्लाहकार कार्यक्रमहरूमार्फत हामी समुदायप्रतिको जिम्मेवारी बुझ्ने आत्मविश्वासी युवा नेताहरूको विकास गर्छौं।', cta: 'समुदाय हेर्नुहोस्' },
      ],
    },
    streams: {
      items: [
        { title: 'व्यवस्थापन धारा', desc: 'लेखाशास्त्र, अर्थशास्त्र र व्यापार अध्ययन जसले उद्यमीहरू र व्यापार नेताहरूको अर्को पुस्ता तयार गर्दछ।' },
        { title: 'शिक्षा धारा', desc: 'बाल विकास, शिक्षाशास्त्र र शिक्षण विधि जसले भोलिका शिक्षकहरू तयार गर्दछ।' },
        { title: 'मानविकी धारा', desc: 'सामाजिक शिक्षा, प्रमुख अंग्रेजी र प्रमुख नेपाली — आलोचनात्मक विचारकहरू र सञ्चारकर्ताहरू निर्माण गर्दै।' },
      ],
    },
    principal: {
      overline: 'प्रधानाध्यापकबाट',
      quote:
        'शिक्षा भनेको बाल्टी भर्नु होइन, बरु आगो बाल्नु हो। जीवन ज्योतिमा हामीले चार दशक बिताएर यो सुनिश्चित गरेका छौं कि हाम्रा ढोका पार गर्ने हरेक विद्यार्थी ज्ञानमात्र नभई बुद्धि, चरित्र र राम्रो संसार बनाउने साहस लिएर जान्छन्।',
      name: 'डा. राम प्रसाद शर्मा',
      title: 'प्रधानाध्यापक एवम् शैक्षणिक निर्देशक',
      qualification: 'Ph.D. (शिक्षाशास्त्र), M.Ed., TU स्वर्ण पदक विजेता',
      readMore: 'पूरा सन्देश पढ्नुहोस्',
    },
    philosophy: {
      label: 'हाम्रो दर्शन',
      line1: 'बौद्धिक',
      line2: 'जिज्ञासा र',
      line3: 'नैतिक अखण्डताको',
      line4: 'विकास।',
      body: 'हामी यस्तो संसारको परिकल्पना गर्छौं जहाँ शैक्षिक कठोरता र समग्र विकास सद्भावमा फस्टाउँछन्। जीवन ज्योतिमा, प्रत्येक विद्यार्थी बुद्धि, चरित्र र राम्रो संसार बनाउने साहसका साथ अगाडि बढ्छन्।',
      readStory: 'कथा पढ्नुहोस्',
      image1Title: 'समग्र विकास',
      image1Desc: 'सद्भावमा भावनात्मक, सामाजिक र शैक्षिक विकास — मानक मेट्रिक्स भन्दा बाहिरका विश्वव्यापी चुनौतीहरूको लागि विद्यार्थीहरूलाई तयार पार्दै।',
      image2Title: 'नवीनता पहिलो',
      image2Desc: 'अत्याधुनिक प्रविधिलाई दैनिक सिकाइमा एकीकृत गर्दै — एक गतिशील वातावरण जसले सिर्जनशीलता र आलोचनात्मक सोचलाई बढावा दिन्छ।',
    },
    stats: {
      overline: 'संख्यामा',
      headline: 'चार दशकको प्रभाव',
      body: 'हाम्रा संख्याहरूले भोलिका नेताहरू निर्माण गर्ने हाम्रो अटल प्रतिबद्धता झल्काउँछन्।',
      items: [
        { label: 'विद्यार्थी भर्ना' },
        { label: 'बोर्ड पास दर' },
        { label: 'शिक्षक सदस्यहरू' },
        { label: 'उत्कृष्टताका वर्षहरू' },
      ],
    },
    news: {
      overline: 'पछिल्ला अपडेटहरू',
      headline: 'समाचार र घोषणाहरू',
      viewAll: 'सबै समाचार हेर्नुहोस्',
      readMore: 'थप पढ्नुहोस्',
      items: [
        {
          tag: 'उपलब्धि',
          title: 'राष्ट्रिय विज्ञान ओलम्पियाडमा विद्यार्थीहरूको उत्कृष्ट प्रदर्शन',
          excerpt: 'हाम्रा विद्यार्थीहरूले २०२५ राष्ट्रिय विज्ञान ओलम्पियाडमा ३ स्वर्ण र २ रजत पदक जितेर हाम्रो शैक्षिक उत्कृष्टताको परम्परालाई निरन्तरता दिएका छन्।',
          date: 'जुलाई २८, २०२५',
        },
        {
          tag: 'भर्ना',
          title: 'शैक्षिक वर्ष २०२५-२६ को लागि भर्ना खुल्यो',
          excerpt: 'विज्ञान, व्यवस्थापन र मानविकी संकायमा कक्षा ११ को लागि आवेदनहरू स्वीकार गरिँदैछन्। प्रारम्भिक छात्रवृत्तिहरू उपलब्ध छन्।',
          date: 'जुलाई १५, २०२५',
        },
        {
          tag: 'कार्यक्रमहरू',
          title: 'वार्षिक सांस्कृतिक महोत्सव "उत्सव २०२५" को घोषणा',
          excerpt: 'हाम्रो विद्यार्थी समुदायको विविध प्रतिभाहरूलाई मनाउने तीन दिने प्रस्तुति, प्रदर्शनी र प्रतियोगिताहरूको लागि तयार हुनुहोस्।',
          date: 'जुन २०, २०२५',
        },
      ],
    },
    testimonials: {
      overline: 'आवाजहरू',
      headline: 'हाम्रो समुदायले के भन्छ',
      subtitle: 'पूर्व विद्यार्थी, वर्तमान विद्यार्थी र अभिभावकहरूबाट जीवन ज्योतिको अनुभव सुन्नुहोस्।',
      items: [
        {
          quote: 'जीवन ज्योतिले मलाई विश्वविद्यालयको लागि मात्र होइन — जीवनको लागि तयार गर्‍यो। यहाँका शिक्षकहरू साँच्चै तपाईंको विकासको ख्याल राख्छन्, र त्यो हरेक परिणाममा देखिन्छ।',
          name: 'प्रिया शर्मा',
          role: 'पूर्व विद्यार्थी — इन्जिनियरिङ, TU',
        },
        {
          quote: 'यहाँको समग्र पाठ्यक्रमले मलाई कला, विज्ञान र नेतृत्वमा ल्यायो — जुन म मेरो करियरमा दैनिक प्रयोग गर्छु। मेरो सफलताको श्रेय यस विद्यालयलाई जान्छ।',
          name: 'राहुल जोशी',
          role: 'पूर्व विद्यार्थी — व्यवस्थापन, PU',
        },
        {
          quote: 'एक अभिभावकको रूपमा, म यो भन्दा बढी सन्तुष्ट हुन सक्दिनथें। मेरी छोरी यहाँ फक्रिन — शैक्षिक र व्यक्तिगत दुवै रूपमा। शिक्षकगण साँच्चै अपेक्षा भन्दा बढी गर्छन्।',
          name: 'सुनिता कर्माचार्य',
          role: 'वर्तमान विद्यार्थीको अभिभावक',
        },
      ],
    },
  },

  academics: {
    hero: {
      label: 'शैक्षणिक उत्कृष्टता',
      headline1: 'मन',
      headline2: 'प्रकाशित।',
      body: 'हाम्रो पाठ्यक्रम आलोचनात्मक सोच, सिर्जनशीलता र आजीवन सिकाइको प्रेम जगाउन डिजाइन गरिएको छ। हामी कठोर शैक्षणिक मानकहरू र पोषणशील वातावरणलाई मिलाएर विद्यार्थीहरूलाई आधुनिक संसारका जटिलताहरूको लागि तयार पार्छौं।',
      downloadProspectus: 'विवरणिका डाउनलोड गर्नुहोस्',
      viewSyllabus: 'पाठ्यक्रम हेर्नुहोस्',
      cardTitle: 'समग्र दृष्टिकोण',
      cardBody: 'शैक्षणिक र भावनात्मक बुद्धिमत्ताको एकीकरण।',
    },
    curriculum: {
      headline: 'हाम्रा शैक्षणिक मार्गहरू',
      subtitle: 'आधारभूत सिकाइदेखि उन्नत विशेषज्ञ अध्ययनसम्मको शैक्षणिक यात्रा अन्वेषण गर्नुहोस्।',
      tabPrimary: 'प्राथमिक (I–V)',
      tabMiddle: 'माध्यमिक विद्यालय (VI–VIII)',
      tabSenior: 'उच्च माध्यमिक (IX–XII)',
      primaryTitle: 'आधार निर्माण',
      primaryBody:
        'प्राथमिक वर्षहरूमा अनुभवात्मक सिकाइ, जिज्ञासा जगाउने र मूल साक्षरता तथा संख्यात्मक सीपहरू विकासमा ध्यान केन्द्रित गरिन्छ।',
      primarySubjects: ['भाषा कला', 'गणित', 'वातावरणीय विज्ञान', 'सिर्जनशील कला'],
      middleTitle: 'अन्वेषण र जिज्ञासा',
      middleBody:
        'गहिरो शैक्षणिक विषयहरूमा प्रवेश गर्दै, हाम्रो माध्यमिक विद्यालय पाठ्यक्रमले आलोचनात्मक विश्लेषण, स्वतन्त्र अनुसन्धान र सहयोगी परियोजनाहरूलाई प्रोत्साहन दिन्छ।',
      middleSubject1Title: 'एकीकृत विज्ञान',
      middleSubject1Body: 'व्यावहारिक प्रयोगमार्फत भौतिक विज्ञान, रसायन र जीवविज्ञानका आधारभूत सिद्धान्तहरू।',
      middleSubject2Title: 'मानविकी',
      middleSubject2Body: 'इतिहास, भूगोल र नागरिकशास्त्रमा गहन अध्ययन।',
      seniorTitle: 'विशेषज्ञता र दक्षता',
      seniorBody:
        'उच्च माध्यमिक वर्षहरूमा विशेषज्ञ धाराहरू उपलब्ध छन् जसले विद्यार्थीहरूलाई आफ्नो रोजेको करियर मार्गमा गहनरूपले ध्यान केन्द्रित गर्न अनुमति दिन्छ।',
      educationStream: 'शिक्षा धारा',
      educationBody:
        'बाल विकास, शिक्षाशास्त्र, प्रमुख अंग्रेजी/नेपाली। शिक्षण र शैक्षिक प्रशासनमा क्यारियरको लागि विद्यार्थीहरू तयार गर्दछ।',
      commerceStream: 'व्यवस्थापन धारा',
      commerceBody:
        'लेखाशास्त्र, अर्थशास्त्र, व्यापार अध्ययन, गणित, अंग्रेजी, कम्प्युटर। व्यापार र वाणिज्य करियरको लागि तयारी।',
      humanitiesStream: 'मानविकी धारा',
      humanitiesBody:
        'समाजशास्त्र, राजनीति विज्ञान, अंग्रेजी साहित्य, इतिहास, ग्रामीण विकास, नेपाली। आलोचनात्मक विचारकहरू र सञ्चारकर्ताहरू विकास गर्दछ।',
    },
    faculty: {
      overline: 'हाम्रा शिक्षकगण',
      headline: 'शिक्षक विशेष',
      subtitle: 'विद्यार्थी सफलता र नवीन शिक्षणप्रति समर्पित अनुभवी पेशाकर्मीहरूबाट सिक्नुहोस्।',
      viewAll: 'सबै शिक्षक हेर्नुहोस्',
      quoteText: '"शिक्षा भविष्यको पासपोर्ट हो, किनकि भोलि उनीहरूको हो जो आज तयारी गर्छन्।"',
      member1Name: 'डा. मीरा शर्मा',
      member1Dept: 'विज्ञान विभाग प्रमुख',
      member1Quote: '"मेरो लक्ष्य विज्ञानलाई केवल सिकिने विषय मात्र नभई संसार बुझ्ने लेन्स बनाउनु हो।"',
      member1Qual: 'Ph.D. भौतिक विज्ञान',
      member1Exp: '१५+ वर्षको अनुभव',
      member2Name: 'श्री राहुल वर्मा',
      member2Dept: 'गणित विभाग',
      member3Name: 'सुश्री अनिता देसाई',
      member3Dept: 'सिर्जनशील कला',
      member4Name: 'श्री सामुयल राज',
      member4Dept: 'भाषा कला',
    },
  },

  admissions: {
    hero: {
      badge: 'भर्ना २०२५-२६',
      headline1: 'आफ्नो यात्रा सुरु गर्नुहोस्',
      headline2: 'प्रकाशसँग।',
      body: 'हामी शैक्षणिक उत्कृष्टता र समग्र विकासप्रति समर्पित जीवन्त समुदायमा महत्वाकांक्षी विद्यार्थीहरूलाई स्वागत गर्छौं।',
      startApplication: 'आवेदन सुरु गर्नुहोस्',
      downloadProspectus: 'विवरणिका डाउनलोड गर्नुहोस्',
      keyDates: 'मुख्य मितिहरू',
      date1Label: 'प्रारम्भिक आवेदन खुल्छ',
      date1Value: 'अक्टोबर १५, २०२५',
      date2Label: 'प्रवेश मूल्यांकन',
      date2Value: 'डिसेम्बर ५-१०, २०२५',
      date3Label: 'अन्तिम निर्णय घोषणा',
      date3Value: 'जनवरी २०, २०२६',
    },
    process: {
      headline: 'पारदर्शी भर्ना प्रक्रिया',
      subtitle: 'जीवन ज्योतिमा सामेल हुने तपाईंको यात्राको हरेक कदममा हामी स्पष्टता र समर्थन प्रदान गर्छौं।',
      step1Title: 'अनलाइन जिज्ञासा',
      step1Body: 'विस्तृत कार्यक्रम जानकारी प्राप्त गर्न प्रारम्भिक फारम पेश गर्नुहोस्।',
      step2Title: 'आवेदन जम्मा',
      step2Body: 'व्यापक अनलाइन आवेदन भर्नुहोस् र कागजातहरू अपलोड गर्नुहोस्।',
      step3Title: 'मूल्यांकन र अन्तर्वार्ता',
      step3Body: 'परिसरमा हाम्रो समग्र मूल्यांकन प्रक्रियामा भाग लिनुहोस्।',
      step4Title: 'भर्ना प्रस्ताव',
      step4Body: 'आफ्नो औपचारिक स्वीकृति र स्वागत प्याकेज प्राप्त गर्नुहोस्।',
    },
  },

  contact: {
    hero: {
      label: 'हामीसँग जोडिनुहोस्',
      headline1: 'सम्पर्कमा',
      headline2: 'आउनुहोस्।',
      body: 'हामी भावी परिवारहरू, पूर्व विद्यार्थीहरू र समुदायका सदस्यहरूबाट जिज्ञासाहरू स्वागत गर्छौं।',
    },
    form: {
      headline: 'सन्देश पठाउनुहोस्',
      labelName: 'पूरा नाम',
      labelEmail: 'इमेल ठेगाना',
      labelSubject: 'विषय',
      labelMessage: 'सन्देश',
      placeholderName: 'रामकुमारी श्रेष्ठ',
      placeholderEmail: 'tapai@example.com',
      placeholderMessage: 'हामी कसरी सहयोग गर्न सक्छौं?',
      selectDefault: 'जिज्ञासाको प्रकार छान्नुहोस्',
      optionAdmissions: 'भर्ना',
      optionAcademics: 'शैक्षणिक',
      optionGeneral: 'सामान्य जिज्ञासा',
      submit: 'सन्देश पठाउनुहोस्',
      successTitle: 'सन्देश पठाइयो!',
      successBody: 'सम्पर्क गर्नुभएकोमा धन्यवाद। हामी २ कार्य दिनभित्र तपाईंलाई जवाफ दिनेछौं।',
      sendAnother: 'अर्को सन्देश पठाउनुहोस्',
    },
    info: {
      headline: 'सम्पर्क जानकारी',
      addressLabel: 'परिसर ठेगाना',
      phoneLabel: 'फोन',
      emailLabel: 'इमेल',
      officeHoursLabel: 'कार्यालय समय',
      weekdays: 'आइतबार – शुक्रबार: बिहान ९:०० – साँझ ४:००',
      saturday: 'शनिबार: बिहान १०:०० – दिउँसो २:०० (भर्नामात्र)',
    },
    departments: {
      headline: 'प्रत्यक्ष सम्पर्क',
      subtitle: 'विशेष जिज्ञासाहरूको लागि सम्बन्धित विभागसँग सिधा सम्पर्क गर्नुहोस्।',
      dept1Title: 'भर्ना विभाग',
      dept1Body: 'नामांकन, भ्रमण र आवेदन स्थितिको लागि।',
      dept2Title: 'प्रशासन',
      dept2Body: 'सामान्य परिचालन जिज्ञासा र बिलिङको लागि।',
      dept3Title: 'करियर',
      dept3Body: 'शिक्षक र कर्मचारी रोजगारका अवसरहरूको लागि।',
    },
    map: {
      headline: 'हाम्रो परिसर भ्रमण गर्नुहोस्',
      subtitle: 'हाम्रो पोषणशील वातावरण आफैं अनुभव गर्नुहोस्। भ्रमणको तालिका बनाउनुहोस् वा कार्यालय समयमा आउनुहोस्।',
      cardTitle: 'मुख्य परिसर',
      getDirections: 'दिशा निर्देश पाउनुहोस्',
    },
  },

  studentLife: {
    hero: {
      headline1: 'कक्षाकोठाभन्दा',
      headline2: 'बाहिर।',
      body: 'त्यस्तो जीवन्त समुदाय पत्ता लगाउनुहोस् जहाँ जुनून जगाइन्छ, प्रतिभा पोषित गरिन्छ र हाम्रा विविध पाठ्येतर कार्यक्रमहरूमार्फत जीवनभरका मित्रताहरू बनाइन्छन्।',
      exploreActivities: 'गतिविधिहरू अन्वेषण गर्नुहोस्',
      captionBadge: 'नाटक क्लब',
      captionTitle: 'वसन्त नाटक पूर्वाभ्यास',
    },
    activities: {
      headline: 'जीवन्त विद्यार्थी जीवन',
      subtitle: 'प्रतिस्पर्धात्मक खेलकुददेखि सिर्जनशील कला र अभिनव क्लबहरूसम्म, हाम्रो गतिशील विद्यालय समुदायमा आफ्नो ठाउँ फेला पार्नुहोस्।',
      items: [
        { category: 'खेलकुद', title: 'विश्वविद्यालय खेल', description: 'बास्केटबल, फुटबल र ट्र्याकमा उच्चतम स्तरमा प्रतिस्पर्धा।' },
        { category: 'ललित कला', title: 'स्टुडियो आर्ट्स', description: 'चित्रकला, मूर्तिकला र डिजिटल मिडिया।' },
        { category: 'संगीत कार्यक्रम', title: 'सिम्फनी अर्केस्ट्रा', description: 'पुरस्कार विजेता शास्त्रीय र समकालीन समूह।' },
        { category: 'STEM क्लबहरू', title: 'रोबोटिक्स टिम', description: 'उन्नत इन्जिनियरिङसँग भविष्य निर्माण।' },
      ],
    },
    events: {
      headline: 'आगामी कार्यक्रमहरू',
      subtitle: 'परिसरमा के भइरहेको छ त्यो नछुटाउनुहोस्।',
      viewCalendar: 'पूरा पात्रो हेर्नुहोस्',
      month: 'अक्टोबर',
      items: [
        {
          date: 'अक्टो. १०',
          time: 'साँझ ६:०० - ९:००',
          category: 'कला',
          title: 'शरद कला प्रदर्शनी',
          description: 'मुख्य ग्यालेरीमा विद्यार्थी कलाकृतिहरूको वार्षिक प्रदर्शनी, जाज ईन्सेम्बलको लाइभ संगीतसहित।',
        },
        {
          date: 'अक्टो. १५',
          time: 'सिटी स्टेडियम',
          category: 'खेलकुद',
          title: 'विश्वविद्यालय फुटबल क्षेत्रीय फाइनल',
          description: 'क्षेत्रीय च्याम्पियनशिपमा लायन्सलाई समर्थन गर्न आउनुहोस्।',
        },
        {
          date: 'अक्टो. २२',
          time: 'दिउँसो ३:३० - ५:००',
          category: 'शैक्षणिक',
          title: 'विज्ञान ओलम्पियाड तयारी सत्र',
          description: 'शीतकालीन विज्ञान ओलम्पियाड टिममा सामेल हुन इच्छुक सबै विद्यार्थीहरूको लागि खुला सत्र।',
        },
      ],
    },
  },

  resources: {
    hero: {
      headline1: 'शैक्षणिक',
      headline2: 'स्रोतहरू।',
      body: 'हाम्रा शिक्षकहरूद्वारा तपाईंको शैक्षणिक यात्रालाई समर्थन गर्न सावधानीपूर्वक संकलित अध्ययन सामग्री, पाठ्यक्रम र विभागीय दिशानिर्देशहरू पहुँच गर्नुहोस्।',
      searchPlaceholder: 'स्रोत सामग्री, विषय वा शिक्षक खोज्नुहोस्...',
    },
    departments: {
      headline: 'विभागहरू हेर्नुहोस्',
      dept1Title: 'गणित',
      dept1Body: 'बीजगणित, ज्यामिति, क्यालकुलस र सांख्यिकीय विश्लेषण मोड्युलहरू।',
      dept1Cta: 'पाठ्यक्रम अन्वेषण गर्नुहोस्',
      dept2Title: 'विज्ञान',
      dept2Body: 'भौतिक विज्ञान, रसायन र जैविक प्रयोगशाला स्रोतहरू।',
      dept2Cta: 'अन्वेषण',
      dept3Title: 'मानविकी',
      dept3Body: 'साहित्य, इतिहास र समाज विज्ञान सामग्री।',
      dept3Cta: 'अन्वेषण',
      promoBadge: 'नयाँ सुविधा',
      promoTitle: 'विश्व डिजिटल पुस्तकालय पहुँच',
      promoBody: 'विद्यार्थीहरूले अब हाम्रो नयाँ संस्थागत पोर्टलमार्फत १०,०००+ सहकर्मी-समीक्षित जर्नलहरू र शैक्षणिक ग्रन्थहरूमा असीमित पहुँच पाउन सक्छन्।',
      promoCta: 'पोर्टल पहुँच गर्नुहोस्',
    },
    list: {
      headline: 'हालका अपलोडहरू',
      subtitle: 'शिक्षकहरूले थपेका पछिल्ला अध्ययन सामग्री।',
      filter: 'फिल्टर',
      sort: 'क्रमबद्ध',
      headerFileName: 'फाइल नाम',
      headerTypeSize: 'प्रकार / आकार',
      headerUploadedBy: 'अपलोड गर्ने',
      headerDate: 'मिति',
      headerAction: 'कार्य',
      loadMore: 'थप स्रोतहरू लोड गर्नुहोस्',
      detailsLabel: 'विवरण:',
      authorLabel: 'लेखक:',
      dateLabel: 'मिति:',
      items: [
        { title: 'कक्षा १० भौतिक विज्ञान पाठ्यक्रम २०२४-२५', type: 'PDF', size: '२.४ MB', author: 'डा. M. शर्मा', date: 'अक्टो. ५, २०२४' },
        { title: 'बीजगणित अभ्यास कार्यपत्र (अ. १-३)', type: 'PDF', size: '१.८ MB', author: 'R. वर्मा', date: 'अक्टो. ३, २०२४' },
        { title: 'इतिहास: द्वितीय विश्वयुद्ध अध्ययन गाइड', type: 'DOCX', size: '३.१ MB', author: 'A. देसाई', date: 'सेप्. २८, २०२४' },
        { title: 'जीवविज्ञान प्रयोगशाला सुरक्षा म्यानुअल', type: 'PDF', size: '४.५ MB', author: 'डा. M. शर्मा', date: 'सेप्. २५, २०२४' },
        { title: 'अंग्रेजी साहित्य पठन सूची', type: 'PDF', size: '१.२ MB', author: 'S. राज', date: 'सेप्. २०, २०२४' },
      ],
    },
  },
};

// Merge into typed dictionary
const translations: Record<Language, typeof en> = { en, ne };
export default translations;
