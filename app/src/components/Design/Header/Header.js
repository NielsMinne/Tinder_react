import "./Header.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Header = ({onLogout}) => {
  
  return (
    <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="header__title">Foodr</h1>
        </Link>
          <p className="subtext">A tinder for foodies.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
        <Button className="logout" color="secondary" onClick={onLogout}>
          Logout
        </Button>
        </Link>
    </header>
  );
};


export default Header;
