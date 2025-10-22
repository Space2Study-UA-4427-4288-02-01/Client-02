import { FC, SyntheticEvent, useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import studyImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/user-stepper/steps/subjects-step/SubjectsStep.styles'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import useSubjects from '~/hooks/use-subject'
import { useStepContext } from '~/context/step-context'
import { SubjectValuesInterface } from '~/context/types'
import AppChipList from '~/components/app-chips-list/AppChipList'
import useCategoriesNames from '~/hooks/use-categories-names'

interface SubjectsStepProps {
  btnsBox?: React.ReactNode
  stepLabel: string
}

const SubjectsStep: FC<SubjectsStepProps> = ({ btnsBox, stepLabel }) => {
  const { stepData, updateSubject } = useStepContext()
  const { subjects } = stepData[stepLabel] as SubjectValuesInterface
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  )
  const [selectedSubjects, setSelectedSubjects] = useState<OptionType | null>(
    null
  )

  const fetchCategoryRef = useRef(false)

  const {
    loading: categoriesLoading,
    response: categoryResponse = [],
    fetchData: fetchCategories
  } = useCategoriesNames()

  const {
    loading: subjectsLoading,
    response: subjectsResponse = [],
    fetchData: fetchSubjects
  } = useSubjects({ category: selectedCategory })

  const handleCategoryChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedCategory(newValue)
    setSelectedSubjects(null)
    updateSubject({
      category: newValue?.value || '',
      subjects: [...subjects]
    })
  }

  useEffect(() => {
    if (fetchCategoryRef.current) return
    fetchCategoryRef.current = true
    void fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (selectedCategory) {
      void fetchSubjects()
    }
  }, [selectedCategory, fetchSubjects])

  const handleSubjectChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedSubjects(newValue)
  }

  const handleAddSubject = () => {
    if (!selectedSubjects) return
    updateSubject({
      category: selectedCategory ? selectedCategory.value : '',
      subjects: [...subjects, selectedSubjects.value]
    })
    setSelectedSubjects(null)
  }

  const handleDelete = (subjectId: string) => {
    const newSubjects = subjects.filter((sub) => sub !== subjectId)
    updateSubject({
      category: selectedCategory ? selectedCategory.value : '',
      subjects: [...newSubjects]
    })
  }

  const subjectIsAdded = (subject: string): boolean => {
    return subjects.includes(subject)
  }

  const subjectTitlesForChips = subjects
    .map((id) => subjectsResponse.find((s) => s._id === id)?.name)
    .filter(Boolean) as string[]

  const categoryOptions: OptionType[] = categoryResponse.map((category) => ({
    value: category._id,
    title: category.name
  }))

  const subjectsOptions: OptionType[] = subjectsResponse.map((subject) => ({
    value: subject._id,
    title: subject.name
  }))

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={studyImg} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.formContainer}>
          <Typography component='span' sx={styles.title}>
            {t('step.interestsInfo.title')}
          </Typography>
          <Box sx={styles.formRow}>
            <AppAutoComplete
              disabled={categoriesLoading}
              label={t('step.interestsInfo.studyCategory')}
              onChange={handleCategoryChange}
              options={categoryOptions}
              value={selectedCategory}
            />
            <AppAutoComplete
              disabled={subjectsLoading || !selectedCategory}
              label={t('step.interestsInfo.subject')}
              loading={subjectsLoading}
              onChange={handleSubjectChange}
              options={subjectsOptions}
              value={selectedSubjects}
            />
            <AppButton
              disabled={
                !selectedSubjects || subjectIsAdded(selectedSubjects.value)
              }
              fullWidth
              onClick={handleAddSubject}
              variant='tonal'
            >
              {t('step.interestsInfo.addSubjectBtn')}
            </AppButton>
            <AppChipList
              defaultQuantity={5}
              handleChipDelete={(name) => {
                const subj = subjectsResponse.find((s) => s.name === name)
                if (subj?._id) handleDelete(subj._id)
              }}
              items={subjectTitlesForChips}
            />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
