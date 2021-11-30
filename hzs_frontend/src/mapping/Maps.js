/**********************************************************************************
 *                                                                                *
 *   Da bi ste importovali koristite:                                             *
 *      import {MapsWindow} from './mapping/Maps'                                 *
 *   Da bi ste koristili mapu kao elemnt koristite tag <MapsWindow></MapsWindow>  *
 *                                                                                *
 **********************************************************************************/
import React, {useState} from "react";
import {GoogleMap,
     useLoadScript,
     Marker,
     InfoWindow
    } from '@react-google-maps/api';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

import './maps.css'
import mapStyle from './mapStyle';

const API_KEY = "AIzaSyDonwQpIjVos4IF9zZKajYfXImEpwra5o8";

const libraries = ["places"];

const mapContainerStyle = {
    width: "500px",
    height: "400px"
};

const center={
    lat: 44.7553, 
    lng: 19.6923
};

const options={
    //styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true
}

// ===================== MAPS_WINDOW ===========================================================
const MapsWindow = ({onMarkerClick}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries
    })

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map)=>{
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng})=>{
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(18);
    });

    const [selectedMarker, setSelectedMarker] = useState({
        place_id: null,
        lat: null,
        lng: null
    });

    const [placesFound, setPlacesFound] = useState([])

    const [slectedAddress, setSelectedAddress] = useState("");

    function Search(){
        const {
            ready,
            value, 
            suggestions: {
                status,
                data,
            },
            setValue,
            clearSuggestions
        } = usePlacesAutocomplete({
            requestOptions:{
                location: {lat: ()=>center.lat, lng: ()=> center.lng},
                radius: 10*1000
            }
        });
    
        console.log(ready,value);
    
        const isSellingFood = (place) => {
            return (place.types.indexOf("food")!=-1) ||
                   (place.types.indexOf("restaurant")!=-1) ||
                   (place.types.indexOf("bakery")!=-1) ||
                   (place.types.indexOf("cafe")!=-1);
        }
    
        return <div className="search_box">
                    <Combobox onSelect={async (address)=>{
                                        console.log(address);
                                        try{
                                           const results = await getGeocode({address});
                                           console.log(results);
                                           const {lat, lng} = await getLatLng(results[0]);
                                           console.log(lat, lng);
                                           setSelectedMarker({
                                               place_id: results[0].place_id,
                                               lat: lat,
                                               lng: lng
                                            });
                                            setSelectedAddress(results[0].address_components);
                                            setPlacesFound((current)=>{
                                                if(status === "OK")
                                                    return data;
                                                return [];
                                            });
                                            panTo({lat, lng});
                                            clearSuggestions();
                                        }catch(exeption){
                                            console.log(exeption);
                                        }
                                    }}>
                    <ComboboxInput value={value}
                                    onChange={(event)=>{
                                        setValue(event.target.value);
                                    }}
                                    disabled={!ready}
                                    placeholder={"Enter address here"} />
                    <ComboboxPopover>
                        {status === "OK" && data.filter(test => isSellingFood(test)).map((place)=>{
                            console.log(place);
                            let place_id, description, rest;
                            ({place_id, description, ...rest} = place);
                            return <ComboboxOption key={place_id}
                                                 value={description}/>;
                        })}
                    </ComboboxPopover>
                </Combobox>
            </div>;
    }

    if(loadError) 
        return <h1>Error loading maps</h1>;
    if(!isLoaded) 
        return <h4>Loading...</h4>;

    return(
        <div id="map_wrapper">
            <div id="search_wrapper">
                <Search></Search>
            </div>
            <div className="map_container">
                <GoogleMap mapContainerStyle={mapContainerStyle}
                            zoom={10}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}
                            onClick={(event)=>{
                                setSelectedMarker({});
                                setPlacesFound([]);
                            }}>
                        {selectedMarker.place_id && <Marker key={selectedMarker.place_id}
                                                                  position={{lat:selectedMarker.lat, lng:selectedMarker.lng}}
                                                                  onClick={(event)=>{
                                                                    return onMarkerClick(placesFound.filter(place=>place.place_id==selectedMarker.place_id),
                                                                                  slectedAddress);
                                                                  }}/>}
                </GoogleMap>
            </div>
            
        </div>
    );
};

export {MapsWindow};
