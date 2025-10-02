import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import loginImg from '~/assets/img/login-dialog/login.svg'
import AppSelect from '~/components/app-select/AppSelect'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import { styles } from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep.styles'

interface GeneralInfoStepProps {
  btnsBox?: React.ReactNode
}

const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.formContainer}>
          <Typography>{t('step.generalInfo.title')}</Typography>
          <Box sx={styles.formRow}>
            <AppTextField
              autoFocus
              data-testid={'firstName'}
              errorMsg={t('step.generalInfo.fnError')}
              fullWidth
              label={t('step.generalInfo.firstName')}
              onBlur={() => {}}
              onChange={() => {}}
              required
              size='medium'
              sx={{ mb: '5px' }}
              type='text'
              value={''}
            />

            <AppTextField
              data-testid={'lastName'}
              errorMsg={t('step.generalInfo.lnError')}
              fullWidth
              label={t('step.generalInfo.lastName')}
              onBlur={() => {}}
              onChange={() => {}}
              required
              size='medium'
              sx={{ mb: '5px' }}
              type='text'
              value={''}
            />
          </Box>
          <Box sx={styles.formRow}>
            <AppSelect
              fields={[]}
              label={t('step.generalInfo.country')}
              setValue={() => {}}
              value={''}
            />
            <AppSelect
              fields={[]}
              label={t('step.generalInfo.city')}
              setValue={() => {}}
              value={''}
            />
          </Box>
          <AppTextArea
            label={t('step.generalInfo.descriptionPlaceholder')}
            maxLength={70}
            onChange={() => {}}
            style={{ width: '100%' }}
            value={''}
          />
          <Typography>{t('step.generalInfo.helperText')}</Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
