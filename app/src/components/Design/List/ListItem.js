import { Link } from "react-router-dom";

const ListItem = ({ name, img, onClick, href, children }) => {
  if (href) {
    return (
      <div className="list-item">
        <Link to={href}>
          <img className="list-item__image" src={img} alt={name} />
          <h3 className="list-item__title">{name}</h3>
        </Link>
        {children}
      </div>
    );
  }

  return (
    <li className="list-item" onClick={onClick}>
      <img className="list-item__image" src={img} alt={name} />
      <h3 className="list-item__title">{name}</h3>
      {children}
    </li>
  );
};

export default ListItem;
