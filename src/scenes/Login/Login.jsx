import React from 'react'
import {
  Box,
  Typography,
  useTheme, useMediaQuery
} from '@mui/material'
import Form from './Form'

const Login = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)")

  return <Box>

    <Box width="100%" backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center">
      <Typography
        fontWeight="bold"
        fontSize="32px"
        color="primary"
      >
        depopoedia

      </Typography>
    </Box>
    <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      backgroundColor={theme.palette.background.alt}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      textAlign="center">
      <Typography
        fontWeight="500"
        variant="h5"
        color="primary"
        sx={{
          mb: "1.5rem"
        }}
      >
        Welcome to depedia, the social media for every sociallover!

      </Typography>

      <Form />
    </Box>
  </Box>
}

export default Login