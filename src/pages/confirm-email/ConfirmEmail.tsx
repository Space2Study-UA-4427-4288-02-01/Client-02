import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { AuthService } from '~/services/auth-service'
import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'
import { defaultResponses } from '~/constants'

const ConfirmEmail = () => {
  const params = new URLSearchParams(window.location.search)
  const confirmToken = params.get('confirmToken') ?? ''
  const navigate = useNavigate()

  const confirmEmail = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { loading, response } = useAxios({
    service: confirmEmail,
    fetchOnMount: true,
    defaultResponse: defaultResponses.array
  })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  // TODO: Add success/error popup with redirect to login page
  if (response) {
    navigate('/')
  }

  return <div></div>
}

export default ConfirmEmail
