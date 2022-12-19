import { createContext } from "react";

interface SearchContextValue {
    searchText: string
    setSearchText: (value: string) => void
}

export const SearchContext = createContext<SearchContextValue>({
    searchText: "",
    setSearchText: () => {}
});