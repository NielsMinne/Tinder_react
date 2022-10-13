import { useState } from "react";
import useMutation from "../../../core/hooks/useMutation";
import Button from "../../Design/Button/Button";
import Container from "../../Design/Container/Container";
import Header from "../../Design/Header/Header";
import Input from "../../Design/Input/Input";
import Loader from "../../Design/Loader/Loader";




const LoginForm = ({onLogin}) => {

  const { isLoading, error, mutate } = useMutation();
 
  const [data, setData] = useState([{
    username:""},
    {likes: " "},
    {dislikes: " "}
  
  ]);
 
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      data,
      onSuccess: (data) => {
        onLogin(data);
      },
    });
  };

  
  return (
    <>
     <Header></Header>
     <Container className="loginContainer">
       {isLoading && <Loader/>}
       {error && <p className="error">{error}</p>}
      <h3>Please insert your username</h3>
      <form onSubmit={handleSubmit}>
        <Input type='text' name='username' value={data.username} onChange={handleChange}></Input>
        <Button color="primary" type="submit" disabled={isLoading}>
        Login
      </Button>
      </form>
     </Container>
     </>
  );
};

export default LoginForm;
