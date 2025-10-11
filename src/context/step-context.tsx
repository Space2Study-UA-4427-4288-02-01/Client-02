import { createContext, useContext, useState } from 'react'
import { UserRoleEnum } from '~/types'
import {
  generalValues,
  subjectValues,
  languageValues,
  photoValues,
  stepLabels
} from './constants'
import {
  GeneralValuesInterface,
  StepProviderProps,
  StepData,
  StepContextValue,
  SubjectValuesInterface,
  LanguageValuesInterface,
  PhotoValuesInterface
} from '~/context/types'

const StepContext = createContext({} as StepContextValue)

const StepProvider = ({ children, userRole }: StepProviderProps) => {
  const [generalData, setGeneralData] = useState({
    data: generalValues,
    errors: generalValues
  })
  const [subject, setSubject] = useState(subjectValues)
  const [language, setLanguage] = useState(languageValues)
  const [photo, setPhoto] = useState(photoValues)

  const steps =
    userRole === UserRoleEnum.Student ? stepLabels.student : stepLabels.tutor
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = steps

  const stepData: StepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const updateGeneral = (
    data: Partial<GeneralValuesInterface>,
    errors?: Partial<GeneralValuesInterface>
  ) => {
    setGeneralData((prev) => ({
      data: { ...prev.data, ...data },
      errors: { ...prev.errors, ...errors }
    }))
  }

  const updateSubject = (data: SubjectValuesInterface) => setSubject(data)

  const updateLanguage = (data: LanguageValuesInterface) => setLanguage(data)

  const updatePhoto = (data: PhotoValuesInterface) => setPhoto(data)

  const contextValue = {
    stepData,
    steps,
    updateGeneral,
    updateSubject,
    updateLanguage,
    updatePhoto
  }

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
