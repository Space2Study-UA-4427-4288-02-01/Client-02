import { HTMLAttributes } from 'react'
import { OptionType } from '~/components/app-auto-complete/AppAutoComplete'
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

export const countryCodeHelper = (
  country: string,
  data: LocationCountryInterface[]
) => {
  const countryObj = data.find((c) => c.name === country)
  return countryObj?.countryCode
}

export const getCityByName = (city: string, data: LocationCityInterface[]) => {
  return data.find((c) => c.name === city)
}

export const handleRenderOptions = (
  props: HTMLAttributes<HTMLLIElement>,
  option: OptionType
) => (
  <li {...props} key={option.value}>
    {option.title}
  </li>
)
