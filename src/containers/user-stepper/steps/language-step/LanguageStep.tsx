import { FC, useEffect, useState, useRef, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useStepContext } from '~/context/step-context'
import { styles } from '~/containers/user-stepper/steps/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useTranslation } from 'react-i18next'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import { LanguageValuesInterface } from '~/context/types'
import useLanguages from '~/hooks/use-languages'

interface LanguageStepProps {
  btnsBox?: React.ReactNode
  stepLabel: string
}

const LanguageStep: FC<LanguageStepProps> = ({ btnsBox, stepLabel }) => {
  const { stepData, updateLanguage } = useStepContext()
  const { language } = stepData[stepLabel] as LanguageValuesInterface
  console.log('stepData', stepData)
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState<OptionType | null>(
    language ? { value: language, title: language } : null
  )

  const languageRef = useRef(false)

  const {
    loading: languageLoading,
    response: languageResponse = [],
    fetchData: fetchLanguages
  } = useLanguages()

  useEffect(() => {
    if (languageRef.current) return
    languageRef.current = true
    void fetchLanguages()
  }, [fetchLanguages])

  const handleLanguageChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedLanguage(newValue)
    updateLanguage({ language: newValue?.value || '' })
  }
  const languageOptions: OptionType[] = languageResponse.map((lang) => ({
    value: lang.code,
    title: lang.code
  }))
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.formContainer}>
          <Typography sx={styles.title}>
            {t('step.languageInfo.title')}
          </Typography>
        </Box>
        <Box sx={styles.formRow}>
          <AppAutoComplete
            disabled={languageLoading}
            getOptionKey={(option) => option.value}
            getOptionLabel={(option) => option.title}
            label={t('step.languageInfo.languageLabel')}
            loading={languageLoading}
            onChange={handleLanguageChange}
            options={languageOptions}
            value={selectedLanguage}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
