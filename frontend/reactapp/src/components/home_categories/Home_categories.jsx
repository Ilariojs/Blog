import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiApachetomcat } from "react-icons/si";
import StoreContext from "../Services/Context";
import { useContext } from "react";
import "./Home_categories.css"

const Home_categories = () => {

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [post, setPost] = useState([])
    const navigate = useNavigate('')
    const { loggedId } = useContext(StoreContext)
    loggedId == 2 ?
        console.log('=)')
        :
        navigate('/login')

    const category = {
        name: name
    }
    const Register = () => {

        fetch('http://localhost:3000/category', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        loadCategoriesToTable()
        loadPostToTable()
    }

    const loadCategoriesToTable = () => {
        fetch('http://localhost:3000/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                setCategories(response)
            })
    }

    const loadPostToTable = () => {
        fetch('http://localhost:3000/post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                setPost(response)
            })
    }


    useEffect(() => {
        loadCategoriesToTable()
    }, [])

    useEffect(() => {
        loadPostToTable()
    }, [])


    const autorRote = () => {
        navigate('/home');
    }

    const categoriesRoute = () => {
        navigate('/home_categories');
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="home">
            <div className="home_nav">
                <div className="home_nav_content_logo">
                    <SiApachetomcat className="logo_ilario.app" />
                    <p className="text_ilario.app">Ilario.app</p>
                </div>
                <div className="home_nav_buttons">
                    <div className="nav_button" onClick={autorRote}>
                        <button> Autor </button>
                    </div>
                    <div className="nav_button" onClick={categoriesRoute}>
                        <button>
                            Categories
                        </button>
                    </div>
                    <div className="nav_button_profile">
                        <button onClick={logout}>
                            Logout?
                        </button>
                    </div>
                </div>
            </div>
            <div className="home_main">
                <h1 className="home_main_title">Register a Category</h1>
                <div className="home_main_create_form">
                    <form action="">
                        <div className="single_input">
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                            <label htmlFor="">Name</label>
                        </div>
                        <button className="single_button" type="submit" onClick={() => {
                            name == '' ?
                                window.alert('O seu nome não pode estar vazio')
                                :
                                Register()
                        }}>
                            Register Category
                        </button>
                    </form>
                </div>
            </div>
            <div className="home_table">
                <div className="home_table_content">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Posts</th>
                                <th>Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((categories) => {
                                return (
                                    <tr>
                                        <td>{categories.name}</td>
                                        <td>{Object.keys(post.filter((post) => {
                                            return categories.id == post.category_id
                                        })).length}</td>
                                        <td>{categories.id}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default Home_categories