import { useCallback, useState } from 'react'
import { locationService } from '~/services/location-service'
import useAxios from './use-axios'
import { defaultResponses } from '~/constants'

export interface UseLocationsProps {
  fetchCountriesOnMount?: boolean
}

const useLocations = ({
  fetchCountriesOnMount = false
}: UseLocationsProps = {}) => {
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
    transform: (data) => data.data,
    fetchOnMount: fetchCountriesOnMount,
    defaultResponse: defaultResponses.array
  })

  const getCities = useCallback(
    (code?: string) => locationService.getCities(code as string),
    []
  )
  const {
    loading: loadingCities,
    response: cities,
    error: citiesError,
    fetchData: fetchCities
  } = useAxios({
    service: getCities,
    transform: (data) => data.data,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

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
    setSelectedCountryCode
  }
}

export default useLocations
