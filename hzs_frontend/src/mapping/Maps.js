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

const API_KEY = "AIzaSyD6XbHQZ_VUZaNXSXAlu0Ufj8IM-07M9NY";

const libraries = ["places"];

const mapContainerStyle = {
    width: "500px",
    height: "400px"
};

const center={
    lat: 44.754100, 
    lng: 19.467379
};

const options={
    disableDefaultUI: true,
}

var isLoaded=false;
var loadError=null;

const MapsWindow = () => {
    ({isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries
    }));

    if(loadError) 
        return <h1>Error loading maps</h1>;
    if(!isLoaded) 
        return <h4>Loading...</h4>;

    return(
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                        zoom = {5}
                        center={center}
                        options={options}>
            </GoogleMap>
            <Search></Search>
        </div>
    );
};

const Search=()=>{
    const {
        ready,
        value, 
        suggestions: {
            status,
            data
        },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions:{
            location: {lat: ()=>center.lat, lng: ()=> center.lng},
            radius: 100*1000
        }
    });

    console.log(ready,value);

    return <Combobox onSelect={(addr)=>{
        console.log(addr);
    }}>
        <ComboboxInput value={value}
                        onChange={(event)=>{
                            setValue(event.target.value);
                        }}
                        disabled={!ready}
        />
        <ComboboxPopover>
            {status == "OK" && data.map(({id, desctiption})=> <ComboboxOption key={id} value={desctiption}/>)}
        </ComboboxPopover>
    </Combobox>;
}

export {MapsWindow};
