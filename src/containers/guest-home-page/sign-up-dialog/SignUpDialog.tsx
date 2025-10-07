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
import { SignUpDialogProps, UserRoleEnum } from '~/types'
import { FC, useEffect } from 'react'
import GoogleLogin from '../google-login/GoogleLogin'
import { signup } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { ConfirmEmailModal } from '~/components/confirm-email-modal/ConfirmEmailModal'
import { handleApiError } from '~/utils/handle-api-error'

const SignUpDialog: FC<SignUpDialogProps> = ({ role }) => {
  const { openModal, closeModal } = useModalContext()
  const [signUpUser, { data: signUpData, isSuccess, isError, error }] =
    useSignUpMutation()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signUpUser(data).unwrap()
        } catch (error) {
          handleApiError(error, setAlert)
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

  useEffect(() => {
    if (isSuccess && signUpData?.userId) {
      closeModal()
      openModal({
        component: <ConfirmEmailModal email={data.email} />
      })
    }
  }, [isSuccess, openModal, closeModal, signUpData, data])

  useEffect(() => {
    if (isError) {
      closeModal()
    }
  }, [closeModal, isError, error])

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
