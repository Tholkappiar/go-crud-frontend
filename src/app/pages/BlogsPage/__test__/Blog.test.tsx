import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import BlogsPage from '../Blogs/Blogs';
import React from 'react';
import '@testing-library/jest-dom';

jest.mock('redux-injectors', () => ({
  useInjectReducer: jest.fn(),
  useInjectSaga: jest.fn(),
}));

const mockReducer = (state = { blogSlice: { blogs: [] } }, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

test('renders "My Blog" text on the screen', () => {
  const store = configureStore({
    reducer: {
      blogSlice: mockReducer,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <BlogsPage />
      </BrowserRouter>
    </Provider>,
  );

  expect(getByText(/My Blog/i)).toBeInTheDocument();
});
