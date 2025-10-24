require('dotenv').config()
const express = require('express');
const cors = require('cors')
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('path')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middleware/authentication');


app.use(cors({
    origin: 'https://blogsphere-client-kle9.onrender.com', 
    credentials: true
}));        

mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('connected to mongoDB')
        })
        .catch(error=>{
            console.log('connection error',error)
        })

app.use(express.urlencoded({ extended: true , limit:"100mb"}));
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

app.use('/images',express.static(path.join(__dirname,'public/images')))


app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`server running at :http://localhost:${PORT}`);
    
})