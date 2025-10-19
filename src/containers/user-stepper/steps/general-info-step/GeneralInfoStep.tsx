import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import loginImg from '~/assets/img/login-dialog/login.svg'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import styles from '~/containers/user-stepper/steps/general-info-step/GeneralInfoStep.styles'
import { useStepContext } from '~/context/step-context'
import { validations } from '~/containers/user-stepper/constants'
import useLocations from '~/hooks/use-locations'
import { useAppSelector } from '~/hooks/use-redux'
import { GeneralData } from '~/context/types'
import {
  cityOptionsHelper,
  countryOptionsHelper
} from '~/containers/user-stepper/steps/general-info-step/utils'

interface GeneralInfoStepProps {
  btnsBox?: React.ReactNode
  stepLabel: string
}

const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ btnsBox, stepLabel }) => {
  const { firstName, lastName } = useAppSelector((state) => state.appMain)

  const { stepData, updateGeneral } = useStepContext()
  const { data, errors } = stepData[stepLabel] as GeneralData

  const {
    countries,
    cities,
    citiesCache,
    loading,
    selectedCountryCode,
    setSelectedCountryCode
  } = useLocations()

  const [countryOptions, setCountryOptions] = useState<OptionType[]>([])
  const [cityOptions, setCityOptions] = useState<OptionType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  )
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (data.firstName && data.lastName) return
    if (firstName && lastName) {
      updateGeneral({ firstName, lastName })
    }
  }, [data.firstName, data.lastName, firstName, lastName, updateGeneral])

  useEffect(() => {
    if (!countries.data) return
    const options = countryOptionsHelper(countries.data)
    setCountryOptions(options)
  }, [countries.data])

  useEffect(() => {
    const cachedCities = selectedCountryCode
      ? citiesCache[selectedCountryCode]
      : null
    if (!cachedCities) return
    setCityOptions(cityOptionsHelper(cachedCities))
  }, [citiesCache, selectedCountryCode])

  const handleChange = (field: string, value: string): void => {
    updateGeneral({ [field]: value })
  }

  const handleValidate = (field: string, value: string): void => {
    const validator = validations[field as keyof typeof validations]
    const error = validator?.(value) || ''
    updateGeneral({}, { [field]: error })
  }

  const handleCountryFetch = () => {
    if (countries.data.length > 0) return
    void countries.fetch()
  }

  const handleCountryChange = (
    _e: SyntheticEvent<Element, Event>,
    option: OptionType | null
  ) => {
    console.log(option)
    setSelectedCountry(option)
    updateGeneral(option ? { country: option.title } : { country: '' })
    setSelectedCountryCode(option ? option.value : null)
    updateGeneral({ city: '' })
    setSelectedCity(null)
  }

  const handleCityFetch = () => {
    if (!selectedCountryCode) return
    if (citiesCache[selectedCountryCode]) return
    void cities.fetch(selectedCountryCode)
  }

  const handleCityChange = (
    _e: SyntheticEvent<Element, Event>,
    option: OptionType | null
  ) => {
    console.log(option)
    setSelectedCity(option)
    updateGeneral(option ? { city: option.title } : { city: '' })
  }

  const logData = () => {
    // console.log(data)
    // console.log(selectedCountryCode)
    console.log(citiesCache)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <button onClick={logData}>Button</button>
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
            <AppAutoComplete
              fullWidth
              label={t('common.labels.country')}
              loading={loading}
              onChange={handleCountryChange}
              onOpen={handleCountryFetch}
              options={countryOptions}
              value={selectedCountry}
            />
            <AppAutoComplete
              disabled={!selectedCountryCode}
              fullWidth
              label={t('common.labels.city')}
              loading={loading}
              onChange={handleCityChange}
              onOpen={handleCityFetch}
              options={cityOptions}
              value={selectedCity}
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
