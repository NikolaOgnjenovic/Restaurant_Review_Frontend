import React, { useState } from "react";
import Header from "../header/Header";
import { MapsWindow } from "./Maps";
import ReviewList from "../components/ReviewList.js";

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
            <div id="map_win_container">
                <MapsWindow></MapsWindow>
            </div>
            <ReviewList/>
        </React.Fragment>
    );
}

const CreateReview = () =>{
    const serverURL = "";
    
}

export default MapPage;