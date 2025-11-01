import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoriesParams,
  LocationsWithTotal,
  CategoryNamesResponse,
  CategoryParams
} from '~/types'

export const categoryService = {
  getCategories: (
    params?: CategoryParams
  ): Promise<AxiosResponse<LocationsWithTotal<CategoryInterface>>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<CategoryNamesResponse>> => {
    return axiosClient.get(URLs.categories.getNames, { params })
  }
}
