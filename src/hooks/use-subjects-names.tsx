import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps<T> {
  category?: string | null
  fetchOnMount?: boolean
  transform?: (data: SubjectNameInterface[]) => T[]
}

interface UseSubjectsNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useSubjectsNames = <T = SubjectNameInterface,>({
  category,
  fetchOnMount = false,
  transform
}: UseSubjectsNamesProps<T>): UseSubjectsNamesResult<T> => {
  // const getSubjectsNames = useCallback(
  //   () => subjectService.getSubjectsNames(category),
  //   [category]
  // )

  const getSubjectsNames = useCallback(async () => {
    const res = await subjectService.getSubjectsNames(
      category ? category : null
    )
    return {
      ...res,
      data: res.data.data
    }
  }, [category])

  const { loading, response, fetchData, error } = useAxios<
    SubjectNameInterface[],
    undefined,
    T[]
  >({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useSubjectsNames
