import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SiApachetomcat } from "react-icons/si";
import './home_user.css'
import UserPagination from './user_pagination';
import { useContext } from 'react';

import StoreContext from '../Services/Context';
const Home_user = () => {

  
  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }
  const navigate = useNavigate('')
  const { loggedId } = useContext(StoreContext)
  loggedId == 3 ?
    console.log('=)')
  :
  navigate('/login')

  return (
    <>
      <div className="home_user">
        <div className="home_user_nav">
          <div className="home_user_nav_content_logo">
            <SiApachetomcat className="logo_ilario.app" />
            <p className="text_ilario.app">Ilario.app</p>
          </div>
          <div className="home_user_nav_button">
            <div className="home_user_nav_button_profile">
              <button onClick={logout}>
                Logout?
              </button>
            </div>
          </div>
        </div>

        <UserPagination />
      </div>
    </>
  )
}

export default Home_user