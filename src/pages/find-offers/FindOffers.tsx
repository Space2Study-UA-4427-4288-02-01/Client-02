import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'

import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ClearIcon from '@mui/icons-material/Clear'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppTextField from '~/components/app-text-field/AppTextField'
import { offersService } from '~/services/offersService'
import { ButtonVariantEnum, Offer, SizeEnum, VisibilityEnum } from '~/types'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from './FindOffers.styles'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import usePagination, {
  PaginationService,
  Params
} from '~/hooks/use-pagination'
import OfferCard from '~/components/offer-card/OfferCard'
import AppPagination from '~/components/app-pagination/AppPagination'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const FindOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  // const { userRole } = useAppSelector((state) => state.appMain)
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const initialSearch = searchParams.get('search') ?? ''
  const [searchString, setSearchString] = useState(initialSearch)
  const [search, setSearch] = useState(Boolean(initialSearch))
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  )
  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null
  )
  const initialized = useRef(false)

  const getOffers = useCallback(
    ({ page }: Params) => {
      return offersService.getOffers({
        ...(categoryId && { categoryId }),
        ...(subjectId && { subjectId }),
        ...(page && { page }),
        ...(search && searchString && { search: searchString })
      })
    },
    [categoryId, subjectId, searchString, search]
  )

  const {
    loading: categoriesLoading,
    response: categoryResponse = [],
    fetchData: fetchCategories
  } = useCategoriesNames()

  const {
    loading: subjectsLoading,
    response: subjectsResponse = [],
    fetchData: fetchSubjects
  } = useSubjectsNames({ category: selectedCategory?.value as string })

  const {
    loading: offersLoading,
    list: offersList,
    page: currentPage,
    totalPages,
    resetData,
    onPageChange
  } = usePagination<Offer>({
    service: getOffers as unknown as PaginationService<Offer>,
    currentPage: parseInt(searchParams.get('page') || '1', 10)
  })

  const categoryOptions: OptionType[] = categoryResponse.map((category) => ({
    value: category._id,
    title: category.name
  }))

  const subjectOptions: OptionType[] = subjectsResponse.map((subject) => ({
    value: subject._id,
    title: subject.name
  }))

  const categoryName =
    categoryResponse.find((cat) => cat._id === categoryId)?.name || ''

  // const oppositeRole = getOpositeRole(userRole)

  const cards = offersList?.map((offer: Offer) => {
    return <OfferCard key={offer._id} offer={offer} />
  })

  const clearIconVisibility = {
    visibility: search ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  const onClear = () => {
    resetData()
    setSearch(false)
    setSearchString('')
    searchParams.delete('search')
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleSearch = () => {
    if (searchString) {
      searchParams.set('search', searchString)
      setSearchParams(searchParams)
    }
    setSearch(true)
    resetData()
  }

  const handleCategoryChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    console.log('handleCategoryChange newValue:', newValue)
    setSelectedCategory(newValue)
    resetData()

    if (newValue) {
      searchParams.set('categoryId', newValue.value)
    } else {
      searchParams.delete('categoryId')
    }

    setSearchParams(searchParams)
  }

  const handleSubjectChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedSubject(newValue)
    resetData()

    if (newValue) {
      searchParams.set('subjectId', newValue.value)
    } else {
      searchParams.delete('subjectId')
    }

    setSearchParams(searchParams)
  }

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    onPageChange(event, newPage)
    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      void fetchCategories()
    }
  }, [fetchCategories])

  useEffect(() => {
    if (selectedCategory) {
      void fetchSubjects()
    }
  }, [selectedCategory, fetchSubjects])

  useEffect(() => {
    if (!categoryResponse.length || !categoryId) return

    const foundCategory = categoryResponse.find((cat) => cat._id === categoryId)

    if (foundCategory) {
      setSelectedCategory({
        value: foundCategory._id,
        title: foundCategory.name
      })
    }
  }, [categoryId, categoryResponse])

  useEffect(() => {
    if (!subjectOptions.length || !subjectId) return

    const foundSubject = subjectOptions.find((sub) => sub.value === subjectId)

    if (foundSubject) {
      setSelectedSubject(foundSubject)
    }
  }, [subjectId, subjectOptions])

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('findOfferPage.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOfferPage.titleWithDescription.title')}
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
          disabled={categoriesLoading || subjectsLoading || offersLoading}
          label={t('categoriesPage.title')}
          onChange={handleCategoryChange}
          options={categoryOptions}
          sx={{ width: 200 }}
          value={selectedCategory}
        />

        <AppAutoComplete
          disabled={categoriesLoading || subjectsLoading || offersLoading}
          label={t('subjectsPage.subjects.title', { category: categoryName })}
          onChange={handleSubjectChange}
          options={subjectOptions}
          sx={{ width: 200 }}
          value={selectedSubject}
        />

        <AppTextField
          label={t('categoriesPage.searchLabel')}
          onChange={(e) => {
            setSearch(false)
            setSearchString(e.target.value)
          }}
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

      {cards?.length > 0 ? (
        <Box sx={styles.listBox}>{cards}</Box>
      ) : (
        <NotFoundResults
          description={t('errorMessages.tryAgainText', { name: 'offers' })}
        />
      )}

      <AppPagination
        onChange={handlePageChange}
        page={currentPage}
        pageCount={totalPages}
        sx={styles.pagination}
      />
    </PageWrapper>
  )
}

export default FindOffers
