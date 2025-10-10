import { FC } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/user-stepper/steps/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/user-stepper/steps/language-step/LanguageStep'
import { UserRole } from '~/types'

interface StepperProps {
  userRole: '' | UserRole
}

const UserStepper: FC<StepperProps> = ({ userRole }) => {
  const stepComponents = [
    <GeneralInfoStep key='1' stepLabel='' />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  return (
    <StepProvider userRole={userRole}>
      <StepWrapper>{stepComponents}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepper
