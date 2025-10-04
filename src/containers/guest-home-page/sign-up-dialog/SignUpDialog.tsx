import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import useForm from '~/hooks/use-form'
import SignUpForm from '~/containers/guest-home-page/sign-up-form/SignUpForm'
import signStudentImg from '~/assets/img/signup-dialog/student.svg'
import signTutorImg from '~/assets/img/signup-dialog/tutor.svg'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/login'
import { styles } from '~/containers/guest-home-page/sign-up-dialog/SignUpDialog.styles'
import { UserRoleEnum } from '~/types'
import { FC } from 'react'
import GoogleLogin from '../google-login/GoogleLogin'
import { signup, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'

interface SignUpDialogProps {
  role: UserRoleEnum
}

const SignUpDialog: FC<SignUpDialogProps> = ({ role }) => {
  const { closeModal } = useModalContext()
  const [signUpUser] = useSignUpMutation()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()
  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signUpUser(data).unwrap()
          closeModal()
        } catch (error) {
          if (error && typeof error === 'object' && 'data' in error) {
            const err = error as { data?: { code?: string } }
            setAlert({
              severity: snackbarVariants.error,
              message: `errors.${err.data?.code ?? 'unknown'}`
            })
          } else {
            setAlert({
              severity: snackbarVariants.error,
              message: 'errors.unknown'
            })
          }
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: role
      },
      validations: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      }
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
            role={role}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
