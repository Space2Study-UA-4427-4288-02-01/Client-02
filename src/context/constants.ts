import {
  GeneralValuesInterface,
  SubjectValuesInterface,
  LanguageValuesInterface,
  PhotoValuesInterface,
  StepLablesInterface
} from '~/context/types'

export const generalValues: GeneralValuesInterface = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: ''
} as const

export const subjectValues: SubjectValuesInterface = {
  category: '',
  subjects: []
}

export const languageValues: LanguageValuesInterface = {
  language: ''
}

export const photoValues: PhotoValuesInterface = {
  photo: null
}

export const stepLabels: StepLablesInterface = {
  tutor: ['generalInfo', 'subjects', 'language', 'photo'],
  student: ['generalInfo', 'interests', 'language', 'photo']
}
