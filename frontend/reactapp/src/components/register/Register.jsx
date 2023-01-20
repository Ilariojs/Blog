import React from "react"
import { useState } from "react"
import  "./Register.css"
import { SiApachetomcat } from "react-icons/si";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(response =>{
            setResponse(response)
        })
    })

    
    const user = {
        name: name,
        email: email,
        password: password,
        access_id: 3
    }

const RegisterAction = () => {

        const nameVerificaion = response.filter(response => {
            return response.name == user.name
        })

        const emailVerification = response.filter(response => {
            return response.email == user.email
        })


        Object.keys(emailVerification).length == 0 ?
            Object.keys(nameVerificaion).length == 0 ?
                fetch('http://localhost:3000/user', {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
            :
                window.alert('Nome já Cadastrado')
        :
            window.alert('Email já cadastrado')
}

    return(
        <div className="register">
            <div className="register_content">
                <div className="register_content_logo">
                    <SiApachetomcat className="logo_ilario.app"/>
                    <p className="text_ilario.app">Ilario.app</p>
                </div>
                <div className="register_content_title_box">
                    <div className="register_content_title_box_main">
                        <p className="welcome">
                            Welcome
                        </p>
                        <p className="sentence">
                            From users to users
                        </p>
                    </div>
                </div>
                <div className="register_content_form">
                    <div className="single_input">
                        <input type="text" placeholder="User Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <label htmlFor="">User Name</label>
                    </div>
                    <div className="single_input">
                        <input type="email" placeholder="email@gmail.com" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="single_input">
                        <input type="password" id="password" placeholder="password@123!" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="single_button" type="submit" onClick={()=>{
                        RegisterAction()
                    }}>
                        Sign in
                    </button>
                </div>
                <div className="login_button">
                    Already have an account? <a href="" onClick={()=>{
                        navigate('/login')
                    }}>Login</a>
                </div>
            </div>
            <div className="register_image">
                <img src="https://images.pexels.com/photos/9444476/pexels-photo-9444476.jpeg?auto=compress&cs=tinysrgb&w=1600"alt="Retrato de Mona Lisa"/>
            </div>
        </div> 
    )
}

export default Register