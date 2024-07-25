import { 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box,
  Snackbar,
  Alert
} from '@mui/material'
import { Send, SendAndArchive } from '@mui/icons-material'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../contexts/BlogContext'
import { addBlog } from '../actions/blog'

const CreateBlog = () => {
  const {state: authState, dispatch: authDispatch} = useContext(AuthContext)
  const {state: blogState, dispatch: blogDispatch} = useContext(BlogContext)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [blog, setBlog] = useState({title: '', body: '', date: new Date().toISOString().split('T')[0]})


  useEffect(() => {
    console.log(authState, blogState, 'see')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(authState.username){
      await addBlog(blogDispatch, blog )

      if(!blogState.error){
        setSnackbarMessage("Blog created Successfully.")
        setSnackbarOpen(true)
      } else{
        setSnackbarMessage("Error creating blog. ")
        setSnackbarOpen(true)
      }
    }
  }

  const handleInputChange = (e) => {
    const {id, value} = e.target
    setBlog({...blog, [id]: value})

  }
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <Container>
      <Card sx={{border: 'black', boxShadow: '8', width: '50%', margin: '0 auto'}}>
        <CardContent>
          <form action="submit">
            <TextField id="date" type='date' value={blog.date} onChange={handleInputChange}  variant="outlined"  fullWidth sx={{marginBottom: '10px'}} />
            <TextField id="title" label="Title" value={blog.title} onChange={handleInputChange} variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />
            <TextField id="body" label="Body" value={blog.body} onChange={handleInputChange} multiline rows={5}  variant="outlined" fullWidth sx={{marginBottom: '10px'}} />

            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleSubmit} endIcon={<Send />} sx={{color: 'RGB(123, 45, 78)', '&:hover': {backgroundColor: 'RGBA(123, 45, 78, 0.1)'}}}>create</Button>
            </Box>

          </form>
        </CardContent>
        
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={ blogState.error ? "error" : "success"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default CreateBlog