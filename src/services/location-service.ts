import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  LocationsWithTotal,
  LocationCountryInterface,
  LocationCityInterface
} from '~/types'

export const locationService = {
  getCountries: (): Promise<
    AxiosResponse<LocationsWithTotal<LocationCountryInterface>>
  > => {
    return axiosClient.get(`${URLs.locations.getCountries}`)
  },
  getCities: (
    countryCode: string
  ): Promise<AxiosResponse<LocationsWithTotal<LocationCityInterface>>> => {
    return axiosClient.get(`${URLs.locations.getCities(countryCode)}`)
  }
}
