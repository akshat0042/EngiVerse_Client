import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";
import back from "../images/t.png"
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
                    <div className=" fixed ml-[24rem] mt-[6.5rem] backdrop-blur-sm shadow-2xl rounded-lg h-3/4 w-[60%]  flex flex-row">
                        <div className="w-[40%] h-full  rounded-l-lg flex flex-col">
                            <div className="h-2/4 rounded-l-lg"></div>
                            <img src={babla} className=' w-full h-full'/>
                            <div className="h-2/4 rounded-l-lg"></div>
                        </div>                        
                        <div className="w-[60%] h-full  flex flex-col rounded-r-lg">
                            <div className="h-24 mt-10 text-4xl text-sky-50 text-center rounded-tr-lg">
                                LOGIN
                            </div>
                            <div className="h-full  p-10 rounded-br-lg">
                                
                                <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Username</label>
                                <div class="relative mb-6">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="input-group-1" value={data.userName}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[86.25%] ps-10 p-2.5  dark:bg-[#1E3350] dark:border-gray-500 dark:placeholder-gray-300 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" onChange={(event)=>{
                                    setData({...data,userName:event.target.value})
                                }}/>
                                
                                </div>
                                <label for="website-admin" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Password</label>
                                <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-100 bg-gray-200  rounded-e-0 border-gray-300 rounded-s-md dark:bg-[#1E3350] dark:text-gray-400 dark:border-gray-600">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                    </svg>
                                </span>
                                <input type="password" id="website-admin" value={data.password}
                                class="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5  p-2.5  dark:bg-[#1E3350] dark:border-gray-700 dark:placeholder-gray-100 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk"
                                onChange={(event)=>{
                                    setData({...data,password:event.target.value})
                                }}/>
                                </div>
                                <div className="mt-6">
                                    <button className="bg-[#1E3350] text-white p-3 w-1/5 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300" onClick={Loggin}>Login</button>
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




{/* <div className="w-full h-screen items-start">

            <div className="absolute left-4">
                    <img src={logo} alt="Logo" className="w-50 h-50" />
            </div>

            <div className=' absolute top-[12%] rounded-lg right-[10%] transition-transform duration-500 h-[75%] w-[40%] backdrop-blur-md'>
                <div>
                    <div className='text-4xl font-momcake mb-4 mt-4'>
                        LOGIN
                    </div>
                    <div className="ml-2">
                        <form className=" ml-4">
                            <div className="text-left">
                            <lable className="block text-lg font-medium text-black">Username</lable>
                            <input type="text" value={data.userName} className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(event)=>{
                                setData({...data,userName:event.target.value})
                            }}/><br/>
                            <span style={{ color: "red" }}>{userNameError}</span>
                            
                            <br/>
                            <label className="block text-lg font-medium text-black">Password</label>
                            <input type="password" value={data.password} className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" onChange={(event)=>{
                                setData({...data,password:event.target.value})
                            }}/><br/>
                            <span style={{ color: "red" }}>{passError}</span>
                            <br/>
                            </div>
                            <div className="mt-6">
                            <button className="bg-gray-500 text-white p-3 w-1/5 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300" onClick={Loggin}>Login</button>
                            </div>
                            <br/>
                            <div className="mt-28">
                                <label>Not a User?</label><button className="" onClick={signUUp}>Sign-up</button>
                            </div>
                            {skip?(<div>
                                <label>Skip</label><button onClick={skipp}>Sign-up</button>
                            </div>):(<div></div>)}
                        </form>
                    </div>
                </div>
            </div>
            
            </div>  */}