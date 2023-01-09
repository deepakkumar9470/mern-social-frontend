import React,{useEffect} from 'react'
import {
    CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {setPosts} from '../../state/index'
import PostWidget from './Post'
import axios from 'axios';
import { apiUrl } from '../../api';

const PostsWidget = ({userId, isProfile = false}) => {
    const token = useSelector((state)=>state.token)
    const posts = useSelector((state)=>state.posts)
    const dispatch = useDispatch()

    const getPosts =async  (e) =>{
      try {
   
            const response = await axios.get(`${apiUrl}/post`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log('posts:',  response)
            dispatch(setPosts({posts :  response.data}))
      } catch (error) {
          console.log(error)
      }
    } 

  const getUserPosts = async  (e) =>{

    try {
        const response = await axios.get(`${apiUrl}/post/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log('usersposts:',  response)
          dispatch(setPosts({posts :  response.data}))
    } catch (error) {
        console.log(error)
    }
  } 

   useEffect(() => {
    if(isProfile){
      getUserPosts()
    }else{
      getPosts()
    }
  }, [])


  return (
    <>
     {
     posts.length > 0 ?  posts?.map(({
       _id,
       userId,
       firstName,
       lastName,
       description,
       picturePath,
       userPicturePath,
       likes,
       comments,
      }) =>(
        <PostWidget key={_id} 
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
         />
      )
      
      ):<CircularProgress sx={{mt : "1rem"}} color="secondary" />
    }
    </>
  )
}

export default PostsWidget