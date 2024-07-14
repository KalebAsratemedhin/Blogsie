import { Card, CardContent, Container, Typography, CardHeader, Box, Collapse, CardActions, styled,IconButton } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BlogCard from '../components/BlogCard'
import { AuthContext } from '../contexts/AuthContext'
import { BlogContext } from '../contexts/BlogContext'
import { fetchBlogs } from '../actions/blog'




const Blogs = () => {
  const {state, dispatch} = useContext(AuthContext)
  const {state: blogState, dispatch: blogDispatch} = useContext(BlogContext)
  
  const blogs = blogState.blogs
  useEffect(() => {
    const getBlogs = async () => {
      await fetchBlogs(blogDispatch, state.username)

    }
    if(state.username && !blogState.loading && !blogState.error && !blogState.blogs){
        console.log("blogs", blogState.blogs)
    }

    getBlogs()


    console.log("blogser", blogState)

  }, [])



  return (
   <Container>
    <Typography>
      My Blogs
    </Typography>
    <Box sx={{display: 'flex'}}>
      {blogs.map((blog) => {
        console.log(blog, 'blog')
        return <BlogCard key={blog.fullName} blog={blog} />
      })}
    </Box>


   </Container>
  )
}

export default Blogs