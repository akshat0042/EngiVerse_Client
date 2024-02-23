import React, { useEffect, useRef, useState } from "react";
import axios, { Axios } from "axios";
import '../others/media.css';
import { useNavigate } from "react-router-dom";
import photo1 from "../images/5.png"
import photo2 from "../images/6.jpg"
import photo3 from "../images/7.jpg"
import photo4 from "../images/8.jpg"
import photo5 from "../images/9.jpg"
import photo6 from "../images/10.jpg"
import photo7 from "../images/11.jpg"
import lolo1 from "../images/elec.png"
import lolo2 from "../images/lolo2.png"
import lolo3 from "../images/lolo3.jpg"
import lolo4 from "../images/lolo4.png"
import lolo5 from "../images/lolo5.jpg"
import lolo6 from "../images/lolo6.jpg"
import lolo7 from "../images/lolo7.jpg"
import user1 from "../images/user1.png"
import user2 from "../images/user2.svg"
import user3 from "../images/user3.png"
import user4 from "../images/user4.png"
import user5 from "../images/user5.png"
import user6 from "../images/user6.png"
import user7 from "../images/user7.png"
import user8 from "../images/user8.png"
import grpb from "../images/grpc.png"
import eleC from "../images/elec.png"
import { RxExit } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoMegaphone } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoMdCart } from "react-icons/io";

const Chatadmin=()=>{

    const [createGrp, setCreategrp] = useState(false)
    
    const grp = () => {
        setCreategrp(!createGrp)
    }
    const SidebarIcon = ({ icon, text = "hehe" }) => (
        <div className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
        )
    
    return(
        <div>
            <div className={" flex flex-row h-screen w-screen"}>
                <div className=" flex flex-row h-full w-full z-10 ">
                    <div className={`w-20  h-screen bg-[#1E1F22] top-0 left-0 flex flex-col`}>
                        <div className=" h-[31.5%] pl-[0.45rem] pt-2 space-y-2">
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon `} onClick={grp}>
                                <SidebarIcon icon={<IoAddSharp color="#60e43f" size="24" />} text={"Create community"} />
                            </button>
                            
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`}>
                                <SidebarIcon icon={<IoMegaphone color="#60e43f" size="26" />} text={"Broadcast"} />
                            </button>
                           
                        </div>
                    </div>
                    <div className={"flex bg-[#2B2D31] flex-col h-screen w-72 "}>

                    </div>
                    <div className={"flex flex-col w-screen"}>

                    </div>
                </div>
            </div>
            
            {createGrp ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={" bg-[#1E1F22] flex flex-col h-[90%] w-[90%] p-[.3rem] rounded-lg shadow-2xl relative z-10"} >
                    <div className={`h-[40%]  rounded-t-md`}>
                        <img src={grpb} className=" h-full w-full rounded-t-md "></img>
                        
                    </div>

                    <div className="h-[60%] flex flex-row bg-[#1E1F22]">
                        <div className="w-[140%] flex flex-col bg-slate-300">
                            <div className="h-[2.6rem] bg-[#1E1F22]"></div>
                            <div className="h-[4.3rem] bg-[#2B2D31] flex flex-row">
                                <div className="w-1/3 p-1 flex flex-col">
                                    <div className="text-left text-[#CACACA] sheeshfont text-xl " >name</div>
                                    <input type="text" className=" rounded-md pl-[0.4rem] bg-[#eaeaea] text-[1.10rem]" ></input>
                                </div>
                                <div className="w-1/3 p-1 flex flex-col" >
                                   
                                </div>
                                <div className="w-1/3 flex flex-col p-1 " >
                                    
                                </div>
                            </div>
                            <div className="h-[17.5rem] flex flex-col p-1 bg-[#313338]">
                                <label className="mt-1 text-left sheeshfont text-xl text-[#CACACA]" >Description</label>
                                <textarea className="h-full bg-[#e4e4e4] p-1 rounded-md"></textarea>
                            </div>
                        </div>
                        <div className=" flex flex-col h-full bg-black w-full">
                            <div className="h-[12%] bg-[#1E1F22] text-[#CACACA] sheeshfont text-xl"> people added</div>
                            <div className="h-full p-[0.3rem] bg-[#2B2D31]">
                                <div className="h-full bg-[#313338] flex flex-col-reverse">
                                    <div className="h-[2.4rem] items-center flex flex-row-reverse">
                                        <button className="bg-[#26ec18] rounded-lg w-[6rem] h-8" > create</button>
                                        <button className="bg-[#a2a2a2] rounded-lg mr-2 w-[6rem] h-8" >Cancel</button>
                                    </div>
                                    <div className="h-full">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed p-[.2rem] z-10 rounded-lg mt-[12.5rem] ml-[3.2rem] h-[5rem] w-[5rem] bg-[#2B2D31]">
                        <div className=" h-full w-full bg-white rounded-lg">  </div>
                    </div>
                    <button className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 justify-center" onClick={grp}>
                        X
                    </button>
                </div>
            </div>) : (<></>)
            }
        </div>
    
    );
}

export default Chatadmin