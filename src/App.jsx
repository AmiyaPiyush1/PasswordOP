import React from 'react';
import Navbar from './components/navbar';
import Manager from './components/Manager';
import Page from './components/page'
import Signup from './components/signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/login'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page />}/>
      <Route path='/PassOP' element={<><Navbar /><Manager /></>}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
