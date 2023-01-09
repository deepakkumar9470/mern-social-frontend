import React,{useEffect} from 'react'
import {
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../components/WidgetWrapper";
import axios from 'axios'
import { setFriends } from '../../state';
import Friend from '../../components/Friend';
import { apiUrl } from '../../api';

const FriendsListWidget = ({userId}) => {
    const token = useSelector((state)=>state.token)
    const friends = useSelector((state)=>state.user.friends)
    const {palette} = useTheme()
    const dispatch = useDispatch()

   
    const main = palette.neutral.main
    const getFriends = async  (e) =>{
      try {
   
            const response = await axios.get(`${apiUrl}/user/${userId}/friends`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log('friends', response)
            dispatch(setFriends({friends :  response.data}))
      } catch (error) {
          console.log(error)
      }
    }
    
    useEffect(() => {
      getFriends()
    }, [])
    

  return (
    <WidgetWrapper>
        <Typography
        color={main}
        variant="h5"
        fontWeight="500"
         sx={{
          mb : "1.5rem"
         }}
        >Friend List</Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
           {
            friends.map((f,i)=>(
              <Friend 
              key={i}
              friendId={f._id}
              name={`${f.firstName} ${f.lastname}`}
              subtitle={f.occupation}
              userPicturePath = {f.picturePath}
              />
            ))
           }
        </Box>
    </WidgetWrapper>
  )
}

export default FriendsListWidget