import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { createContext } from 'react';
import StoreProvider from './components/Services/Provider';
import PrivateRoute from './components/Routes/Private/Private';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home'
import Home_categories from './components/home_categories/Home_categories'
import Home_autor from './components/home_autor/home_autor'
import Home_autor_posts from './components/home_autor_posts/Home_autor_posts';
import Home_user from './components/home_user/home_user';

function App() {

  return (
    <div className="App">
      <Router>
        <StoreProvider>
          <Routes>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/home" element={<PrivateRoute redirectTo="/login">
              <Home />
            </PrivateRoute>} />
            <Route path='/home_categories' element={<PrivateRoute>
              <Home_categories />
            </PrivateRoute>} />
            <Route path='/home_autor' element={<PrivateRoute>
              <Home_autor />
            </PrivateRoute>}>
            </Route>
            <Route path='/home_autor_posts' element={<PrivateRoute>
              <Home_autor_posts />
            </PrivateRoute>}>
            </Route>
            <Route path='/home_user' element={<PrivateRoute>
              <Home_user />
            </PrivateRoute>}>
            </Route>
          </Routes>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;