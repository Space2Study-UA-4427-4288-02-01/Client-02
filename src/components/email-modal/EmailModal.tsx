import { Typography, Box } from '@mui/material'
import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import successIcon from '~/assets/img/email-confirmation-modals/success-icon.svg'
import errorIcon from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import styles from '~/components/confirm-email-modal/ConfirmEmailModal.style'
import AppButton from '~/components/app-button/AppButton'
import { useModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { SizeEnum } from '~/types'

type ModalType = 'success' | 'error'

interface EmailModalProps {
  type: ModalType
}

export const EmailModal: FC<EmailModalProps> = ({ type }) => {
  const isSuccess = type === 'success'
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()

  const openLoginDialog = useCallback(() => {
    closeModal()
    openModal({ component: <LoginDialog /> })
  }, [openModal, closeModal])

  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='infoIcon'
          component='img'
          src={isSuccess ? successIcon : errorIcon}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.textContainer}>
        <Typography variant='h5'>
          {isSuccess ? t('modals.emailConfirm') : t('modals.emailNotConfirm')}
        </Typography>
        {!isSuccess ? (
          <Typography>{t('modals.emailReject.badToken')}</Typography>
        ) : null}
        {isSuccess ? (
          <AppButton onClick={openLoginDialog} size={SizeEnum.Small}>
            {t('header.loginButton')}
          </AppButton>
        ) : null}
      </Box>
    </Box>
  )
}
