import Spinner from "../components/shared/Spinner"
import { Outlet } from "react-router-dom"

import { useGetCurrentUserQuery } from "../redux/api/userAPI"
import NotFound from "../components/shared/NotFound"

const AuthRoute = () => {
    const {isLoading, isError, data} = useGetCurrentUserQuery()


    if(isLoading){
        return <Spinner />
    }

    if(isError || !data){
        return <NotFound />
    }

    return (
        <div>
            <Outlet />

        </div>
    )
}

export default AuthRoute