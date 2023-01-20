import './Home_autor_posts.css';
import React, { Children } from "react";
import { useNavigate } from 'react-router-dom';
import { SiApachetomcat } from "react-icons/si";
import Pagination from './Pagination';
import { useContext } from 'react';
import StoreContext from '../Services/Context';

const Home_autor_posts = () => {

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }
  const GoToRegister = () => {
    navigate('/home_autor')
  }
  const navigate = useNavigate('')
  const { loggedId } = useContext(StoreContext)
  loggedId == 2 ?
    console.log('=)')
  :
  navigate('/login')


  return (
    <div>
      <div className="home_autor">
        <div className="home_autor_nav">
          <div className="home_autor_nav_content_logo">
            <SiApachetomcat className="logo_ilario.app" />
            <p className="text_ilario.app">Ilario.app</p>
          </div>
          <div className="home_autor_nav_button">
            <div className="nav_button" onClick={GoToRegister}>
              <button>
                Register
              </button>
            </div>
            <div className="home_autor_nav_button_profile">
              <button onClick={logout}>
                Logout?
              </button>
            </div>
          </div>

        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default Home_autor_posts;