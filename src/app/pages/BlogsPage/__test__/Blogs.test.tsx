import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import BlogsPage from '../Blogs/Blogs';
import React from 'react';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('redux-injectors', () => ({
  useInjectReducer: jest.fn(),
  useInjectSaga: jest.fn(),
}));

jest.mock('../styles/Blogs.css', () => {});

afterEach(() => {
  cleanup();
  localStorage.clear();
  jest.clearAllMocks();
});

const mockReducer = (
  state = {
    blogs: [
      {
        Id: 1,
        Title: 'Test Blog',
        Description: 'Test Description',
        user_id: '123',
      },
    ],
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case 'blogSlice/readBlogs':
      return {
        ...state,
        blogs: action.payload
          ? [...state.blogs, ...action.payload]
          : state.blogs,
      };
    case 'blogSlice/deleteBlog':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.Id !== action.payload),
      };
    default:
      return state;
  }
};

describe('BlogsPage Component', () => {
  const renderComponent = store => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogsPage />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('renders "My Blog" text on the screen', () => {
    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });
    renderComponent(store);
    expect(screen.getByText(/My Blog/i)).toBeInTheDocument();
  });

  it('renders the blogs list', () => {
    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });
    renderComponent(store);
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    const loadingReducer = (state = { blogs: [], isLoading: true }) => state;

    const store = configureStore({
      reducer: {
        blogSlice: loadingReducer,
      },
    });

    renderComponent(store);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('shows edit and delete buttons for blogs owned by the user', () => {
    localStorage.setItem('userID', '123');

    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });

    renderComponent(store);
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });

  it('navigates to the create blog page when create button is clicked', () => {
    const store = configureStore({
      reducer: {
        blogSlice: mockReducer,
      },
    });

    renderComponent(store);

    const createButton = screen.getByText(/Create blog/i);
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/create');
  });
});
