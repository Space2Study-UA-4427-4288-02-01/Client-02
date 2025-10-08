import { useCallback, useEffect } from 'react'
import { AuthService } from '~/services/auth-service'
import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'
import { defaultResponses } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { EmailModal } from '~/components/email-modal/EmailModal'

const ConfirmEmail = () => {
  const params = new URLSearchParams(window.location.search)
  const confirmToken = params.get('confirmToken') ?? ''

  const { openModal, closeModal } = useModalContext()

  const confirmEmail = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { loading, response, error } = useAxios({
    service: confirmEmail,
    fetchOnMount: true,
    defaultResponse: defaultResponses.array
  })

  useEffect(() => {
    if (response) {
      openModal({ component: <EmailModal type='success' /> })
    }
    if (error) {
      openModal({ component: <EmailModal type='error' /> })
    }
  }, [response, error, closeModal, openModal])

  if (loading) {
    return <Loader pageLoad size={70} />
  }
}

export default ConfirmEmail
