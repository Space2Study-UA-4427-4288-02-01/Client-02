import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Avatar
  // Rating
} from '@mui/material'
import Button from '@mui/material/Button'
import { ButtonVariantEnum, Offer, SizeEnum } from '~/types'
import { styles } from './OfferCard.styles'

interface OfferCardProps {
  offer: Offer
}

const OfferCard: FC<OfferCardProps> = ({ offer }) => {
  const { t } = useTranslation()
  const {
    title,
    description,
    author,
    price,
    proficiencyLevel,
    languages
    // subject,
    // category
  } = offer

  const fullName = `${author.firstName} ${author.lastName}`
  // const rating = (author.averageRating || 0) as unknown as number
  // const reviewsCount = (author.totalReviews || 0) as unknown as number

  // Extract author info section to reduce nesting
  const authorInfo = (
    <Box sx={styles.authorInfo}>
      <Typography sx={styles.authorName}>{fullName}</Typography>
      {/* <Box sx={styles.rating}>
        <Rating precision={0.1} readOnly size='small' value={rating} />
        <Typography sx={styles.ratingText}>{rating}</Typography>
        <Typography sx={styles.reviewsCount}>{reviewsCount} reviews</Typography>
      </Box> */}
    </Box>
  )

  // Extract header section
  const headerContent = (
    <Box sx={styles.header}>
      <Box sx={styles.headerLeft}>
        <Avatar alt={fullName} src={author.photo} sx={styles.avatar} />
        {authorInfo}
      </Box>
    </Box>
  )

  const priceContent = (
    <Box sx={styles.priceContainer}>
      <Typography sx={styles.price}>
        {price} {t('findOfferPage.offerCard.price.currency')}
      </Typography>
      <Typography sx={styles.priceLabel}>
        {t('findOfferPage.offerCard.price.label')}
      </Typography>
      <Box>
        <Button
          onClick={() => {}}
          size={SizeEnum.Large}
          sx={styles.btn}
          variant={ButtonVariantEnum.Contained}
        >
          {t('findOfferPage.offerCard.buttons.showDetails')}
        </Button>
        <Button
          onClick={() => {}}
          size={SizeEnum.Large}
          sx={styles.btn}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('findOfferPage.offerCard.buttons.sendMessage')}
        </Button>
      </Box>
    </Box>
  )

  // Extract tags section
  const tags = (
    <Box sx={styles.tags}>
      <Chip label={proficiencyLevel} size='small' sx={styles.chip} />
      {languages.map((language, index) => (
        <Chip key={index} label={language} size='small' sx={styles.chip} />
      ))}
    </Box>
  )

  // Extract languages section
  const languagesSection = (
    <Box sx={styles.languagesSection}>
      <Typography component='span' sx={styles.languagesIcon}>
        🌐
      </Typography>
      <Typography sx={styles.languagesText}>{languages.join(', ')}</Typography>
    </Box>
  )

  const cardContent = (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>{headerContent}</CardContent>
      <CardContent sx={styles.cardContentMain}>
        <Typography sx={styles.title}>{title}</Typography>
        {tags}
        <Typography sx={styles.description}>{description}</Typography>
        {languagesSection}
      </CardContent>

      <CardContent sx={styles.cardContent}>{priceContent}</CardContent>
    </Card>
  )

  return cardContent
}

export default OfferCard
