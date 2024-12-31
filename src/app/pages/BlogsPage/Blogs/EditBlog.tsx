import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/EditBlog.css';
import { BlogActions, useBlogSlice } from '../slice/blogSlice';
import {
  selectIsLoading,
  selectRequestSuccess,
  selectSpecificBlog,
} from '../slice/selectors';

const EditBlog = () => {
  useBlogSlice();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const blog = useSelector(selectSpecificBlog);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectRequestSuccess);

  useEffect(() => {
    if (id) {
      dispatch(BlogActions.readBlog(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.Title);
      setDescription(blog.Description);
    }
  }, [blog]);

  useEffect(() => {
    if (error) {
      navigate('/blogs');
    }
  }, [error, navigate]);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      dispatch(
        BlogActions.updateBlog({
          id: Number(id),
          data: {
            Title: title,
            Description: description,
          },
        }),
      );
    }
  };

  if (loading && !blog) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error && !blog) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-blog-page">
      <div className="blog-form-container">
        <h1>Edit Blog Post</h1>
        <form data-testid="formSubmit" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Edit blog title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Edit blog description"
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Blog Post'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default EditBlog;
