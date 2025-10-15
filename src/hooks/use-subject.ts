import { useCallback } from 'react'
import { OptionType } from '~/components/app-auto-complete/AppAutoComplete'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, SubjectInterface } from '~/types'

interface UseSubjectsProps<T> {
  category: OptionType | null
  fetchOnMount?: boolean
  transform?: (data: SubjectInterface[]) => T[]
}

interface UseSubjectsResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useSubjects = <T = SubjectInterface>({
  category,
  fetchOnMount = false,
  transform
}: UseSubjectsProps<T>): UseSubjectsResult<T> => {
  const getSubjects = useCallback(async () => {
    const res = await subjectService.getSubjects(
      category ? { name: category?.value } : undefined
    )
    return {
      ...res,
      data: res.data.data
    }
  }, [category])

  const { loading, response, fetchData, error } = useAxios<
    SubjectInterface[],
    undefined,
    T[]
  >({
    service: getSubjects,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useSubjects
