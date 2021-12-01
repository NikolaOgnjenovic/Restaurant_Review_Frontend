import {useEffect, useState} from "react";
import ReviewList from "./ReviewList.js";

const Reviews = () => {
    const BASE_URL = "https://hrana-u-blizini-api.herokuapp.com/reviews/";
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getData = () => {
          fetch(BASE_URL)
            .then((response) => {
                const t = response.json();
                console.log(t);
                return t;
            })
            .then((data) => setReviews(data));
        };
        getData();
      }, []);

    return(
        <>
            <ReviewList items={reviews}/>
        </>
    )
}

export default Reviews;