'use client'

import { TbShoppingCart } from "react-icons/tb";
import { GiPalette } from "react-icons/gi";
import { IoImagesOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
    const location = useLocation()
  return (
    <nav>
        <ul className="flex gap-8">
            <li className={`text-blue-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${location.pathname == '/forYou' ? 'underline underline-offset-8' : '' }`}><Link to={'/forYou'} className="flex items-center gap-2"> <IoImagesOutline className="text-blue-700" /> Authors</Link></li>
            <li className={`text-blue-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${location.pathname == '/discover' ? 'underline underline-offset-8' : '' }`}><Link to={'/discover'} className="flex items-center gap-2"> <GiPalette className="text-blue-700" /> Discover </Link></li>
            <li className={`text-blue-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${location.pathname == '/cart' ? 'underline underline-offset-8' : '' }`}><Link to={'/create'} className="flex items-center gap-2"><TbShoppingCart className="text-blue-700" /> Create</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar