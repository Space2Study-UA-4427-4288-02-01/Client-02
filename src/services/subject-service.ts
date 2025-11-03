import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  LocationsWithTotal,
  SubjectInterface,
  SubjectNameInterface,
  SubjectsParams
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const subjectService = {
  getSubjects: (
    params?: SubjectsParams,
    categoryId?: string
  ): Promise<AxiosResponse<LocationsWithTotal<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    console.log(category)
    // return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
    return axiosClient.get(`${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<LocationsWithTotal<SubjectNameInterface>>> => {
    // const category = createUrlPath(URLs.subjects.getNames, categoryId)
    return axiosClient.get(`${URLs.subjects.getNames}`, {
      params: { categoryId }
    })
  }
}
