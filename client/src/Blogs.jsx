import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Blogs.css";

function Blogs() {
  const allBlogurl = "https://blogsphere-server-v5il.onrender.com/blog/blogs";
  const [blogs, setBlogs] = useState([]);
  const usenavigate = useNavigate();

  const viewBlogs = (id) => {
    usenavigate(`/blogs/${id}`);
  };

  const fetchBlogData = async () => {
    try {
      const response = await fetch(allBlogurl);
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <div className="BlogListContainer">
        {blogs.map((item, index) => (
          <div
            className="blogListItem"
            key={index}
            onClick={() => viewBlogs(item._id)}
          >
            <img src={item.coverImageURL} />
            <div className="blogInfo">
              <h4 className="blog-Title">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blogs;
