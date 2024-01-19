import React from 'react';
import Logo from '../images/logo.png'
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Head=()=>{
    
    const [data,setData]=useState({
        Search:''
    })
    let res
    const yet= async(event)=>{
        // event.preventDefault()
        
        console.log(data.Search)
        try{
            res = await axios.post("http://localhost:5000/user/search",data)
                // window.location.reload(false)
                console.log(data)
                console.log(res)
                if(res.status===200){
                    console.log("happy")
                    // navigate("/")
                }
        }
        catch(e){

        }

    }

    return(
        <div className="bg-blue-100 py-4 px-4 flex justify-between items-center">
    <img src={Logo} class="h-32" alt="LIGMA BALLS"/>
      <form onSubmit={yet}><div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    value={data.Search} 
                    onChange={(event)=>{
                        setData({...data,Search:event.target.value})
                    }}
                />
            </div></form>
      <button className="bg-red-500 text-white py-2 px-4 rounded-md">Right Button</button>
    </div>
    )
}

export default Head