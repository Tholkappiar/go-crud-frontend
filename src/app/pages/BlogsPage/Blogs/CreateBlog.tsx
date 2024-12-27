import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CreateBlog.css';
import { BlogActions, useBlogSlice } from '../slice';
import { selectIsLoading, selectCreateResponse } from '../slice/selectors';

const CreateBlog = () => {
  useBlogSlice();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectCreateResponse);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      BlogActions.createBlog({ Title: title, Description: description }),
    );
  };

  useEffect(() => {
    if (error) {
      navigate('/blogs');
    }
  }, [error, navigate]);

  return (
    <div className="create-blog-page">
      <div className="create-blog-container">
        <h1>Create New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Enter blog title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Blog Description</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder="Enter blog description"
            ></textarea>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
