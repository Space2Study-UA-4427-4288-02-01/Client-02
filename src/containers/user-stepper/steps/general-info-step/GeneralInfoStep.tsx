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
  countryOptionsHelper,
  countryCodeHelper,
  getCityByName,
  handleRenderOptions
} from '~/containers/user-stepper/steps/general-info-step/utils'

interface GeneralInfoStepProps {
  btnsBox?: React.ReactNode
  stepLabel: string
}

const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ btnsBox, stepLabel }) => {
  const { firstName, lastName } = useAppSelector((state) => state.appMain)
  const { stepData, updateGeneral } = useStepContext()
  const { data, errors } = stepData[stepLabel] as GeneralData
  const { countries, cities, selectedCountryCode, setSelectedCountryCode } =
    useLocations()
  const { t } = useTranslation()

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  )
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return
    if (!data.firstName && !data.lastName && firstName && lastName) {
      updateGeneral({ firstName, lastName })
    }
    setInitialized(true)
  }, [
    data.firstName,
    data.lastName,
    initialized,
    firstName,
    lastName,
    updateGeneral
  ])

  useEffect(() => {
    if (countries.data.length === 0) void countries.fetch()
    if (!data.country) return
    const codeByCountryName = countryCodeHelper(data.country, countries.data)
    if (!codeByCountryName) return
    setSelectedCountryCode(codeByCountryName)
    setSelectedCountry((prev) =>
      prev?.value === codeByCountryName && prev?.title === data.country
        ? prev
        : { value: codeByCountryName, title: data.country }
    )
  }, [countries, data.country, setSelectedCountryCode])

  useEffect(() => {
    if (!selectedCountryCode) return
    if (cities.data.length === 0) void cities.fetch(selectedCountryCode)
    if (!data.city) return
    const cityByName = getCityByName(data.city, cities.data)
    if (!cityByName) return
    setSelectedCity((prev) => {
      const idStr = cityByName.id.toString()
      return prev?.value === idStr && prev?.title === data.city
        ? prev
        : { value: idStr, title: data.city }
    })
  }, [cities, data.city, selectedCountryCode])

  const handleChange = (field: string, value: string): void => {
    updateGeneral({ [field]: value })
  }

  const handleValidate = (field: string, value: string): void => {
    const validator = validations[field as keyof typeof validations]
    const error = validator?.(value) || ''
    updateGeneral({}, { [field]: error })
  }

  const handleCountryChange = (
    _e: SyntheticEvent<Element, Event>,
    option: OptionType | null
  ) => {
    setSelectedCountry(option)
    setSelectedCountryCode(option ? option.value : null)
    setSelectedCity(null)
    updateGeneral(
      option ? { country: option.title, city: '' } : { country: '', city: '' }
    )
    if (option?.value) void cities.fetch(option.value)
  }

  const handleCityChange = (
    _e: SyntheticEvent<Element, Event>,
    option: OptionType | null
  ) => {
    setSelectedCity(option)
    updateGeneral(option ? { city: option.title } : { city: '' })
  }

  const countryOptions: OptionType[] = countryOptionsHelper(countries.data)
  const cityOptions: OptionType[] = cityOptionsHelper(cities.data)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
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
              loading={countries.loading}
              onChange={handleCountryChange}
              options={countryOptions}
              renderOption={handleRenderOptions}
              value={selectedCountry}
            />
            <AppAutoComplete
              disabled={!selectedCountryCode}
              fullWidth
              label={t('common.labels.city')}
              loading={cities.loading}
              onChange={handleCityChange}
              options={cityOptions}
              renderOption={handleRenderOptions}
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
