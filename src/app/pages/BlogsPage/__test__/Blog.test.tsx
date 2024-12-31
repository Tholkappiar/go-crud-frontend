import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BlogPost from '../Blogs/Blog';
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

const mockReducer = (
  state = {
    blog: {
      Id: 1,
      Title: 'Test Blog',
      Description: 'Test Description',
      user_id: '123',
    },
    isLoading: false,
  },
) => state;

jest.mock('../styles/Blog.css', () => {});
jest.mock('redux-injectors', () => ({
  useInjectReducer: jest.fn(),
  useInjectSaga: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

describe('Blog Component', () => {
  const renderComponent = store => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogPost />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('Blog Post Component has Back navigation', () => {
    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });

    renderComponent(store);
    expect(screen.getByText('Back to Blog List')).toBeInTheDocument();
  });

  it('Blog renders the Blog content', () => {
    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });

    renderComponent(store);
    console.log(screen.getByText('Test Blog').textContent);
    expect(
      screen.getByText('Test Blog') && screen.getByText('Test Description'),
    ).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    const loadingReducer = (state = { blogs: [], isLoading: true }, action) =>
      state;

    const store = configureStore({
      reducer: {
        blogSlice: loadingReducer,
      },
    });
    renderComponent(store);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
