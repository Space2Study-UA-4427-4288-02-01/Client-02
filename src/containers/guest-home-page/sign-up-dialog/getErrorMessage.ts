import { ApiError } from '~/types'

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as { data?: { code?: string } }).data === 'object'
  )
}

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    if (error.data?.code) return `errors.${error.data.code}`
    if (error.data?.message) return `errors.${error.data.message}`
  }
  return 'errors.unknownError'
}
