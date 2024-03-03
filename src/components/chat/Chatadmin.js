import React, { useEffect, useRef, useState } from "react";
import axios, { Axios } from "axios";
import '../others/media.css';
import { useNavigate } from "react-router-dom";
import grpb from "../images/comgrad.jpg"
import { IoMegaphone } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import commu from "../images/commnity.jpg"

const Chatadmin=()=>{
    
    const token = sessionStorage.getItem("token")
    const baseURL = "http://localhost:5000/user"
    const authAxios = axios.create({
        baseURL: baseURL,
    });

    const [createGrp, setCreategrp] = useState(false)
    const [createHack, setCreateHack] = useState(false)
    const [fetchComm,setFetchComm]=useState([])
    const [hackData, setHackData] = useState({
        hackathonName: '',
        hackathonUrl: '',
        hackathonContext: '',
        hackathonDate: '',
        hackathonMode:'',
    })

    const [commData, setCommData] = useState({
        communityName: '',
        introduction: '',
        descr: '',
    })

    const comm = () => {
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
    
    const hack=()=>{
        setCreateHack(!createHack)
    }
    let res
    const Sendhack= async()=>{
        try{
            res = await authAxios.post("http://localhost:5000/admin/addHackathon",hackData)
            console.log(res)
        }
        catch(e){
            console.log(e)
        }
    }

    const sendComm= async()=>{
        try{
            res = await authAxios.post("http://localhost:5000/admin/addCommunity",commData)
            console.log(res)
        }
        catch(e){
            console.log(e)
        }
    }

    const fetchaComm= async()=>{
        try{
            res=await authAxios.post("http://localhost:5000/admin/commLoop")
            setFetchComm(res)
            console.log(fetchComm)
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        fetchaComm()
    }, [])

    return(
        <div>
            <div className={" flex flex-row h-screen w-screen bg-[#1E1F22]"}>
                <div className=" flex flex-row h-full w-full z-10 ">
                    <div className={`w-20  h-screen bg-[#1E1F22] top-0 left-0 flex flex-col`}>
                        <div className=" h-[31.5%] pl-[0.45rem] pt-2 space-y-2">
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon `} onClick={comm}>
                                <SidebarIcon icon={<IoAddSharp color="#60e43f" size="24" />} text={"Create community"} />
                            </button>
                            
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`} onClick={hack}>
                                <SidebarIcon icon={<IoMegaphone color="#60e43f" size="26" />} text={"Add Hackathon"} />
                            </button>
                           
                        </div>
                    </div>
                    <div className={"flex bg-[#2B2D31] flex-col h-screen w-72 "}>

                    </div>
                    <div className={"flex flex-col w-screen"}>
                    <div className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"} >
                    {sessionStorage.getItem("name") ? (<div>
                                {sessionStorage.getItem("name")}
                            </div>) : (
                                <div>
                                    EngiVerse
                                </div>
                                )}
                    </div>
                        <div className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                        {/* {fetchComm.map((data) => (<> */}
                                {/* <button className={`w-12 mb-3 text-[#ff2d2d] rounded-full center h-12 bg-[#ffffff] sidebar-iconn`}> */}
                                    {/* {data.} */}
                                {/* </button> */}
                            {/* </>))} */}
                        </div>
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
                                <div className="w-full p-1 flex flex-col">
                                    <div className="text-left text-[#CACACA] sheeshfont text-xl " >name</div>
                                    <input type="text" className=" rounded-md pl-[0.4rem] w-full bg-[#eaeaea] text-[1.10rem]" value={commData.communityName} onChange={(event)=>{
                                        setCommData({...commData,communityName:event.target.value})
                                    }}></input>
                                </div>
                                
                                <div className="w-1/3 flex flex-col p-1 " >
                                    getCommunity
                                </div>
                            </div>
                            <div className="h-[17.5rem] flex flex-col p-1 bg-[#313338]">
                                <label className="mt-1 text-left sheeshfont text-xl text-[#CACACA]" >Introduction</label>
                                <textarea className="h-full bg-[#e4e4e4] p-1 rounded-md" value={commData.introduction} onChange={(event)=>{
                                        setCommData({...commData,introduction:event.target.value})
                                    }}></textarea>
                            </div>
                        </div>
                        <div className=" flex flex-col h-full bg-black w-full">
                            <div className="h-[12%] bg-[#1E1F22] text-[#CACACA] sheeshfont text-xl"> Description</div>
                            <div className="h-full p-[0.3rem] bg-[#2B2D31]">
                                <div className="h-full bg-[#313338] flex flex-col-reverse">
                                    <div className="h-[2.4rem] items-center flex flex-row-reverse">
                                        <button className="bg-[#26ec18] rounded-lg w-[6rem] h-8" onClick={sendComm}> create</button>
                                        <button className="bg-[#a2a2a2] rounded-lg mr-2 w-[6rem] h-8" onClick={comm}>Cancel</button>
                                    </div>
                                    <div className="h-full flex flex-col">
                                    <textarea className="bg-[#e4e4e4] mx-1 p-1 h-[17rem] rounded-md" value={commData.descr} onChange={(event)=>{
                                        setCommData({...commData,descr:event.target.value})
                                    }}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed p-[.2rem] z-10 rounded-lg mt-[12.5rem] ml-[3.2rem] h-[5rem] w-[5rem] bg-[#2B2D31]">
                        <div className=" h-full w-full bg-white rounded-lg"> <img className=" rounded-md" src={commu}></img>  </div>
                    </div>
                    <button className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 justify-center" onClick={comm}>
                        X
                    </button>
                </div>
            </div>) : (<></>)
            }

            {createHack ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={" bg-[#1E1F22] flex flex-col h-[85%] w-[50%] p-[.3rem] bg-transparent rounded-lg shadow-2xl relative z-10"} >
                    <div className="h-[7%] bg-[#2B2D31] text-center justify-center rounded-t-md pt-[0.3rem]">
                        <label className="sheeshfont text-white text-3xl ">Add Hackathon</label>
                    </div>
                    <div className="h-full bg-[#2B2D31] flex flex-col-reverse text-left rounded-b-md justify-center pt-[0.3rem] mt-2">
                        <div className="h-[2.4rem] mb-2 items-center flex flex-row-reverse mr-2">
                            <button className="bg-[#26ec18] rounded-lg w-[6rem] h-10" onClick={Sendhack}> create</button>
                            <button className="bg-[#a2a2a2] rounded-lg mr-2 w-[6rem] h-10" onClick={hack}>Cancel</button>
                        </div>
                        <div className=" h-full flex flex-col">
                            <div className="flex flex-col">
                                <label className="sheeshfont ml-1 text-white text-xl ">Name of Hackathon</label>
                                <input className="m-1 bg-[#e4e4e4] rounded-md p-1" value={hackData.hackathonName} onChange={(event)=>{
                                        setHackData({...hackData,hackathonName:event.target.value})
                                    }}></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="sheeshfont ml-1 text-white text-xl ">Url of Hackathon</label>
                                <input className="m-1 bg-[#e4e4e4] rounded-md p-1" value={hackData.hackathonUrl} onChange={(event)=>{
                                        setHackData({...hackData,hackathonUrl:event.target.value})
                                    }}></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="sheeshfont ml-1 text-white text-xl ">Mode of Hackathon</label>
                                <input className="m-1 bg-[#e4e4e4] rounded-md p-1" value={hackData.hackathonMode} onChange={(event)=>{
                                        setHackData({...hackData,hackathonMode:event.target.value})
                                    }}></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="sheeshfont ml-1 text-white text-xl ">date of Hackathon</label>
                                <input type='date' className="m-1 bg-[#e4e4e4] rounded-md p-1" value={hackData.hackathonDate} onChange={(event)=>{
                                        setHackData({...hackData,hackathonDate:event.target.value})
                                    }}></input>
                            </div>
                            <div className="flex flex-col">
                                <label className="sheeshfont ml-1 text-white text-xl ">Discription of Hackathon</label>
                                <textarea className="m-1 bg-[#e4e4e4] rounded-md h-[8rem]" value={hackData.hackathonContext} onChange={(event)=>{
                                        setHackData({...hackData,hackathonContext:event.target.value})
                                    }}></textarea>
                            </div>
                            
                        </div>
                    </div>
                    <button className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 justify-center" onClick={hack}>
                        X
                    </button>
                </div>
            </div>) : (<></>)
            }
        </div>
    
    );
}

export default Chatadmin