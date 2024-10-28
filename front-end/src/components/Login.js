import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
const Login=()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate("/")
        }
    })
    const collectData=async()=>{
        console.log(email,password)
        let result = await fetch('http://localhost:5000/login',{
            method : 'post',
            body: JSON.stringify({email,password}),
            headers : {
                'Content-Type':'application/json'
            },
        })
        result = await result.json()
        let success = result.success

        if(success){
            localStorage.setItem("user",JSON.stringify(result))
            navigate('/')
        }else{
            alert(result.message)
        }
    }

    return(
        <div className="register">
            <h1>Login</h1>
            <input className="inputbox" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter email" />
            <input className="inputbox" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password" />
            <button className="signup" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default Login