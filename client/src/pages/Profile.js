import { 
    Container,
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    ListSubheader,
    ListItemText,
    ListItem,
    List,
    IconButton, Button
} from "@mui/material"
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { SearchContext } from "../contexts/SearchContext"
import { BlogContext } from "../contexts/BlogContext"
import BlogCard from "../components/BlogCard"
import { fetchBlogs } from "../actions/blog"
import { setSelectedBlogs } from "../actions/search"
import { PhotoCamera } from "@mui/icons-material"
import { Block, Report } from "@mui/icons-material"

const Profile = () => {
    const {state, dispatch} = useContext(AuthContext)
    const {state: searchState, dispatch: searchDispatch} = useContext(SearchContext)
    const profile = searchState.selectedUser
    const {state: blogState, dispatch: blogDispatch} = useContext(BlogContext)
    const blogs = searchState.blogs

    useEffect(() => {
        
        const getBlogs = async () => {
            await fetchBlogs(blogDispatch, state.username)
      
          }

          if (!blogs){
            console.log("blogs", blogs, profile)
            if (profile?.username === state.username && blogState.blogs != null){
                setSelectedBlogs(searchDispatch, blogState.blogs)

              } else if(!blogState.blogs){
                getBlogs(searchDispatch, profile?.username)

              }
          }

    }, [searchState])

    const handleUploadPic = () => {

    }

    const handleProfileEdit = () => {

    }

    const handleReportUser = () => {

    }
    const handleBlockUser = () => {

    }
  return (
    <div> <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', maxWidth: '300px'}}>
    <Button
      variant="text"
      color="secondary"
      startIcon={<Report />}
      onClick={handleReportUser}
      sx={{  }}
    >
      Report
    </Button>
    <Button
      variant="text"
      color="secondary"
      startIcon={<Block />}
      onClick={handleBlockUser}
    >
      Block User
    </Button>
  </Box>

        { profile && <Container>
        <Card sx={{display: 'flex', alignItems: 'center', mb: '15px' }}>
            <Box sx={{display: "flex", justifyContent: 'center', padding: '10px', position: 'relative'}}>
                <Avatar sx={{width: '150px', height: '150px' }}  >
                
                </Avatar>
                {profile.username === state.username && <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleUploadPic}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    color: 'purple'
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </label></>}
            </Box>
            <Box sx={{pl:'10px', flexGrow: '1' }}>
                <Typography variant="h4" >{profile.fullName}</Typography>

                <Typography sx={{fontStyle: 'italic'}} > @{profile.username}</Typography>

                <Typography> {profile.bio}</Typography>
                <Typography> Followers {profile.followers.length} | Following {state?.user?.following?.length}</Typography>
                { profile.username === state.username && 
                    <Button variant="text" sx={{color: 'RGB(123, 45, 78)'  }}>
                    Edit Profile
                    </Button>
                }
            </Box>
           {profile.username != state.username &&  <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', maxWidth: '300px'}}>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<Report />}
                    onClick={handleReportUser}
                    sx={{  }}
                  >
                    Report
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<Block />}
                    onClick={handleBlockUser}
                  >
                    Block User
                  </Button>
                </Box>
          }
        </Card>
        <Typography variant="h5">Blogs</Typography>
        
        <Box sx={{display: "flex", paddingTop: '15px'}}>
                { blogs?.map((blog) => {
                    return <BlogCard key={blog._id} blog={blog} />
                })}
            
            {/* <Card sx={{marginRight: '15px', padding: '10px', minWidth: '200px', minHeight: '300px'}}>
               

                
            </Card> */}
        </Box>
    </Container>
     }
    </div>
  )
}

export default Profile