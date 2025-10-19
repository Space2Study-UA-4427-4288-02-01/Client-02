import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { sm: 'center', md: 'stretch' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
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
    m: { sm: 0, xs: '0 auto' }
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  formRow: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    flex: 1,
    gap: '10px'
  },
  helperText: {
    fontSize: { sm: '14px', xs: '12px' },
    mb: '20px'
  }
}

export default styles
