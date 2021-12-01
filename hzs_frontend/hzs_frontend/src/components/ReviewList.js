import Review from "./Review.js";

const ReviewList = ({items}) => {
    return(
        <>
          {items.map((review) => (<Review key={review.id} item={review}/>))}
        </>
    );
}

export default ReviewList;