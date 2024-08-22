import React, { useEffect, useState, useContext } from "react";
import { client } from "../Client/contentful";
import { Link } from "react-router-dom";
import "../css/Bloglist.css";
import { ThemeContext } from "./ThemeContext";
import "../css/global.css";
import { ContentfulContext } from "./ContentfulContext";

function BlogList({ category }) {
  const { data: Posts, loading } = useContext(ContentfulContext);
  const [popularPosts, setPopularPost] = useState([]);
  const [visiblePosts,setVisiblePosts]=useState([4]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (Posts.length > 0) {
      //generate a random number to get Blog_id for Populat posts
      const randomPosts = getRandomNumbers(4, 1, Posts.length);
      const selectedPopularPosts = Posts.filter((blog) =>
        randomPosts.includes(blog.fields.blogId)
      );
      setPopularPost(selectedPopularPosts);
    }
  }, [Posts]);

  const getRandomNumbers = (len, min, max) => {
    let randomNumberArr = [];
    for (let i = 0; i < len; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      //checks no duplicate numbers
      if (!randomNumberArr.includes(randomNumber)) {
        randomNumberArr.push(randomNumber);
      }
    }
    return randomNumberArr;
  };

  //loading more Posts
  const handleLoadmore =()=>{
    setVisiblePosts(prevvisiblePosts=>prevvisiblePosts+2);
  }

  //using ternary operator to decide the Posts to be dispaly in Bloglist component.
  const displayData = category
    ? Posts.filter(
        (post) => post.fields.blogCategory === category.fields.blogCategory
      )
    : Posts.slice(0,visiblePosts);
  console.log(Posts);

  if (loading) {
    return (
      <div className={`BlogList${theme}`}>
        <div className="loader">Loading...</div>
      </div>
    );
  }
 

  return (
    <div>
      <div className="heading ">
        <h1>FRONTEND FOCUS</h1>
        <br />
        <h3>Expand your web development knowledge with our Blogs</h3>
      </div>

      <div className={`BlogList${theme} Blogmain`}>
        <div
          className={
            theme === "light"
              ? "popularPost popularPost-light "
              : "popularPost popularPost-dark "
          }
        >
          <h3>Popular Blogs</h3>
          <ul>
          {popularPosts.map((post, index) => (
            <li key={index}>
              <Link
                className={theme === "light" ? "lglink link" : "darklink link"}
                to={`/blogDetail/${post.fields.blogId}`}
              >
                {post.fields.blogTitle}
              </Link>
            </li>
          ))}
          </ul>
        </div>

        <div className="Blogmain Blogmainsub">
          {displayData.map((Post, index) => {
            return (
              <div
                className={
                  theme === "light" ? "card card-light" : "card  card-dark"
                }
                key={index}
              >
                <Link
                  className={theme === "light" ? "lglink" : "darklink"}
                  to={`/blogDetail/${Post.fields.blogId}`}
                >
                  <div className="card-detail">
                    <img
                      src={Post.fields.coverImage.fields.file.url}
                      alt="cover image"
                    />
                    <h5>{Post.fields.blogCategory}</h5>
                    <h4>{Post.fields.blogTitle}</h4>
                    <p>{Post.fields.displayTitle}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {visiblePosts<Posts.length && (<button className='loaderButton' onClick={handleLoadmore}>Load More</button>)}
      </div>
    </div>
  );
}

export default BlogList;
