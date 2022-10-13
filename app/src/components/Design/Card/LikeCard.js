import "./Card.css";
import {FaHeart} from "react-icons/fa";

const LikeCard = ({data}) => {
    return (
        <>
        <div className="likeInfo">
        
        <p className="heartIcon"><FaHeart size={20}/></p>
        <p className="idLike"> {data.id}</p>
        <h2>{data.dish}</h2>
        <p>{data.description}</p>
        </div>
        </>
    )
}

export default LikeCard;