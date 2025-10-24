import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Style/Home.css";
import { useEffect, useState } from "react";
import Footer from "./Footer";

function Home({ user, setUser }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const fetchBlogData = async () => {
    try {
      const res = await fetch("https://blogsphere-server-v5il.onrender.com/blog/blogs", {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

       if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.status}`);
      }

      const body = await res.json();
      setBlogs(body.blogs);
    } catch (error) {
      console.log("unable to load blogs");
    }
  };
  const viewBlog = (id) => {
    navigate(`/blogs/${id}`);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="home-container">
      {user ? (
        <>
          <div className="content-container">
            <h3>Welcome {user.fullname},</h3>
            <div className="container-fluid px-0">
              <p>
                BlogSphere is a simple and powerful blog publishing platform that
                lets you express yourself, share ideas, and connect with others.
              </p>
              <h6>✨ What you can do here:</h6>
              <ul>
                <li>
                  🖋️ Create and publish blogs with rich content and cover images
                </li>
                <li>📚 Explore blogs written by others and get inspired</li>
                <li>💬 Leave comments and engage in meaningful discussions</li>
                <li>👤 Secure login & signup to manage your content</li>
                <li>📸 User profile avatars for a personalized experience</li>
              </ul>
              <div className="secondPortion">
                <Row>
                  <Col>
                    <img
                      src="https://blogsphere-server-v5il.onrender.com/images/cofeelap.jpeg"
                      alt="coffeelap.jpg"
                      className="coffeelap"
                    ></img>
                  </Col>
                  <Col>
                    <p className="para">
                      Everyone has a story to tell, an idea to share, or a thought
                      that could spark change. Your words have the power to
                      inspire, inform, and connect with others around the world.
                      Don’t wait for the perfect moment—start writing today and
                      let your voice be heard. Every blog you create is a step
                      toward leaving your mark on the world.
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="thirdSection">
                <h4>Simple, meet flexible.</h4>
                <p>
                  Start small. Dream big. BlogSphere gives you the space to write,
                  share, and grow alongside your audience.
                </p>
              </div>
              <div className="viewourblogs d-flex justify-content-center gap-4  flex-wrap">
                <h5>Read our Best</h5>
                {blogs.slice(0, 2).map((item) => (
                <Card key={item._id} style={{ width: "14rem" }}>
                  <Card.Img
                    variant="top"
                    src={item.coverImageURL}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Button variant="dark" onClick={() => viewBlog(item._id)}>
                      explore
                    </Button>
                  </Card.Body>
                </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div className="gif-container">
            <img
              src="https://blogsphere-server-v5il.onrender.com/images/welcome.gif"
              alt="Hello"
              className="hello-gif"
            />
          </div>
          <h6>Account required to write & explore Blogs</h6>
          <div className="auth-links">
            <Link to="/signin" className="signinlink">
              Signin
            </Link>
            <br></br>
            <Link to="/signin" className="signuplink">
              Create Account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
