import { Box } from '@mui/material'

import { style } from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  return (
    <Box sx={style.root}>
      AddPhoto step
      {btnsBox}
    </Box>
  )
}

export default AddPhotoStep
