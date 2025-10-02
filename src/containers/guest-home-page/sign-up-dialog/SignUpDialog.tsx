import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import useForm from '~/hooks/use-form'
import SignUpForm from '~/containers/guest-home-page/sign-up-form/SignUpForm'
import signStudentImg from '~/assets/img/signup-dialog/student.svg'
import signTutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { email } from '~/utils/validations/login'
import { styles } from '~/containers/guest-home-page/sign-up-dialog/SignUpDialog.styles'
import { UserRoleEnum } from '~/types'
import { FC } from 'react'
import GoogleLogin from '../google-login/GoogleLogin'
import { signup } from '~/constants'

interface SignUpDialogProps {
  role: UserRoleEnum
}

const SignUpDialog: FC<SignUpDialogProps> = ({ role }) => {
  const { t } = useTranslation()
  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { email }
    }
  )

  const isStudent = role === UserRoleEnum.Student

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={isStudent ? signStudentImg : signTutorImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {isStudent ? t('signup.head.student') : t('signup.head.tutor')}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={undefined}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
