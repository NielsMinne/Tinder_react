import Button from "../Button/Button";
import { VscCheck,VscClose } from "react-icons/vsc";
import "./Card.css";

const SwipeCard = ({data,onLike,onDislike}) => {
    return (
        <>
        <div className="cardInfo">
        <p className="id "> {data.id}</p> 
        <h2>{data.dish}</h2>
        <p>{data.description}</p>
        </div>
        <div className="buttonContainer">
        <Button name="dislike" color="secondary" className="card__btn" onClick={onDislike} >
            <VscClose size={30}/>
        </Button>
        <Button name="like" color="tertiary" className="card__btn" onClick={onLike} >
            <VscCheck size={30}/>
        </Button>
        </div>
        </>
    )
}

export default SwipeCard;