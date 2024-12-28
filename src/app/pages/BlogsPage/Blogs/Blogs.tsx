import React, { useEffect } from 'react';
import '../styles/Blogs.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBlogs, selectIsLoading } from '../slice/selectors';
import { useBlogSlice } from '../slice/blogSlice';

const BlogsPage: React.FC = () => {
  const { actions } = useBlogSlice();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(actions.readBlogs());
  }, [actions, dispatch]);

  const blogs = useSelector(selectBlogs);
  const navigate = useNavigate();

  const handleDelete = (blogId: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(actions.deleteBlog(blogId));
    }
  };

  if (isLoading) return <p>Loading ....</p>;

  return (
    <div className="blogs-page">
      <header className="header">
        <h1>My Blog</h1>
      </header>
      <main className="main">
        <div>
          <h2 className="blog-header">
            Latest Posts
            <button onClick={() => navigate('/create')}>Create blog</button>
          </h2>
        </div>
        <div className="blog-list">
          {blogs.map(blog => (
            <div key={blog.Id}>
              <Link to={`/blog/${blog.Id}`}>
                <div className="blog-item">
                  <h3>{blog.Title}</h3>
                  <p>{blog.Description}</p>
                </div>
              </Link>
              {blog.user_id === localStorage.getItem('userID') && (
                <div className="blog-buttons">
                  <Link to={`/editBlog/${blog.Id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(blog.Id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
