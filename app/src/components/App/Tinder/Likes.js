import { useState } from "react";
import useFetch from "../../../core/hooks/useFetch";
import useMutation from "../../../core/hooks/useMutation";
import LikeCard from "../../Design/Card/LikeCard";
import Container from "../../Design/Container/Container";
import Loader from "../../Design/Loader/Loader";
import { useAuthContext } from "../AuthContainer";
import DeleteLike from "./Delete";

const Likes = () => {

const { isLoading, error ,invalidate, data: likedDish } =  useFetch("/likes");

const handleSuccess = () => {
    invalidate();
}



    return(
        <>
        <Container>
        {isLoading && <Loader/>}
        {error && <p className="error">{error}</p>}
        {likedDish && likedDish.likes.map((food) => (
            <Container key={food.id} className="likeContainer">
           <LikeCard key={food.id} data={food}/>
           <DeleteLike id={food.id} onSuccess={handleSuccess}/>
           </Container>
        ))}
        {likedDish && (likedDish.likes.length === 0) &&  <h2 className='noPost'>No likes yet!</h2>}
        </Container>
        </>
    )

    
};

export default Likes;