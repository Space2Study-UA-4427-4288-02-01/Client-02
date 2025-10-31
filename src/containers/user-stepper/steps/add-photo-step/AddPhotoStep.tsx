import { FC, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Dropzone from 'react-dropzone'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import { styles } from '~/containers/user-stepper/steps/add-photo-step/AddPhotoStep.style'
import { PhotoValuesInterface } from '~/context/types'

interface AddPhotoStepProps {
  btnsBox?: React.ReactNode
}

const AddPhotoStep: FC<AddPhotoStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, updatePhoto } = useStepContext()
  const { photo } = stepData.photo as PhotoValuesInterface
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(photo)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        {preview ? (
          <Box component='img' src={preview} sx={styles.img} />
        ) : (
          <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
        )}
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles.formContainer}>
          <Typography sx={{ mb: '10px' }}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <Dropzone
            onDrop={(acceptedFiles) => updatePhoto({ photo: acceptedFiles[0] })}
          >
            {({ getRootProps, getInputProps }) => (
              <Box sx={styles.uploadBox}>
                <label {...getRootProps()} htmlFor='file-upload'>
                  <input {...getInputProps()} id='file-upload' />
                  <Typography sx={{ mb: '10px' }}>
                    {t('becomeTutor.photo.button')}
                  </Typography>
                </label>
              </Box>
            )}
          </Dropzone>
          <Typography sx={{ mt: '10px' }}>
            {t('becomeTutor.photo.fileSizeError')}
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
