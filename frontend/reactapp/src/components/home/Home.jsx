import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import StoreContext from "../Services/Context";
import "./Home.css"
import { SiApachetomcat } from "react-icons/si";
const Home = () => {

    const navigate = useNavigate('')
    const { loggedId } = useContext(StoreContext)
    loggedId == 1 ?
      console.log('=)')
    :
    navigate('/login')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState([])
    const user = {
        name: name,
        email: email,
        password: password,
        access_id: 2
    }

    const Register = () => {

        const nameVerificaion = response.filter(response => {
            return response.name == user.name
        })

        const emailVerification = response.filter(response => {
            return response.email == user.email
        })


        Object.keys(emailVerification).length == 0 ?
            Object.keys(nameVerificaion).length == 0 ?

                fetch('http://localhost:3000/user', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => loadDataToTable())
            :
                window.alert('Nome já Cadastrado')
        :
            window.alert('Email já cadastrado')
    }

const loadDataToTable = () => {
    fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            setResponse(response)
        })
}

useEffect(() => {
    loadDataToTable()
}, [])


const autorRote = () => {
    navigate('/home');
}

const categoriesRoute = () => {
    navigate('/home_categories');
}

const logout = () => {
    localStorage.clear();
    navigate('/login')
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
            <h1 className="home_main_title">Cadastre Um Autor</h1>
            <div className="home_main_create_form">
                <form action="">
                    <div className="single_input">
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <label htmlFor="">Name</label>
                    </div>
                    <div className="single_input">
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="single_input">
                        <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <label htmlFor="">Password</label>
                    </div>
                    <button className="single_button" type="submit" onClick={Register}>
                        Register Autor
                    </button>
                </form>
            </div>
        </div>
        <div className="home_table">

            <div className="home_table_content">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((response, index) => {
                            return (
                                <tr>
                                    <td>{response.name}</td>
                                    <td>{response.email}</td>
                                    <td>{response.id}</td>
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

export default Home