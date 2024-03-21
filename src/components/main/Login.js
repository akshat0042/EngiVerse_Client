import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import back from "../images/hehe.png"
import logo from "../images/logo.png"
import '../others/media.css';
import babla from "../images/download.jpg"


const Login = ()=>{
    const navigate =useNavigate()
    const [data,setData] = useState({
        userName:'',        
        password:''
    })
  
    const [userNameError, setUserNameError] = useState("");
    const [passError, setPassError] = useState("");
    const [skip,setSkip] = useState(false)
    let res
    var logskip=window.location.href
    
    console.log(logskip)

    if(logskip==="http://localhost:5000/logInSkip"){
        setSkip(true)
    }

    const Loggin = async(event)=>{
        event.preventDefault()
        
        if (data.userName === "") {
            setUserNameError("user name is required");
            return; 
        } 
        else {
            setUserNameError(""); 
        }
        if (data.password === "") {
            setPassError("Password is required");
            return; 
        } 
        else {
            setPassError(""); 
        }
        try{
            res = await axios.post("http://localhost:5000/user/Login",data)
                // window.location.reload(false)
                console.log(data)
                console.log(res)
                if(res.status===200){
                    console.log(res)
                    sessionStorage.setItem("token",res.data.token)
                    sessionStorage.setItem("Dp",res.data.dp)
                    sessionStorage.setItem("Uname",res.data.userName)
                    navigate("/chatmain")
                }
        }
        catch(e){

        }
        
    }

    const signUUp = ()=>{
        navigate("/signup")
    }

    const skipp = ()=>{
        navigate("/ecomhome")
    }

    return(
        <>
            <div className="flex bg-slate-500 h-screen w-screen items-center justify-center">
                    <div className=" fixed ml-[30rem] mt-[6.5rem] backdrop-blur-sm shadow-2xl rounded-lg h-3/4 w-[40%]">
                                                
                        <div className="h-full flex flex-col rounded-r-lg">
                            <label className="h-24 bold mt-10 text-4xl text-gray-500-50 text-center rounded-tr-lg yeetfont1">
                                LOGIN
                            </label>
                            <div className="h-full  p-10 rounded-br-lg">
                                
                                <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Username</label>
                                <div class="relative mb-6">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                                </div>
                                <input type="text"  value={data.userName}
                                class="bg-gray-50 border border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-10 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" onChange={(event)=>{
                                    setData({...data,userName:event.target.value})
                                }}/>
                                
                                </div>
                                <label for="website-admin" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Password</label>
                                <div class="flex">
                                    <div class="absolute mt-[0.8rem] start-[2.6rem] flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                    </svg>
                                </div>
                                    <input type="password" id="website-admin" value={data.password}
                                    class="bg-gray-50 border border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-10 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password"
                                    onChange={(event)=>{
                                        setData({...data,password:event.target.value})
                                    }}/>
                                </div>
                                
                                <div className="mt-6">
                                    <button className="bg-[#2B2D31] text-white    p-3 w-1/5 rounded-md hover:bg-[#45474b] focus:outline-none focus:ring focus:border-blue-300 mt-3" onClick={Loggin}>Login</button>
                                </div>
                                <br/>
                                <div className="mt-24">
                                    <label className=" text-white">Not a User?</label><button className=" text-violet-500" onClick={signUUp}>Sign-up</button>
                                </div>
                                {skip?(<div>
                                    <label>Skip</label><button onClick={skipp}>Sign-up</button>
                                </div>):(<div></div>)}
                            </div>
                        </div>
                    </div>
                
                <img src={back} className='w-full h-full'/>
            </div>
        </>
    )
}

export default Login    