import { LocationCityInterface, LocationCountryInterface } from '~/types'

export const countryOptionsHelper = (data: LocationCountryInterface[]) => {
  return data.map((country) => ({
    value: country.countryCode,
    title: country.name
  }))
}

export const cityOptionsHelper = (data: LocationCityInterface[]) => {
  return data.map((country) => ({
    value: country.id.toString(),
    title: country.name
  }))
}
