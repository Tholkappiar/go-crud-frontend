import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CreateBlog from '../Blogs/CreateBlog';
import '@testing-library/jest-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import BlogReducer, { BlogActions } from '../slice/blogSlice';

jest.mock('../styles/CreateBlog.css', () => {});

afterEach(() => {
  cleanup();
});

describe('Create Blog Post', () => {
  const renderComponent = store => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateBlog />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('is the elements rendered on the page', () => {
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
    });
    renderComponent(mockStore);
    expect(screen.getByText('Create New Blog Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Blog Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Blog Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Create Blog');
  });

  it('updates form inputs when user types', () => {
    const mockstore = configureStore({
      reducer: { blogSlice: BlogReducer },
    });
    renderComponent(mockstore);
    const titleInput = screen.getByLabelText('Blog Title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      'Blog Description',
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    expect(titleInput.value).toBe('Test Title');
    expect(descriptionInput.value).toBe('Test Description');
  });

  it('diable button on loading state', () => {
    const mockstore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: {
            Id: 12,
            user_id: '12',
            Description: 'some desc',
            Title: 'some title',
          },
          blogs: [],
          isLoading: true,
          requestSuccess: false,
        },
      },
    });
    renderComponent(mockstore);
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');
  });

  it('dispatches createBlog action on form submit', () => {
    const mockDispatch = jest.fn();
    const mockstore = configureStore({
      reducer: { blogSlice: BlogReducer },
    });
    mockstore.dispatch = mockDispatch;

    renderComponent(mockstore);

    const titleInput = screen.getByLabelText('Blog Title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      'Blog Description',
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    const form = screen.getByTestId('formSubmit');
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith(
      BlogActions.createBlog({
        Title: 'Test Title',
        Description: 'Test Description',
      }),
    );
  });
});
