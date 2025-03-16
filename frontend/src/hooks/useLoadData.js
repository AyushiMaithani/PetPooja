import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getUserData } from "../https";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Access user data from Redux state using useSelector
  const user = useSelector(state => state.user); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();
        const { _id, name, email, phone, role } = data.data;
        dispatch(setUser({ _id, name, email, phone, role }));
      }
       catch (error) {
        dispatch(removeUser());
        navigate('/auth');
        console.log(error);
      } 
      finally {
        setIsLoading(false);
      }
    };

    if (user && user._id) {
      fetchUser();
    } else {
      setIsLoading(false); 
      navigate('/auth');
    }
  }, [dispatch, navigate, user]); 

  return isLoading;
};

export default useLoadData;
