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
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { UserContext } from "../contexts/UserContext"
import { BlogContext } from "../contexts/BlogContext"
import BlogCard from "../components/BlogCard"
import { fetchBlogs } from "../actions/blog"
import { fetchSelectedBlogs, followUser, setSelectedBlogs, unfollowUser } from "../actions/user"
import { PhotoCamera } from "@mui/icons-material"
import { Block, Report,  } from "@mui/icons-material"
import { uploadProfilePic } from "../actions/auth"
import ThreeDotsMenu from "../components/ThreeDotsMenu"

const Profile = () => {
    const {state, dispatch} = useContext(AuthContext)
    const {state: userState, dispatch: userDispatch} = useContext(UserContext)
    const profile = userState.selectedUser
    const {state: blogState, dispatch: blogDispatch} = useContext(BlogContext)
    const blogs = userState.selectedUserBlogs

    useEffect(() => {
        
        const getBlogs = async () => {
            await fetchBlogs(blogDispatch, state.username)
      
          }

          if (!blogs){
            if (profile?.username === state.username && blogState.blogs != null){
                setSelectedBlogs(userDispatch, blogState.blogs)

              } else if(!blogState.blogs && !blogState.loading && !blogState.error){
                console.log("blo ello")

                getBlogs(userDispatch, profile?.username)

              } else if (userState.selectedUser){
                console.log("mello")
                fetchSelectedBlogs(userDispatch, userState.selectedUser.username)
                
              }
          }

    }, [userState, userState.selectedUser?.followers, blogState])

    const handleUploadPic = async (e) => {
      e.preventDefault()
      console.log("e file", e.target.files[0] )
      const pic = {
        profilePic: e.target.files[0]
      } 
      await uploadProfilePic(dispatch, pic)

    }

    const handleProfileEdit = () => {

    }

    const handleReportUser = () => {

    }
    const handleBlockUser = () => {


    }
    const handleFollowUser = async () => {
      await followUser(userDispatch, profile.username)
    }

    const handleUnfollowUser = async () => {
      await unfollowUser(userDispatch, profile.username)
    }
  return (
    <div> 

        { profile && <Container>
        <Card sx={{display: 'flex', alignItems: 'center', mb: '15px' }}>
            <Box sx={{display: "flex", justifyContent: 'center', padding: '10px', position: 'relative'}}>
                <Avatar sx={{width: '150px', height: '150px' }} src={profile?.profilePic} >

                </Avatar>
                {profile.username === state.username && <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                onChange={
                  handleUploadPic
                } 
                type="file"
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
            <Box sx={{pl:'10px', flexGrow: '2' }}>
                <Typography variant="h4" >{profile.fullName}</Typography>

                <Typography sx={{fontStyle: 'italic'}} > @{profile.username}</Typography>

                <Typography> {profile.bio}</Typography>
                <Typography> Followers {profile.followers.length} | Following {state?.user?.following?.length}</Typography>
                { profile.username === state.username && 
                    <Button variant="text" sx={{color: 'RGB(123, 45, 78)'  }}>
                    Edit Profile
                    </Button>
                }
                 {profile.username != state.username && !userState.isMyFollowing &&
                <Box sx={{width: '60%', display: 'flex', justifyContent: 'space-between'}}> <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollowUser}
                    sx={{ }}
                  >
                    Follow
                  </Button>
                  
                </ Box>
                  }

                  {
                    profile.username != state.username && userState.isMyFollowing &&
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUnfollowUser}
                  sx={{  }}
                >
                  Unfollow
                </Button>
                  }
            </Box>
           {profile.username != state.username &&  <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
           <ThreeDotsMenu onBlock={handleBlockUser} onReport={handleReportUser} />
                 
                </Box>
          }
        </Card>
        <Typography variant="h5">Blogs</Typography>
        
        <Box sx={{display: "flex", paddingTop: '15px'}}>
                { blogs?.map((blog) => {
                    return <BlogCard key={blog._id} blog={blog} />
                })}
            
            
        </Box>
    </Container>
     }
    </div>
  )
}

export default Profile


