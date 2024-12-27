import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Blog.css';
import { useSelector, useDispatch } from 'react-redux';
import { BlogActions, useBlogSlice } from '../slice';
import {
  selectSpecificBlog,
  selectIsLoading,
  selectFailureResponse,
} from '../slice/selectors';

const BlogPost: React.FC = () => {
  useBlogSlice();

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const blog = useSelector(selectSpecificBlog);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectFailureResponse);

  useEffect(() => {
    if (id) {
      dispatch(BlogActions.getSpecificBlog(Number(id)));
    }
    return () => {
      dispatch(BlogActions.resetSpecificBlog());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div className="blog-post-loading">Loading...</div>;
  }

  if (error) {
    return <div className="blog-post-error">{error}</div>;
  }

  if (!blog) {
    return <div className="blog-post-not-found">Blog post not found</div>;
  }

  return (
    <article className="blog-post">
      <h1 className="blog-post-title">{blog.Title}</h1>
      <p className="blog-post-description">{blog.Description}</p>
      <Link to="/blogs" className="blog-post-back-link">
        Back to Blog List
      </Link>
    </article>
  );
};

export default BlogPost;
