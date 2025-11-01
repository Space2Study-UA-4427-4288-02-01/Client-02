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
// import { subjectService } from '~/services/subject-service'
import { offersService } from '~/services/offersService'
// import { categoryService } from '~/services/category-service'
// import { defaultResponses } from '~/constants'
import {
  ButtonVariantEnum,
  // CategoryNameInterface,
  // CategoryNamesResponse,
  Offer,
  //Response,
  SizeEnum,
  //SubjectInterface,
  VisibilityEnum
} from '~/types'
import AppAutoComplete, {
  OptionType
} from '~/components/app-auto-complete/AppAutoComplete'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/pages/subjects/Subjects.styles'
// import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
// import CardWithLink from '~/components/card-with-link/CardWithLink'
// import CardsList from '~/components/cards-list/CardsList'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
// import { getOpositeRole } from '~/utils/helper-functions'
// import useAxios from '~/hooks/use-axios'
// import { useAppSelector } from '~/hooks/use-redux'
// import useLoadMore, { LoadMoreService, Params } from '~/hooks/use-load-more-new'
import useCategoriesNames from '~/hooks/use-categories-names'
// import useSubjects from '~/hooks/use-subject'
import useSubjectsNames from '~/hooks/use-subjects-names'
import usePagination, {
  PaginationService,
  Params
} from '~/hooks/use-pagination'

const FindOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  // const { userRole } = useAppSelector((state) => state.appMain)
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const [searchString, setSearchString] = useState('')
  const [search, setSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  )
  const [selectedSubject, setSelectedSubject] = useState<OptionType | null>(
    null
  )
  const initialized = useRef(false)

  // const getSubjects = useCallback(
  //   ({ page }: Params) => {
  //     return subjectService.getSubjects({
  //       ...(categoryId && { categoryId }),
  //       ...(page && { page }),
  //       ...(search && searchString && { search: searchString })
  //     })
  //   },
  //   [categoryId, searchString, search]
  // )

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

  // const getCategoriesNames = async () => {
  //   return await categoryService.getCategoriesNames()
  // }

  // const {
  //   loading: subjectNamesLoading,
  //   response: categoriesResponse,
  //   fetchData: fetchCategories
  // } = useAxios<CategoryNamesResponse, null, CategoryNameInterface[]>({
  //   service: getCategoriesNames,
  //   transform: (data) => data.data,
  //   fetchOnMount: false,
  //   defaultResponse: defaultResponses.array
  // })

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

  // const {
  //   loading: offersLoading,
  //   response: offersResponse,
  //   fetchData: fetchOffers
  // } = useAxios<Response<Offer>>({
  //   service: getOffers,
  //   fetchOnMount: false,
  //   defaultResponse: { data: [] }
  // })

  const {
    loading: offersLoading,
    list: offersList,
    resetData
  } = usePagination<Offer>({
    service: getOffers as unknown as PaginationService<Offer>
  })

  const categoryOptions: OptionType[] = categoryResponse.map((category) => ({
    value: category._id,
    title: category.name
  }))

  const subjectNameOptions: OptionType[] = subjectsResponse.map((subject) => ({
    value: subject._id,
    title: subject.name
  }))

  const categoryName =
    categoryResponse.find((cat) => cat._id === categoryId)?.name || ''

  // const oppositeRole = getOpositeRole(userRole)

  // const cards = subjectsList.map((item: SubjectInterface) => {
  //   return (
  //     <CardWithLink
  //       description={`${item.totalOffers[oppositeRole]} ${t(
  //         'categoriesPage.offers'
  //       )}`}
  //       img={serviceIcon}
  //       key={item._id}
  //       link={`${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`}
  //       title={item.name}
  //     />
  //   )
  // })

  console.log('offersList', offersList)

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

  const handleCategoryChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedCategory(newValue)
    resetData()
    searchParams.set('categoryId', newValue?.value ?? '')
    setSearchParams(searchParams)
  }

  const handleSubjectChange = (
    _e: SyntheticEvent<Element, Event>,
    newValue: OptionType | null
  ) => {
    setSelectedSubject(newValue)
    resetData()
    searchParams.set('subjectId', newValue?.value ?? '')
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
          options={subjectNameOptions}
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

      {/* <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable={isExpandable}
        loading={subjectsLoading || subjectNamesLoading}
        onClick={loadMore}
      /> */}
    </PageWrapper>
  )
}

export default FindOffers
