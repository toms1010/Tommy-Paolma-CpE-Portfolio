import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Layout,
  Monitor,
  ScanBarcode,
  Wallet,
  GraduationCap,
  ChartNoAxesCombined,
} from 'lucide-react';
import { asset } from '../lib/asset';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SocialGlyph } from './icons';
import { GalleryModal } from './common/GalleryModal';
import { ProjectImage } from './common/ProjectImage';

const GITHUB = 'https://github.com/toms1010/Wit-Barcode-Sutdent-information-System';

const BADGES = [
  'Featured Project',
  'Desktop Application',
  'Computer Vision',
  'Student Information Management',
];

const OVERVIEW_FEATURES = [
  'Student records and directory management',
  'Enrollment, subject selection, and summaries',
  'Assessment and payment tracking',
  'Reporting and analytics',
  'Barcode scanning with computer vision',
  'AI training center for detection models',
];

const GALLERY: { src: string; alt: string; caption: string }[] = [
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
    caption: 'Enrollment — courses and subjects',
  },
  {
    src: 'images/wit-barcode/11_certificate_of_matriculation.png',
    alt: 'WIT Barcode certificate of matriculation',
    caption: 'Enrollment — certificate of matriculation',
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
];

type GalleryCategoryId =
  | 'all'
  | 'dashboard'
  | 'student-management'
  | 'enrollment'
  | 'assessment-payments'
  | 'reports'
  | 'scanner'
  | 'ai-training'
  | 'settings';

const GALLERY_CATEGORIES: { id: GalleryCategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'student-management', label: 'Student Management' },
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'assessment-payments', label: 'Assessment & Payments' },
  { id: 'reports', label: 'Reports & Analytics' },
  { id: 'scanner', label: 'Barcode Scanner' },
  { id: 'ai-training', label: 'AI Training Center' },
  { id: 'settings', label: 'Settings' },
];

/** Filter gallery items by category id using caption prefixes. */
function filterGallery(category: GalleryCategoryId): typeof GALLERY {
  const prefixes: Partial<Record<GalleryCategoryId, string>> = {
    dashboard: 'Dashboard',
    'student-management': 'Student Management',
    enrollment: 'Enrollment',
    'assessment-payments': 'Assessment',
    reports: 'Reports',
    scanner: 'Barcode Scanner',
    'ai-training': 'AI Training',
    settings: 'Settings',
  };

  if (category === 'all') {
    return GALLERY;
  }

  const prefix = prefixes[category];

  return GALLERY.filter((shot) =>
    category === 'settings'
      ? shot.caption === 'Settings'
      : shot.caption.startsWith(prefix ?? ''),
  );
}

/** Reusable screenshot grid used by category sections and the full gallery. */
function ScreenshotGrid({
  images,
  onSelect,
  columns = 'sm:grid-cols-2 lg:grid-cols-3',
}: {
  images: typeof GALLERY;
  onSelect: (src: string) => void;
  columns?: string;
}): React.JSX.Element {
  return (
    <div className={`mt-6 grid gap-5 ${columns}`}>
      {images.map((shot) => (
        <figure
          key={shot.src}
          className="group overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
        >
          <button
            type="button"
            onClick={() => {
              onSelect(shot.src);
            }}
            aria-label={`View screenshot: ${shot.caption}`}
            className="block w-full overflow-hidden bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <img
              src={asset(shot.src)}
              alt={shot.alt}
              loading="lazy"
              width={640}
              height={360}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
          <figcaption className="p-4 text-sm font-bold">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Card({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}): React.JSX.Element {
  return (
    <div
      aria-label={label}
      className="rounded-3xl border border-line bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-xl sm:p-8"
    >
      {children}
    </div>
  );
}

export function WITBarcode(): React.JSX.Element {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] =
    useState<GalleryCategoryId>('all');
  const [selectedGallerySrc, setSelectedGallerySrc] = useState<string | null>(
    null,
  );

  const visibleGallery = filterGallery(galleryCategory);

  const modalImages = selectedGallerySrc
    ? [
        ...visibleGallery.filter((image) => image.src === selectedGallerySrc),
        ...visibleGallery.filter((image) => image.src !== selectedGallerySrc),
      ]
    : visibleGallery;

  const features = [
    'Student Management — register, edit, view, search, and manage student records.',
    'CODE39 Barcode Generation — generate student-specific CODE39 barcodes.',
    'AI-Assisted Barcode Detection — use YOLOv8n for barcode detection during webcam scanning.',
    'Subject Enrollment — manage student enrollment and subject selection.',
    'Certificate of Matriculation — generate printable enrollment certificates.',
    'Assessment and Payments — track tuition, miscellaneous, laboratory, discounts, payments, and balances.',
    'Reports and Analytics — generate PDF reports and visualize relevant system data.',
    'YOLO Training Center — manage datasets, training processes, and available models.',
  ];

  const technologies = [
    'Python',
    'PySide6',
    'Qt 6',
    'MySQL',
    'YOLOv8n',
    'OpenCV',
    'python-barcode',
    'pyzbar',
    'CODE39',
    'ReportLab',
    'pytest',
  ];

  return (
    <section
      id="project-wit-barcode"
      aria-labelledby="wit-barcode-heading"
      className="scroll-mt-24 py-16"
    >
      <Reveal>
        <p className="mb-3 text-center text-xs font-bold tracking-[0.25em] text-muted">
          CASE STUDY / FEATURED PROJECT
        </p>
        <SectionHeading id="wit-barcode-heading" accent="Barcode">
          WIT Barcode
        </SectionHeading>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          A desktop student information and enrollment management system integrating barcode
          scanning and computer vision.
        </p>

        <ul
          aria-label="Project badges"
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {BADGES.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
            >
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WIT Barcode source code on GitHub (opens in a new tab)"
            className="btn-primary min-h-11 px-6 py-2.5 text-sm"
          >
            <SocialGlyph icon="github" className="h-4 w-4" /> GitHub{' '}
            <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 px-6 py-2.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
        </div>

        {/* Overview */}
        <div className="mt-10">
          <Card label="Overview">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Monitor className="h-6 w-6 text-accent" aria-hidden="true" focusable="false" />
              Overview
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted">
              The WIT Barcode Student Information System is a desktop application developed for
              Western Institute of Technology (WIT) to streamline student information management,
              barcode-based identification, subject enrollment, tuition assessment, and payment
              tracking.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
              Built with Python and PySide6, the application integrates a MySQL database with
              YOLOv8n-based barcode detection, CODE39 barcode generation and decoding, and PDF
              report generation.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
              The system provides an integrated workflow for student records, enrollment, financial
              assessment, barcode scanning, reports, and model training. It is a single-process
              desktop application: the UI-to-data communication happens through in-process Python
              services, and there is no HTTP API or web server.
            </p>
            <div className="mx-auto mt-6 grid max-w-4xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
              {OVERVIEW_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-line bg-black/5 p-4 dark:bg-black/25"
                >
                  <p className="flex items-center gap-2 font-bold">
                    <Layers className="h-4 w-4 text-accent" aria-hidden="true" />
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Dashboard */}
        <div className="mt-10">
          <Card label="Dashboard">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Layers className="h-6 w-6 text-accent" aria-hidden="true" />
              Dashboard
            </h3>
            <figure className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-line bg-card">
              <ProjectImage
                src={asset('images/wit-barcode/01_dashboard.png')}
                alt="WIT Barcode Student Information System main dashboard"
                width={1280}
                height={720}
                className="aspect-video w-full object-cover object-center"
              />
            </figure>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
              Main Dashboard — WIT Barcode Student Information System.
            </p>
            <figure className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-line bg-card">
              <ProjectImage
                src={asset('images/wit-barcode/02_dashboard_student_selected.png')}
                alt="WIT Barcode dashboard with a student selected"
                width={1280}
                height={720}
                className="aspect-video w-full object-cover object-center"
              />
            </figure>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
              Dashboard Detail View — Student Selected.
            </p>
          </Card>
        </div>

        {/* Student Management */}
        <div className="mt-10">
          <Card label="Student Management">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
              Student Management
            </h3>
            <ScreenshotGrid
              images={filterGallery('student-management')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2 lg:grid-cols-4"
            />
          </Card>
        </div>

        {/* Enrollment */}
        <div className="mt-10">
          <Card label="Enrollment">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
              Enrollment Management
            </h3>
            <ScreenshotGrid
              images={filterGallery('enrollment')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2 lg:grid-cols-5"
            />
          </Card>
        </div>

        {/* Assessment & Payments */}
        <div className="mt-10">
          <Card label="Assessment and Payments">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Wallet className="h-6 w-6 text-accent" aria-hidden="true" />
              Assessment & Payments
            </h3>
            <ScreenshotGrid
              images={filterGallery('assessment-payments')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2"
            />
          </Card>
        </div>

        {/* Reports & Analytics */}
        <div className="mt-10">
          <Card label="Reports and Analytics">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <ChartNoAxesCombined className="h-6 w-6 text-accent" aria-hidden="true" />
              Reports & Analytics
            </h3>
            <ScreenshotGrid
              images={filterGallery('reports')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2"
            />
          </Card>
        </div>

        {/* Barcode Scanner */}
        <div className="mt-10">
          <Card label="Barcode Scanner">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <ScanBarcode className="h-6 w-6 text-accent" aria-hidden="true" />
              Barcode Scanner
            </h3>
            <ScreenshotGrid
              images={filterGallery('scanner')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2 lg:grid-cols-4"
            />
          </Card>
        </div>

        {/* AI Training Center */}
        <div className="mt-10">
          <Card label="AI Training Center">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Layers className="h-6 w-6 text-accent" aria-hidden="true" />
              AI Training Center
            </h3>
            <ScreenshotGrid
              images={filterGallery('ai-training')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2 lg:grid-cols-3"
            />
          </Card>
        </div>

        {/* Settings */}
        <div className="mt-10">
          <Card label="Settings">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
              Settings
            </h3>
            <ScreenshotGrid
              images={filterGallery('settings')}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2"
            />
          </Card>
        </div>

        {/* Full Gallery */}
        <div className="mt-10">
          <Card label="Project Gallery">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Layers className="h-6 w-6 text-accent" aria-hidden="true" />
              Project Gallery
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
              Explore {visibleGallery.length} of {GALLERY.length} screenshots
              from the actual WIT Barcode desktop application.
              Select a screenshot to view it in the gallery.
            </p>

            <div
              aria-label="Screenshot categories"
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={galleryCategory === category.id}
                  onClick={() => {
                    setGalleryCategory(category.id);
                    setSelectedGallerySrc(null);
                  }}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    galleryCategory === category.id
                      ? 'border-accent bg-accent/15 text-accent'
                      : 'border-line bg-card text-ink hover:border-accent'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-70">
                    {category.id === 'all'
                      ? GALLERY.length
                      : filterGallery(category.id).length}
                  </span>
                </button>
              ))}
            </div>

            <ScreenshotGrid
              images={visibleGallery}
              onSelect={(src) => {
                setSelectedGallerySrc(src);
                setGalleryOpen(true);
              }}
              columns="sm:grid-cols-2 lg:grid-cols-3"
            />

            {visibleGallery.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted">
                No screenshots found in this category.
              </p>
            )}

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedGallerySrc(null);
                  setGalleryOpen(true);
                }}
                className="btn-primary min-h-11 px-6 py-2.5 text-sm"
              >
                Open Complete Gallery
              </button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-10">
          <Card label="Core Features">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Layout className="h-6 w-6 text-accent" aria-hidden="true" />
              Core Features
            </h3>
            <ul className="mx-auto mt-6 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-2xl border border-line bg-black/5 p-4 text-sm text-muted dark:bg-black/25"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="mt-10">
          <Card label="Technology Stack">
            <h3 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <Layers className="h-6 w-6 text-accent" aria-hidden="true" />
              Technology Stack
            </h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA + nav */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-accent to-highlight p-6 text-center text-white sm:p-10">
          <h3 className="text-2xl font-extrabold">A Real Desktop Application</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Student information, enrollment, assessment, payments, reporting, and barcode scanning
            in one desktop application.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub repository (opens in a new tab)"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            View Code on GitHub{' '}
            <ExternalLink className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            aria-label="Back to projects section"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" focusable="false" /> Back to Projects
          </a>
          <a
            href="#project-shadow-hunter"
            aria-label="Next project: Shadow Hunter"
            className="btn-outline min-h-11 w-full px-5 py-2.5 text-sm sm:w-auto"
          >
            Next Project <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
          </a>
        </nav>
      </Reveal>

      <GalleryModal
        images={modalImages}
        open={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
          setSelectedGallerySrc(null);
        }}
        title="WIT Barcode — Project Gallery"
      />
    </section>
  );
}
