import { Card, CardContent, Container, Typography, CardHeader, Box, Collapse, CardActions, styled,IconButton } from '@mui/material'
import { useContext, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { KeyboardDoubleArrowRight, Details } from '@mui/icons-material'
import { BlogContext } from '../contexts/BlogContext'
import { useNavigate } from 'react-router-dom'


const BlogCard = ({blog}) => {
  const navigate = useNavigate()


  const handleDetails = () => {
    navigate(`/blogs/${blog._id}`, {state: {blog}})

  }

  return (
    <Card key={blog._id} sx={{margin: '10px', boxShadow: '2', '&:hover': {boxShadow: '5'}}}>
          <CardHeader
           title={blog.title}
           subheader={<Typography>By {blog.fullName} <Typography>{new Date(blog.date).toDateString()} </Typography></Typography> }
           
          /> 
          <CardContent>
            {blog.body.slice(0, 50)}...
          </CardContent>
          <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleDetails}  aria-label="share">
          <KeyboardDoubleArrowRight />  

        </IconButton>
      </CardActions>
      
        </Card>
  )
}

export default BlogCard