import React from 'react';
import {AiFillTaobaoSquare, AiOutlineHome, AiOutlineUserAdd} from "react-icons/ai";
import {BsChat,BsExclamationCircle} from "react-icons/bs";
import {BiHelpCircle} from "react-icons/bi";

import logo from "./logo.png"

const Sidu = () => {


    const redReq = ()=>{
        // navigate('/law/req')
    }
    const redChat = ()=>{
        // navigate('/law/chat')
    }
    return (
        <div className=" top-0 left-0 h-100% w-26 flex flex-col bg-white text-white shadow-2xl text-center ">

            <img src={logo}></img>
            <div className="px-4 p-4">
                <button className="text-black" onClick={()=>redChat()} title='home'>{<AiOutlineHome size="28"/> } Home</button>
            </div>
            <div className="p-4">
              <a href='./'>  <button className='text-black' onClick={()=>redChat()} title='notification'><div className="">{<BsChat size="28"/>}Raise Query </div></button></a>
            </div>
            <div className="px-4 p-4 mt-56">
                <button className='text-black' onClick={()=>redChat()} title='about'>{<BsExclamationCircle size="28"/>}About</button>
            </div>
            <div className="p-4">
                <button className='text-black' onClick={()=>redReq()} title='help'>{<BiHelpCircle size="28"/>}help</button>
            </div>
        </div>
    );
};



export default Sidu;