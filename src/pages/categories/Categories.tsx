import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useTranslation } from 'react-i18next'
import { styles } from './Categories.style'
import { useState, useMemo, useCallback } from 'react'
import CardsList from '~/components/cards-list/CardsList'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import Box from '@mui/material/Box'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  ButtonVariantEnum,
  CategoryInterface,
  SizeEnum,
  VisibilityEnum
} from '~/types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { getOpositeRole } from '~/utils/helper-functions'
import * as Icons from '@mui/icons-material'
import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore, { LoadMoreService, Params } from '~/hooks/use-load-more-new'
import { categoryService } from '~/services/category-service'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import ClearIcon from '@mui/icons-material/Clear'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import { useModalContext } from '~/context/modal-context'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'

const Categories = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState(false)
  const { openModal } = useModalContext()
  const [searchString, setSearchString] = useState('')
  const getCategories = useCallback(
    ({ page }: Params) => {
      return categoryService.getCategories({
        ...(page && { page }),
        ...(search && searchString && { search: searchString })
      })
    },
    [searchString, search]
  )

  const clearIconVisibility = {
    visibility: search ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole = getOpositeRole(userRole)

  const {
    loading: categoriesLoading,
    resetData,
    list: categoryResponse = [],
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface>({
    service: getCategories as unknown as LoadMoreService<CategoryInterface>
  })

  const onClear = () => {
    resetData()
    setSearch(false)
    setSearchString('')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setSearch(true)
      resetData()
    }
  }

  const handleSearch = () => {
    setSearch(true)
    resetData()
  }

  const cards = useMemo(
    () =>
      categoryResponse.map((item: CategoryInterface) => {
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
    [categoryResponse, oppositeRole, t]
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

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
      <Box sx={styles.searchToolbar}>
        <Icons.Search />
        <AppTextField
          errorMsg={''}
          label={t('categoriesPage.searchLabel')}
          onChange={(e) => {
            setSearch(false)
            setSearchString(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          sx={{ flex: 1 }}
          value={searchString}
          variant='standard'
        />
        <IconButton onClick={onClear} sx={clearIconVisibility}>
          <ClearIcon fontSize={SizeEnum.Small} />
        </IconButton>

        <Button
          onClick={handleSearch}
          size={SizeEnum.Large}
          variant={ButtonVariantEnum.ContainedLight}
        >
          {t('common.search')}
        </Button>
      </Box>
      {categoryResponse.length === 0 ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'category' })}
          description={t('errorMessages.tryAgainText', { name: 'category' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
