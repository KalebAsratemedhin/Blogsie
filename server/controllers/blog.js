const Blog = require('../models/blogModel')

const getBlogs = async (req, res) => {
    const {username} = req.params
    try{
        const blogs = await Blog.find({username})
        console.log("my blogs", blogs)
        res.status(200).json(blogs)
    } catch(error){
        res.status(500).json({message: error})
    }
} 

const createBlog = async (req, res) => {
    try{
        const {title, body, date} = req.body

        // const {username} = req.user
        
        const newBlog = await Blog.create({
            title,
            body,
            username,
            date
        }) 
        
        res.status(201).json(newBlog)
    } catch(error){
        res.status(500).json({message: error})
        
    }
}

const updateBlog = async (req, res) => {
    try {
      const update = req.body;
      const { id } = req.params;
      const { username } = req.user;
  
      console.log("blog update", id, update, username);
  
      const blog = await Blog.findOne({ _id: id });
      if (!blog) {
        return res.status(404).json({ message: "No such blog." });
      }
  
      if (blog.username !== username) {
        return res.status(401).json({ message: "Unauthorized." });
      }
  
      const updated = await Blog.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    getBlogs,
    createBlog,
    updateBlog
}