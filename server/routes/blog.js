const express = require('express')
const Blogs = require('../model/blog')
const Comment = require('../model/comment')
const router = express.Router()
const path = require('path')
const { checkForAuthenticationCookie } = require('../middleware/authentication')


router.post('/add-new',checkForAuthenticationCookie('token'),async(req,res)=>{
    const { title,content,coverImageURL } = req.body
    const blog = await Blogs.create({
        title,
        content,
        createdBy:req.user._id,
        coverImageURL
    })
    console.log('Blog',blog);
    res.status(201).json({message:'Blog created',blog})
})

router.get('/blogs',checkForAuthenticationCookie('token'),async(req,res)=>{
    const allBlogs = await Blogs.find({})
    return res.status(200).json({blogs:allBlogs})
})

router.get('/blogs/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
  const blog = await Blogs.findById(req.params.id).populate('createdBy')
  console.log(blog);
  res.status(200).json({ user:req.user, blog  })
})

router.post('/comment/:blogId',checkForAuthenticationCookie('token'),async(req,res)=>{
  const comment = await Comment.create({
    content:req.body.content,
    createdBy:req.user._id,
    blogId:req.params.blogId
  })
  res.status(200).json({comment})
})

router.get('/comments/:id',checkForAuthenticationCookie('token'),async(req,res)=>{
  const blogId =  req.params.id;
  const comments = await Comment.find({blogId}).populate('createdBy')
  res.status(200).json({comments})

})

module.exports = router;