import { useState,useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import pr from "../images/A.jpg"


const Side=()=>{

const [prof, setProf] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });

const profile = (e) => {
  setProf(!prof);
  setPosition({ x: e.clientX, y: e.clientY });
};
    return(
        <div className=" flex flex-row h-20 p-4 w-full bg-white">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-l w-full focus:outline-none"
                    />
                    <div className=" flex flex-row w-[10rem] p-1">
                        
                        <div className="w-1/2">
                        <button
                        className="profile bg-black rounded-full text-white w-9 h-9"
                        onClick={profile}
                        >
                        <CgProfile />
                        </button>
                        </div>
                        <div className="w-1/2 flex items-center justify-center">
                            <button className=" bg-black rounded-full  text-white w-9 h-9"><FaCartShopping /></button>
                        </div>
                        {prof && (
                        <div
                        className="flex flex-col z-10 absolute w-[16rem] h-[18rem] bg-slate-100"
                        style={{ top: `${position.y+20}px`, left: `${position.x-180}px` }}
                        >
                            <div className=" flex flex-col h-[50%] shadow-xl">
                                <div className="flex h-3/5 bg-white justify-center items-center ">
                                    <div className="h-14 w-14 rounded-full  "><img className="rounded-full" src={pr}></img> </div>
                                </div>
                                <div className="flex flex-col h-2/5 bg-white ">
                                    <div className="w-full" >name</div>
                                    <div className="w-full">email</div>
                                </div>
                            </div>
                            <div className="flex flex-col h-3/5 rounded-lg p-1 gap-y-1">
                                <div className="h-1/3 bg-white shadow-xl">order history</div>
                                <div className="h-1/3 bg-white shadow-xl">setting</div>
                                <div className="h-1/3 bg-white shadow-xl"> sign-out</div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
    )
}

export default Side