import { useCallback, useEffect, useRef, useState } from 'react'
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
  const lastCitiesCodeRef = useRef<string | null>(countryCode)
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
    transform: (data) => data.data,
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
    transform: (data) => data.data,
    fetchOnMount: Boolean(fetchCitiesOnMount && countryCode),
    defaultResponse: defaultResponses.array
  })

  const fetchCitiesForCode = useCallback(
    (code: string) => {
      lastCitiesCodeRef.current = code
      return fetchCities(code)
    },
    [fetchCities]
  )

  const isCitiesCached = useCallback(
    (code: string, newCities: LocationCityInterface[]) => {
      const cached = citiesCache[code]
      if (!cached) return false
      if (cached.length !== newCities.length) return false
      const newIds = new Set(newCities.map((c) => c.id))
      return cached.every((c) => newIds.has(c.id))
    },
    [citiesCache]
  )

  useEffect(() => {
    if (!Array.isArray(cities) || cities.length === 0) return
    const code = lastCitiesCodeRef.current ?? selectedCountryCode
    if (!code) return
    if (isCitiesCached(code, cities)) return
    setCitiesCache((prev) => ({ ...prev, [code]: cities }))
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
      fetch: fetchCitiesForCode
    },
    citiesCache,
    selectedCountryCode,
    setSelectedCountryCode,
    loading: loadingCountries || loadingCities
  }
}

export default useLocations
