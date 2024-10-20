import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useState } from "react"

const Layout = () => {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false)


  const handleSidebarToggle = () => {
    setIsOpen(!isOpen)

  }
    


  return (
    <div className="h-full flex  "  >


        {/* {pathname !== "/" && 
          <div className="relative">
            <Sidebar isOpen={isOpen} onSidebarToggle={handleSidebarToggle}  />

          </div>       
        } */}
    
        <div className="flex flex-col w-full overflow-y-auto ">
          <Header  />
          <div className="flex-grow min-h-screen  ">
            <Outlet />
          </div>
          <Footer /> 

        </div>
    </div>
  )
}

export default Layout