import { createContext } from "react";
import { CountryRow } from "./CountryRow";

interface DataContextValue {
    countries: CountryRow[] 
    setCountries: (value: CountryRow[]) => void
}

export const DataContext = createContext<DataContextValue>({
    countries: [],
    setCountries: () => {}
});