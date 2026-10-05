export type Role = 'admin' | 'teacher' | 'student' | 'parent'
export type ContentType = 'news' | 'notice' | 'blog'

export interface Profile {
  id: string
  role: Role
  full_name: string | null
  email: string | null
  created_at: string
}

export interface AcademicYear {
  id: string
  name: string
  start_date: string
  end_date: string
  is_active: boolean | null
  created_at: string | null
}

export interface Class {
  id: string
  name: string
  section: string
  academic_year_id: string | null
  created_at: string | null
  academic_years?: { name: string } | null
}

export interface Subject {
  id: string
  name: string
  code: string
  class_id: string | null
  created_at: string | null
  classes?: { name: string; section: string } | null
}

export interface Exam {
  id: string
  name: string
  academic_year_id: string | null
  created_at: string | null
  academic_years?: { name: string } | null
}

export interface TeacherSubject {
  id: string
  teacher_id: string | null
  subject_id: string | null
  created_at: string | null
  subjects?: Subject | null
}

export interface Assignment {
  id: string
  title: string
  description: string | null
  subject_id: string | null
  due_date: string | null
  teacher_id: string | null
  created_at: string | null
  subjects?: { name: string; classes?: { name: string; section: string } | null } | null
}

export interface Material {
  id: string
  title: string
  file_url: string
  subject_id: string | null
  teacher_id: string | null
  created_at: string | null
  subjects?: { name: string } | null
}

export interface Mark {
  id: string
  student_id: string | null
  exam_id: string | null
  subject_id: string | null
  marks_obtained: number | null
  total_marks: number | null
  remarks: string | null
  teacher_id: string | null
  created_at: string | null
  subjects?: { name: string; code: string } | null
  exams?: { name: string; academic_years?: { name: string } | null } | null
  profiles?: { full_name: string | null } | null
}

export interface Content {
  id: string
  type: ContentType
  title: string
  body: string
  author_id: string | null
  published: boolean | null
  created_at: string
  profiles?: { full_name: string | null } | null
}

export interface StudentEnrollment {
  id: string
  student_id: string | null
  class_id: string | null
  roll_number: number | null
  created_at: string | null
  classes?: Class | null
  profiles?: Profile | null
}

export interface ParentStudent {
  parent_id: string
  student_id: string
  created_at: string | null
  profiles?: Profile | null
}

// ---------------------------------------------------------------------------
// WEBSITE TYPES (for constants.ts)
// ---------------------------------------------------------------------------

export interface NavLink { label: string; href: string }
export interface Stat { value: string; label: string; icon: string }
export interface NewsItem { id: string; tag: string; title: string; excerpt: string; date: string; imageUrl: string; imageAlt: string }
export interface Testimonial { id: string; quote: string; name: string; role: string; avatarUrl: string }
export interface UpcomingEvent { id: string; title: string; date: string; icon: string; iconBg: string }
export interface AdmissionStep { step: number; title: string; description: string; icon: string }
export interface Department { id: string; name: string; description: string; icon: string; subjects: string[]; color: string }
export interface Activity { id: string; title: string; description: string; category: string; imageUrl: string; imageAlt: string; span: string }
export interface Club { id: string; name: string; icon: string; members: number; description: string }
export interface ContactDetail { icon: string; label: string; value: string }
export interface OfficeHour { days: string; hours: string }
export interface ResourceCategory { id: string; label: string; icon: string }
export interface Resource { id: string; title: string; description: string; category: string; fileType: string; fileSize: string; downloadUrl: string; icon: string }
