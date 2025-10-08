import { FC, useEffect } from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import loginImg from '~/assets/img/login-dialog/login.svg'
import AppSelect from '~/components/app-select/AppSelect'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import styles from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep.styles'
import { useStepContext } from '~/context/step-context'
import { validations } from '~/containers/user-stepper/constants'
import useLocations from '~/hooks/use-locations'

interface GeneralInfoStepProps {
  btnsBox?: React.ReactNode
  stepLabel?: string
}

const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ btnsBox, stepLabel }) => {
  const { stepData, handleStepData } = useStepContext()
  const {
    countryOptions,
    cityOptions,
    areCountriesLoaded,
    getCountries,
    getCities,
    selectCountry
  } = useLocations()
  const { t } = useTranslation()

  useEffect(() => {
    ;(async () => {
      if (data.country) {
        await getCountries()
        selectCountry(data.country)
        await getCities()
      }
    })()
  }, [])

  const { data, errors } = stepLabel
    ? stepData[stepLabel]
    : { data: {}, errors: {} }

  const handleChange = (field: string, value: string): void => {
    handleStepData(stepLabel, { [field]: value })
    console.log(data)
  }

  const handleValidate = (field: string, value: string): void => {
    const validator = validations[field as keyof typeof validations]
    const error = validator?.(value) || ''

    handleStepData(stepLabel, {}, { [field]: error })
  }

  const handleCountryChange = (value: string) => {
    handleStepData(stepLabel, { ['country']: value })
    handleStepData(stepLabel, { ['city']: '' })
    selectCountry(value)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.formContainer}>
          <Typography sx={{ mb: '10px' }}>
            {t('step.generalInfo.title')}
          </Typography>
          <Box sx={styles.formRow}>
            <AppTextField
              data-testid={'firstName'}
              errorMsg={errors.firstName && t(errors.firstName)}
              fullWidth
              label={t('common.labels.firstName')}
              onBlur={(e) => handleValidate('firstName', e.target.value)}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              size='medium'
              type='text'
              value={data.firstName}
            />

            <AppTextField
              data-testid={'lastName'}
              errorMsg={errors.lastName && t(errors.lastName)}
              fullWidth
              label={t('common.labels.lastName')}
              onBlur={(e) => handleValidate('lastName', e.target.value)}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
              size='medium'
              type='text'
              value={data.lastName}
            />
          </Box>
          <Box sx={styles.formRow}>
            <AppSelect
              fields={countryOptions}
              label={t('common.labels.country')}
              onOpen={getCountries}
              setValue={(value) => handleCountryChange(value)}
              value={data.country}
            />
            <AppSelect
              disabled={!areCountriesLoaded}
              fields={cityOptions}
              label={t('common.labels.city')}
              onOpen={getCities}
              setValue={(value) => handleChange('city', value)}
              value={data.city}
            />
          </Box>
          <AppTextArea
            label={t('step.generalInfo.description')}
            maxLength={100}
            onChange={(e) =>
              handleChange('professionalSummary', e.target.value)
            }
            style={{ width: '100%' }}
            sx={{ mt: '20px' }}
            value={data.professionalSummary}
          />
          <Typography sx={styles.helperText}>
            {t('step.generalInfo.helperText')}
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
