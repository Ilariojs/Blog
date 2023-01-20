import React from "react"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import StoreContext from "../Services/Context";
import { SiApachetomcat } from "react-icons/si";
import "./login.css"

const Login = () => {    
    
    const initialStage = () => {
        return {email: '', password: ''};
    }

    const [values, setValue] = useState(initialStage);
    const { setToken } =  useContext(StoreContext)
    const { setLoggedName } =  useContext(StoreContext)
    const { setLoggedAccess_id } = useContext(StoreContext)

    const navigate = useNavigate();

    const onChange = (event) =>{
        const {value, name} = event.target;
        setValue({
            ...values,
            [name]: value
        })
    }

    const onSubmit = async (event) =>{
        event.preventDefault()
    
        async function verifyLogin({ email, password}){
    
            const response = await fetch('http://localhost:3000/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }    
            })
            const responseJson = await response.json()
            const verify = responseJson.filter(response =>{
                return response.email == email && response.password == password
            })    
    
            if(Object.keys(verify).length == 1){
                return { 
                    token:'1234',
                    loggedName: verify[0].name,
                    loggedAccess_id: verify[0].access_id
                }
            } else {
                return window.alert('usuario ou senha invalido')
            }    
        }    
    
        const {token, loggedName, loggedAccess_id} = await verifyLogin(values)
    
        if(token){
            setToken(token)
            setLoggedName(loggedName)
            setLoggedAccess_id(loggedAccess_id)
            if(loggedAccess_id == 1){
                navigate('/home');
            }
            else if(loggedAccess_id == 2){
                navigate('/home_autor');
            }
            else{
                navigate('/home_user')
            }
        }
    
        setValue(initialStage)
    }

    return(
        <div className="login">
            <div className="login_content">
                <div className="login_content_logo">
                    <SiApachetomcat className="logo_ilario.app"/>
                    <p className="text_ilario.app">Ilario.app</p>
                </div>
                <div className="login_content_title_box">
                    <div className="login_content_title_box_main">
                        <p className="welcome">
                            Welcome
                        </p>
                        <p className="sentence">
                            From users to users
                        </p>
                    </div>
                </div>
                <form action="" onSubmit={onSubmit}>       
                    <div className="login_content_form">
                        <div className="single_input">
                            <input type="email" placeholder="email@gmail.com" id="email" name="email" onChange={onChange} value={values.email}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="single_input">
                            <input type="password" id="password" name="password" placeholder="password@123!" onChange={onChange} value={values.password}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="single_button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <div className="login_button">
                    Don't have an account? <a href="" onClick={()=>{navigate('/register')}}>Register</a>
                </div>
            </div>
            <div className="login_image">
                <img src="https://images.pexels.com/photos/9444476/pexels-photo-9444476.jpeg?auto=compress&cs=tinysrgb&w=1600"alt="Retrato de Mona Lisa"/>
            </div>
        </div> 
    )
   
}


export default Login