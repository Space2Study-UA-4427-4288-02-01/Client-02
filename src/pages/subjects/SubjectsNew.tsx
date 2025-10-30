import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ClearIcon from '@mui/icons-material/Clear'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppTextField from '~/components/app-text-field/AppTextField'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { defaultResponses } from '~/constants'
import {
  ButtonVariantEnum,
  CategoryNameInterface,
  CategoryNamesResponse,
  SizeEnum,
  SubjectInterface,
  VisibilityEnum
} from '~/types'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/pages/subjects/Subjects.styles'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import { getOpositeRole } from '~/utils/helper-functions'
import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore, { LoadMoreService, Params } from '~/hooks/use-load-more-new'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const Subjects = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const categoryId = searchParams.get('categoryId') ?? ''
  const [searchString, setSearchString] = useState('')
  const [search, setSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  )
  const initialized = useRef(false)

  const getSubjects = useCallback(
    ({ page }: Params) => {
      return subjectService.getSubjects({
        ...(categoryId && { categoryId }),
        ...(page && { page }),
        ...(search && searchString && { search: searchString })
      })
    },
    [categoryId, searchString, search]
  )

  const getCategoriesNames = async () => {
    return await categoryService.getCategoriesNames()
  }

  const {
    loading: subjectNamesLoading,
    response: categoriesResponse,
    fetchData: fetchCategories
  } = useAxios<CategoryNamesResponse, null, CategoryNameInterface[]>({
    service: getCategoriesNames,
    transform: (data) => data.data,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

  const {
    loading: subjectsLoading,
    isExpandable,
    list: subjectsList,
    loadMore,
    resetData
  } = useLoadMore<SubjectInterface>({
    service: getSubjects as unknown as LoadMoreService<SubjectInterface>
  })

  const categoryOptions: OptionType[] = categoriesResponse.map((category) => ({
    value: category._id,
    title: category.name
  }))

  const categoryName =
    categoriesResponse.find((cat) => cat._id === categoryId)?.name || ''

  const oppositeRole = getOpositeRole(userRole)

  const cards = subjectsList.map((item: SubjectInterface) => {
    return (
      <CardWithLink
        description={`${item.totalOffers[oppositeRole]} ${t(
          'categoriesPage.offers'
        )}`}
        img={serviceIcon}
        key={item._id}
        link={`${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`}
        title={item.name}
      />
    )
  })

  const clearIconVisibility = {
    visibility: search ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  const onClear = () => {
    resetData()
    setSearch(false)
    setSearchString('')
  }

  const handleSearch = () => {
    setSearch(true)
    resetData()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setSearch(true)
      resetData()
    }
  }

  const handleCategoryChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    if (newValue?.value === selectedCategory?.value) return
    setSelectedCategory(newValue)
    resetData()
    searchParams.set('categoryId', newValue?.value ?? '')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      void fetchCategories()
    }
  }, [fetchCategories])

  useEffect(() => {
    if (!categoriesResponse.length || !categoryId) return

    const foundCategory = categoriesResponse.find(
      (cat) => cat._id === categoryId
    )
    if (foundCategory) {
      setSelectedCategory({
        value: foundCategory._id,
        title: foundCategory.name
      })
    }
  }, [categoriesResponse, categoryId])

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        <AppAutoComplete
          disabled={subjectNamesLoading}
          label={t('categoriesPage.title')}
          onChange={handleCategoryChange}
          options={categoryOptions}
          sx={{ width: 200 }}
          value={selectedCategory}
        />

        <AppTextField
          errorMsg={''}
          label={t('categoriesPage.searchLabel')}
          onChange={(e) => {
            setSearch(false)
            setSearchString(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          size='medium'
          sx={{ flex: 1 }}
          type='text'
          value={searchString}
          variant='standard'
        />

        <IconButton onClick={onClear} sx={clearIconVisibility}>
          <ClearIcon fontSize={SizeEnum.Small} />
        </IconButton>

        <Button
          onClick={handleSearch}
          size={SizeEnum.Large}
          sx={styles.searchBtn}
          variant={ButtonVariantEnum.ContainedLight}
        >
          {t('common.search')}
        </Button>
      </AppToolbar>
      {subjectsList.length === 0 ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subject' })}
          description={t('errorMessages.tryAgainText', { name: 'subject' })}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={subjectsLoading || subjectNamesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Subjects
