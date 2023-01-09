import React,{useState,useEffect} from 'react'
import {Box,useMediaQuery} from '@mui/material'
import FriendsListWidget from '../widgets/FriendsListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../../api'

const Profile = () => {
    const [user,setUser] = useState(null)
    const token = useSelector((state)=>state.token)
    const {id} = useParams()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const getUser = async  (e) =>{
      try { 
            const response = await axios.get(`${apiUrl}/user/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data)
      } catch (error) {
          console.log(error)
      }
    }
    useEffect(() => {
      getUser()
    }, [])
    if(!user) return null

  return (
    <Box>
      <Navbar/>
      <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
         <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
           <UserWidget userId={user._id} picturePath={user.picturePath}/>
           <Box m="2rem 0"/>
           <FriendsListWidget userId={user._id}/>
         </Box>
         <Box flexBasis={isNonMobileScreens ? "46%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}>
            <MyPostWidget picturePath={user.picturePath}/>
             <Box m="2rem 0"/>
            <PostsWidget userId={id} isProfile/>
         </Box>
        
        </Box>  
    
    </Box>
  )
}

export default Profile