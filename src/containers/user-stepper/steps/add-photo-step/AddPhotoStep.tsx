import { FC } from 'react'
import { Box } from '@mui/material'

import { style } from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep.style'

interface AddPhotoStepProps {
  btnsBox?: React.ReactNode
  stepLabel?: string
}

const AddPhotoStep: FC<AddPhotoStepProps> = ({ btnsBox }) => {
  return (
    <Box sx={style.root}>
      AddPhoto step
      {btnsBox}
    </Box>
  )
}

export default AddPhotoStep
