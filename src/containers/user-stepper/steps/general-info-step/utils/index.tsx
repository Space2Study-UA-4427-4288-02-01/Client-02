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

export const handleRenderOptions = (
  props: HTMLAttributes<HTMLLIElement>,
  option: OptionType
) => (
  <li {...props} key={option.value}>
    {option.title}
  </li>
)
