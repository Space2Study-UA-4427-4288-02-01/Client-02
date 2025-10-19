import { useCallback, useEffect, useState } from 'react'
import { locationService } from '~/services/location-service'
import useAxios from './use-axios'
import { defaultResponses } from '~/constants'
import { LocationCityInterface } from '~/types'

const useLocations = ({
  fetchCountriesOnMount = false,
  fetchCitiesOnMount = false,
  countryCode = null
} = {}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    countryCode
  )
  const [citiesCache, setCitiesCache] = useState<
    Record<string, LocationCityInterface[]>
  >({})

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

  const isCitiesCached = useCallback(
    (countryCode: string, newCities: LocationCityInterface[]) => {
      const cached = citiesCache[countryCode]
      console.log(cached)

      if (!cached) return false
      return cached.every((city) => newCities.some((c) => c.id === city.id))
    },
    [citiesCache]
  )

  useEffect(() => {
    if (!selectedCountryCode) return
    if (!Array.isArray(cities) || cities.length === 0) return
    if (isCitiesCached(selectedCountryCode, cities)) return
    setCitiesCache((prev) => ({
      ...prev,
      [selectedCountryCode]: cities
    }))
  }, [cities, selectedCountryCode, isCitiesCached])

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
    citiesCache,
    selectedCountryCode,
    setSelectedCountryCode,
    loading: loadingCountries || loadingCities
  }
}

export default useLocations
