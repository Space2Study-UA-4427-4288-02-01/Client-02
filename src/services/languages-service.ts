import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  LanguagesInterface,
  LanguagesParams,
  LocationsWithTotal
} from '~/types'

export const languageService = {
  getLanguages: (
    params?: Partial<LanguagesParams>
  ): Promise<AxiosResponse<LocationsWithTotal<LanguagesInterface>>> => {
    return axiosClient.get(URLs.languages.get, { params })
  }
}
