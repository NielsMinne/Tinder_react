import { useState } from "react";
import useFetch from "../../../core/hooks/useFetch";
import useMutation from "../../../core/hooks/useMutation";
import SwipeCard from "../../Design/Card/SwipeCard";
import Container from "../../Design/Container/Container";
import Loader from "../../Design/Loader/Loader";


const Swipe = () => {
  const [skipCount, setSkipCount] = useState(0);
  const { isLoading, error ,invalidate, data: foods } = useFetch("/foods",skipCount);
  const { mutate } = useMutation();
  const [count, setCount] = useState(0);
  const [likes,setLikes] = useState([]);
  const [dislikes,setDislikes] = useState([]);


  const handlePatch = (path,data) =>{
    mutate(`${process.env.REACT_APP_API_URL}/${path}`, {
      method: "PATCH",
      data,
    });
  };

  const increaseCount = () =>{
    const newCount = count + 1;
    setCount(newCount);
  }

  const handleLike = (e) => {
    e.preventDefault();
    
      setLikes([
        ...likes,
        foods[count],
      ]);
      increaseCount();
      handlePatch("likedDish", likes);
      handleFetchInvalid();
  };

  
  const handleDislike = (e) => {
    e.preventDefault();
    setDislikes([
      ...dislikes,
      foods[count],
    ]);
    handlePatch("dislikedDish", dislikes);
    increaseCount();
    handleFetchInvalid();
  }

 

const handleFetchInvalid = () =>{
  if(count >= 9){
    const newSkip = skipCount + 10;
    setSkipCount(newSkip);
    setCount(0);
    invalidate();
  }
}

    return (
        <>
        
        <Container className="centerContainer">
        {isLoading && <Loader />}
        {error && <p className="error">{error}</p>}
        {!foods && <p> Geen Resulaten meer...</p>}
        {foods &&
        <Container key={foods[count].id} className="cardContainer">
          <SwipeCard key={foods[count].id} data={foods[count]} onLike={handleLike} onDislike={handleDislike}/>
        </Container>
        }
        </Container>
      </>
    )
}

export default Swipe;