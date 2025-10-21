import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { languageService } from '~/services/languages-service'

const useLanguages = ({ fetchOnMount = false } = {}) => {
  const getLanguages = useCallback(() => languageService.getLanguages(), [])

  const { loading, response, fetchData, error } = useAxios({
    transform: (data) => data.data,
    service: getLanguages,
    fetchOnMount,
    defaultResponse: defaultResponses.array
  })

  return { loading, response, fetchData, error }
}

export default useLanguages
