import type { NavItem, Project, SkillGroup } from '../types/portfolio';
import type { Certification, SocialLink, TimelineItem } from '../types/portfolio';

export const EMAIL = 'tpaolma@gmail.com';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'CpE', href: '#computer-engineering' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Tommy Paolma on X (Twitter)', href: 'https://x.com/TPaolma88394', icon: 'x' },
  { label: 'Tommy Paolma on GitHub', href: 'https://github.com/toms1010', icon: 'github' },
  {
    label: 'Tommy Paolma on LinkedIn',
    href: 'https://www.linkedin.com/in/tommy-paolma-65663b341/',
    icon: 'linkedin',
  },
  {
    label: 'Tommy Paolma on Facebook',
    href: 'https://web.facebook.com/tommy.b.paolma',
    icon: 'facebook',
  },
];

export const GITHUB_PROFILE = 'https://github.com/toms1010';

const WEB_STACK = ['Google Apps Script', 'HTML', 'CSS', 'JavaScript'];
const STATIC_STACK = ['HTML', 'CSS', 'JavaScript'];

export const PROJECTS: Project[] = [
  {
    title: 'JDAJNSH',
    kicker: 'Featured · School website',
    description:
      'Official rules and information website for Jose Diva Avelino Jr. National High School (Hipona, Pontevedra, Capiz, est. 1966) — presenting the school, its “Knowledge Is Power” motto, and the Student Code of Conduct with dress code, classroom, attendance, and disciplinary guidelines.',
    role: 'Consultant · Software Developer (team project)',
    technologies: STATIC_STACK,
    image: 'images/featured-jdajnsh.jpg',
    imageAlt: 'Screenshot of the JDAJNSH school rules and information website',
    imageLocal: true,
    demo: 'https://toms1010.github.io/JDAJNSH/',
    github: 'https://github.com/toms1010/JDAJNSH',
    categories: ['web'],
    featured: true,
  },
  {
    title: 'MARPOL Ocean Adventure',
    kicker: 'Featured · Educational games',
    description:
      '“Ocean Guardian: Marpol Mission” — an educational web experience about marine pollution prevention with study resources (PDF documents and video lessons) plus playable browser games: Clean Ocean Quiz, Shark Attack, and 4 Pics 1 Word.',
    technologies: STATIC_STACK,
    image: 'images/featured-marpol-ocean-adventure.jpg',
    imageAlt: 'Screenshot of the MARPOL Ocean Adventure educational game site',
    imageLocal: true,
    demo: 'https://marpol-ocean-adventure.vercel.app/',
    categories: ['web', 'game'],
    featured: true,
  },
  {
    title: 'Battle of Bands Registration',
    kicker: 'Registration · Web app',
    description: 'Real-time entry management and check-in system for a live event.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Manual band sign-ups were slow and disorganized.',
    solution: 'Online registration with organized real-time entries.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/zWdFT1MR/battle-of-band-registretion.png',
    imageAlt: 'Screenshot of the Battle of Bands registration web app',
    demo: 'https://script.google.com/macros/s/AKfycbxRmkaE5fOwuG8KZj-TJBtDwBvFmKe_gPDik-jyjMYlCPRxmSBbi9vqbo9l0Qm3MPyhpw/exec',
    categories: ['web', 'registration'],
  },
  {
    title: 'Pre-Event Registration',
    kicker: 'Registration · Web app',
    description: 'Attendee pre-registration with confirmation and QR codes.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Walk-in queues and missing attendee records.',
    solution: 'Pre-registration with email confirmation and QR codes.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/FLt5FHnX/pre-registretions.png',
    imageAlt: 'Screenshot of the Pre-Event Registration web app',
    demo: 'https://script.google.com/macros/s/AKfycbyOjf_tjqrhi2JpCymJ9fCZ2TyYzYzCsTRas734Zjl1X_hb2WcZpC-pYPpKGHmk1cOFRg/exec',
    categories: ['web', 'registration'],
  },
  {
    title: 'Cap Order Manager',
    kicker: 'Orders · Web app',
    description: 'Structured cap ordering with size, quantity, and payment tracking.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Tracking cap sizes, quantities, and payments in chat threads.',
    solution: 'Structured ordering with size, quantity, and payment tracking.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/XZv3qKC7/cap-order.png',
    imageAlt: 'Screenshot of the Cap Order Manager web app',
    demo: 'https://script.google.com/macros/s/AKfycbxUvzN7DWYCxiReTpMRV-SAM8jshWICAOqUo2AY_oRgA5evaTvblxXynuDdlNbDUuyOvQ/exec',
    categories: ['web', 'orders'],
  },
  {
    title: 'T-Shirt Order System',
    kicker: 'Orders · Web app',
    description: 'Merchandise ordering with size, color, and payment tracking.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Messy merch orders scattered across messages.',
    solution: 'Ordering with size, color, and payment tracking.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/FkBHnQvj/t-shirt-ordere.png',
    imageAlt: 'Screenshot of the T-Shirt Order System web app',
    demo: 'https://script.google.com/macros/s/AKfycbwfUhwke2t327QhKXQyuaZKOmk0wQEXHgy7_TQsUQrR83aJiqvvHd9SFvDjNKEc8gwskg/exec',
    categories: ['web', 'orders'],
  },
  {
    title: 'Campus Navigation',
    kicker: 'Events · Web app',
    description: 'Interactive venue map with directions and hall info.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Attendees getting lost between venues.',
    solution: 'Interactive venue map with directions and hall info.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/67C2Jm91/navigation.png',
    imageAlt: 'Screenshot of the Campus Navigation web app',
    demo: 'https://script.google.com/macros/s/AKfycbzeYL2aX3qKzQ4faMyn1o3wZ8-_o3XvmPw84rRW1r4_Fk1oBxftKIM8__y_GTd-rGHRfg/exec',
    categories: ['web', 'events'],
  },
  {
    title: 'Participant Rating',
    kicker: 'Events & Scoring · Web app',
    description: 'Real-time committee rating with instant score calculation.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Slow paper-based judging.',
    solution: 'Real-time committee rating with instant feedback and score calculation.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/b5zd8sHq/rating.png',
    imageAlt: 'Screenshot of the Participant Rating web app',
    demo: 'https://script.google.com/macros/s/AKfycbyeCGD4cl_fSFRwsYe2y0o0tFh46PiorDDgQ8gZfIekQDYqdwrpJ99gMZ-cmGFFW9C5/exec',
    categories: ['web', 'events'],
  },
  {
    title: 'Sports Event Manager',
    kicker: 'Events & Scoring · Web app',
    description: 'Centralized schedules, teams, and live scoreboards.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Scattered schedules and scores.',
    solution: 'Centralized schedules, teams, and live scoreboards.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/spQndCCQ/sport.png',
    imageAlt: 'Screenshot of the Sports Event Manager web app',
    demo: 'https://script.google.com/macros/s/AKfycbzlp4gT7GG-uEdLfKCd76pdh8CloEl8HVc1UK5TuaTEdjI8TxTnFcqwAcecYWlP7cQVkQ/exec',
    categories: ['web', 'events'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    items: [
      { name: 'Python', note: 'Certified' },
      { name: 'Java', note: 'Certified' },
      { name: 'C', note: 'ICPEP competition' },
      { name: 'C++', note: 'Arduino / embedded' },
      { name: 'C#', note: 'Certified' },
      { name: 'SQL', note: 'Certified' },
      { name: 'R', note: 'Certified' },
      { name: 'JavaScript', note: 'Shipped web apps' },
    ],
  },
  {
    title: 'Web Development',
    icon: 'globe',
    items: [
      { name: 'HTML', note: 'Certified + shipped' },
      { name: 'CSS', note: 'Certified + shipped' },
      { name: 'Google Apps Script', note: '7 live apps' },
      { name: 'Responsive design', note: 'Applied' },
    ],
  },
  {
    title: 'Engineering & Embedded',
    icon: 'chip',
    blurb:
      'Arduino workshops, mentoring peers, hardware fundamentals, computer setup and configuration.',
    items: [
      { name: 'Arduino', note: 'Workshops' },
      { name: 'Sensors', note: 'Basics' },
      { name: 'Hardware setup', note: 'Certified' },
    ],
    images: [
      {
        src: 'https://i.ibb.co/fd6M0jS7/teaching-arduino1.jpg',
        alt: 'Tommy leading an Arduino workshop',
      },
      {
        src: 'https://i.ibb.co/1f6fFvXd/teaching-arduino2.jpg',
        alt: 'Students learning Arduino with Tommy',
      },
    ],
  },
  {
    title: 'Data, Backend & Cloud',
    icon: 'database',
    items: [
      { name: 'Data Science basics', note: 'Certified' },
      { name: 'Data Visualization', note: 'Workshop' },
      { name: 'Google Cloud fundamentals', note: 'Certified' },
    ],
  },
  {
    title: 'Security Fundamentals',
    icon: 'shield',
    items: [
      { name: 'Cybersecurity fundamentals', note: 'Certified' },
      { name: 'Ethical hacking concepts', note: 'Certified' },
      { name: 'Cyber hygiene', note: 'Certified' },
    ],
  },
  {
    title: 'Tools',
    icon: 'tools',
    items: [
      { name: 'Git', note: 'Used' },
      { name: 'GitHub', note: 'Used' },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Python Programming',
    description: 'Data analysis & automation',
    image: 'images/python-1.png',
  },
  {
    name: 'Web Development Fundamentals',
    description: 'HTML, CSS, JavaScript',
    image: 'images/basic-web-development-1.png',
  },
  {
    name: 'C# Programming',
    description: 'Fundamentals of C# development',
    image: 'images/csharp.png',
  },
  {
    name: 'Java Basic Certificate',
    description: 'Core Java concepts',
    image: 'images/java-basics.png',
  },
  {
    name: 'R Basic Certificate',
    description: 'Statistical computing with R',
    image: 'images/r-basics.png',
  },
  {
    name: 'SQL Basic Certificate',
    description: 'Database querying & management',
    image: 'images/sql.png',
  },
  {
    name: 'Data Science Certification',
    description: 'Data analysis & mathematical modeling',
    image: 'images/data-science.png',
  },
  {
    name: 'Cybersecurity Fundamentals',
    description: 'Best practices & principles',
    image: 'images/cybersecurity-fundamentals-1.png',
  },
  {
    name: 'Ethical Hacking',
    description: 'Penetration testing & assessment concepts',
    image: 'images/ethical-hacking-1.png',
  },
  {
    name: 'Cyber Hygiene',
    description: 'Maintaining secure systems',
    image: 'images/cyberhygiene-1.png',
  },
  {
    name: 'Advanced Technical Training',
    description: 'Comprehensive technical program',
    image: 'images/certificate-of-completion-1.png',
  },
  {
    name: 'System Configuration',
    description: 'Setup & configuration',
    image: 'images/installing-and-configuring-1.png',
  },
  {
    name: 'Basic Hardware',
    description: 'Computer hardware fundamentals',
    image: 'images/basic-hardware-1.png',
  },
  {
    name: 'Computer Setup',
    description: 'Configuring computer systems',
    image: 'images/setting-up-computer-1.png',
  },
  {
    name: 'Aviation Technology',
    description: 'Aviation-related tech systems',
    image: 'images/aviations-1.png',
  },
  {
    name: 'Certificate of Cyber',
    description: 'Cyber security fundamentals',
    image: 'images/certificate-of-cyber.png',
  },
  {
    name: 'Data Visualization Workshop',
    description: 'Visual analytics & dashboards',
    image: 'images/data-visualization-workshop.png',
  },
  {
    name: 'Google Cloud Fundamentals',
    description: 'Core cloud infrastructure',
    image: 'images/google-cloud-fundamentals.png',
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    kicker: 'In progress',
    title: 'Bachelor of Science in Computer Engineering',
    description:
      'Focus: software development, hardware-software integration, and engineering problem-solving. Coursework and self-study span programming (C, Python, Java, C#), web technologies, databases, and cybersecurity fundamentals — reinforced by ICPEP competition experience and Arduino mentoring.',
  },
];

export const EXPERIENCE: TimelineItem[] = [
  {
    kicker: 'Competition',
    title: 'ICPEP — C Programming',
    description:
      'Competed in C Programming, including live problem-solving and technical Q&A in front of judges.',
  },
  {
    kicker: 'Consultant · Team',
    title: 'JDAJNSH School Website',
    description:
      'Served as consultant and software developer on a team-built rules and information website for Jose Diva Avelino Jr. National High School.',
  },
  {
    kicker: 'Developer · Real events',
    title: 'Event Management Web Apps',
    description:
      'Designed, built, and deployed 7 live web apps for registrations, merchandise orders, venue navigation, scoring, and sports scheduling — used during actual events.',
  },
  {
    kicker: 'Mentor',
    title: 'Arduino & Programming Workshops',
    description:
      'Mentored fellow students in Arduino basics and programming fundamentals through hands-on workshops.',
  },
];

export const TYPING_ROLES = [
  'Game Developer',
  'Mobile Developer',
  'Data Analyst',
  'Web Developer',
  'Full-Stack Developer',
  'Desktop Developer',
  'OS Developer',
  'Computer Engineer',
] as const;

export const GALLERY: { src: string; alt: string; caption: string }[] = [
  {
    src: 'https://i.ibb.co/jPrn3gfZ/code-for-the-website.webp',
    alt: 'Tommy refining website source code',
    caption: 'Deep in the logic — refining source code.',
  },
  {
    src: 'https://i.ibb.co/tw5vM5Fq/presentetation-of-website.webp',
    alt: 'Tommy presenting a website project',
    caption: 'Pitching the vision — demonstrating features.',
  },
  {
    src: 'https://i.ibb.co/xqT0QYZG/programming.webp',
    alt: 'Tommy programming at a workstation',
    caption: 'In the zone — every semicolon counts.',
  },
  {
    src: 'https://i.ibb.co/xS72zNh6/awarding-for-c-programming.webp',
    alt: 'Tommy receiving an award for C programming',
    caption: 'Recognized for C Programming at ICPEP.',
  },
  {
    src: 'https://i.ibb.co/6JRLXTmQ/speaking-and-question-about-the-technology.webp',
    alt: 'Tommy answering technical questions',
    caption: 'Sharing insights and defending the tech stack.',
  },
  {
    src: 'https://i.ibb.co/nNsPHxP1/questioning-about-the-technology.webp',
    alt: 'Technical Q and A session',
    caption: 'The best way to learn is to ask — technical Q&A.',
  },
];
