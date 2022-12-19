import { PropsWithChildren, useEffect, useState } from "react"
import { apiUrl } from "./constants"
import { CountryRow } from "./CountryRow"
import { DataContext } from "./DataContext"

export function DataContextProvider(props: PropsWithChildren<unknown>) {
    const [countries, setCountries] = useState<CountryRow[]>([])
    
    const parseCountry = (country: any, i: number) => ({
        name: country.name.common,
        id: i,
        flag: country.flags.png,
        region: country.region,
        population: country.population,
        languages: Object.values(country.languages ?? {} ) as string[]
    })

    const fetchCountriesData = async () => {
        const response = await fetch(apiUrl + "all")
        if (response.status === 200) {
            const data = await response.json() as unknown[]
            setCountries(data.map(parseCountry))
        } else {
            // todo indicate error
        }
    }
    // TODO google how to work with useEffect 
    useEffect(() => {
        fetchCountriesData()
    }, [])
    return (
        <DataContext.Provider value={{
            countries, setCountries
        }}>
            {props.children}
        </DataContext.Provider>
    )
}