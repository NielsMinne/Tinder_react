import { Link } from "react-router-dom";
import "./Links.css";

const Links = ({onActivateSwipe,onActivateLikes}) => {
    return (
        <>
        <div className="linkContainer">
            <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>
            <h1 className="swipe active" onClick={onActivateSwipe}>Swipe</h1>
            </Link>
            <Link to="/likes" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 className="likes non-active" onClick={onActivateLikes}>Likes</h1>
            </Link>
        </div>
        </>
    )
};

export default Links;