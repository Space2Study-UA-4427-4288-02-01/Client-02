import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  LocationsWithTotal,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

type Params = {
  categoryId?: string
  page?: number
  search?: string
}

export const subjectService = {
  getSubjects: (
    params?: Params,
    categoryId?: string
  ): Promise<AxiosResponse<LocationsWithTotal<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    console.log(category)
    // return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
    return axiosClient.get(`${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  }
}
