import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CreateBlog.css';
import { BlogActions } from '../slice/blogSlice';
import { selectIsLoading, selectRequestSuccess } from '../slice/selectors';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectIsLoading);
  const requestSuccess = useSelector(selectRequestSuccess);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      BlogActions.createBlog({ Title: title, Description: description }),
    );
  };

  console.log(requestSuccess);
  console.log(loading);
  useEffect(() => {
    if (requestSuccess && !loading) {
      navigate('/blogs');
    }
  }, [requestSuccess, loading, navigate]);

  return (
    <div className="create-blog-page">
      <div className="create-blog-container">
        <h1>Create New Blog Post</h1>
        <form data-testid="formSubmit" onSubmit={handleSubmit}>
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
