import React, { useState } from "react";
import ReactDOM from 'react-dom';
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
    const serverURL = "https://hrana-u-blizini-api.herokuapp.com/reviews/getReviewsByPlaceId";

    console.log("Place is : ", place);
    console.log("Address : ",address);

    const addressFormated = `${address[2].long_name}, ${address[1].long_name} ${address[0].long_name}`;

    try{
        fetch(`${serverURL}/${place[0].place_id}`)
            .then(({reviews})=>{
                console.log(reviews);
                document.getElementById("list").style.display = 'none';
                {reviews && reviews.map((review)=>{
                    <Review item={review.json()}/>
                })};
        });
    }catch(e){
        console.log(e);
    }

    const formElement = ()=>{
        return (
            <React.Fragment>
                <div id="form_container">
                <h3>{place[0].structured_formatting.main_text}</h3>
                <h5>{addressFormated}</h5>
                <div>
                    <Form place={place[0]}></Form>
                </div>
                </div>
            </React.Fragment>
            );
    }
    ReactDOM.render(formElement(), document.getElementById("review_form"));
}

const Form = ({place}) => {
    const sessinoUsername = window.sessionStorage.getItem("username");
    return (
        <div id="form_wrapper">
            <form onSubmit={()=>{
                                console.log("=============================");
                                console.log("Place",place);
                                console.log("=============================");
                                onSubmit(place);
                            }}>
                <div>
                <label>Vaše korisničko ime</label><br/>
                <input id="username" 
                       type="text" 
                       placeholder="Korisnicko ime"
                       value={sessinoUsername?sessinoUsername:""}/><br/>
                </div>
                <div>
                <label> Vaše misljenje: </label><br/>
                <textarea
                    id="description"
                    rows="8"
                    cols="50" 
                    placeholder="Hrana je bila izvrsna!"
                />
                </div>
                <div>
                <label> Cena jela: </label><br/>
                <input tyep="text" placeholder="Koliko vas je koštao obrok" id="foodCost"/>
                </div>
                <div>
                    <input type="submit" value="Pošalji recenziju"/>
                </div>
            </form>
        </div>
    );
}

const onSubmit=(place)=>{
    const sessionEmail = window.sessionStorage.getItem("e-mail");
    
    const postURL = "https://hrana-u-blizini-api.herokuapp.com/reviews/";
    const getUserEmailURL = `https://hrana-u-blizini-api.herokuapp.com/user/${document.getElementById("username").value()}/getUser`;
    const review = {
        description: document.getElementById("description").value(),
        foodCost: document.getElementById("foodCost").value(),
        placeId: place.place_id,
        title: place.structured_formatting.main_text,
        userEmail: sessionEmail//fetch(getUserEmailURL).then((data)=>data.json()).then((user)=>user.email)
    }
    console.log("=============================");
    console.log(review);
    console.log("=============================");
    const requestOptions = {
        method: 'POST',
        //headers: {'Content-type':'application/json'},
        headers:{"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(review)
    }

    fetch(postURL, requestOptions)
        .then((data)=>data.json())
        .then((response)=>console.log(response));
}

export default MapPage;
