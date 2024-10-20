
import Error from "../components/shared/Error"
import Spinner from "../components/shared/Spinner"
import { useGetCurrentUserQuery } from "../redux/api/userAPI"

const Profile = () => {
  const {isLoading, isError, data, error} = useGetCurrentUserQuery()

  

  if(isLoading){
    return <Spinner />
  }

  if(isError || !data){
    return <Error error={error} />
  }


  console.log('daat', data)
  const initials = data?.fullName.split(" ").map((part) => {
    return part ? part[0].toUpperCase() : "" 
  })
  


return (
  <div className="p-16">
      <div>
          <p className="text-xl font-bold mb-8 ">Welcome, <span className="italic text-blue-500">{data.fullName}</span></p>
      </div>

      <div className="flex gap-4 border border-gray-300 h-40 items-center  rounded-md">
          <div className="w-40 flex justify-end" >
          <p className="w-20 h-20 flex justify-center items-center text-4xl bg-gray-300 rounded-full ">
          {initials}
          </p>
          </div>
          <div className="flex-grow">
          <p>{data.fullName}</p>
          <p>@{data.username}</p>
          {/* <p>0 {currUser.followers} Followers | 0 Following</p> */}

          </div>
          <div className="flex flex-col gap-2 mr-52 items-start">
            <button className="text-white bg-blue-600 rounded-md shadow-sm hover:shadow-md px-2 py-1">Report</button>
            <button className="text-white bg-blue-600 rounded-md shadow-sm hover:shadow-md px-2 py-1">Block</button>

          </div>
      </div>

      <div> </div>
  </div>
)
}

export default Profile