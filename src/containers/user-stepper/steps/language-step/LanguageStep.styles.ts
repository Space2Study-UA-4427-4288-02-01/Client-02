import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    alignItems: { sm: 'center', md: 'stretch' },
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    ...fadeAnimation
  },
  imgContainer: {
    display: { xs: 'flex', sm: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '432px'
  },
  img: {
    width: { xs: '50%', sm: '100%' },
    m: { sm: 0, xs: '0 auto' },
    pb: { xs: '10px', md: '52px' }
  },
  rightBox: {
    maxWidth: { sm: '432px', xs: '100%' },
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  title: {
    mb: 1
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '10px'
  }
}
