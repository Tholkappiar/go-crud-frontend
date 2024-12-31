import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import EditBlog from '../Blogs/EditBlog';
import '@testing-library/jest-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import BlogReducer, { BlogActions } from '../slice/blogSlice';

jest.mock('../styles/EditBlog.css', () => ({}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));
jest.mock('redux-injectors', () => ({
  useInjectReducer: jest.fn(),
  useInjectSaga: jest.fn(),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Edit Blog Post', () => {
  const mockBlog = {
    Id: 1,
    Title: 'Existing Title',
    Description: 'Existing Description',
    user_id: '1',
  };

  const renderComponent = store => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <EditBlog />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('renders initial loading state', () => {
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: undefined,
          blogs: [],
          isLoading: true,
          requestSuccess: false,
        },
      },
    });

    renderComponent(mockStore);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders form with existing blog data', () => {
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: mockBlog,
          blogs: [],
          isLoading: false,
          requestSuccess: false,
        },
      },
    });

    renderComponent(mockStore);
    expect(screen.getByText('Edit Blog Post')).toBeInTheDocument();

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      'Description',
    ) as HTMLTextAreaElement;

    expect(titleInput.value).toBe('Existing Title');
    expect(descriptionInput.value).toBe('Existing Description');
  });

  it('updates form inputs when user types', () => {
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: mockBlog,
          blogs: [],
          isLoading: false,
          requestSuccess: false,
        },
      },
    });

    renderComponent(mockStore);
    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      'Description',
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Updated Description' },
    });

    expect(titleInput.value).toBe('Updated Title');
    expect(descriptionInput.value).toBe('Updated Description');
  });

  it('disables button on loading state', () => {
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: mockBlog,
          blogs: [],
          isLoading: true,
          requestSuccess: false,
        },
      },
    });

    renderComponent(mockStore);
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Updating...');
  });

  it('dispatches readBlog action on component mount', () => {
    const mockDispatch = jest.fn();
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
    });
    mockStore.dispatch = mockDispatch;

    renderComponent(mockStore);

    expect(mockDispatch).toHaveBeenCalledWith(BlogActions.readBlog('1'));
  });

  it('dispatches updateBlog action on form submit', async () => {
    const mockDispatch = jest.fn();
    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: mockBlog,
          blogs: [],
          isLoading: false,
          requestSuccess: false,
        },
      },
    });
    mockStore.dispatch = mockDispatch;

    renderComponent(mockStore);

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      'Description',
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Updated Description' },
    });

    const form = screen.getByTestId('formSubmit');
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith(
      BlogActions.updateBlog({
        id: 1,
        data: {
          Title: 'Updated Title',
          Description: 'Updated Description',
        },
      }),
    );
  });

  it('navigates to blogs page on error', async () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockImplementation(() => mockNavigate);

    const mockStore = configureStore({
      reducer: { blogSlice: BlogReducer },
      preloadedState: {
        blogSlice: {
          blog: undefined,
          blogs: [],
          isLoading: false,
          requestSuccess: true,
        },
      },
    });

    renderComponent(mockStore);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/blogs');
    });
  });
});
