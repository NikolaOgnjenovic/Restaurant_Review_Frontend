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
    lat: 44.7544, 
    lng: 19.4705
};

const options={
    //styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true
}

/*var isLoaded=false;
var loadError=null;*/

// ===================== MAPS_WINDOW ===========================================================
const MapsWindow = (onMarkerClick) => {
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
                                                 value={description}
                                                 onClick={(e)=>{
                                                     
                                                 }}/>;
                        })}
                    </ComboboxPopover>
                </Combobox>
            </div>;
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries
    })

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map)=>{
        mapRef.current = map;
    }, []);

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
                            zoom={14}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}>
                </GoogleMap>
            </div>
            
        </div>
    );
};

export {MapsWindow};
