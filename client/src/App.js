import {Routes, BrowserRouter as Router, Route} from "react-router-dom"
import Layout from './components/Layout';
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import People from "./pages/People";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";
import { useContext, useEffect } from "react";
import Profile from "./pages/Profile";
import AppProviders from "./contexts/AppProvider";


function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
    );

}


function AppRoutes() {
  const {state, dispatch} = useContext(AuthContext)


  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/people" element={<People />} />
            <Route path="/public/*" element={<People />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-blog" element={<CreateBlog />} />

          </Route>

        </Routes> 
    </Router>
  );
}

export default App;