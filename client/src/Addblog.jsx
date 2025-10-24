import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Style/AddBlog.css'

function Addblog() {
  const usenavigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage,setCoverImage] = useState("");

  const handleFileChange =(e)=>{
    const img = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload=()=>{
      setCoverImage(reader.result)
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("https://blogsphere-server-v5il.onrender.com/blog/add-new", {
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        credentials: "include",
        body:JSON.stringify({
          title,
          content,
          coverImageURL : coverImage
        })
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setTitle("");
        setContent("");
        setCoverImage("");
        usenavigate("/");
      } else {
        console.log("faled to create blog");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <>
      <div className="BlogContainer">
        <Form
          onSubmit={handleSubmit}
          method="POST"
          className="addBlogForm"
        >
          <h3 className="text-center mb-4">✍️ Add New Blog</h3>
          <Form.Group controlId="blogtitle" className="formGroup">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              className="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="blogcontent" className="formGroup">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="formGroup">
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button variant="light" type="submit">
            Add Blog
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Addblog;
