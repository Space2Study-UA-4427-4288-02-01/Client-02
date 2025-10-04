import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import { FC } from 'react'
import { styles } from '~/containers/guest-home-page/sign-up-form/SignUpForm.style'
import AppButton from '~/components/app-button/AppButton'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { useAppSelector } from '~/hooks/use-redux'

export interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface SignUpFormProps {
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => void
  handleChange: (
    field: keyof SignUpFormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: keyof SignUpFormData
  ) => (e: React.FocusEvent<HTMLInputElement>) => void
  data: SignUpFormData
  errors: Partial<Record<keyof SignUpFormData, string>>
}

interface AppMainState {
  authLoading: boolean
}

interface RootState {
  appMain: AppMainState
}

const SignUpForm: FC<SignUpFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors?.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors?.confirmPassword)

  const { t } = useTranslation()

  const { authLoading } = useAppSelector((state: RootState) => state.appMain)

  const { privacyPolicy, termOfUse } = guestRoutes

  const isInvalid =
    Object.values(errors).some((err) => Boolean(err)) ||
    !Object.values(data).every((val) => Boolean(val))

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameGroup}>
        <AppTextField
          autoFocus
          errorMsg={errors.firstName && t(errors.firstName)}
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          value={data.firstName}
        />
        <AppTextField
          errorMsg={errors.lastName && t(errors.lastName)}
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          value={data.lastName}
        />
      </Box>
      <AppTextField
        errorMsg={errors.email && t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        value={data.email}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={errors.password && t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />
      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={errors.confirmPassword && t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={data.acceptTerms}
            onChange={handleChange('acceptTerms')}
          />
        }
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')}{' '}
            <Link
              component={RouterLink}
              sx={styles.underlineText}
              to={termOfUse.path}
              underline='always'
            >
              {t('common.labels.terms')}
            </Link>{' '}
            {t('and')}{' '}
            <Link
              component={RouterLink}
              sx={styles.underlineText}
              to={privacyPolicy.path}
              underline='always'
            >
              {t('common.labels.privacyPolicy')}{' '}
            </Link>{' '}
            *
          </Typography>
        }
        sx={{
          mb: 2
        }}
      />
      <AppButton
        disabled={isInvalid}
        loading={authLoading}
        sx={styles.signUpButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
