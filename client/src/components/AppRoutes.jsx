import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Chat from './Chat';
import Page1 from './Page1';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/page_1' element={<Page1/>}/>
    </Routes>
  )
}

export default AppRoutes