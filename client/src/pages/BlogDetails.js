import { 
  Container, 
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  Card,
  ListSubheader

} from '@mui/material'
import { useContext, useState } from 'react'
import { BlogContext } from '../contexts/BlogContext'
import { useLocation, useParams } from 'react-router-dom'
import { Edit, Send, Cancel} from '@mui/icons-material'
import { editBlog } from '../actions/blog'

const BlogDetails = () => {
  const location = useLocation()
  const {blog} = location.state
  const {state: blogState, dispatch: blogDispatch} = useContext(BlogContext)
  const [isEdit, setIsEdit] = useState(false)
  const [update, setUpdate] = useState({title: blog.title, date: blog.date, body: blog.body})

  if(!blog){
    return (
      <Container>
        <Typography>Blog not found.</Typography>
     </Container>

    )
  }

  const handleInputChange = (e) => {
    const {id, value} = e.target
    setUpdate({...update, [id]: value})

  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    update['id'] = blog._id
    console.log("updates", update)
    await editBlog(blogDispatch, update)
    setIsEdit(false)
  }
  return (
    <Container>
      {!isEdit && <div>
        <Typography variant='h3'>{blog.title}</Typography>
        <Typography>@{blog.username}</Typography>

        <Card sx={{display: 'flex', flexDirection: 'column', padding: '10%'}}>
          
        <Typography>{blog.body}</Typography>
        <Box sx={{marginLeft: 'auto'}}>
          <IconButton onClick={() => {setIsEdit(true)}}  aria-label="share">
            <Edit />  

          </IconButton>
        </Box>
        </Card>
     </div> }
      {isEdit && <form action="submit">
            <TextField id="date" type='date' value={new Date(update.date).toISOString().split('T')[0]} onChange={handleInputChange}  variant="outlined"  fullWidth sx={{marginBottom: '10px'}} />
            <TextField id="title" label="Title" value={update.title} onChange={handleInputChange} variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />
            <TextField id="body" label="Body" value={update.body} onChange={handleInputChange} multiline rows={5}  variant="outlined" fullWidth sx={{marginBottom: '10px'}} />

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Button variant='contained' onClick={() => {setIsEdit(false)}} endIcon={<Cancel />} sx={{color: 'RGB(123, 45, 78)', marginRight: '10px', backgroundColor: 'white', '&:hover': {backgroundColor: 'RGBA(123, 45, 78, 0.1)'}}}>Cancel</Button>
              
              <Button variant='contained' onClick={handleUpdate} endIcon={<Send />} sx={{color: 'RGB(123, 45, 78)',  backgroundColor: 'white', '&:hover': {backgroundColor: 'RGBA(123, 45, 78, 0.1)'}}}>Edit</Button>
            </Box>

          </form>}

    </Container>
  )
}

export default BlogDetails