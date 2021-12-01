import React, { useState } from "react";
import Header from "../header/Header";
import { MapsWindow } from "./Maps";
import Reviews from "../components/Reviews";

import './MapPage.css';

const MapPage = () =>{
    const [review, setReview] = useState({
        id: -1,
        place_id: "",
        title: "",
        description: "",
        likes: 0,
        dislikes: 0,
        foodCost: -1,
        userId: -1,
        likedBy: [],
        dislikedBy: []
    });

    return(
        <React.Fragment>
            <div id="flex-container">
                <div id="map_win_container">
                    <MapsWindow onMarkerClick={CreateReview}></MapsWindow>
                </div>
                <div id="review_form"></div>
            </div>
            <div id="list">
                <Reviews/>
            </div>
        </React.Fragment>
    );
}

const CreateReview = (place, address) =>{
    const serverURL = "";
    console.log("Place is : ", place);
    console.log("Address : ",address);

    const formElement = ()=>{
        return `<div id="form_container"></div>`;
    }

    document.getElementById("review_form").innerHTML = formElement();
}

export default MapPage;
