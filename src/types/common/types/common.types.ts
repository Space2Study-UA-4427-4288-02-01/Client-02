import { SortEnum } from '../common.index'

export type Address = {
  country: string
  city: string
}

export type Category = {
  _id: string
  name: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: SortEnum
  orderBy: string
}

export type CategoryParams = {
  page?: number
  search?: string
}

export type SubjectsParams = {
  categoryId?: string
  page?: number
  search?: string
}
