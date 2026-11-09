import type { Project, SkillGroup } from '../types/portfolio';
import type { Certification, SocialLink, TimelineItem } from '../types/portfolio';

export const EMAIL = 'tpaolma@gmail.com';

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
    title: 'WIT Barcode Student Information System',
    projectId: 'wit-barcode',
    kicker: 'Featured · Desktop Application · Barcode + Computer Vision',
    description:
      'A desktop application designed to improve student identification and information verification through barcode scanning and student record management. Built for Western Institute of Technology (WIT), the system ties together student records, enrollment, assessment, payments, reporting, and barcode-based identification with an AI training center for the detection pipeline.',
    role: 'Sole developer (design, build, integration)',
    technologies: ['C++', 'Python', 'PySide6', 'MySQL', 'YOLOv8', 'OpenCV'],
    image: 'images/wit-barcode/01_dashboard.png',
    imageAlt: 'WIT Barcode Student Information System main dashboard',
    imageLocal: true,
    github: 'https://github.com/toms1010/Wit-Barcode-Sutdent-information-System',
    categories: ['desktop'],
    featured: true,
    badges: ['Desktop Application', 'Computer Vision', 'Student Information Management'],
    screenshots: [
      {
        src: 'images/wit-barcode/01_dashboard.png',
        alt: 'WIT Barcode Student Information System main dashboard',
        caption: 'Dashboard',
      },
      {
        src: 'images/wit-barcode/02_dashboard_student_selected.png',
        alt: 'WIT Barcode dashboard with a student selected',
        caption: 'Dashboard — student selected',
      },
      {
        src: 'images/wit-barcode/03_students_directory.png',
        alt: 'WIT Barcode student records directory',
        caption: 'Student Management — directory',
      },
      {
        src: 'images/wit-barcode/04_students_record_selected.png',
        alt: 'WIT Barcode student record detail',
        caption: 'Student Management — record',
      },
      {
        src: 'images/wit-barcode/05_student_dialog_add.png',
        alt: 'WIT Barcode add student dialog',
        caption: 'Student Management — add dialog',
      },
      {
        src: 'images/wit-barcode/06_student_dialog_edit.png',
        alt: 'WIT Barcode edit student dialog',
        caption: 'Student Management — edit dialog',
      },
      {
        src: 'images/wit-barcode/07_enrollment_select_student.png',
        alt: 'WIT Barcode enrollment student selection',
        caption: 'Enrollment — select student',
      },
      {
        src: 'images/wit-barcode/08_enrollment_subjects.png',
        alt: 'WIT Barcode enrollment subjects',
        caption: 'Enrollment — subjects',
      },
      {
        src: 'images/wit-barcode/09_add_subject_dialog.png',
        alt: 'WIT Barcode add subject dialog',
        caption: 'Enrollment — add subject',
      },
      {
        src: 'images/wit-barcode/10_courses_subjects.png',
        alt: 'WIT Barcode courses and subjects',
        caption: 'Assessment — courses and subjects',
      },
      {
        src: 'images/wit-barcode/11_certificate_of_matriculation.png',
        alt: 'WIT Barcode certificate of matriculation',
        caption: 'Assessment — certificate of matriculation',
      },
      {
        src: 'images/wit-barcode/12_assessment_fees.png',
        alt: 'WIT Barcode assessment fees',
        caption: 'Assessment & Payments — fees',
      },
      {
        src: 'images/wit-barcode/13_record_payment_dialog.png',
        alt: 'WIT Barcode record payment dialog',
        caption: 'Assessment & Payments — record payment',
      },
      {
        src: 'images/wit-barcode/14_reports_analytics.png',
        alt: 'WIT Barcode reports and analytics',
        caption: 'Reports & Analytics',
      },
      {
        src: 'images/wit-barcode/16_scanner_idle.png',
        alt: 'WIT Barcode scanner idle',
        caption: 'Barcode Scanner — idle',
      },
      {
        src: 'images/wit-barcode/17_scanner_verified.png',
        alt: 'WIT Barcode scanner verified',
        caption: 'Barcode Scanner — verified',
      },
      {
        src: 'images/wit-barcode/18_scan_result_dialog.png',
        alt: 'WIT Barcode scan result dialog',
        caption: 'Barcode Scanner — result',
      },
      {
        src: 'images/wit-barcode/19_scanner_camera_running.png',
        alt: 'WIT Barcode scanner camera running',
        caption: 'Barcode Scanner — camera',
      },
      {
        src: 'images/wit-barcode/20_training_center_dataset.png',
        alt: 'WIT Barcode AI training center dataset',
        caption: 'AI Training Center — dataset',
      },
      {
        src: 'images/wit-barcode/21_training_center_training.png',
        alt: 'WIT Barcode AI model training',
        caption: 'AI Training Center — training',
      },
      {
        src: 'images/wit-barcode/22_training_center_models.png',
        alt: 'WIT Barcode AI training models',
        caption: 'AI Training Center — models',
      },
      {
        src: 'images/wit-barcode/23_settings.png',
        alt: 'WIT Barcode application settings',
        caption: 'Settings',
      },
    ],
    objectives: [
      'Manage student records, enrollment, assessment, payments, and reporting in one desktop application',
      'Integrate barcode scanning with computer vision for student identification',
      'Provide an AI training center for the detection pipeline',
    ],
  },
  {
    title: 'Shadow Hunter',
    projectId: 'shadow-hunter',
    kicker: 'Featured · Python + Pygame 2D action game',
    description:
      '“Shadow Hunter” — a 2D action / hack-and-slash survival game built with Python 3 + Pygame (offline, no backend). Pick 1 of 4 hunters, clear 10 themed levels with waves, traps and unique bosses, loot 8 upgradeable weapons with rarity tiers, and defeat the Shadow King. All 13 screenshots below are captured from the actual Pygame runtime at 1280×720 landscape.',
    role: 'Sole developer (design, code, art pipeline, audio, tests)',
    technologies: ['Python', 'Pygame', 'JSON', 'pytest'],
    image: 'images/shadow-hunter/shadow-hunter-combat.png',
    imageAlt:
      'Landscape 16:9 screenshot of Shadow Hunter combat gameplay captured from the Pygame runtime at 1280 by 720',
    imageLocal: true,
    github: 'https://github.com/toms1010',
    categories: ['game'],
    featured: false,
    badges: ['Desktop Game', '2D Action', 'Computer Engineering'],
    screenshots: [
      {
        src: 'images/shadow-hunter/shadow-hunter-main-menu.png',
        alt: 'Shadow Hunter main menu screen',
        caption: 'Main Menu',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-character-select.png',
        alt: 'Shadow Hunter character selection screen',
        caption: 'Character Selection',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-world-map.png',
        alt: 'Shadow Hunter world map screen',
        caption: 'World Map',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-combat.png',
        alt: 'Shadow Hunter combat gameplay',
        caption: 'Combat Gameplay',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-boss-fight.png',
        alt: 'Shadow Hunter boss fight',
        caption: 'Boss Fight',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-weapon-found.png',
        alt: 'Shadow Hunter weapon found screen',
        caption: 'Weapon Found',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-weapon-upgrade.png',
        alt: 'Shadow Hunter weapon upgrade screen',
        caption: 'Weapon Upgrade',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-inventory.png',
        alt: 'Shadow Hunter inventory screen',
        caption: 'Inventory',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-customization.png',
        alt: 'Shadow Hunter customization screen',
        caption: 'Customization',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-level-1.png',
        alt: 'Shadow Hunter level 1 gameplay',
        caption: 'Level 1',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-level-complete.png',
        alt: 'Shadow Hunter level complete screen',
        caption: 'Level Complete',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-victory.png',
        alt: 'Shadow Hunter victory screen',
        caption: 'Victory',
      },
      {
        src: 'images/shadow-hunter/shadow-hunter-settings.png',
        alt: 'Shadow Hunter settings screen',
        caption: 'Settings',
      },
    ],
    objectives: [
      'Build a 2D action / hack-and-slash survival game with Python 3 + Pygame',
      'Offline gameplay with no backend dependency',
      '4 playable hunters, 10 themed levels with waves, traps, and unique bosses',
      '8 upgradeable weapons with rarity tiers',
    ],
    highlights: [
      {
        title: 'Hunters & abilities',
        body: '4 hunters, dodge with i-frames, plus Shadow Dash (Q), Burst (E) and Storm (R).',
      },
      {
        title: 'Weapons & loot',
        body: '8 weapons, levels, Common → Legendary rarities, special effects and upgrades.',
      },
      {
        title: 'World & bosses',
        body: '10 levels with unique bosses, crossfading explore / combat / boss music.',
      },
    ],
    controls: [
      { input: 'WASD / Arrows', action: 'Move' },
      { input: 'Mouse', action: 'Aim' },
      { input: 'LMB', action: 'Basic attack' },
      { input: 'RMB', action: 'Heavy attack' },
      { input: 'SPACE', action: 'Dodge (i-frames)' },
      { input: 'Q / E / R', action: 'Shadow Dash / Burst / Storm' },
      { input: 'ESC · TAB · I · M', action: 'Pause · Stats · Inventory · Map' },
    ],
    flow: [
      'MAIN MENU',
      'CHARACTER SELECT (4 hunters)',
      'CUSTOMIZE',
      'WORLD MAP',
      'LEVEL 1–10 (waves → boss → rewards)',
      'SHADOW KING',
      'VICTORY → CREDITS',
    ],
    runCommand: 'pip install -r requirements.txt\npython main.py',
    runNote:
      'Level 1 (Shadow Forest) is a guided tutorial: move → attack → weapon pickup → dodge → abilities → pickups → Wave 1 → upgrade → Ruined Shrine ambush → Forest Guardian.',
    cta: {
      title: 'A Real Playable Pygame Game',
      body: 'Offline Python + Pygame, JSON-driven hunters / weapons / levels / bosses, synthesized art + audio pipelines, and headless logic tests.',
    },
  },
  {
    title: 'Student Transport Management System',
    projectId: 'student-transport',
    kicker: 'Desktop Application · Student Transportation Management',
    description:
      'A desktop system designed to organize and manage student transportation operations for a college transport cell. Written in C++17 with a layered architecture and CSV persistence. Two front ends share one domain layer — a Qt Widgets desktop app and a console app.',
    role: 'Sole developer (design, build, tests)',
    technologies: ['C++17', 'Qt 6', 'CMake', 'CSV'],
    image: 'images/transport-system/10-admin-dashboard.png',
    imageAlt: 'Student Transport Management System admin dashboard',
    imageLocal: true,
    github: 'https://github.com/toms1010/Transport_System_Cpp',
    categories: ['desktop'],
    featured: true,
    badges: ['Desktop Application', 'C++ Desktop App', 'Console App', 'Computer Engineering'],
    screenshots: [
      {
        src: 'images/transport-system/01-login.png',
        alt: 'Transport System login screen',
        caption: 'Login',
      },
      {
        src: 'images/transport-system/02-registration-wizard.png',
        alt: 'Transport System registration wizard',
        caption: 'Registration wizard',
      },
      {
        src: 'images/transport-system/dark-01-login.png',
        alt: 'Transport System login screen (dark mode)',
        caption: 'Login — dark mode',
      },
      {
        src: 'images/transport-system/03-route-picker.png',
        alt: 'Transport System route picker',
        caption: 'Route picker',
      },
      {
        src: 'images/transport-system/04-seat-picker.png',
        alt: 'Transport System seat picker',
        caption: 'Seat picker',
      },
      {
        src: 'images/transport-system/05-public-routes.png',
        alt: 'Transport System public routes',
        caption: 'Public routes',
      },
      {
        src: 'images/transport-system/06-public-about.png',
        alt: 'Transport System public about page',
        caption: 'About',
      },
      {
        src: 'images/transport-system/10-admin-dashboard.png',
        alt: 'Transport System admin dashboard',
        caption: 'Admin dashboard',
      },
      {
        src: 'images/transport-system/11-admin-students.png',
        alt: 'Transport System admin students',
        caption: 'Admin — students',
      },
      {
        src: 'images/transport-system/12-admin-routes.png',
        alt: 'Transport System admin routes',
        caption: 'Admin — routes',
      },
      {
        src: 'images/transport-system/13-admin-seat-map.png',
        alt: 'Transport System admin seat map',
        caption: 'Admin — seat map',
      },
      {
        src: 'images/transport-system/14-admin-payments.png',
        alt: 'Transport System admin payments',
        caption: 'Admin — payments',
      },
      {
        src: 'images/transport-system/15-admin-complaints.png',
        alt: 'Transport System admin complaints',
        caption: 'Admin — complaints',
      },
      {
        src: 'images/transport-system/16-admin-notices.png',
        alt: 'Transport System admin notices',
        caption: 'Admin — notices',
      },
      {
        src: 'images/transport-system/17-admin-reports.png',
        alt: 'Transport System admin reports',
        caption: 'Admin — reports',
      },
      {
        src: 'images/transport-system/18-admin-staff-accounts.png',
        alt: 'Transport System admin staff accounts',
        caption: 'Admin — staff accounts',
      },
      {
        src: 'images/transport-system/19-admin-profile.png',
        alt: 'Transport System admin profile',
        caption: 'Admin — profile',
      },
      {
        src: 'images/transport-system/20-admin-help.png',
        alt: 'Transport System admin help',
        caption: 'Admin — help',
      },
      {
        src: 'images/transport-system/21-admin-settings.png',
        alt: 'Transport System admin settings',
        caption: 'Admin — settings',
      },
      {
        src: 'images/transport-system/30-student-dashboard.png',
        alt: 'Transport System student dashboard',
        caption: 'Student dashboard',
      },
      {
        src: 'images/transport-system/31-student-seat-map.png',
        alt: 'Transport System student seat map',
        caption: 'Student — seat map',
      },
      {
        src: 'images/transport-system/32-student-payments.png',
        alt: 'Transport System student payments',
        caption: 'Student — payments',
      },
      {
        src: 'images/transport-system/33-student-complaints.png',
        alt: 'Transport System student complaints',
        caption: 'Student — complaints',
      },
      {
        src: 'images/transport-system/34-student-notices.png',
        alt: 'Transport System student notices',
        caption: 'Student — notices',
      },
      {
        src: 'images/transport-system/35-student-allotment-card.png',
        alt: 'Transport System student allotment card',
        caption: 'Student — allotment card',
      },
      {
        src: 'images/transport-system/36-student-profile.png',
        alt: 'Transport System student profile',
        caption: 'Student — profile',
      },
      {
        src: 'images/transport-system/40-dark-dashboard.png',
        alt: 'Transport System dashboard (dark mode)',
        caption: 'Dashboard — dark mode',
      },
      {
        src: 'images/transport-system/41-dark-seat-map.png',
        alt: 'Transport System seat map (dark mode)',
        caption: 'Seat map — dark mode',
      },
      {
        src: 'images/transport-system/42-dark-payments.png',
        alt: 'Transport System payments (dark mode)',
        caption: 'Payments — dark mode',
      },
      {
        src: 'images/transport-system/43-dark-settings.png',
        alt: 'Transport System settings (dark mode)',
        caption: 'Settings — dark mode',
      },
    ],
    objectives: [
      'Build a college transport management app with C++17 and a layered architecture',
      'Ship two front ends (Qt Widgets desktop + console) over one shared domain layer',
      'Implement seat allocation, route fare/capacity UI, payments against two fee buckets, and complaints tracking',
      'Use CSV persistence with no external database dependency',
    ],
    workflow: [
      'Admin/Staff: manage roster, routes, seats, dues, complaints, notices',
      'Student: view routes, pick seats, pay fees, track complaints',
      'Public: browse routes and about information',
      'Domain layer: shared business rules between both front ends',
      'Storage: CSV persistence with no external database dependency',
    ],
    challenges: [
      {
        title: 'Shared domain layer',
        body: 'Designed one C++ domain layer reused by both Qt Widgets desktop and console front ends.',
      },
      {
        title: 'Two fee buckets',
        body: 'Implemented payment tracking against two separate fee buckets per student route.',
      },
      {
        title: 'CSV persistence',
        body: 'Built file-based persistence with no external database dependency for portability.',
      },
    ],
  },
  {
    title: 'JDAJNSH',
    projectId: 'jdajnsh',
    kicker: 'Featured · School website',
    description:
      'Official rules and information website for Jose Diva Avelino Jr. National High School (Hipona, Pontevedra, Capiz, est. 1966) — presenting the school, its “Knowledge Is Power” motto, and the Student Code of Conduct with dress code, classroom, attendance, and disciplinary guidelines.',
    role: 'Consultant · Software Developer (team project)',
    technologies: STATIC_STACK,
    image: 'images/featured-jdajnsh.jpg',
    imageAlt: 'JDAJNSH school website showing student code of conduct, dress code, classroom, attendance, and disciplinary guidelines',
    imageLocal: true,
    demo: 'https://toms1010.github.io/JDAJNSH/',
    github: 'https://github.com/toms1010/JDAJNSH',
    categories: ['web'],
    featured: true,
    objectives: [
      'Present the school, its “Knowledge Is Power” motto, and the Student Code of Conduct',
      'Include dress code, classroom, attendance, and disciplinary guidelines',
    ],
  },
  {
    title: 'MARPOL Ocean Adventure',
    projectId: 'marpol-ocean-adventure',
    kicker: 'Featured · Educational games',
    description:
      '“Ocean Guardian: Marpol Mission” — an educational web experience about marine pollution prevention with study resources (PDF documents and video lessons) plus playable browser games: Clean Ocean Quiz, Shark Attack, and 4 Pics 1 Word.',
    technologies: STATIC_STACK,
    image: 'images/featured-marpol-ocean-adventure.jpg',
    imageAlt: 'MARPOL Ocean Adventure educational game site with Clean Ocean Quiz, Shark Attack, and 4 Pics 1 Word games',
    imageLocal: true,
    demo: 'https://marpol-ocean-adventure.vercel.app/',
    categories: ['web', 'game'],
    featured: true,
    objectives: [
      'Educational web experience about marine pollution prevention',
      'Study resources: PDF documents and video lessons',
      'Playable browser games: Clean Ocean Quiz, Shark Attack, and 4 Pics 1 Word',
    ],
  },
  {
    title: 'Battle of Bands Registration',
    projectId: 'battle-of-bands',
    kicker: 'Registration · Web app',
    description: 'Real-time entry management and check-in system for a live event.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Manual band sign-ups were slow and disorganized.',
    solution: 'Online registration with organized real-time entries.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/zWdFT1MR/battle-of-band-registretion.png',
    imageAlt: 'Battle of Bands registration web app for real-time band entry management and event check-in',
    demo: 'https://script.google.com/macros/s/AKfycbxRmkaE5fOwuG8KZj-TJBtDwBvFmKe_gPDik-jyjMYlCPRxmSBbi9vqbo9l0Qm3MPyhpw/exec',
    categories: ['web', 'registration'],
  },
  {
    title: 'Pre-Event Registration',
    projectId: 'pre-event-registration',
    kicker: 'Registration · Web app',
    description: 'Attendee pre-registration with confirmation and QR codes.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Walk-in queues and missing attendee records.',
    solution: 'Pre-registration with email confirmation and QR codes.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/FLt5FHnX/pre-registretions.png',
    imageAlt: 'Pre-Event Registration web app with email confirmation and QR codes for attendee check-in',
    demo: 'https://script.google.com/macros/s/AKfycbyOjf_tjqrhi2JpCymJ9fCZ2TyYzYzCsTRas734Zjl1X_hb2WcZpC-pYPpKGHmk1cOFRg/exec',
    categories: ['web', 'registration'],
  },
  {
    title: 'Cap Order Manager',
    projectId: 'cap-order-manager',
    kicker: 'Orders · Web app',
    description: 'Structured cap ordering with size, quantity, and payment tracking.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Tracking cap sizes, quantities, and payments in chat threads.',
    solution: 'Structured ordering with size, quantity, and payment tracking.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/XZv3qKC7/cap-order.png',
    imageAlt: 'Cap Order Manager web app for structured cap ordering with size, quantity, and payment tracking',
    demo: 'https://script.google.com/macros/s/AKfycbxUvzN7DWYCxiReTpMRV-SAM8jshWICAOqUo2AY_oRgA5evaTvblxXynuDdlNbDUuyOvQ/exec',
    categories: ['web', 'orders'],
  },
  {
    title: 'T-Shirt Order System',
    projectId: 't-shirt-order-system',
    kicker: 'Orders · Web app',
    description: 'Merchandise ordering with size, color, and payment tracking.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Messy merch orders scattered across messages.',
    solution: 'Ordering with size, color, and payment tracking.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/FkBHnQvj/t-shirt-ordere.png',
    imageAlt: 'T-Shirt Order System web app for merchandise ordering with size, color, and payment tracking',
    demo: 'https://script.google.com/macros/s/AKfycbwfUhwke2t327QhKXQyuaZKOmk0wQEXHgy7_TQsUQrR83aJiqvvHd9SFvDjNKEc8gwskg/exec',
    categories: ['web', 'orders'],
  },
  {
    title: 'Campus Navigation',
    projectId: 'campus-navigation',
    kicker: 'Events · Web app',
    description: 'Interactive venue map with directions and hall info.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Attendees getting lost between venues.',
    solution: 'Interactive venue map with directions and hall info.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/67C2Jm91/navigation.png',
    imageAlt: 'Campus Navigation web app with interactive venue map, directions, and hall information',
    demo: 'https://script.google.com/macros/s/AKfycbzeYL2aX3qKzQ4faMyn1o3wZ8-_o3XvmPw84rRW1r4_Fk1oBxftKIM8__y_GTd-rGHRfg/exec',
    categories: ['web', 'events'],
  },
  {
    title: 'Participant Rating',
    projectId: 'participant-rating',
    kicker: 'Events & Scoring · Web app',
    description: 'Real-time committee rating with instant score calculation.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Slow paper-based judging.',
    solution: 'Real-time committee rating with instant feedback and score calculation.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/b5zd8sHq/rating.png',
    imageAlt: 'Participant Rating web app for real-time committee rating with instant score calculation',
    demo: 'https://script.google.com/macros/s/AKfycbyeCGD4cl_fSFRwsYe2y0o0tFh46PiorDDgQ8gZfIekQDYqdwrpJ99gMZ-cmGFFW9C5/exec',
    categories: ['web', 'events'],
  },
  {
    title: 'Sports Event Manager',
    projectId: 'sports-event-manager',
    kicker: 'Events & Scoring · Web app',
    description: 'Centralized schedules, teams, and live scoreboards.',
    role: 'Sole developer (design, build, deploy)',
    problem: 'Scattered schedules and scores.',
    solution: 'Centralized schedules, teams, and live scoreboards.',
    technologies: WEB_STACK,
    image: 'https://i.ibb.co/spQndCCQ/sport.png',
    imageAlt: 'Sports Event Manager web app with centralized schedules, teams, and live scoreboards',
    demo: 'https://script.google.com/macros/s/AKfycbzlp4gT7GG-uEdLfKCd76pdh8CloEl8HVc1UK5TuaTEdjI8TxTnFcqwAcecYWlP7cQVkQ/exec',
    categories: ['web', 'events'],
  },
  {
    title: 'Periodic Table Explorer',
    projectId: 'periodic-table',
    kicker: 'Web Application · Educational Periodic Table',
    description:
      'An interactive periodic table website that provides an organized way to explore chemical elements. Search elements by name or symbol, filter by group, and view detailed element properties — built as a clean, responsive educational reference.',
    role: 'Sole developer (design, build, deploy)',
    problem:
      'Element data is scattered across dense chemistry references; students need a quick, visual lookup.',
    solution:
      'A searchable, filterable periodic table web app with element details, group color-coding, and mobile-friendly layout.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/Chem-lab/periodic-table.png',
    imageAlt: 'Periodic Table Explorer educational web app screenshot',
    imageLocal: true,
    demo: 'https://peroidic-table.vercel.app/',
    categories: ['web'],
    featured: true,
    badges: ['Web Application', 'Educational', 'Responsive'],
    objectives: [
      'Searchable, filterable periodic table of the elements',
      'Group color-coding and element property details',
      'Responsive educational reference for students',
    ],
  },
];

/**
 * Technical skills organized by experience tier, grounded in actual project
 * work and certifications. No arbitrary percentages or progress bars — only
 * honest self-classification.
 *
 * Tiers:
 *   'used'        — shipped in a completed project (experienced).
 *   'familiar'    — practiced, but not yet a core project technology.
 *   'learning'    — actively studying; not claimed as expertise.
 */

/** Technologies shipped in completed projects. */
export const SKILLS_USED_IN_PROJECTS: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    items: [
      { name: 'C', note: 'ICPEP competition', tier: 'used', logo: 'images/tech/c.svg' },
      { name: 'C++', note: 'Transport System (Qt), WIT Barcode', tier: 'used', logo: 'images/tech/cpp.svg' },
      { name: 'Java', note: 'Certified', tier: 'used', logo: 'images/tech/java.svg' },
      { name: 'JavaScript', note: 'Shipped web apps', tier: 'used', logo: 'images/tech/javascript.svg' },
      { name: 'Python', note: 'WIT Barcode + Shadow Hunter', tier: 'used' },
    ],
  },
  {
    title: 'Web Development',
    icon: 'globe',
    items: [
      { name: 'HTML', note: 'Certified + shipped', tier: 'used', logo: 'images/tech/html.svg' },
      { name: 'CSS', note: 'Certified + shipped', tier: 'used', logo: 'images/tech/css.svg' },
      { name: 'JavaScript', note: 'Event-management web apps', tier: 'used', logo: 'images/tech/javascript.svg' },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: [
      { name: 'MySQL', note: 'WIT Barcode', tier: 'used', logo: 'images/tech/mysql.svg' },
    ],
  },
  {
    title: 'Desktop Development',
    icon: 'mobile',
    items: [
      { name: 'Qt', note: 'Transport System desktop front end', tier: 'used' },
      { name: 'PySide6', note: 'WIT Barcode desktop front end', tier: 'used' },
    ],
  },
  {
    title: 'Game Development',
    icon: 'game',
    items: [
      { name: 'Python', note: 'Shadow Hunter game', tier: 'used' },
      { name: 'Pygame', note: '2D action game (Shadow Hunter)', tier: 'used' },
    ],
  },
  {
    title: 'Hardware & Embedded',
    icon: 'chip',
    items: [
      { name: 'Arduino', note: 'Workshops & mentoring', tier: 'used' },
      { name: 'Microcontrollers', note: 'Embedded systems coursework', tier: 'used' },
    ],
  },
  {
    title: 'Developer Tools',
    icon: 'tools',
    items: [
      { name: 'Git', note: 'Version control', tier: 'used', logo: 'images/tech/git.svg' },
      { name: 'GitHub', note: 'Project hosting', tier: 'used', logo: 'images/tech/github-mark.svg' },
      { name: 'CMake', note: 'Transport System build system', tier: 'used' },
    ],
  },
];

/** Technologies practiced but not yet core to a shipped project. */
export const SKILLS_FAMILIAR_WITH: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    items: [
      { name: 'C#', note: 'Certified', tier: 'familiar', logo: 'images/tech/csharp.svg' },
      { name: 'TypeScript', note: 'This portfolio', tier: 'familiar', logo: 'images/tech/typescript.svg' },
    ],
  },
  {
    title: 'Web Development',
    icon: 'globe',
    items: [
      { name: 'TypeScript', note: 'This portfolio codebase', tier: 'familiar', logo: 'images/tech/typescript.svg' },
      { name: 'React', note: 'This portfolio', tier: 'familiar', logo: 'images/tech/react.svg' },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'server',
    items: [
      { name: 'Node.js', note: 'Tooling practice', tier: 'familiar', logo: 'images/tech/nodejs.svg' },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: [
      { name: 'MongoDB', note: 'Exploration', tier: 'familiar', logo: 'images/tech/mongodb.svg' },
      { name: 'PostgreSQL', note: 'Coursework', tier: 'familiar' },
    ],
  },
  {
    title: 'Desktop Development',
    icon: 'mobile',
    items: [
      { name: 'Electron', note: 'Prototyping', tier: 'familiar', logo: 'images/tech/electron.svg' },
    ],
  },
  {
    title: 'Mobile Development',
    icon: 'mobile',
    items: [
      { name: 'Android', note: 'Coursework', tier: 'familiar', logo: 'images/tech/android.svg' },
    ],
  },
  {
    title: 'Game Development',
    icon: 'game',
    items: [
      { name: 'Godot', note: 'Exploration', tier: 'familiar', logo: 'images/tech/godot.svg' },
    ],
  },
  {
    title: 'Hardware & Embedded',
    icon: 'chip',
    items: [
      { name: 'IoT Concepts', note: 'Coursework', tier: 'familiar' },
    ],
  },
  {
    title: 'Developer Tools',
    icon: 'tools',
    items: [
      { name: 'Docker', note: 'Container basics', tier: 'familiar', logo: 'images/tech/docker.svg' },
    ],
  },
];

/** Technologies actively being studied — shown as a learning path, not expertise. */
export const SKILLS_CURRENTLY_LEARNING: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: 'code',
    items: [
      { name: 'Go', tier: 'learning', logo: 'images/tech/go.svg' },
      { name: 'Rust', tier: 'learning', logo: 'images/tech/rust.svg' },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'server',
    items: [
      { name: 'ASP.NET Core', tier: 'learning', logo: 'images/tech/dotnet.svg' },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: [
      { name: 'Neon', tier: 'learning', logo: 'images/tech/neon.svg' },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: 'cloud',
    items: [
      { name: 'AWS', tier: 'learning', logo: 'images/tech/aws.svg' },
      { name: 'Microsoft Azure', tier: 'learning', logo: 'images/tech/azure.svg' },
      { name: 'Google Cloud', tier: 'learning', logo: 'images/tech/gcloud.svg' },
      { name: 'Firebase', tier: 'learning', logo: 'images/tech/firebase.svg' },
    ],
  },
  {
    title: 'DevOps / Infrastructure',
    icon: 'chip',
    items: [
      { name: 'Docker', tier: 'learning', logo: 'images/tech/docker.svg' },
      { name: 'Terraform', tier: 'learning', logo: 'images/tech/terraform.png' },
      { name: 'Ansible', tier: 'learning', logo: 'images/tech/ansible.svg' },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Python Programming',
    description: 'Data analysis & automation',
    image: 'images/certifecation/python-1.png',
    category: 'Programming & Software Development',
  },
  {
    name: 'Web Development Fundamentals',
    description: 'HTML, CSS, JavaScript',
    image: 'images/certifecation/basic-web-development-1.png',
    category: 'Web Development',
  },
  {
    name: 'C# Programming',
    description: 'Fundamentals of C# development',
    image: 'images/certifecation/csharp.png',
    category: 'Programming & Software Development',
  },
  {
    name: 'Java Basic Certificate',
    description: 'Core Java concepts',
    image: 'images/certifecation/java-basics.png',
    category: 'Programming & Software Development',
  },
  {
    name: 'R Basic Certificate',
    description: 'Statistical computing with R',
    image: 'images/certifecation/r-basics.png',
    category: 'Databases & Data Science',
  },
  {
    name: 'SQL Basic Certificate',
    description: 'Database querying & management',
    image: 'images/certifecation/sql.png',
    category: 'Databases & Data Science',
  },
  {
    name: 'Data Science Certification',
    description: 'Data analysis & mathematical modeling',
    image: 'images/certifecation/data-science.png',
    category: 'Databases & Data Science',
  },
  {
    name: 'Cybersecurity Fundamentals',
    description: 'Best practices & principles',
    image: 'images/certifecation/cybersecurity-fundamentals-1.png',
    category: 'Cybersecurity',
  },
  {
    name: 'Ethical Hacking',
    description: 'Penetration testing & assessment concepts',
    image: 'images/certifecation/ethical-hacking-1.png',
    category: 'Cybersecurity',
  },
  {
    name: 'Cyber Hygiene',
    description: 'Maintaining secure systems',
    image: 'images/certifecation/cyberhygiene-1.png',
    category: 'Cybersecurity',
  },
  {
    name: 'Advanced Technical Training',
    description: 'Comprehensive technical program',
    image: 'images/certifecation/certificate-of-completion-1.png',
    category: 'Workshops & Technical Training',
  },
  {
    name: 'System Configuration',
    description: 'Setup & configuration',
    image: 'images/certifecation/installing-and-configuring-1.png',
    category: 'Hardware & System Configuration',
  },
  {
    name: 'Basic Hardware',
    description: 'Computer hardware fundamentals',
    image: 'images/certifecation/basic-hardware-1.png',
    category: 'Hardware & System Configuration',
  },
  {
    name: 'Computer Setup',
    description: 'Configuring computer systems',
    image: 'images/certifecation/setting-up-computer-1.png',
    category: 'Hardware & System Configuration',
  },
  {
    name: 'Aviation Technology',
    description: 'Aviation-related tech systems',
    image: 'images/certifecation/aviations-1.png',
    category: 'Workshops & Technical Training',
  },
  {
    name: 'Certificate of Cyber',
    description: 'Cyber security fundamentals',
    image: 'images/certifecation/certificate-of-cyber.png',
    category: 'Cybersecurity',
  },
  {
    name: 'Data Visualization Workshop',
    description: 'Visual analytics & dashboards',
    image: 'images/certifecation/data-visualization-workshop.png',
    category: 'Databases & Data Science',
  },
  {
    name: 'Google Cloud Fundamentals',
    description: 'Core cloud infrastructure',
    image: 'images/certifecation/google-cloud-fundamentals.png',
    category: 'Cloud Computing',
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    kicker: 'Currently Studying',
    title: 'Bachelor of Science in Computer Engineering',
    organization: 'Western Institute of Technology',
    date: 'Iloilo City, Philippines',
    description:
      'Focus: software development, computer systems, programming, hardware-software integration, embedded systems, and engineering problem-solving. Coursework and self-study span programming (C, Python, Java, C#), web technologies, databases, and cybersecurity fundamentals — reinforced by ICPEP competition experience and Arduino mentoring.',
    responsibilities: [
      'Software Development',
      'Computer Systems',
      'Programming',
      'Hardware-Software Integration',
      'Embedded Systems',
      'Engineering Problem-Solving',
    ],
  },
];

export const EXPERIENCE: TimelineItem[] = [
  {
    kicker: 'Technical Experience',
    title: 'ICPEP — C Programming Competition',
    organization: 'ICPEP (Institute of Computer Engineers of the Philippines)',
    date: '2024',
    description:
      'Competed in C Programming, solving live problems and answering technical questions in front of judges.',
    responsibilities: [
      'Solved timed C programming problems under competition conditions.',
      'Defended technical solutions during live Q&A with judges.',
      'Applied memory management, pointers, and algorithmic thinking in C.',
    ],
  },
  {
    kicker: 'Technical Experience',
    title: 'JDAJNSH School Website Consultant / Developer',
    organization: 'Jose Diva Avelino Jr. National High School',
    date: '2024',
    description:
      'Consultant and software developer on a team-built rules and information website presenting the school, its motto, and the Student Code of Conduct.',
    responsibilities: [
      'Consulted on site structure and student-code-of-conduct content.',
      'Developed frontend pages using HTML, CSS, and JavaScript.',
      'Collaborated with a team to deploy a live information site for students and parents.',
    ],
  },
  {
    kicker: 'Technical Experience',
    title: 'Event Management Web Application Developer',
    organization: 'Self-initiated / deployed at real events',
    date: '2024–2025',
    description:
      'Designed, built, and deployed 7 live web apps for registrations, merchandise orders, venue navigation, scoring, and sports scheduling — used during actual events.',
    responsibilities: [
      'Built registration, pre-registration (QR), cap and T-shirt order, venue navigation, participant rating, and sports event manager apps.',
      'Used Google Apps Script, HTML, CSS, and JavaScript for each deployment.',
      'Deployed live tools used by real attendees during events.',
    ],
  },
  {
    kicker: 'Technical Experience',
    title: 'Arduino Workshop Facilitator',
    organization: 'Student workshops',
    date: '2024–2025',
    description:
      'Mentored fellow students in Arduino basics and programming fundamentals through hands-on workshops.',
    responsibilities: [
      'Facilitated hands-on Arduino workshops for beginner students.',
      'Taught programming fundamentals and embedded-systems concepts.',
      'Guided students through wiring, coding, and debugging microcontroller projects.',
    ],
  },
  {
    kicker: 'Technical Experience',
    title: 'Programming Fundamentals Mentor',
    organization: 'Peer mentoring',
    date: '2024–2025',
    description:
      'Mentored fellow students in programming fundamentals, reinforcing C, Python, and Java concepts.',
    responsibilities: [
      'Explained programming fundamentals to peers in one-on-one and small-group sessions.',
      'Reviewed code and helped debug assignments in C, Python, and Java.',
      'Reinforced problem-solving techniques and structured thinking.',
    ],
  },
];

/**
 * Student leadership and organizational experience.
 * Presented separately from technical work to highlight communication,
 * teamwork, accountability, and organizational leadership.
 */
export const LEADERSHIP: TimelineItem[] = [
  {
    kicker: 'ICpEP.SE Region VI',
    title: 'Regional Auditor',
    organization: 'ICpEP.SE (Student Chapter of the Institute of Computer Engineers of the Philippines) — Region VI',
    date: '2024–2025 Academic Year',
    description:
      'Regional Auditor for the ICpEP.SE student organization, overseeing financial transparency and records for the region.',
    responsibilities: [
      'Audited organizational financial records and transactions.',
      'Maintained transparent financial documentation for the regional chapter.',
      'Reported audit findings to officers and members.',
    ],
  },
  {
    kicker: 'ACES',
    title: 'First Year Representative',
    organization: 'ACES (Association of Computer Engineering Students)',
    date: '2024–2025 Academic Year',
    description:
      'First Year Representative representing incoming computer engineering students in the student organization.',
    responsibilities: [
      'Voiced first-year student concerns in organization meetings.',
      'Helped onboard new members and organize orientation activities.',
      'Served as liaison between first-year students and organization officers.',
    ],
  },
  {
    kicker: 'NSTP',
    title: 'President',
    organization: 'NSTP (National Service Training Program) class',
    date: '2024–2025 Academic Year',
    description:
      'Class President for the NSTP cohort, leading classmates through civic-welfare and community-service activities.',
    responsibilities: [
      'Led the NSTP class in planning and executing community-service activities.',
      'Coordinated with instructors and class officers on civic-welfare projects.',
      'Represented the class in program-wide meetings and events.',
    ],
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
