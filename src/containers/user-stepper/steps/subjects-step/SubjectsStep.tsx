import { FC } from 'react'
import Box from '@mui/material/Box'

import { styles } from '~/containers/user-stepper/steps/subjects-step/SubjectsStep.styles'

interface SubjectsStepProps {
  btnsBox?: React.ReactNode
  stepLabel?: string
}

const SubjectsStep: FC<SubjectsStepProps> = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      Subject step
      {btnsBox}
    </Box>
  )
}

export default SubjectsStep
