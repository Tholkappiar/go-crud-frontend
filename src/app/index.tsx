/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import BlogsPage from './pages/BlogsPage/Blogs/Blogs';
import BlogPost from './pages/BlogsPage/Blogs/Blog';
import Login from './pages/BlogsPage/auth/Login';
import Signup from './pages/BlogsPage/auth/Signup';
import CreateBlog from './pages/BlogsPage/Blogs/CreateBlog';
import EditBlog from './pages/BlogsPage/Blogs/EditBlog';
import RequireAuth from './pages/BlogsPage/auth/RequireAuth';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
        </Route>
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}
