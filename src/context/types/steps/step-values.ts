export interface GeneralValuesInterface {
  firstName: string
  lastName: string
  country: string
  city: string
  professionalSummary: string
}

export interface SubjectItem {
  id: string
  name: string
}

export interface SubjectValuesInterface {
  category: string
  subjects: SubjectItem[]
}

export interface LanguageValuesInterface {
  language: string
}

export interface PhotoValuesInterface {
  photo: File | null
}

export interface StepLablesInterface {
  tutor: string[]
  student: string[]
}
