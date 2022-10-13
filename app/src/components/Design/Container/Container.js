import "./Container.css";

const Container = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Container;