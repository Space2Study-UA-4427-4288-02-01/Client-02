import { useCallback, useEffect, useState } from 'react'
import { locationService } from '~/services/location-service'
import useAxios from './use-axios'
import { defaultResponses } from '~/constants'

const useLocations = ({
  fetchCountriesOnMount = false,
  fetchCitiesOnMount = false
} = {}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  )

  const getCountries = useCallback(() => locationService.getCountries(), [])
  const {
    loading: loadingCountries,
    response: countries,
    error: countriesError,
    fetchData: fetchCountries
  } = useAxios({
    service: getCountries,
    transform: (res) => res.data,
    fetchOnMount: fetchCountriesOnMount,
    defaultResponse: defaultResponses.array
  })

  const getCities = useCallback(
    (countryCode?: string) => locationService.getCities(countryCode as string),
    []
  )
  const {
    loading: loadingCities,
    response: cities,
    error: citiesError,
    fetchData: fetchCities
  } = useAxios({
    service: getCities,
    transform: (res) => res.data,
    fetchOnMount: fetchCitiesOnMount,
    defaultResponse: defaultResponses.array
  })

  useEffect(() => {
    if (selectedCountryCode) {
      void fetchCities()
    }
  }, [selectedCountryCode, fetchCities])

  return {
    countries: {
      data: countries,
      loading: loadingCountries,
      error: countriesError,
      fetch: fetchCountries
    },
    cities: {
      data: cities,
      loading: loadingCities,
      error: citiesError,
      fetch: fetchCities
    },
    selectedCountryCode,
    setSelectedCountryCode,
    loading: loadingCountries || loadingCities
  }
}

export default useLocations
