import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home'
import SinglePost from './pages/singlePost/SinglePost'
import CreatePost from './pages/createPost/CreatePost';
import SubredditPosts from './pages/subredditPosts/SubredditPosts';
import CreatorPosts from './pages/creatorPosts/CreatorPosts';
import ResetPassword from './pages/authentication/ResetPassword'
// import NotFound from './pages/notFound/NotFound'

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/posts">
          <Route path="singlepost" element={<SinglePost />} />
          <Route path="create" element={<CreatePost />} />
        </Route>
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/r/:tag" element={<SubredditPosts />} />
        <Route path="/user" element={<CreatorPosts />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App