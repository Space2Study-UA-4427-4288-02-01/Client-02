import { snackbarVariants } from '~/constants'
import { getErrorMessage } from '~/containers/guest-home-page/sign-up-dialog/getErrorMessage'
import { SnackBarContextOutput } from '~/context/snackbar-context'

export const handleApiError = (
  error: unknown,
  setAlert: SnackBarContextOutput['setAlert']
): void => {
  setAlert({
    severity: snackbarVariants.error,
    message: getErrorMessage(error)
  })
}
