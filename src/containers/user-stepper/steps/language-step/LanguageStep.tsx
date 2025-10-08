import { FC } from 'react'
import Box from '@mui/material/Box'

import { styles } from '~/containers/user-stepper/steps/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

interface LanguageStepProps {
  btnsBox?: React.ReactNode
  stepLabel?: string
}

const LanguageStep: FC<LanguageStepProps> = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>Language here</Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
