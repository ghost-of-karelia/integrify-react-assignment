import { PropsWithChildren, useState } from "react"
import { SearchContext } from "./SearchContext"

export function SearchContextProvider(props:PropsWithChildren<unknown>) {
    const [searchText, setSearchText] = useState("")
    return <SearchContext.Provider value={{ searchText, setSearchText }}>
        {props.children}
    </SearchContext.Provider>
}