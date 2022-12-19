import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { ChevronRight, PowerInput } from '@mui/icons-material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SearchContext } from './SearchContext';
import { CountryRow } from './CountryRow';
import { DataContext } from './DataContext';
import { CountryView } from './CountryView';

// <img src={params.value} alt='' height={100} /> 
// TODO How to better assign width without using background image? 
const renderFlagCell = (params: GridRenderCellParams<string, any, any>) =>
  <div style={{
    background: `url(${params.value})`,
    width: 130,
    height: 130,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }} />

const renderLanguagesCell = (params: GridRenderCellParams<string[], any, any>) =>
  <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ width: "100%" }} sx={{ pr: 5 }}>
    <ul>
      {params.value?.map(
        (lang, i) => <li key={i}>{lang}</li>
      )
      }
    </ul>
    <ChevronRight />
  </Stack>

const columns: GridColDef[] = [
  {
    field: 'flag',
    headerName: 'Flag',
    renderCell: renderFlagCell,
    width: 200,
    //TODO Check the documentation on DataGrid on how to change width if picture is bigger or smaller
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'region',
    headerName: 'Region',
    flex: 1,
  },
  {
    field: 'population',
    headerName: 'Population',
    flex: 1,
  },
  {
    field: 'languages',
    headerName: 'Languages',
    // valueFormatter: (params: GridValueFormatterParams<string[]>) => params.value.join("; "),
    // TODO: Figure out what the hell is any in GridRenderCellParams
    renderCell: renderLanguagesCell,
    flex: 2,
  }
];

export function CountriesGrid() {
  const { searchText } = useContext(SearchContext)
  const { countries } = useContext(DataContext)

  // useMemo takes two parameter, first is the callback returning the value, and the second is the array of dependencies
  // callback is executed only when any of dependencies were changed 
  const filteredRows = useMemo(() => countries.filter((row) => {
    const loweredSearchText = searchText.toLowerCase()
    return row.name.toLowerCase().includes(loweredSearchText) || row.region.toLowerCase().includes(loweredSearchText)
  }), [countries, searchText])

  const [selectedCountryName, setSelectedCountryName] = useState<string>()
  const [pageSize, setPageSize] = useState(5)

  const rowClickHandler = (params: any) => {
    setSelectedCountryName(params.row.name)
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {
        selectedCountryName === undefined
          ? <DataGrid
            getRowHeight={() => 'auto'}
            rows={filteredRows}
            columns={columns}
            onPageSizeChange={
              (newPageSize) => {setPageSize(newPageSize)}
            }
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15, 20]}
            experimentalFeatures={{ newEditingApi: true }}
            disableColumnMenu
            isRowSelectable={() => false}
            onRowClick={rowClickHandler}
          /> 
          : <CountryView name={selectedCountryName} onBackClick={() => {
            setSelectedCountryName(undefined)
          }} />
      }
    </Box>
  );
}