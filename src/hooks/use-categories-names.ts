import { useCallback } from 'react'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface, CategoryNamesResponse } from '~/types'

const useCategoriesNames = ({ fetchOnMount = false } = {}) => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategoryNamesResponse,
    null,
    CategoryNameInterface[]
  >({
    service: getCategoriesNames,
    transform: (data) => data.data,
    fetchOnMount,
    defaultResponse: defaultResponses.array
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames
