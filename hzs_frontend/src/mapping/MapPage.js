import React, { useState } from "react";
import Header from "../header/Header";
import { MapsWindow } from "./Maps";
import Reviews from "../components/Reviews";

import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {AiFillDislike} from "react-icons/ai";

import './MapPage.css';
import Review from "../components/Review";

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
    const serverURL = "https://hrana-u-blizini-api.herokuapp.com//reviews";

    console.log("Place is : ", place);
    console.log("Address : ",address);

    try{
        fetch(`${serverURL}/`)
            .then(({reviews})=>{
                console.log(reviews);
                {reviews && reviews.map((review)=>{
                    <Review item={review.json()}/>
                })};
        });
    }catch(e){
        console.log(e);
    }

    const formElement = ()=>{
        return `<div id="form_container">
                <h3>${place[0].structured_formatting.main_text}<h3>
                <h5>${place[0].structured_formatting.secondary_text}</h5>
                <button id="like"></button>
                <button><AiFillDislike/></button>
                </div>`;
    }


    document.getElementById("review_form").innerHTML = formElement();
}

export default MapPage;


/**
 * {
    "description": "Skroz Dobra Pekara, Masarikova, Šabac, Serbia",
    "matched_substrings": [
        {
            "length": 5,
            "offset": 0
        }
    ],
    "place_id": "ChIJj28MxPzKW0cRLypGHDf4SBc",
    "reference": "ChIJj28MxPzKW0cRLypGHDf4SBc",
    "structured_formatting": {
        "main_text": "Skroz Dobra Pekara",
        "main_text_matched_substrings": [
            {
                "length": 5,
                "offset": 0
            }
        ],
        "secondary_text": "Masarikova, Šabac, Serbia"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Skroz Dobra Pekara"
        },
        {
            "offset": 20,
            "value": "Masarikova"
        },
        {
            "offset": 32,
            "value": "Šabac"
        },
        {
            "offset": 39,
            "value": "Serbia"
        }
    ],
    "types": [
        "bakery",
        "food",
        "point_of_interest",
        "store",
        "establishment"
    ]
}
 */