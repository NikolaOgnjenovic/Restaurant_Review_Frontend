import Review from "./Review.js";

const ReviewList = ({reviewList}) => {
    return(
        <>
        {reviewList.map((listItem) => (<Review item={listItem}/>))}
        </>
    )
}

export default ReviewList;