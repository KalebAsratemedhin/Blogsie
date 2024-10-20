
import {Link} from "react-router-dom"
import { MdPerson } from "react-icons/md";

import { IoIosNotifications } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

import Navbar from "./Navbar";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";



const Header = () => {
  const {data} = useGetCurrentUserQuery()

  
  return (
    <header className="flex justify-between px-3 bg-white items-center h-16 w-full shadow-md">
        <p className="text-blue-400 text-lg font-bold ">Artzy</p>

          <Navbar />

          <Link to={'/create'} className="text-white flex gap-2 items-center bg-blue-600 rounded-md shadow-sm hover:shadow-md px-2 py-1"> <RiImageAddLine /> Create</Link>

        

         {!data ? 
            <div className="flex gap-4">
                <Link className="text-blue-500 bg-white px-2 py-1 border hover:bg-blue-500 hover:text-white border-blue-500 rounded-lg" to={'/auth/signup'} >signup </Link>
                <Link className="text-blue-500 bg-white px-2 py-1 border hover:bg-blue-500 hover:text-white border-blue-500 rounded-lg" to={'/auth/signin'} >signin </Link>

            </div> : 
            <div className="flex gap-4 items-center">
                <IoIosNotifications className='w-8 h-8' />
                <Link to="/profile" className="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center text-2xl"><MdPerson className="h-9 w-9" /></Link>

              
            </div>
        } 
    </header>
  )
}

export default Header