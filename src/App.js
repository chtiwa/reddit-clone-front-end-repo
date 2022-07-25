import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home'
import SinglePost from './pages/singlePost/SinglePost'
import CreatePost from './pages/createPost/CreatePost';
import SubredditPosts from './pages/subredditPosts/SubredditPosts';
import CreatorPosts from './pages/creatorPosts/CreatorPosts';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/posts/singlepost" element={<SinglePost />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/r/:tag" element={<SubredditPosts />} />
        <Route path="/user" element={<CreatorPosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App