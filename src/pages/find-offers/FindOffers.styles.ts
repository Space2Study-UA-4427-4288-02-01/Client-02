export const styles = {
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchToolbar: {
    borderRadius: '70px',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'basic.white',
    gap: '20px'
  },
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  searchBtn: {
    minWidth: { xs: '44px' },
    p: { xs: '7px 12px', sm: '12px 24px' },
    ml: { xs: '5px', sm: '25px' }
  },
  listBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  pagination: {
    mt: '30px'
  },
  contentContainer: {
    display: 'flex',
    gap: '30px'
  },
  filtersPanel: {
    width: '240px',
    mb: '20px'
  },
  btn: {
    display: 'block',
    width: '100%',
    minWidth: { xs: '44px' },
    p: { xs: '7px 12px', sm: '12px 24px' },
    mt: '20px'
  }
}
