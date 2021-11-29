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

const API_KEY = "AIzaSyD6XbHQZ_VUZaNXSXAlu0Ufj8IM-07M9NY";

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
const MapsWindow = () => {
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
        <div>
            <Search></Search>
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
                    {status === "OK" && data.map((test)=>{
                        console.log(test);
                        let place_id, description, rest;
                        ({place_id, description, ...rest} = test);
                        return <ComboboxOption key={place_id}
                                             value={description}/>;
                    })}
                </ComboboxPopover>
            </Combobox>
        </div>;
}

export {MapsWindow};
