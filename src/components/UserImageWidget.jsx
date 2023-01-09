import { Box } from '@mui/material'


const UserImage = ({image, size="60px"}) =>{

    return (
        <Box width={size} height={size}>
             <img 
               width={size}
               height={size}
               style={{objectFit : "cover", borderRadius : "50%"}}
               src={image ? `http://localhost:5000/uploads/${image}` :  "https://images.pexels.com/photos/14711370/pexels-photo-14711370.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load "} 
               alt="userimage" />
        </Box>
    )
}

export default UserImage