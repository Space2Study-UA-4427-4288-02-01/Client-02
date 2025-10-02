import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/user-stepper/steps/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/user-stepper/steps/language-step/LanguageStep'

import {
  tutorStepLabels,
  initialValues
} from '~/containers/user-stepper/constants'
import { student } from '~/constants'

interface StepperProps {
  userRole: string
}

const UserStepper: FC<StepperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? '' : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepper
