const Blog = require("../models/blog");

const findAllUserBlogs = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const blogs = await Blog.find({patientId: req.user.id}).sort({
          date: 1,
        }).skip(skip)
          .limit(parseInt(limit))
          .populate('username')
        
      
      const totalBlogs = await Blog.countDocuments();

      return res.status(200).json({
          totalPages: Math.ceil(totalBlogs / limit),
          currentPage: page,
          blogs,
      });

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}


const findOneBlog = async (req, res) => {
  try {
      const {id} = req.params
      const blog = await Blog.findById(id).populate('username');
      return res.status(200).json({data: blog})

  } catch (error) {
      res.status(500).send({message: error.message})

  }

}


const createBlog = async (req, res) => {
    try {
        
        const body = req.body

        const existing = await Blog.findOne({title, date, author: req.user.username})

        if(existing){
            return res.status(402).json({message: "Blog already exists"})
            
        }
        const blog = await Blog.create({
            author: req.user.username,
            ...body
        });

        return res.status(201).json(blog)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const { date, title, body } = req.body

        const result = await Blog.findByIdAndUpdate(id, {
            date,
            title,
            body
        });

        return res.status(201).json(result)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const deleteBlog = async (req, res) => {
    try {
        
        const {id} = req.params;
        const result = await Blog.findByIdAndDelete(id);


        if(!result){
            return res.status(404).json({message: "Not found"})
        }

        return res.status(204).json({message: "Sucessfully deleted."})

    } catch (error) {
        res.status(500).json({message: error.message})

    }

}


module.exports = {
    findAllUserBlogs,
    findOneBlog,
    createBlog,
    updateBlog,
    deleteBlog
}