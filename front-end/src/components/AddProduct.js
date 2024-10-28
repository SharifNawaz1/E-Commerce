import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
const AddProduct=()=>{

    const [title,setTitle]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const [error,setError]=useState(false)

    const navigate = useNavigate();

    const collectData=async()=>{

        if(!title || !price || !category || !company)
        {
            setError(true)
            return false;
        }
        let user = localStorage.getItem('user')
        user = JSON.parse(user);
        const userId = user.user._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method : 'post',
            body: JSON.stringify({title,price,userId,category,company}),
            headers : {
                'Content-Type':'application/json'
            },
        })
        result = await result.json()
        navigate('/')

        console.log(JSON.stringify(result))
    }

    return(
        <div className="register">
            <h1>Add Product Here</h1>
            <input className="inputbox" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Enter Product Name" />
             { error && !title && <span>Name Invalid</span>}
            <input className="inputbox" type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Price" />
            { error && !price && <span>Price Invalid</span>}
            <input className="inputbox" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Product Category" />
            { error && !category && <span>Category Invalid</span>}
            <input className="inputbox" type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Product Company Name" />
            { error && !company && <span>Company Invalid</span>}
            <button className="signup" onClick={collectData}>Add Product</button>
        </div>
    )
}

export default AddProduct