import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/user-stepper/steps/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/user-stepper/steps/language-step/LanguageStep'

import {
  tutorStepLabels,
  studentStepLabels,
  initialValues
} from '~/containers/user-stepper/constants'
import { student } from '~/constants'

interface StepperProps {
  userRole: string
}

const UserStepper: FC<StepperProps> = ({ userRole }) => {
  const { firstName, lastName } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const stepComponents = [
    <GeneralInfoStep key='1' />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepperInitialValues =
    firstName && lastName
      ? { ...initialValues, firstName, lastName }
      : initialValues
  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={stepperInitialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{stepComponents}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepper
