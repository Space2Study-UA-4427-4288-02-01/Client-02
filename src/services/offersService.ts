import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { Offer, Response } from '~/types'

type Params = {
  categoryId?: string
  subjectId?: string
  page?: number
  search?: string
  languages?: string
}

export const offersService = {
  getOffers: (params?: Params): Promise<AxiosResponse<Response<Offer>>> => {
    return axiosClient.get(`${URLs.offers.get}`, { params })
  }
}
