import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useTranslation } from 'react-i18next'
import { styles } from './Categories.style'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { useEffect, useState, useRef, useMemo } from 'react'
import useCategories from '~/hooks/use-categories'
import CardsList from '~/components/cards-list/CardsList'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import Box from '@mui/material/Box'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
import { CategoryInterface, SizeEnum } from '~/types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { getOpositeRole } from '~/utils/helper-functions'
import * as Icons from '@mui/icons-material'
import { useAppSelector } from '~/hooks/use-redux'
import { OptionType } from '~/components/app-auto-complete/AppAutoComplete'
import useLoadMore from '~/hooks/use-load-more'

const Categories = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const {
    loading: loadingCategories,
    response: categoryResponse = [],
    fetchData: fetchCategories
  } = useCategories({
    fetchOnMount: false
  })

  const fetchCategoriesRef = useRef(false)
  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole = getOpositeRole(userRole)

  useEffect(() => {
    if (fetchCategoriesRef.current) return
    fetchCategoriesRef.current = true
    void fetchCategories()
  }, [fetchCategories])

  // const getCategories = useCallback(
  //   (data?: Pick<CategoryInterface, 'name'>) =>
  //     categoryService.getCategories(data),
  //   []
  // )

  const {
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: fetchCategories,
    params: { name: search },
    limit: 10
  })

  const categoryOptions: OptionType[] = categoryResponse.map((c) => ({
    value: c._id,
    title: c.name
  }))

  const filteredCategories = useMemo(() => {
    if (!search) return categoryResponse
    return categoryResponse.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, categoryResponse])

  const handleSearchChange = () => {
    resetData()
  }

  const cards = useMemo(
    () =>
      filteredCategories.map((item: CategoryInterface) => {
        const IconComponent =
          Icons[item.appearance?.icon as keyof typeof Icons] || Icons.Category
        return (
          <CardWithLink
            description={`${item.totalOffers[oppositeRole]} ${t('categoriesPage.offers')}`}
            img={
              <IconComponent
                sx={{
                  color: item.appearance?.color ?? '#000',
                  fontSize: 40,
                  borderRadius: 1,
                  p: '10px',
                  backgroundColor: item.appearance?.color + '33'
                }}
              />
            }
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [filteredCategories, oppositeRole, t]
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <SearchAutocomplete
        loading={loadingCategories}
        onSearchChange={handleSearchChange}
        options={categoryOptions}
        search={search}
        setSearch={setSearch}
        textFieldProps={{
          label: t('categoriesPage.searchLabel'),
          variant: 'standard'
        }}
      />
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable={isExpandable}
        loading={categoriesLoading}
        onClick={loadMore}
      />
    </PageWrapper>
  )
}

export default Categories
