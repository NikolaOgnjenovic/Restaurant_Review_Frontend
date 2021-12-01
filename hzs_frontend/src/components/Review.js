import "../css/recenzije.css";
import {AiOutlineLike} from "react-icons/ai";
import {AiFillDislike} from "react-icons/ai";

const Review = ({item}) => {
    return(
        <>
            <div id="container" class="recenzija"> 
            <h2 id="naslov">{item.title}</h2>
            <div id = "description">{item.description}</div>
            <p>Potroseno novca: {item.foodCost}</p>
            <p>Lajkovali: {item.likedBy}</p>
            <p>Dislajkovali: {item.dislikedBy}</p>
            <p>Ocena od strane korisnika sa sifrom {item.userId}</p>
            <div id = "likes-dislikes">
                <div className="like-dislike" id="likes"><AiOutlineLike className="icons"/> {item.likes}</div>
                <div className="like-dislike" id="dislikes"><AiFillDislike className="icons"/> {item.dislikes}</div>
            </div>
            <div id="bottom">

            </div>
        </div>
        </>
    )
}

export default Review;