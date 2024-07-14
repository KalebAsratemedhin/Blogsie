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
    List
} from "@mui/material"
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { getProfile } from "../actions/auth"
import {Link} from 'react-router-dom'

const Profile = () => {
    const {state, dispatch} = useContext(AuthContext)

    useEffect(() => {
        const loadProfile = async () => {
            await getProfile(dispatch, state.username)
        }

        if(!state.loading && !state.user && !state.error){
            loadProfile()
        }
    }, [state])

  return (
    <div>
        { state.user && <Container>
        <Card sx={{}}>
            <Box sx={{display: "flex", justifyContent: 'center',}}>
                <Avatar sx={{width: '200px', height: '200px' }}  >
                
                </Avatar>
            </Box>
            <CardContent sx={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h4"> @{state.user.username}</Typography>
                <Typography> {state.user.bio}</Typography>

            </CardContent>
        </Card>
        <Box sx={{display: "flex", paddingTop: '15px'}}>
            <Card sx={{marginRight: '15px', padding: '10px', minWidth: '200px', minHeight: '300px'}}>
                <Typography>Account Info</Typography>

                <List>
                    <ListItem sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{width: '100px'}}>Name</Typography>
                        <Typography sx={{flexGrow: '1'}}>{state.user.fullName}</Typography>

                    </ListItem>
                    <ListItem sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{width: '100px'}}>Email</Typography>
                        <Typography sx={{flexGrow: '1'}}>{state.user.email}</Typography>

                    </ListItem>

                </List>
            
            </Card>
            <Card sx={{flexGrow: '1', padding: '10px', minWidth: '200px', minHeight: '300px'}}>
               
                <Typography>Followers</Typography>
                <Link to='/blogs'>blllogs</Link>

            </Card>
        </Box>
    </Container>
     }
     {state.loading && <div> Loading</div> }
     {state.error && <div>{state.error}</div> }
    </div>
  )
}

export default Profile