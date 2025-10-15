import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

const useCategories = ({ fetchOnMount = false } = {}) => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategories(),
    []
  )

  const { loading, response, fetchData, error } = useAxios({
    transform: (data) => data.data,
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array
  })

  return { loading, response, fetchData, error }
}

export default useCategories
