import { useCallback, useEffect, useState } from 'react'
import { locationService } from '~/services/location-service'
import useAxios from './use-axios'
import { defaultResponses } from '~/constants'
import { LocationCityInterface } from '~/types'

export interface UseLocationsProps {
  fetchCountriesOnMount?: boolean
  fetchCitiesOnMount?: boolean
  countryCode?: string | null
}

const useLocations = ({
  fetchCountriesOnMount = false,
  fetchCitiesOnMount = false,
  countryCode = null
}: UseLocationsProps = {}) => {
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
    (newCities: LocationCityInterface[]) => {
      const newIds = new Set(newCities.map((c) => c.id))
      for (const code in citiesCache) {
        const cachedIds = citiesCache[code].map((c) => c.id)
        if (
          cachedIds.length === newCities.length &&
          cachedIds.every((id) => newIds.has(id))
        ) {
          return true
        }
      }
      return false
    },
    [citiesCache]
  )

  useEffect(() => {
    if (!selectedCountryCode) return
    if (!Array.isArray(cities) || cities.length === 0) return
    if (isCitiesCached(cities)) return
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
