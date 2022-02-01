import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainNavbar from './components/general/MainNavbar';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import SamplePage from './pages/SamplePage';
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage';
import './App.scss';
import FormikPage from './pages/FormikPage';
import FormJoiPage from './pages/FormJoiPage';
import MooseFormPage from './pages/MooseFormPage';
// import PostCreatePage from './pages/_old/PostCreatePage';
// import NextPrevPage from './pages/NextPrevPage';
// import NumericPage from './pages/NumericPage';
// import LoadMorePage from './pages/LoadMorePage';
// import CardLayoutPage from './pages/CardLayoutPage';
// import MasonryLayoutPage from './pages/MasonryLayoutPage';

function App(props) {
  return (
    <BrowserRouter>
      <MainNavbar />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/nextprev">
            {/* <NextPrevPage /> */}
          </Route>
          <Route exact path="/numeric">
            {/* <NumericPage /> */}
          </Route>
          <Route exact path="/loadmore">
            {/* <LoadMorePage /> */}
          </Route>
          <Route exact path="/masonry-layout">
            {/* <MasonryLayoutPage /> */}
          </Route>
          <Route exact path="/masonry-layout">
            {/* <CardLayoutPage /> */}
          </Route>
          <Route exact path="/create-post-page">
            <CreatePostPage />
          </Route>
          <Route exact path="/single-post/:id">
            <SinglePostPage />
          </Route>
          <Route exact path="/update-post-page/:id">
            <UpdatePostPage />
          </Route>
          <Route exact path="/sample-page">
            <SamplePage />
          </Route>
          <Route exact path="/formik-page">
            <FormikPage />
          </Route>
          <Route exact path="/form-joi-page">
            <FormJoiPage />
          </Route>
          <Route exact path="/form-moose-page">
            <MooseFormPage />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

App.propTypes = {};

export default App;
