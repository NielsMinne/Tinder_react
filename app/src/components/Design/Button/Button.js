import "./Button.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  className,
  color = "primary",
  type = "button",
  disabled = false,
  href,
  onClick,
  children,
  name,
}) => {
  if (href) {
    return (
      <Link
        to={href}
        disabled={disabled}
        className={`btn btn--${color} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`btn btn--${color} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      name={name}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "alert","tertiary","white"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};

export default Button;
