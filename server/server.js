require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/db.js');
const blogRoutes = require('./routes/blog.js')
const authRoutes = require('./routes/auth.js')
const followerRoutes = require('./routes/follower.js')
const profileRoutes = require('./routes/profile.js')
const cors = require('cors');    
// require('./strategies/jwt_strategy'); 

const corsOpts = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Content-Type']
  };
const app = express();
const PORT = process.env.PORT;
app.use(cors(corsOpts));



connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(passport.initialize());

app.use('/blogs', blogRoutes);
app.use('/follow', followerRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 