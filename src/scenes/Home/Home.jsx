import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostWidget from '../widgets/PostsWidget'
import AdvertisementWidget from '../widgets/AdvertisementWidget'
import FriendsListWidget from '../widgets/FriendsListWidget'
const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const user = useSelector((state)=>state.user)
  return (
    <Box>
      <Navbar/>
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
         <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
           <UserWidget userId={user._id} picturePath={user.picturePath}/>
         </Box>
         <Box flexBasis={isNonMobileScreens ? "46%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}>
            <MyPostWidget picturePath={user.picturePath}/>
            <PostWidget userId={user._id}/>
         </Box>
         {
          isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdvertisementWidget/>
              <Box m="2rem 0"/>
              <FriendsListWidget  userId={user._id}/>
            </Box>
          )
         }
        </Box>
    </Box>
  )
}

export default Home