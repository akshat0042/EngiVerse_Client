import React, { useEffect, useRef, useState } from "react";
import axios, { Axios } from "axios";
import '../others/media.css';
import {useNavigate} from "react-router-dom"
import grpb from "../images/comgrad.jpg"
import { IoMegaphone } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import commu from "../images/commnity.jpg"
import lolo1 from "../images/elec.png"
import lolo2 from "../images/lolo2.png"
import lolo3 from "../images/lolo3.jpg"
import lolo4 from "../images/lolo4.png"
import lolo5 from "../images/lolo5.jpg"
import lolo6 from "../images/lolo6.jpg"
import lolo7 from "../images/lolo7.jpg"
import lolo8 from "../images/commnity.jpg"
import { BsGraphUp } from "react-icons/bs";
import {GiPlagueDoctorProfile} from "react-icons/gi"
import { IoMdAdd } from "react-icons/io";
import logo from "../images/logo.png"

const Chatadmin=()=>{
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")
    const messagesRef = useRef(null);
    const baseURL = "http://localhost:5000/user"
    const authAxios = axios.create({
        baseURL: baseURL,
    });

    const [createGrp, setCreategrp] = useState(false)
    const [chatId, setChatId] = useState([])
    const [createHack, setCreateHack] = useState(false)
    const [isPolls, setIsPolls] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [seeChat, setSeeChat] = useState(true)
    const [fetchGen, setFetchGen] = useState([])
    const [polls, setPolls] = useState([])
    const [totalVotes, setTotalVotes] = useState(0)
    const [addPolls, setAddPolls] = useState(false)
    const [dm, setDm] = useState(true)
    const [fetchComm, setFetchComm] = useState([])
    const [chatName, setChatName] = useState([])
    const [introduction, setIntroduntion] = useState(false)
    const [general, setGeneral] = useState(false)
    const [remP, setRemP] = useState(false)
    const [fetchChat, setFetchChat] = useState([])
    const [isBroadcast, setIsBroadcast] = useState(false)
    const [isHackathon, setIsHackathon] = useState(false)
    const [Prodrepo, setProdRepo] = useState(false)
    const [orderRepo, setOrderRepo] = useState(false)
    const [hackathon, setHackathon] = useState()
    const [GetBroadcast, setGetBroadcast] = useState()
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [broadcast, setBroadcast] = useState({
        context: "",
        require: "",
        fin: ""
    })
    const [selectedCommunity, setSelectedCommunity] = useState()
    const [hackData, setHackData] = useState({
        hackathonName: '',
        hackathonUrl: '',
        hackathonContext: '',
        hackathonDate: '',
        hackathonMode:'',
    })

    const checkChat = () => {
        if (dm === false) {
            setDm(true)
        }
        if (seeChat === false) {
            setSeeChat(true)
        }
    }

    const [commData, setCommData] = useState({
        communityName: '',
        introduction: '',
        descr: '',
    })

    const getBroadcast = async () => {
        let res = await authAxios.post("/getBroadcast")
        setGetBroadcast(res.data.data)
        console.log(getBroadcast)
        if (!isBroadcast) {
            setIsBroadcast(true)
            setGeneral(false)
            localStorage.setItem("comsele", "Broadcast")
            setIsHackathon(false)
            setIsPolls(false)
            if (introduction) {
                setIntroduntion((prevSelected) => !prevSelected)
            }
        }
        console.log(res.data.data)
    }

    const fetchMsg = async (id) => {
        const res = await authAxios.post(`/getMsg/${id}`)
        console.log(res)
        setFetchChat(res.data)
    }

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
    
    const imgb = (yeet) => {
        if (yeet === "Electircal") {
            return lolo1
        } else if (yeet === "Software") {
            return lolo2
        } else if (yeet === "Mechanical") {
            return lolo3
        } else if (yeet === "Environmental") {
            return lolo4
        } else if (yeet === "Bioengineers") {
            return lolo5
        } else if (yeet === "Civil") {
            return lolo6
        } else if (yeet === "Aerospace") {
            return lolo7
        }else if (yeet === "Robotics") {
            return lolo8
        }
    }

    const crtPolls = () => {
        setAddPolls(!addPolls)
    }

    const handleVote = async (pollId, optionId) => {
        console.log(`pollVote/${pollId}/${optionId}`)
        let res = await authAxios.post(`pollVote/${pollId}/${optionId}`)
        console.log(res)
    }

    const Contact = async (id) => {
        try {
            console.log(id)
            let res = authAxios.post(`/accessChat/${id}`).then((data) => {
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

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

    const ChangeIntro = () => {
        if (!introduction) {
            setIntroduntion((prevSelected) => !prevSelected)
        }
        localStorage.setItem("comsele", "Introduction")
        console.log(introduction)
        setGeneral(false)
        setIsHackathon(false)
        setIsBroadcast(false)
        setIsPolls(false)
    }

    const ChangeGenral = async (id) => {
        if (!general) {
            setGeneral(true)
            localStorage.setItem("comsele", "General")
            setIsHackathon(false)
            setIsBroadcast(false)
            setIsPolls(false)
            console.log(selectedCommunity.genralChat)
            if (introduction) {
                setIntroduntion((prevSelected) => !prevSelected)
            }
        }
        fetchMsgGen(selectedCommunity.genralChat)
        const res = await authAxios.post(`/getMsg/${selectedCommunity.genralChat}`)
        console.log(res)
        console.log(general)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendMessage()
        }
    };

    const sendMessage = async () => {

        console.log("abc")
        try {
            const res = await authAxios.post(`/sendMsg/${chatId}`, newMessage)
            console.log(res)
            fetchMsg(chatId)
            setNewMessage((prevMessage) => ({...prevMessage, content: ''}));
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    const handelChatClick = (chatId, name) => {
        // console.log(name)
        sessionStorage.setItem("chatId", chatId)
        sessionStorage.setItem("name", name)
        setChatId(chatId)
        setChatName(name)
        fetchMsg(chatId)
        if (seeChat === false) {
            setSeeChat(true)
        }
    }

    const handleKeyDownGen = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendMsgGen()
        }
    };

    const [newMsgGen, setNewMsgGen] = useState({
        content: ""
    });

    const [newMessage, setNewMessage] = useState({
        content: ""
    });

    const sendMsgGen = async () => {

        try {
            console.log(selectedCommunity.genralChat)
            const res = await authAxios.post(`/sendMsg/${selectedCommunity.genralChat}`, newMsgGen)
            console.log(res)
            fetchMsgGen(selectedCommunity.genralChat)
            setNewMessage((prevMessage) => ({...prevMessage, content: ''}))
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    const SidebarIconn = ({icon, text = "hehe"}) => (
        <div className="sidebar-iconn group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )

    const fetchMsgGen = async (id) => {
        const res = await authAxios.post(`/getMsg/${id}`)
        console.log(res)
        setFetchGen(res.data)
    }

    const removehim = async (id) => {
        console.log(id)
        // const res = await authAxios.post(`/removeUser/${id}`)
    }

    const ChangeHackathon = async () => {
        if (!isHackathon) {
            setIsHackathon(true)
            setIsBroadcast(false)
            localStorage.setItem("comsele", "Hackathon")
            setGeneral(false)
            setIsPolls(false)
            if (introduction) {
                setIntroduntion((prevSelected) => !prevSelected)
            }
        }
        let res = await authAxios.post("/getHackathon")
        setHackathon(res.data.data)
        console.log(res.data.data)
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
            setFetchComm(res.data.data)
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }

    const prod=async()=>{
        try{
            res =await authAxios.post("http://localhost:5000/user/productReports")
            console.log(res)
        }
        catch(e){

        }
    }
    const Order=async()=>{
        try{
            res =await authAxios.post("http://localhost:5000/user/orderReports")
            console.log(res)
        }
        catch(e){

        }
    }
    
    const comG = (data) => {
        setSelectedCommunity(data)
        console.log(data)
        if (dm === true) {
            setDm(false)
        }
        if (seeChat === true) {
            setSeeChat(false)
        }
    }

    const getPolls = async (id) => {
        try {
            if (!isPolls) {
                setIsPolls(true)
                localStorage.setItem("comsele", "Polls")
                setGeneral(false)
                setIsHackathon(false)
                setIsBroadcast(false)
                if (introduction) {
                    setIntroduntion((prevSelected) => !prevSelected)
                }
            }
            console.log(id)
            let res = await authAxios.get(`getAllPolls/${id}`)
            setPolls(res.data.poll)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleChat= async()=>{
        setShowChat(true)
    }

    const removepep=()=>{
        setRemP(!remP)
    }


    useEffect(()=>{
                setFetchGen(null)
                setPolls([])
            },[selectedCommunity])

    useEffect(() => {
        fetchaComm()
        prod()
        Order()
    }, [])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [fetchGen]);

    const Addprod=()=>{
        console.log("dsdf")
        navigate("/productadd")
    }

    useEffect(() => {
        localStorage.clear()
    }, [])

    const Repo=()=>{
        navigate("/reports")
    }
    // console.log(selectedCommunity)

    const prodre=()=>{
        setProdRepo(true)
        setOrderRepo(false)
    }
    const orderre=()=>{
        setProdRepo(false)
        setOrderRepo(true)
    }

    return(
        <div>
            <div className={" flex flex-row h-screen w-screen bg-[#1E1F22]"}>
                <div className=" flex flex-row h-full w-full z-10 ">
                    <div className={`w-20  h-screen bg-[#1E1F22] top-0 left-0 flex flex-col`}>
                    <div className="h-[9%] ">
                            <button
                                className={`w-12 mt-2 mx-auto text-[#E1E4E6] flex rounded-full center h-12 bg-[#313338] justify-center items-center sidebar-iconn`}
                                onClick={checkChat}>
                                <SidebarIconn icon={<GiPlagueDoctorProfile color="#60e43f" size="26"/>} text={"Chat"}/>
                                {/* <GiPlagueDoctorProfile size={30} className="mx-auto my-auto "/><br/> */}
                            </button>
                        </div>
                        <div className=" h-[20.5%] pl-[0.20rem] pt-2 space-y-2">
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon `} onClick={comm}>
                                <SidebarIcon icon={<IoAddSharp color="#60e43f" size="24" />} text={"Create community"} />
                            </button>
                            
                            <button className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`} onClick={hack}>
                                <SidebarIcon icon={<IoMegaphone color="#60e43f" size="26" />} text={"Add Hackathon"} />
                            </button>
                           
                        </div>
                        <div className="h-full bg-[#1E1F22]">
                        {fetchComm?<>{fetchComm.map((data) => (<>
                                <button
                                    className={`w-12 mb-3 text-[#ff2d2d] rounded-full center h-12 bg-[#ffffff] sidebar-iconn`}
                                    onClick={() => comG(data)}
                                    >
                                    <img src={imgb(data.name)} className="rounded-full bg-white sidebar-iconn"></img>
                                </button>
                            </>))}</>:<></>
                            }
                        </div>
                    </div>
                    <div className={"flex bg-[#2B2D31] flex-col h-screen w-72 "}>
                    {dm ? (<>
                            <div className={" text-center p-2 bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                                <div>
                                    <input type="text" id="website-admin"
                                           class="bg-gray-50 border opacity-80 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[13rem] p-1.5  dark:bg-[#1E1F22] dark:border-gray-700 dark:placeholder-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </div>
                            <div className={"bg-[#2B2D31] h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                                <div className="h-[3rem] flex flex-row items-center w-full text-white chat-item rounded " onClick={Addprod}>
                                    <IoMdAdd size={"26px"}/><div className="ml-1"> Add Products</div>
                                </div>
                                <div className="h-[3rem] flex flex-row items-center pl-1 w-full text-white chat-item rounded " onClick={checkChat}>
                                    <BsGraphUp size={"26px"}/><div className="ml-2"> Reports</div>
                                </div>
                            </div>
                        </>) : (<>

                            <div className={" text-center p-2 text-white bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                                <div className="">
                                    {selectedCommunity.name}
                                </div>
                            </div>
                            <div
                                className={"bg-[#2B2D31] h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                                {/* gc hacka broc
                        intro polls */}
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={ChangeIntro}>
                                    Intro
                                </div>
                                <div className="text-center items-center origin-center justify-center  w-full">
                                    <hr className="w-[13rem] border-[#949494] mx-auto"></hr>
                                </div>
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={() => ChangeGenral(selectedCommunity._id)}>
                                    General
                                </div>
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={() => getPolls(selectedCommunity._id)}>
                                    Polls
                                </div>
                                <div className="text-center items-center origin-center justify-center  w-full">
                                    <hr className="w-[13rem] border-[#949494] mx-auto"></hr>
                                </div>
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={getBroadcast}>
                                    BroadCast
                                </div>
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={ChangeHackathon}>
                                    Hackathon
                                </div>
                                <div className="text-center items-center origin-center justify-center  w-full">
                                    <hr className="w-[13rem] border-[#949494] mx-auto"></hr>
                                </div>
                                <div
                                    className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={removepep}>
                                    Remove people
                                </div>
                            </div>
                        </>)}
                    </div>
                    <div className={"flex flex-col w-screen"}>

                    {seeChat ? (
                        <><div className="w-full h-full">
                                <div className={"bg-gradient-to-r flex from-[#6f6f6f] to-[#6f6f6f] opacity-80 p-[0.80rem] shadow-2xl text-white justify-center w-full text-center"}>
                                        <div>
                                            <img src={logo}></img>
                                        </div>
                                </div>
                                <div className={" h-[87.3%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col p-3"}>
                                    <div className="w-[100%] h-[10%] bg-white p-1 flex flex-row">
                                        <button className="w-1/2 flex justify-center items-center mr-1 h-full " onClick={prodre}>
                                            <div> Product Report</div>
                                        </button>
                                        <button className="w-1/2 flex justify-center items-center h-full " onClick={orderre}>
                                            <div> Order Report</div>
                                        </button>

                                    </div>
                                    {Prodrepo?(<><div className="w-full h-full flex items-center justify-center">
                                        <div className="h-[30rem] w-[55rem] bg-white">
                                            <table >
                                                <thead>
                                                    <tr>
                                                        <th>Product Id</th>
                                                        <th>Product Name</th>
                                                        <th>Product Stock</th>
                                                        <th>Product Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>001</td>
                                                        <td>Product A</td>
                                                        <td>10</td>
                                                        <td>$20.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>002</td>
                                                        <td>Product B</td>
                                                        <td>15</td>
                                                        <td>$25.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>003</td>
                                                        <td>Product C</td>
                                                        <td>5</td>
                                                        <td>$15.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>004</td>
                                                        <td>Product D</td>
                                                        <td>20</td>
                                                        <td>$30.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>005</td>
                                                        <td>Product E</td>
                                                        <td>8</td>
                                                        <td>$18.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>006</td>
                                                        <td>Product F</td>
                                                        <td>12</td>
                                                        <td>$22.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>007</td>
                                                        <td>Product G</td>
                                                        <td>3</td>
                                                        <td>$12.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>008</td>
                                                        <td>Product H</td>
                                                        <td>25</td>
                                                        <td>$35.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </>):(<></>)}
                                    {orderRepo?(<>
                                    </>):(<></>)}
                                </div>
                            </div>
                        </>
                        ) : (<>
                            <div
                                className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"}>
                                {localStorage.getItem("comsele") ? (<div>
                                    {localStorage.getItem("comsele")}
                                </div>) : (
                                    <div className="">
                                        <div className="bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center">
                                            EngiVerse
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {isBroadcast && (
                                <>
                                    <div
                                        className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                        <div
                                            className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                            ref={messagesRef}>
                                            {GetBroadcast.map((data, index) => (

                                                <div key={index}
                                                     className={`flex items-end ${index !== 0 ? 'mt-4' : ''}`}>
                                                    <div
                                                        className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start ">
                                                        <div className="items-start content-start text-start">
                                                            <span
                                                                className="block bg-gray-800 text-white rounded-lg p-4 shadow-md w-[30rem] ">
                                                                <div
                                                                    className="flex content-center items-start text-center">
                                                                    <div
                                                                        className="w-10 h-10 rounded-full bg-green-800"/>
                                                                    <div
                                                                        className=" ml-4 mx-auto my-auto font-semibold">{data.user.userName}</div>
                                                                </div>
                                                                <div
                                                                    className="text-center items-center origin-center justify-center  w-full">
                                                                    <hr className="w-[21rem] border-[#949494] mx-auto"></hr>
                                                                </div>
                                                                <div className="mt-2 text-lg">{data.context}</div>
                                                                <div
                                                                    className="mt-2 text-base">requirements : {data.requirments}</div>
                                                                <div
                                                                    className="mt-2 text-base">{data.finance ? (`Fin : ${data.finance}`) : (`Finance Not Specified`)}</div>
                                                                <div
                                                                    className="flex items-end content-end text-end justify-end">
                                                                    <button onClick={() => Contact(data.user._id)}
                                                                            className="rounded-md text-white yeetfont1 bg-green-700 p-2">Contact</button>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}


                            {general ? (
                                <div
                                    className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                    <div>
                                        <input placeholder="Type your message..."
                                               className="focus:ring-gray-900 bg-[#202C33] focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-100 placeholder-gray-300 pl-10 rounded-full py-3 border-gray-200"
                                               value={newMsgGen.content}
                                               onChange={(event) => {
                                                   setNewMsgGen({...newMsgGen, content: event.target.value})
                                               }}
                                               onKeyDown={handleKeyDownGen}
                                        />
                                    </div>
                                    <div
                                        className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                        ref={messagesRef}
                                    >
                                        {fetchGen?(
                                            <>
                                            {fetchGen.map((data) => (
                                                <div>
                                                    {!data.status ? (
                                                        <div className="flex items-end">
                                                            <div
                                                                className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                                <div className="flex flex-col">
                                                                    <div
                                                                        className="h-[1rem] px-1 z-30 text-white rounded bg-[#1E1F22] mt-1 w-fit ">
                                                                        {data.firstName}
                                                                    </div>
                                                                    <span
                                                                        className="px-4 py-2 -mt-2 inline-block rounded-tl-lg rounded-r-lg  bg-[#1E1F22] text-[#ffffff]">
                                                                        {data.content[0] ? (data.content[0]) : (null)}<br/>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        ) : (<div className="flex items-end justify-end">
                                                            <div
                                                                className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                                                <div>
                                                                    <span
                                                                        className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-gray-200 text-[#000000]">
                                                                        {data.content[0]}<br/>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>)}
                                                </div>))}
                                            </>
                                        ):(null)}

                                    </div>
                                </div>
                            ) : (null)}

                            {isPolls ? (
                                <div
                                    className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                    <button className="h-[3.5rem] w-full rounded-full bg-[#1F2937] text-white"
                                            onClick={() => crtPolls()}>
                                        Create polls
                                    </button>
                                    <div
                                        className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                        ref={messagesRef}>
                                        {/*<div className="font-bold text-xl mb-2">Poll</div>*/}
                                        {polls ? (<>
                                            {polls.map((poll,index) => (<div
                                                className={`max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gray-800 text-white ${index===0?(""):("mt-5")}`}>
                                                <div className="px-6 py-4">
                                                    <div key={poll.id}
                                                         className="max-w-md w-full rounded-md overflow-hidden shadow-lg bg-gray-800 text-white mb-4">
                                                        <div className="px-6 py-4">
                                                            <div className="font-bold text-xl mb-2">{poll.context}</div>
                                                            {poll.options.map(option => (
                                                                <div key={option.id} className="mb-4">
                                                                    <button
                                                                        onClick={() => handleVote(poll._id, option._id)}
                                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out transform hover:scale-110"
                                                                    >
                                                                        {option.content}

                                                                    </button>
                                                                    <span
                                                                        className="text-gray-300">{option.selected.length} votes</span>
                                                                    <div
                                                                        className="bg-gray-600 h-2 mt-2 rounded-full">
                                                                        <div
                                                                            className="bg-green-500 h-full rounded-full"
                                                                            style={{width: `${(option.selected.length / totalVotes) * 100}%`}}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>))}
                                        </>) : (null)}

                                    </div>
                                </div>
                            ) : (null)}


                            {introduction ? (
                                <>
                                    <div
                                        className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                        <div
                                            className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                            ref={messagesRef}>
                                            <div
                                                className="bg-gray-900 rounded-lg  w-[50%] h-[50%] mx-auto my-auto flex justify-center  backdrop-blur-yeet hover:backdrop-blur-sm items-center text-center">
                                                <div className="text-white yeetfont1 text-xl">
                                                    {selectedCommunity.introduction}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (null)}
                            {isHackathon ? (
                                <div
                                    className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                    <div
                                        className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                        ref={messagesRef}>
                                        <div>

                                            {hackathon ? (
                                                <div>
                                                    {hackathon.map((data) => (
                                                        <div className="flex items-end justify-end mb-4" key={data.id}>
                                                            <div
                                                                className="flex flex-col space-y-4 text-xs max-w-xs mx-2 order-2 items-end">
                                                                <div>
                                                                        <span
                                                                            className="px-4 w-[30rem] py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-gray-200 text-[#000000]">
                                                                            <div>
                                                                                <span
                                                                                    className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-gray-200 text-[#000000]">
                                                                                    <div
                                                                                        className="ml-4 mx-auto my-auto font-semibold text-xl">
                                                                                        {data.name}
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <span
                                                                                    className="px-4 py-2 mt-1 inline-block  text-xl">
                                                                                    Mode: {data.mode}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-base">
                                                                                Context: {data.context}
                                                                            </div>
                                                                            <div>
                                                                                <div
                                                                                    className="flex mt-4 items-end content-end text-end justify-end">
                                                                                    <a href={`${data.url}`}
                                                                                       className="rounded-md text-white yeetfont1 bg-green-700 p-2 px-5">Join</a>
                                                                                </div>
                                                                            </div>
                                                                        </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (null)}
                                        </div>
                                    </div>
                                </div>
                            ) : (null)}
                        </>)}
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

            {remP ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={" bg-[#1E1F22] flex flex-col h-[85%] w-[50%] p-[.3rem]  rounded-lg shadow-2xl relative z-10"} >
                    <div className="h-[9%] text-2xl text-white"> Remove Users</div>
                    <div className="h-full overflow-y-auto no-scrollbar flex flex-wrap p-2">
                        {selectedCommunity.users.map((data)=>(
                            <div className="h-[4rem] rounded flex flex-row-reverse items-center w-[18rem] mt-2 ml-2 bg-[#5e5e5e]">
                                <button className="h-[2.2rem] rounded-md w-[6rem] m-2 bg-red-500" onClick={()=>removehim(data)}>
                                    Kick
                                </button>
                                <div className="h-full w-full flex flex-col">
                                    <div className="text-left flex flex-row w-full text-xl">
                                        {data.firstName}<div className="ml-1">{data.lastName}</div>
                                    </div>
                                    <div className="text-left flex flex-row w-full text-l">
                                        {data.engineerType1}
                                    </div>
                                </div>
                            </div>)
                        )}
                        
                    </div>
                    <button className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 justify-center" onClick={removepep}>
                        X
                    </button>
                </div>
            </div>) : (<></>)
            }

        </div>
    
    );
}

export default Chatadmin