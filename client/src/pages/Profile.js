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
import { SearchContext } from "../contexts/SearchContext"
import { BlogContext } from "../contexts/BlogContext"
import BlogCard from "../components/BlogCard"
import { fetchBlogs } from "../actions/blog"
import { fetchSelectedBlogs, setSelectedBlogs } from "../actions/search"
import { PhotoCamera } from "@mui/icons-material"
import { Block, Report,  } from "@mui/icons-material"
import { uploadProfilePic } from "../actions/auth"
import ThreeDotsMenu from "../components/ThreeDotsMenu"

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
            if (profile?.username === state.username && blogState.blogs != null){
                setSelectedBlogs(searchDispatch, blogState.blogs)

              } else if(!blogState.blogs && !blogState.loading && !blogState.error){
                console.log("blo ello")

                getBlogs(searchDispatch, profile?.username)

              } else if (searchState.selectedUser){
                console.log("mello")
                fetchSelectedBlogs(searchDispatch, searchState.selectedUser.username)
                
              }
          }

    }, [searchState, blogState])

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
    const handleFollowUser = () => {
      // follow
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
                 <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollowUser}
                    sx={{width: '40%'  }}
                  >
                    Follow
                  </Button>
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



// import {
//   Container,
//   Card,
//   Avatar,
//   Typography,
//   Box,
//   IconButton,
//   Button
// } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { SearchContext } from "../contexts/SearchContext";
// import { BlogContext } from "../contexts/BlogContext";
// import BlogCard from "../components/BlogCard";
// import { fetchBlogs } from "../actions/blog";
// import { setSelectedBlogs } from "../actions/search";
// import { PhotoCamera } from "@mui/icons-material";
// import { Block, Report } from "@mui/icons-material";
// import { uploadProfilePic } from "../actions/auth"; 

// const Profile = () => {
//   const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
//   const { state: searchState, dispatch: searchDispatch } = useContext(SearchContext);
//   const profile = searchState.selectedUser;
//   const { state: blogState, dispatch: blogDispatch } = useContext(BlogContext);
//   const blogs = searchState.blogs;
//   const [pic, setPic] = useState("");

//   useEffect(() => {
//     const getBlogs = async () => {
//       await fetchBlogs(blogDispatch, profile?.username || authState.username);
//     };

//     if (!blogs) {
//       if (profile?.username === authState.username && blogState.blogs) {
//         setSelectedBlogs(searchDispatch, blogState.blogs);
//       } else if (!blogState.blogs) {
//         getBlogs();
//       }
//     }
//   }, [profile]);

//   const handleUploadPic = async (e) => {
//     const file = e.target.files[0];
//     setPic(file);

//     const formData = new FormData();
//     formData.append("profilePic", file);
//     formData.append("userId", authState.user._id);

//     try {
//       await uploadProfilePic(authDispatch, formData);
//       setPic(null); // Clear the selected picture
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//     }
//   };

//   const handleProfileEdit = () => {
//     // Implement profile edit logic
//   };

//   const handleReportUser = () => {
//     // Implement report user logic
//   };

//   const handleBlockUser = () => {
//     // Implement block user logic
//   };

//   return (
//     <div>
//       {profile && (
//         <Container>
//           <Card sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 padding: "10px",
//                 position: "relative"
//               }}
//             >
//               <Avatar
//                 sx={{ width: "150px", height: "150px" }}
//                 src={profile?.profilePic}
//               ></Avatar>
//               {profile.username === authState.username && (
//                 <>
//                   <input
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     id="icon-button-file"
//                     onChange={handleUploadPic}
//                     type="file"
//                   />
//                   <label htmlFor="icon-button-file">
//                     <IconButton
//                       color="primary"
//                       aria-label="upload picture"
//                       component="span"
//                       sx={{
//                         position: "absolute",
//                         bottom: 10,
//                         right: 10,
//                         color: "purple"
//                       }}
//                     >
//                       <PhotoCamera />
//                     </IconButton>
//                   </label>
//                 </>
//               )}
//             </Box>
//             <Box sx={{ pl: "10px", flexGrow: "1" }}>
//               <Typography variant="h4">{profile.fullName}</Typography>

//               <Typography sx={{ fontStyle: "italic" }}>
//                 @{profile.username}
//               </Typography>

//               <Typography>{profile.bio}</Typography>
//               <Typography>
//                 Followers {profile.followers.length} | Following{" "}
//                 {authState.user?.following?.length}
//               </Typography>
//               {profile.username === authState.username && (
//                 <Button
//                   variant="text"
//                   sx={{ color: "RGB(123, 45, 78)" }}
//                   onClick={handleProfileEdit}
//                 >
//                   Edit Profile
//                 </Button>
//               )}
//             </Box>
//             {profile.username !== authState.username && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-around",
//                   width: "100%",
//                   maxWidth: "300px"
//                 }}
//               >
//                 <Button
//                   variant="text"
//                   color="secondary"
//                   startIcon={<Report />}
//                   onClick={handleReportUser}
//                 >
//                   Report
//                 </Button>
//                 <Button
//                   variant="text"
//                   color="secondary"
//                   startIcon={<Block />}
//                   onClick={handleBlockUser}
//                 >
//                   Block User
//                 </Button>
//                 <Button
//                   variant="text"
//                   color="secondary"
//                   startIcon={<Report />}
//                   onClick={handleReportUser}
//                 >
//                   Follow
//                 </Button>
//               </Box>
//             )}
//           </Card>
//           <Typography variant="h5">Blogs</Typography>

//           <Box sx={{ display: "flex", paddingTop: "15px" }}>
//             {blogs?.map((blog) => {
//               return <BlogCard key={blog._id} blog={blog} />;
//             })}
//           </Box>
//         </Container>
//       )}
//     </div>
//   );
// };

// export default Profile;
