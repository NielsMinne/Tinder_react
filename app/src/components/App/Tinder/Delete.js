import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useMutation from "../../../core/hooks/useMutation";
import Button from "../../Design/Button/Button";
import { useAuthContext } from "../AuthContainer";

const DeleteLike = ({id,onSuccess}) => {
    const {user} = useAuthContext();
    const { isLoading, mutate } = useMutation(); 
    const [data, setData] = useState({
        _id: user._id,
        id: id,
      });

    const handleClick = () => {
        mutate(`${process.env.REACT_APP_API_URL}/delete`, {
          method: "PATCH",
          data,
          onSuccess: () => {
            onSuccess();
          },
        });
      };

      return (
        <Button className="trashIcon" color="white" onClick={handleClick} disabled={isLoading}><FaTrashAlt size={30}/></Button>
      );

};

export default DeleteLike