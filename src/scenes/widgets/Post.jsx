import React, { useState } from 'react'
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from '../../components/Friend'
import { setPost } from '../../state/index';
import { apiUrl } from '../../api';

const Post = ({ postId, postUserId, name, description, picturePath, userPicturePath, likes, comments }) => {

  const token = useSelector((state) => state.token)
  const loggedInUser = useSelector((state)=>state.user._id)
  const { palette } = useTheme()
  const dispatch = useDispatch()
   
  const [isComments, setIsComments] = useState(false)
  const isLiked = Boolean(likes[loggedInUser])
  const likeCount = Object.keys(likes).length

  

  const primary = palette.neutral.primary
  const main = palette.neutral.main
 

  const patchFriend = async () =>{
    try {
        const res = await fetch(`${apiUrl}/post/${postId}/like}`, {
           method : "PATCH",
           headers: { Authorization: `Bearer ${token}`,
          "Content-Type" : "application/json" 
            },
            body :  JSON.stringify({userId : loggedInUser})
        })

        const updatedPost = await res.json()
        dispatch(setPost({post  : updatedPost}))
       
    } catch (error) {
      console.log(error)
    }
  }
   

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
       friendId={postUserId}
       name={name}
       subtitle={description}
       userPicturePath={userPicturePath} />

       <Typography
         color={main}
         sx={{
          mt : "1rem"
         }}
       >
        {description}
       </Typography>

       {
        picturePath && (
          <img 
          width="100px"
          height="auto"
          style={{borderRadius : "0.7rem", marginTop:"0.7rem"}}
          src={`http://localhost:5000/public/assets/${picturePath}`} 
          alt="post" />
        )
       }

       <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
             <IconButton
             onClick={patchFriend}
             >
              {
                isLiked ?
                (<FavoriteOutlined sx={{color : primary}}/>)
                :
                (<FavoriteBorderOutlined/>)
              }
             </IconButton>
             <Typography>{likeCount}</Typography>
            </FlexBetween>
             <FlexBetween gap="0.3rem">
             <IconButton
             onClick={()=>setIsComments(!isComments)}
             > 
              <ChatBubbleOutlineOutlined/>
              
             </IconButton>
             <Typography>{comments.length}</Typography>
             </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined/>
          </IconButton>
       </FlexBetween>

       {
          isComments && (
            comments.map((c,i)=>
             <Box key={`${name}-${i}`}> 
              <Divider/>

              <Typography
               sx={{
                color : main,
                m: "0.5rem",
                pl : "1rem"
               }}
              >
              {c}
              </Typography>
              
             </Box>

            )
          )
       }
    </WidgetWrapper>
  )
}

export default Post