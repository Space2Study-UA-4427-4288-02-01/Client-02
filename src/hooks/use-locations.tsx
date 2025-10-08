import { useCallback, useMemo, useState } from 'react'
import { locationService } from '~/services/location-service'
import { LocationCountryInterface, LocationCityInterface } from '~/types'

interface Option {
  title: string
  value: string
}

const useLocations = () => {
  const [countries, setCountries] = useState<LocationCountryInterface[]>([])
  const [cities, setCities] = useState<Record<string, LocationCityInterface[]>>(
    {}
  )
  const [selectedCountry, setSelectedCountry] =
    useState<LocationCountryInterface>({} as LocationCountryInterface)
  const [areCountriesLoaded, setAreCountriesLoaded] = useState(false)

  const getCountries = useCallback(async () => {
    if (countries.length > 0) return

    const res = await locationService.getCountries()
    const countriesData = res.data.data
    setCountries(countriesData)
    setAreCountriesLoaded(true)
  }, [countries.length])

  const getCities = useCallback(async () => {
    const countryCode = selectedCountry?.countryCode
    if (!countryCode) return
    if (cities[countryCode]?.length > 0) return

    const res = await locationService.getCities(countryCode)
    const citiesData = res.data.data
    setCities((prev) => ({
      ...prev,
      [countryCode]: citiesData
    }))
  }, [selectedCountry?.countryCode, cities])

  const selectCountry = (countryName: string) => {
    const country = countries.find((c) => c.name === countryName)
    if (country && country !== selectedCountry) {
      setSelectedCountry(country)
    }
  }

  const countryOptions: Option[] = useMemo(
    () =>
      countries.map((c) => ({
        id: c.id,
        title: c.name,
        value: c.name
      })),
    [countries]
  )

  const cityOptions: Option[] = useMemo(
    () =>
      (cities[selectedCountry?.countryCode] ?? []).map((c) => ({
        id: c.id,
        title: c.name,
        value: c.name
      })),
    [cities, selectedCountry?.countryCode]
  )

  return {
    countries,
    cities,
    countryOptions,
    cityOptions,
    areCountriesLoaded,
    getCountries,
    getCities,
    selectCountry
  }
}

export default useLocations
