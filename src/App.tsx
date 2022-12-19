import AppBar from './AppBar';
import { CountriesGrid } from './CountriesGrid';
import { DataContextProvider } from './DataContextProvider';
import { SearchContextProvider } from './SearchContextProvider';

// import logo from './logo.svg';
import './App.css';
import { Stack } from '@mui/material';

function App() {
  return (
    <DataContextProvider>
      <SearchContextProvider>
        <Stack direction="column" className="mainLayout" justifyContent="stretch">
          <AppBar />
          <CountriesGrid />
        </Stack>
      </SearchContextProvider>
    </DataContextProvider>
  );
}

export default App;

// TODO 
// 1 DONE Search
// 2 DONE Flags 
// 3 DONE Counter below
// 4 DONE New window 
// 5 DONE Clean architecture 
// 6 DONE Parse languages
// 7 Clean up
// 8 Deploy on prod