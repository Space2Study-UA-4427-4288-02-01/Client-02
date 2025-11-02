export const styles = {
  card: {
    display: 'flex',
    width: '100%',
    borderRadius: '8px',
    border: '2px solid',
    borderColor: 'primary.100',
    boxShadow: '0px 3px 16px 2px #90A4AE8F',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'primary.500',
      //boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    }
  },
  cardContent: {
    padding: '24px',
    '&:last-child': {
      paddingBottom: '24px'
    }
  },
  cardContentMain: {
    flex: 1,
    padding: '24px',
    '&:last-child': {
      paddingBottom: '24px'
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1
  },
  avatar: {
    width: 48,
    height: 48
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '110px'
  },
  authorName: {
    typography: 'subtitle1',
    fontWeight: 500,
    color: 'basic.black'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  ratingText: {
    typography: 'body2',
    fontWeight: 600,
    color: 'basic.black'
  },
  reviewsCount: {
    typography: 'body2',
    color: 'primary.600'
  },
  priceContainer: {
    // display: 'flex',
    // alignItems: 'baseline',
    // gap: '4px'
  },
  price: {
    typography: 'h4',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: 1,
    color: 'basic.black'
  },
  priceLabel: {
    typography: 'caption',
    color: 'primary.600'
  },
  title: {
    typography: 'h6',
    fontWeight: 600,
    color: 'basic.black',
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px'
  },
  chip: {
    backgroundColor: 'primary.100',
    color: 'primary.700',
    fontWeight: 500,
    fontSize: '12px',
    height: '24px'
  },
  description: {
    typography: 'body2',
    color: 'primary.700',
    marginBottom: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    lineHeight: '20px'
  },
  languagesSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  languagesIcon: {
    fontSize: '20px'
  },
  languagesText: {
    typography: 'body2',
    color: 'primary.600'
  },
  btn: {
    display: 'block',
    width: '100%',
    minWidth: { xs: '44px' },
    p: { xs: '7px 12px', sm: '12px 24px' },
    mt: '20px'
  }
}
