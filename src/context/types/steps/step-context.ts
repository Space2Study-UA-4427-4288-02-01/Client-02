import { ReactNode } from 'react'
import { UserRole } from '~/types'
import {
  GeneralValuesInterface,
  SubjectValuesInterface,
  LanguageValuesInterface,
  PhotoValuesInterface
} from '~/context/types'

export interface StepProviderProps {
  children: ReactNode
  userRole: '' | UserRole
}

export interface GeneralData {
  data: GeneralValuesInterface
  errors: GeneralValuesInterface
}

export interface StepData {
  [key: string]:
    | GeneralData
    | SubjectValuesInterface
    | LanguageValuesInterface
    | PhotoValuesInterface
}

export interface StepContextValue {
  stepData: StepData
  steps: string[]
  updateGeneral: (
    data: Partial<GeneralValuesInterface>,
    errors?: Partial<GeneralValuesInterface>
  ) => void
  updateSubject: (data: SubjectValuesInterface) => void
  updateLanguage: (data: LanguageValuesInterface) => void
  updatePhoto: (data: PhotoValuesInterface) => void
}
