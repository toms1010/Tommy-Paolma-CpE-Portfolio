/**
 * Project screenshot data organized by category.
 *
 * Place the actual image files under `public/images/wit-barcode/` and
 * `public/images/transport-system/` respectively. The directories
 * `docu/screenshots/` and `do/screenshots/` referenced in the brief do not
 * exist in this repository, so the image files must be copied into
 * `public/` before the galleries will render.
 *
 * Each entry uses the exact filename from the brief.
 */

export type ScreenshotCategory =
  | 'dashboard'
  | 'student-management'
  | 'enrollment-management'
  | 'financial-management'
  | 'reports-analytics'
  | 'barcode-scanner'
  | 'ai-training-center'
  | 'settings'
  | 'authentication'
  | 'public-interface'
  | 'admin-dashboard'
  | 'student-dashboard'
  | 'dark-mode';

/** \file
 * Project screenshot data organized by category.
 *
 * Place the actual image files under `public/images/transport-system/` and
 * `public/images/wit-barcode/` respectively. The source directories
 * `do/screenshots/` and `docu/screenshots/` referenced in the brief live in
 * the C++ project and do not exist here, so the image files must be copied
 * into `public/` before the galleries will render.
 *
 * Each entry uses the exact filename from the brief.
 */

export interface ScreenshotItem {
  src: string;
  alt: string;
  caption: string;
  category: ScreenshotCategory;
}

/**
 * PROJECT 1: WIT Barcode Student Information System
 * Source directory: docu/screenshots/ (copy images to public/images/wit-barcode/)
 */
export const WIT_BARCODE_SCREENSHOTS: ScreenshotItem[] = [
  // Dashboard
  {
    src: 'images/wit-barcode/01_dashboard.png',
    alt: 'WIT Barcode SIS dashboard view',
    caption: 'Dashboard — main overview',
    category: 'dashboard',
  },
  {
    src: 'images/wit-barcode/02_dashboard_student_selected.png',
    alt: 'WIT Barcode SIS dashboard with student selected',
    caption: 'Dashboard — student selected',
    category: 'dashboard',
  },
  // Student Management
  {
    src: 'images/wit-barcode/03_students_directory.png',
    alt: 'WIT Barcode SIS students directory',
    caption: 'Students directory',
    category: 'student-management',
  },
  {
    src: 'images/wit-barcode/04_students_record_selected.png',
    alt: 'WIT Barcode SIS student record selected',
    caption: 'Student record detail',
    category: 'student-management',
  },
  {
    src: 'images/wit-barcode/05_student_dialog_add.png',
    alt: 'WIT Barcode SIS add student dialog',
    caption: 'Add student dialog',
    category: 'student-management',
  },
  {
    src: 'images/wit-barcode/06_student_dialog_edit.png',
    alt: 'WIT Barcode SIS edit student dialog',
    caption: 'Edit student dialog',
    category: 'student-management',
  },
  // Enrollment Management
  {
    src: 'images/wit-barcode/07_enrollment_select_student.png',
    alt: 'WIT Barcode SIS enrollment select student',
    caption: 'Enrollment — select student',
    category: 'enrollment-management',
  },
  {
    src: 'images/wit-barcode/08_enrollment_subjects.png',
    alt: 'WIT Barcode SIS enrollment subjects',
    caption: 'Enrollment — subjects',
    category: 'enrollment-management',
  },
  {
    src: 'images/wit-barcode/09_add_subject_dialog.png',
    alt: 'WIT Barcode SIS add subject dialog',
    caption: 'Add subject dialog',
    category: 'enrollment-management',
  },
  {
    src: 'images/wit-barcode/10_courses_subjects.png',
    alt: 'WIT Barcode SIS courses and subjects',
    caption: 'Courses and subjects',
    category: 'enrollment-management',
  },
  {
    src: 'images/wit-barcode/11_certificate_of_matriculation.png',
    alt: 'WIT Barcode SIS certificate of matriculation',
    caption: 'Certificate of matriculation',
    category: 'enrollment-management',
  },
  {
    src: 'images/wit-barcode/15_enrollment_summary_dialog.png',
    alt: 'WIT Barcode SIS enrollment summary dialog',
    caption: 'Enrollment summary dialog',
    category: 'enrollment-management',
  },
  // Financial Management
  {
    src: 'images/wit-barcode/12_assessment_fees.png',
    alt: 'WIT Barcode SIS assessment fees',
    caption: 'Assessment fees',
    category: 'financial-management',
  },
  {
    src: 'images/wit-barcode/13_record_payment_dialog.png',
    alt: 'WIT Barcode SIS record payment dialog',
    caption: 'Record payment dialog',
    category: 'financial-management',
  },
  // Reports and Analytics
  {
    src: 'images/wit-barcode/14_reports_analytics.png',
    alt: 'WIT Barcode SIS reports and analytics',
    caption: 'Reports and analytics',
    category: 'reports-analytics',
  },
  // Barcode Scanner
  {
    src: 'images/wit-barcode/16_scanner_idle.png',
    alt: 'WIT Barcode SIS scanner idle',
    caption: 'Barcode scanner — idle',
    category: 'barcode-scanner',
  },
  {
    src: 'images/wit-barcode/17_scanner_verified.png',
    alt: 'WIT Barcode SIS scanner verified',
    caption: 'Barcode scanner — verified',
    category: 'barcode-scanner',
  },
  {
    src: 'images/wit-barcode/18_scan_result_dialog.png',
    alt: 'WIT Barcode SIS scan result dialog',
    caption: 'Scan result dialog',
    category: 'barcode-scanner',
  },
  {
    src: 'images/wit-barcode/19_scanner_camera_running.png',
    alt: 'WIT Barcode SIS scanner camera running',
    caption: 'Barcode scanner — camera running',
    category: 'barcode-scanner',
  },
  // AI Training Center
  {
    src: 'images/wit-barcode/20_training_center_dataset.png',
    alt: 'WIT Barcode SIS AI training center dataset',
    caption: 'AI training — dataset',
    category: 'ai-training-center',
  },
  {
    src: 'images/wit-barcode/21_training_center_training.png',
    alt: 'WIT Barcode SIS AI training center training',
    caption: 'AI training — training',
    category: 'ai-training-center',
  },
  {
    src: 'images/wit-barcode/22_training_center_models.png',
    alt: 'WIT Barcode SIS AI training center models',
    caption: 'AI training — models',
    category: 'ai-training-center',
  },
  // Settings
  {
    src: 'images/wit-barcode/23_settings.png',
    alt: 'WIT Barcode SIS settings',
    caption: 'Settings',
    category: 'settings',
  },
];

/**
 * PROJECT 2: Transport System C++
 * Source directory: do/screenshots/ (copy images to public/images/transport-system/)
 */
export const TRANSPORT_SYSTEM_SCREENSHOTS: ScreenshotItem[] = [
  // Authentication
  {
    src: 'images/transport-system/01-login.png',
    alt: 'Transport System login screen',
    caption: 'Login',
    category: 'authentication',
  },
  {
    src: 'images/transport-system/02-registration-wizard.png',
    alt: 'Transport System registration wizard',
    caption: 'Registration wizard',
    category: 'authentication',
  },
  {
    src: 'images/transport-system/dark-01-login.png',
    alt: 'Transport System login screen (dark mode)',
    caption: 'Login — dark mode',
    category: 'authentication',
  },
  // Public Interface
  {
    src: 'images/transport-system/03-route-picker.png',
    alt: 'Transport System route picker',
    caption: 'Route picker',
    category: 'public-interface',
  },
  {
    src: 'images/transport-system/04-seat-picker.png',
    alt: 'Transport System seat picker',
    caption: 'Seat picker',
    category: 'public-interface',
  },
  {
    src: 'images/transport-system/05-public-routes.png',
    alt: 'Transport System public routes',
    caption: 'Public routes',
    category: 'public-interface',
  },
  {
    src: 'images/transport-system/06-public-about.png',
    alt: 'Transport System public about page',
    caption: 'About',
    category: 'public-interface',
  },
  // Admin Dashboard
  {
    src: 'images/transport-system/10-admin-dashboard.png',
    alt: 'Transport System admin dashboard',
    caption: 'Admin dashboard',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/11-admin-students.png',
    alt: 'Transport System admin students',
    caption: 'Admin — students',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/12-admin-routes.png',
    alt: 'Transport System admin routes',
    caption: 'Admin — routes',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/13-admin-seat-map.png',
    alt: 'Transport System admin seat map',
    caption: 'Admin — seat map',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/14-admin-payments.png',
    alt: 'Transport System admin payments',
    caption: 'Admin — payments',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/15-admin-complaints.png',
    alt: 'Transport System admin complaints',
    caption: 'Admin — complaints',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/16-admin-notices.png',
    alt: 'Transport System admin notices',
    caption: 'Admin — notices',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/17-admin-reports.png',
    alt: 'Transport System admin reports',
    caption: 'Admin — reports',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/18-admin-staff-accounts.png',
    alt: 'Transport System admin staff accounts',
    caption: 'Admin — staff accounts',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/19-admin-profile.png',
    alt: 'Transport System admin profile',
    caption: 'Admin — profile',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/20-admin-help.png',
    alt: 'Transport System admin help',
    caption: 'Admin — help',
    category: 'admin-dashboard',
  },
  {
    src: 'images/transport-system/21-admin-settings.png',
    alt: 'Transport System admin settings',
    caption: 'Admin — settings',
    category: 'admin-dashboard',
  },
  // Student Dashboard
  {
    src: 'images/transport-system/30-student-dashboard.png',
    alt: 'Transport System student dashboard',
    caption: 'Student dashboard',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/31-student-seat-map.png',
    alt: 'Transport System student seat map',
    caption: 'Student — seat map',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/32-student-payments.png',
    alt: 'Transport System student payments',
    caption: 'Student — payments',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/33-student-complaints.png',
    alt: 'Transport System student complaints',
    caption: 'Student — complaints',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/34-student-notices.png',
    alt: 'Transport System student notices',
    caption: 'Student — notices',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/35-student-allotment-card.png',
    alt: 'Transport System student allotment card',
    caption: 'Student — allotment card',
    category: 'student-dashboard',
  },
  {
    src: 'images/transport-system/36-student-profile.png',
    alt: 'Transport System student profile',
    caption: 'Student — profile',
    category: 'student-dashboard',
  },
  // Dark Mode
  {
    src: 'images/transport-system/40-dark-dashboard.png',
    alt: 'Transport System dashboard (dark mode)',
    caption: 'Dashboard — dark mode',
    category: 'dark-mode',
  },
  {
    src: 'images/transport-system/41-dark-seat-map.png',
    alt: 'Transport System seat map (dark mode)',
    caption: 'Seat map — dark mode',
    category: 'dark-mode',
  },
  {
    src: 'images/transport-system/42-dark-payments.png',
    alt: 'Transport System payments (dark mode)',
    caption: 'Payments — dark mode',
    category: 'dark-mode',
  },
  {
    src: 'images/transport-system/43-dark-settings.png',
    alt: 'Transport System settings (dark mode)',
    caption: 'Settings — dark mode',
    category: 'dark-mode',
  },
];