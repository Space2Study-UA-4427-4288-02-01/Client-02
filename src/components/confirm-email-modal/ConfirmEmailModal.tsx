import { Typography, Box } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import infoIcon from '~/assets/img/guest-home-page/info.svg'
import styles from '~/components/confirm-email-modal/ConfirmEmailModal.style'

interface ConfirmEmailModalProps {
  email: string
}

export const ConfirmEmailModal: FC<ConfirmEmailModalProps> = ({ email }) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.modalContainer}>
      <Box sx={styles.imgContainer}>
        <Box alt='infoIcon' component='img' src={infoIcon} sx={styles.img} />
      </Box>
      <Box sx={styles.textContainer}>
        <Typography variant='h5'>
          {t('modals.infoConfirm.titleConfirm')}
        </Typography>
        <Typography>
          {t('modals.infoConfirm.sentConfirm')}{' '}
          <Typography
            component='span'
            sx={{ fontWeight: '500', display: 'inline' }}
          >
            {email}
          </Typography>
          . {t('modals.infoConfirm.checkEmail')}
        </Typography>
      </Box>
    </Box>
  )
}
