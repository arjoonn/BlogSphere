import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './Style/View.css'
import DeleteBlog from "./DeleteBlog";

function View() {
  const { id } = useParams();
  const allBlogurl = `https://blogsphere-server-v5il.onrender.com/blog/blogs/${id}`;
  const commentUrl = `https://blogsphere-server-v5il.onrender.com/blog/comment/${id}`;
  const getCommentUrl = `https://blogsphere-server-v5il.onrender.com/blog/comments/${id}`;
  const [blogData, setBlogData] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(allBlogurl, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogData(data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await fetch(getCommentUrl, {
        credentials: "include",
      });
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComment();
  }, [id]);

  if (!blogData) {
    return <h2>Loading blog...</h2>;
  }
  console.log(blogData);

  const postComment = async () => {
    try {
      await fetch(commentUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });
      setComment("");
      fetchComment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="viewContainer">
        <h1 className="blogTitle">{blogData.title}</h1>
        <DeleteBlog id={id}/>
        <img
          src={blogData.coverImageURL}
          style={{ width: "800px", margin: "20px auto", display: "block" }}
          className="blogImage"
        ></img>
        <div className="blogBody">
          {blogData.content.split('/n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="authorSection">
          <img
            className="rounded-circle me-3"
            src={`https://blogsphere-server-v5il.onrender.com${blogData.createdBy.profileImage}`}
            width={"40px"}
          ></img>
          <p>{blogData.createdBy.fullname}</p>
        </div>
      </div>

      <div className="sectionDivider"></div>

      <div className="commentInputBox">
        <h5>DROP YOUR COMMENTS</h5>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="comment">💬</InputGroup.Text>
          <Form.Control
            aria-label="comment"
            aria-describedby="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="primary" type="submit" onClick={postComment}>
            Add
          </Button>
        </InputGroup>
      </div>
      <div className="commentList">
        {comments.map((c, index) => (
          <div key={index} className="commentItem">
            <img
              src={`https://blogsphere-server-v5il.onrender.com${blogData.createdBy.profileImage}`}
              alt="avatar"
            />
            <div>
              <p className="fw-bold">{c.createdBy.fullname}</p>
              <p>{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default View;
