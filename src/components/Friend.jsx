import { PersonAddOutlined,PersonRemoveOutlined} from "@mui/icons-material";
import { Box,IconButton ,Typography,useTheme} from '@mui/material';
import {setFriends} from '../state/index'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../components/FlexBetween'
import axios from 'axios';
import { apiUrl } from "../api";

const Friend = ({friendId, name, subtitle,userPicturePath}) => {
  const {palette} = useTheme()

  const friends = useSelector((state)=>state.user.friends)
  const token = useSelector((state)=>state.friends)
  const {_id} = useSelector((state)=>state.user)
  const dispath = useDispatch()
  const navigate = useNavigate()

  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((f) => f._d === friendId )
  
  const patchFriend = async () =>{
    try {
        const res = await axios.patch(`${apiUrl}/user/${_id}/${friendId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispath(setFriends({friends  : res.data}))
       
    } catch (error) {
      console.log(error)
    }
  }
   

  return (
    <FlexBetween>
         <FlexBetween gap="1rem">
             <Box
               onClick={()=>{
                navigate(`/profile/${friendId}`)
                navigate(0)
               }}
              >

                <Typography 
                variant="h5"
                fontWeight="500"
                color={main}
                sx={{
                  "&:hover" : {
                    color : palette.primary.light,
                    cursor :"pointer"
                  }
                }}>

                {name}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                  {subtitle}
                </Typography>
                 
             </Box>
          </FlexBetween>
          <IconButton
           onClick={()=>patchFriend()}
           sx={{
            background : primaryLight, p: "0.6rem"
           }}
          >
           {
            isFriend ? (<PersonRemoveOutlined sx={{color : primaryDark}}/>)
            :
            (<PersonAddOutlined sx={{color : primaryDark}}/>)
           }
          </IconButton>
    </FlexBetween>
  )
}

export default Friend