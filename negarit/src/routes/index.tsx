import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "../pages/Signup"
import Signin from "../pages/Signin"

import Layout from "../components/layout/index"
import NotFound from "../components/shared/NotFound"
import AuthRoute from "./Auth"
import Profile from "../pages/Profile"
import CreatePost from "../pages/CreatePost"

const AppRoutes = () => {
    
    return (
      <>
      <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            <Route element={<Layout />}>
                {/* <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/google-auth" element={<GoogleAuth />} /> */}

                <Route element={<AuthRoute />}>
                    <Route path="/profile" element={<Profile />} />
                  <Route path="/create" element={<CreatePost />} />
                  {/*     <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:id" element={<DoctorDetails />} />

                    <Route path="/book/:id" element={<BookingPage />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/:id" element={<Appointments />} />
                    <Route path="/applications" element={<Applications />} />
                    <Route path="/applications/:id" element={<Applications />} />


*/}
                </Route>




            </Route>

            <Route path="*" element={<NotFound />} /> 
          </Routes>
          
        </Router>
      </>
    )
  }

  export default AppRoutes;