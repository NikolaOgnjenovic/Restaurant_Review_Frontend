/*********************************************************************************
 *                                                                               *
 *   Da bi ste koristili mapu kao elemnt koristite tag <MapsWindow></MapsWindow  *
 *                                                                               *
 *********************************************************************************/
import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';

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

var isLoaded=false;
var loadError=null;

var Maps = () => {

}

const MapsWindow = () => {
    ({isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries
    }));
    
    console.log(API_KEY);

    if(loadError) 
        return <h1>Error loading maps</h1>;
    if(!isLoaded) 
        return <h4>Loading...</h4>;

    return(
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                        zoom = {5}
                        center={center}>

            </GoogleMap>
        </div>
    );
};

export {Maps, MapsWindow};
