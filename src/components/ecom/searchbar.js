import { useState,useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import pr from "../images/A.jpg"
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png"
import user1 from "../images/user1.png"
import user2 from "../images/user2.svg"
import user3 from "../images/user3.png"
import user4 from "../images/user4.png"
import user5 from "../images/user5.png"
import user6 from "../images/user6.png"
import user7 from "../images/user7.png"
import user8 from "../images/user8.png"


const Side=()=>{
const navigate =useNavigate()
const [prof, setProf] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });
const dp = sessionStorage.getItem("Dp")
const name = sessionStorage.getItem("Uname")

const profile = (e) => {
  setProf(!prof);
  setPosition({ x: e.clientX, y: e.clientY });
};

const Cart=()=>{
    navigate("/cart")
}

const sett=()=>{
    navigate("/setting")
}

const signout=()=>{
    navigate("/login")
    sessionStorage.clear()
}

const OtherPro = (dp) => {
    if (dp === "1") {
        return user1
    } else if (dp === "2") {
        return user2
    } else if (dp === "3") {
        return user3
    } else if (dp === "4") {
        return user4
    } else if (dp === "5") {
        return user5
    } else if (dp === "6") {
        return user6
    } else if (dp === "7") {
        return user7
    } else if (dp === "8") {
        return user8
    }
}

    return(
        <div className=" flex flex-row h-20 p-4 w-full bg-[#ffffff]">
           <img src={logo}>
            </img> 
            <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l w-full focus:outline-none"                />
            <div className=" flex flex-row w-[10rem] p-1"> 
                   
                <div className="w-1/2">
                    <button className="profile flex bg-black ml-5 rounded-full text-white w-9 h-9 justify-center items-center" onClick={profile}>
                        <img src={OtherPro(dp)}></img>
                    </button>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <button className=" bg-black flex rounded-full  text-white w-9 h-9 justify-center items-center" onClick={Cart}><FaCartShopping /></button>
                </div>
                {prof && (
                    <div
                    className="flex flex-col z-10 absolute w-[16rem] h-[18rem] bg-slate-100"
                    style={{ top: `${position.y+20}px`, left: `${position.x-180}px` }}
                    >
                        <div className=" flex flex-col h-[50%] shadow-xl">
                            <div className="flex h-3/5 bg-white justify-center items-center ">
                                <div className="h-14 w-14 rounded-full  "><img className="rounded-full" src={OtherPro(dp)}></img> </div>
                            </div>
                            <div className="flex flex-col h-2/5 bg-white ">
                                <div className="w-full" >{name}</div>
                                <div className="w-full">email</div>
                            </div>
                        </div>
                        <div className="flex flex-col h-3/5 rounded-lg p-1 gap-y-1">
                            <button className="h-1/3 bg-white shadow-xl">order history</button>
                            <button className="h-1/3 bg-white shadow-xl" onClick={sett}>setting</button>
                            <button className="h-1/3 bg-white shadow-xl" onClick={signout}> sign-out</button>
                        </div>
                    </div>
                )}
                </div>
            </div>
    )
}

export default Side