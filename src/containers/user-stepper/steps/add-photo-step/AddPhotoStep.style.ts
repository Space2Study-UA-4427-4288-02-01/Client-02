import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { sm: '210px', md: '0px' },
    ...fadeAnimation
  },
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
  img: {
    width: '100%',
    borderRadius: '20px',
    objectFit: 'cover'
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    maxWidth: '440px',
    maxHeight: '440px',
    height: '100%',
    width: '100%',
    flex: 1
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    width: '100%',
    height: '100px',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  activeDrag: {
    border: '2px primary',
    borderColor: 'primary.900'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px',
    width: '100%',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', sm: '0' }
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  description: {
    mb: '20px'
  },
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  icon: {
    fontSize: '40px',
    mb: '10px'
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  }
}
