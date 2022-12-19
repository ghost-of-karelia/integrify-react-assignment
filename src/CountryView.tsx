import { PropsWithChildren, useEffect, useState } from "react"
import { apiUrl } from "./constants"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowBackIos, ExpandMore, LocationOn } from "@mui/icons-material";
import { Stack } from "@mui/material";

// This custom hook allows to fetch and parse CountryDetails from the API
function useCountryDetails(countryName: string): CountryDetails | undefined {
    const [countryDetails, setCountryDetails] = useState<CountryDetails>()

    const fetchCountriesData = async () => {
        const response = await fetch(apiUrl + "name/" + countryName)
        if (response.status === 200) {
            const data = await response.json() as unknown[]
            const firstData = data[0] as any
            const parsedCountryDetails: CountryDetails = {
                name: firstData.name.common,
                capitalName: firstData.capital[0],
                flagURL: firstData.flags.png,
                region: firstData.region,
                subRegion: firstData.subregion,
                latitude: firstData.latlng[0],
                longitude: firstData.latlng[1],
                population: firstData.population,
                independent: firstData.independent
            }
            setCountryDetails(parsedCountryDetails)
        } else {
            // todo indicate error
        }
    }

    useEffect(() => {
        fetchCountriesData()
    }, [])
    return countryDetails
}

function InlineLink(props: PropsWithChildren) {
    return <a href="#" className="inlineLink">{props.children}</a>
}

export function CountryView(props: CountryViewProps) {
    const country = useCountryDetails(props.name)
    return country === undefined
        ? <>Country is not found</>
        : (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {country.name.length > 0 ? country.name[0] : "?"}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={country.name}
                    subheader={country.capitalName}
                />
                <CardMedia
                    component="img"
                    height="auto"
                    style={{maxWidth: "60%"}}
                    sx = {{px:2}}
                    image={country.flagURL}
                    alt={country.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <Typography paragraph>The country belongs to <InlineLink>{country.region}</InlineLink> region and <InlineLink>{country.subRegion}</InlineLink> sub-region.
                            Located at the <InlineLink>{Math.round(country.latitude)}</InlineLink> °N and <InlineLink>{Math.round(country.longitude)}</InlineLink> °W,
                            this country has population of <InlineLink>{country.population}</InlineLink> and it has <InlineLink>{country.independent ? '' : 'not'}</InlineLink>
                            gained the independence, according to the CIA World Factbook.</Typography>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                        <Stack direction="row" alignItems="center">
                            <IconButton onClick={
                                props.onBackClick
                            }>
                                <ArrowBackIos />
                            </IconButton>
                            <IconButton>
                                <LocationOn />
                            </IconButton>
                        </Stack>
                        <IconButton>
                            <ExpandMore />
                        </IconButton>
                    </Stack>
                </CardActions>
            </Card>
        );
}

interface CountryViewProps {
    name: string
    onBackClick: () => void
}

interface CountryDetails {
    name: string
    capitalName: string
    flagURL: string
    region: string
    subRegion: string
    latitude: number
    longitude: number
    population: number
    independent: boolean
}