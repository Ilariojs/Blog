import React from "react";
import './home_autor.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import StoreContext from "../Services/Context";
import { SiApachetomcat } from "react-icons/si";
import { useState } from "react";


const Home_autor = () => {

  const [categories, setCategories] = useState([])
  const firstCategory = categories[0]?.id
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate('')
  const { loggedId } = useContext(StoreContext)
  loggedId == 2 ?
    console.log('=)') 
  :
  navigate('/login')

  const post = {
    title: title,
    content: content,
    category_id: category == "" ? firstCategory : category,
    user_id: loggedId,
    comment: "",

  }

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }

  const GetCategories = () => {
    fetch('http://localhost:3000/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        setCategories(response)
      })
  }

  const Register = () => {
    fetch('http://localhost:3000/post', {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
  }
  const GoToPost = () => {
    navigate('/home_autor_posts')
  }

  useEffect(() => {
    GetCategories()
  }, [])

  return (
    <div>
      <div className="home_autor">
        <div className="home_autor_nav">
          <div className="home_autor_nav_content_logo">
            <SiApachetomcat className="logo_ilario.app" />
            <p className="text_ilario.app">Ilario.app</p>
          </div>
          <div className="home_autor_nav_button">
            <div className="nav_button" onClick={GoToPost}>
              <button>
                Posts
              </button>
            </div>
            <div className="home_autor_nav_button_profile">
              <button onClick={logout}>
                Logout?
              </button>
            </div>
          </div>
        </div>
        <div className="home_autor_main">
          <div className="home_autor_main_form">
            <h1 className="home_autor_main_title">Make a post</h1>
            <form action="">
              <div className="single_input">
                <input type="text" value={title} onChange={(e) => {
                  setTitle(e.target.value)
                }} />
                <label htmlFor="">Title</label>
              </div>
              <div className="single_input">
                <textarea placeholder="What do you thinking?" minLength={100} maxLength={1000} value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}></textarea>
                <label htmlFor="">Content</label>
              </div>
              <div className="single_input">
                <label htmlFor="">Choose the category</label>
                <select name="" id="" onChange={(e) => {
                  setCategory(e.target.value)
                }}>
                  {categories.map((categories => {
                    return (
                      <option value={categories.id}>{categories.name}</option>
                    )
                  }))}
                </select>
              </div>
              <button className="single_button" type="submit" onClick={() => {
                content == '' ?
                  window.alert('O conteúdo não pode estar vazio')
                :
                  title == '' ?
                    window.alert('O titulo não pode estar vazio')
                  :
                    Register()
              }}>
                Register Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home_autor