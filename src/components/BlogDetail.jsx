import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { ContentfulContext } from "./ContentfulContext";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "../css/Blogdetail.css";


function BlogDetail() {
  const { data: Posts } = useContext(ContentfulContext);
  const { theme } = useContext(ThemeContext);
  const [BlogData, SetBlogData] = useState(null);
  let param = useParams();

  useEffect(() => {
    let numericId = parseInt(param.id, 10); //convert blogid in url from string to integer data type
    console.log(numericId);
    const blog = Posts.find((res) => res.fields.blogId === numericId);
    if (blog) {
      SetBlogData(blog);
    }
  }, [param.id, Posts]);

  if (!BlogData) {
    return <div>Loading...</div>;
  }
  return (
    <div className={` ${theme} single-blog`}>
      <div   className={theme === "light" ? "blogdetail" : "blogdetail-dark blogdetail"}>
      <h1>{BlogData.fields.blogTitle}</h1>
      <img src={BlogData.fields.coverImage.fields.file.url} alt="blog image" />
      <p>{documentToReactComponents(BlogData.fields.content)}</p>
      
      </div>
      <Link to="/">
        <button>go to home</button>
      </Link>
    </div>
  );
}

export default BlogDetail;
