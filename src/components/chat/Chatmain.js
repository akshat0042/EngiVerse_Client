import React, {useEffect, useRef, useState} from "react"
import axios, {Axios} from "axios"
import '../others/media.css'
import {useNavigate} from "react-router-dom"
import photo1 from "../images/5.png"
import photo2 from "../images/6.jpg"
import photo3 from "../images/7.jpg"
import photo4 from "../images/8.jpg"
import photo5 from "../images/9.jpg"
import photo6 from "../images/10.jpg"
import photo7 from "../images/11.jpg"
import photo8 from "../images/comgrad.jpg"
import lolo1 from "../images/elec.png"
import lolo2 from "../images/lolo2.png"
import lolo3 from "../images/lolo3.jpg"
import lolo4 from "../images/lolo4.png"
import lolo5 from "../images/lolo5.jpg"
import lolo6 from "../images/lolo6.jpg"
import lolo7 from "../images/lolo7.jpg"
import lolo8 from "../images/commnity.jpg"
import user1 from "../images/user1.png"
import user2 from "../images/user2.svg"
import user3 from "../images/user3.png"
import user4 from "../images/user4.png"
import user5 from "../images/user5.png"
import user6 from "../images/user6.png"
import user7 from "../images/user7.png"
import user8 from "../images/user8.png"
import grpimg from "../images/grpimg.jpeg"
import grpb from "../images/grpc.png"
import eleC from "../images/elec.png"
import {RxExit} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {FaSearch} from "react-icons/fa"
import {GiPlagueDoctorProfile} from "react-icons/gi"
import {IoMegaphone} from "react-icons/io5"
import {IoAddSharp} from "react-icons/io5"
import {CiSettings} from "react-icons/ci"
import {IoMdCart} from "react-icons/io"
import { FaAngleDown } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

const Chatmain = () => {
    const navigate = useNavigate()
    const messagesRef = useRef(null);
    const token = sessionStorage.getItem("token")
    const baseURL = "http://localhost:5000/user"
    const dp = sessionStorage.getItem("Dp")

    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const [gData, setGData] = useState({
        hackathonName: '',
        chatType: '',
        chatDesc: '',
        userIds: []
    })

    const [sendPoll, setSendPoll] = useState({
        context: '',
        communityId: '',
        options: []
    })

    const [data, setData] = useState({
        gtype: '',
    })

    const chatRef = useRef(null);

    const [chat, setChat] = useState([])

    // const [isHovered, setIsHovered] = useState(false);

    const req = async () => {
        try {
            const res = await authAxios.get("/fetchChat")
            console.log(res)
            setChat(res.data)
        } catch (e) {

        }
    }

    const ecomm = () => {
        navigate("/ecom")
    }

    const [chatId, setChatId] = useState([])
    const [prof, setProf] = useState(false);
    const [chatName, setChatName] = useState([])
    const [fetchChat, setFetchChat] = useState([])
    const [fetchGen, setFetchGen] = useState([])
    const [proPic, setProPic] = useState([user1, user2, user3, user4, user5, user6, user7, user8])
    const [fetchCom, setFetchCom] = useState([])
    const [fetchUCom, setFetchUCom] = useState([])
    const [exploreCom, setExploreCom] = useState(false)
    const [isPolls, setIsPolls] = useState(false)
    const [createGrp, setCreategrp] = useState(false)
    const [showList, setShowList] = useState(false)
    const [setting, setSetting] = useState(false)
    const [listV, setListV] = useState(true)
    const [isHoveredProfilePic, setIsHoveredProfilePic] = useState(false);
    const [dm, setDm] = useState(true)
    const [comm, setComm] = useState(true)
    const [seeChat, setSeeChat] = useState(true)
    const [selectedCommunity, setSelectedCommunity] = useState()
    const [introduction, setIntroduntion] = useState(false)
    const [general, setGeneral] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isBroadcast, setIsBroadcast] = useState(false)
    const [isHackathon, setIsHackathon] = useState(false)
    const [hackathon, setHackathon] = useState()
    const [GetBroadcast, setGetBroadcast] = useState()
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [broadcast, setBroadcast] = useState({
        context: "",
        require: "",
        fin: ""
    })
    const [polls, setPolls] = useState([])
    const [totalVotes, setTotalVotes] = useState(0)
    const [addPolls, setAddPolls] = useState(false)


    const openModal = () => {
        setIsOpen(true)
    };

    const closeModal = () => {
        setIsOpen(false)
    };

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

    const [newMessage, setNewMessage] = useState({
        content: ""
    });

    const [newMsgGen, setNewMsgGen] = useState({
        content: ""
    });

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

    const exp = () => {
        fetchComm()
        fetchGrp()
        setExploreCom(!exploreCom)
    }

    const grp = () => {
        setCreategrp(!createGrp)
    }

    const list = () => {
        setShowList(!showList)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendMessage()
        }
    };

    const handleKeyDownGen = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendMsgGen()
        }
    };

    const fetchMsg = async (id) => {
        const res = await authAxios.post(`/getMsg/${id}`)
        console.log(res)
        setFetchChat(res.data)
    }

    const fetchMsgGen = async (id) => {
        const res = await authAxios.post(`/getMsg/${id}`)
        console.log(res)
        setFetchGen(res.data)
    }

    const fetchComm = async () => {
        const res = await authAxios.post(`/getCommunity`)
        console.log(res.data.data)
        setFetchCom(res.data.data)
        console.log(fetchCom)
    }


    const fetchGrp = async () => {
        const res = await authAxios.post(`/showGrp`)
        console.log(res.data)
    }

    const fetchUComm = async () => {
        const res = await authAxios.post(`/showEtype`)
        // console.log(res)
        setFetchUCom(res.data.orgy)
    }

    const fetchOneComm = async (id) => {
        const res = await authAxios.post(`/getOneCummunity/${id}`)
        console.log(res)
        setFetchUCom(res.data.orgy)
    }

    const imga = (yeet) => {
        if (yeet === "Electircal") {
            return photo1
        } else if (yeet === "Software") {
            return photo2
        } else if (yeet === "Mechanical") {
            return photo3
        } else if (yeet === "Environmental") {
            return photo4
        } else if (yeet === "Bioengineers") {
            return photo5
        } else if (yeet === "Civil") {
            return photo6
        } else if (yeet === "Aerospace") {
            return photo7
        }else if (yeet === "Robotics") {
            return photo8
        }
    }

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

    const checkChat = () => {
        if (dm === false) {
            setDm(true)
        }
        if (seeChat === false) {
            setSeeChat(true)
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


    useEffect(() => {
        req()
        fetchUComm()
    }, [])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [fetchChat]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [fetchGen]);

    const SidebarIcon = ({icon, text = "hehe"}) => (
        <div className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )

    const SelfPro = (Dp) => {
        // console.log(Dp)
        if (Dp === "1") {
            return user1
        } else if (Dp === "2") {
            return user2
        } else if (Dp === "3") {
            return user3
        } else if (Dp === "4") {
            return user4
        } else if (Dp === "5") {
            return user5
        } else if (Dp === "6") {
            return user6
        } else if (Dp === "7") {
            return user7
        } else if (Dp === "8") {
            return user8
        }
    }

    const OtherPro = (dp) => {
        let Dp = (dp.users[1].profilePicture)
        if (dp.isGroupChat) {
            return grpimg
        } else if (Dp === "1") {
            return user1
        } else if (Dp === "2") {
            return user2
        } else if (Dp === "3") {
            return user3
        } else if (Dp === "4") {
            return user4
        } else if (Dp === "5") {
            return user5
        } else if (Dp === "6") {
            return user6
        } else if (Dp === "7") {
            return user7
        } else if (Dp === "8") {
            return user8
        }

    }
    
    useEffect(()=>{
        setFetchGen(null)
        setPolls([])
    },[selectedCommunity])

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

    const SidebarIconn = ({icon, text = "hehe"}) => (
        <div className="sidebar-iconn group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )

    const postBroadcast = async () => {
        let res = await authAxios.post("/sendBroadcast", broadcast)
        console.log(res)
        setIsOpen(false)
    }

    const delem = async (id) => {
        let res = await authAxios.post("/delemsg", id)
        console.log(res)
        setIsOpen(false)
    }

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

    const joinCom = async (id) => {
        console.log(id)
        try {
            let res = await authAxios.post(`/joinComunity/${id}`)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const delemsg =  (e) => {
        setProf(!prof);
        setPosition({ x: e.clientX, y: e.clientY });
    }

    const addUser = (id) => {
        setGData(prevState => ({...prevState, userIds: [...prevState.userIds, id]}))
    }

    let extractedDateTimeString = null;
    const extractDateTime = (dateTimeString) => {
        const dateObject = new Date(dateTimeString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        extractedDateTimeString = `${formattedDay}/${formattedMonth} ${hours}:${minutes}`;
    }

    let res
    const createNewGrp = async () => {
        console.log(gData)
        try {
            res = await authAxios.post("/crtgroup", gData)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const exitComm = async (id) => {
        console.log(id)
        try {
            res = await authAxios.post(`/leaveComm/${id}`)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const openSetting = () => {
        console.log(setting)
        if (setting) {
            setSetting(false)
        } else {
            setSetting(true)
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

    useEffect(() => {
        const votes = polls.reduce((acc, poll) => {
            return acc + poll.options.reduce((acc, option) => acc + option.selected.length, 0)
        }, 0)
        setTotalVotes(votes)
    }, [polls])

    useEffect(() => {
        localStorage.clear()
    }, [])


    const handleVote = async (pollId, optionId) => {
        console.log(`pollVote/${pollId}/${optionId}`)
        let res = await authAxios.post(`pollVote/${pollId}/${optionId}`)
        console.log(res)
    }

    let profile = null
//    const [totalVotes, setTotalVotes] = useState(0);

    const setPro = (data) => {
        if (data == user1) {
            profile = 1
        } else if (data == user2) {
            profile = 2
        } else if (data == user3) {
            profile = 3
        } else if (data == user4) {
            profile = 4
        } else if (data == user5) {
            profile = 5
        } else if (data == user6) {
            profile = 6
        } else if (data == user7) {
            profile = 7
        } else if (data == user8) {
            profile = 8
        }
        changePro()
    }

    const changePro = async () => {
        try {
            res = await authAxios.post(`/changDp/${profile}`)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const crtPolls = () => {
        setAddPolls(!addPolls)
    }

    const [options, setOptions] = useState(['']); // State to track the options


    // Function to handle adding an option
    const handleAddOption = () => {
        if (sendPoll.options.length < 6) {
            setSendPoll((prevState) => ({
                ...prevState,
                options: [...prevState.options, '']
            }));
        }
    };

    // Function to handle removing an option
    const handleRemoveOption = (index) => {
        if (sendPoll.options.length > 2) {
            setSendPoll((prevState) => ({
                ...prevState,
                options: prevState.options.filter((_, i) => i !== index)
            }));
        }
    };

    // Function to handle changes in option input
    const handleOptionChange = (index, value) => {
        setSendPoll(prevState => ({
            ...prevState,
            options: prevState.options.map((option, i) => (i === index ? value : option)) // Update the option at the specified index
        }));
    };

    const postPoll = async (id) => {
        // console.log(id)
        try {
            await setSendPoll({...sendPoll, communityId: id})
            res = await authAxios.post(`/createPolls`, sendPoll)
            console.log(res)
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div>

            <div className={" bg-[#1E1F22] flex flex-row h-screen w-screen"}>
                <div className=" flex flex-row h-full w-full z-10 ">
                    <div className={`w-20  h-screen bg-[#1E1F22] top-0 left-0 flex flex-col-reverse`}>
                        <div className=" h-[31.5%] pl-[0.45rem]  space-y-2">
                            <button
                                className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon `}
                                onClick={grp}>
                                <SidebarIcon icon={<IoAddSharp color="#60e43f" size="24"/>} text={"Create group"}/>
                            </button>
                            <button
                                className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`}
                                onClick={exp}>
                                <SidebarIcon icon={<FaSearch color="#60e43f" size="16"/>} text={"Search Communities"}/>
                            </button>
                            <button
                                className={`w-12 text-[#60e43f] rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`}
                                onClick={openModal}>
                                <SidebarIcon icon={<IoMegaphone color="#60e43f" size="26"/>} text={"Broadcast"}/>
                            </button>
                            <button
                                className={`w-12 rounded-full flex h-12 bg-[#313338] justify-center items-center sidebar-icon`}
                                onClick={openSetting}>
                                <img src={SelfPro(dp)} className="rounded-full hover:rounded-lg sidebar-iconn"></img>
                            </button>
                        </div>
                        {isOpen && (
                            <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-blur-md">
                                <div className="bg-[#2B2D31] p-8 rounded shadow-lg w-1/2">
                                    <h2 className="text-lg text-[#ffffff] font-bold mb-4">Broadcast to other
                                        Communities</h2>
                                    <div className="mb-4">
                                        <label className="block text-[#ffffff] text-sm font-bold mb-2">
                                            Context
                                        </label>
                                        <input
                                            className="appearance-none bg-[#CACACA] border rounded w-full py-2 px-3 text-black leading-tight placeholder:text-slate-800 focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Context"
                                            value={broadcast.context}
                                            onChange={(event) => {
                                                setBroadcast({...broadcast, context: event.target.value})
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-[#ffffff] text-sm font-bold mb-2">
                                            require
                                        </label>
                                        <input
                                            className="appearance-none bg-[#CACACA] border rounded w-full py-2 px-3 text-black leading-tight placeholder:text-slate-800 focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="require"
                                            value={broadcast.require}
                                            onChange={(event) => {
                                                setBroadcast({...broadcast, require: event.target.value})
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-[#ffffff] text-sm font-bold mb-2">
                                            Fin
                                        </label>
                                        <input
                                            className="appearance-none border bg-[#CACACA] rounded w-full py-2 px-3 text-black placeholder:text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                                            id="fin"
                                            type="text"
                                            placeholder="Fin"
                                            value={broadcast.fin}
                                            onChange={(event) => {
                                                setBroadcast({...broadcast, fin: event.target.value})
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={postBroadcast}
                                    >
                                        Send
                                    </button>
                                    <button
                                        className="ml-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="h-[60%] flex-col overflow-y-auto no-scrollbar">
                            {/*{fetchUCom.map((data) => (<>*/}
                            {/*    <button*/}
                            {/*        className={`w-12 mb-3 text-[#ff2d2d] rounded-full center h-12 bg-[#ffffff] sidebar-iconn`}*/}
                            {/*        onClick={() => comG(data)}>*/}
                            {/*        <img src={imgb(data.name)} className="rounded-full bg-white sidebar-iconn"></img>*/}
                            {/*    </button>*/}
                            {/*</>))}*/}
                        </div>
                        <div className="h-[9%] ">
                            <button
                                className={`w-12 mt-2 mx-auto text-[#E1E4E6] flex rounded-full center h-12 bg-[#313338] justify-center items-center sidebar-iconn`}
                                onClick={checkChat}>
                                <SidebarIconn icon={<GiPlagueDoctorProfile color="#60e43f" size="26"/>} text={"Chat"}/>
                                {/* <GiPlagueDoctorProfile size={30} className="mx-auto my-auto "/><br/> */}
                            </button>
                        </div>
                        {/* {isHovered && (
                  <div className="absolute top-0 left-0 text-black mt-3 ml-14">
                    hello
                  </div>
                )} */}
                    </div>

                    <div className={"flex flex-col h-screen w-72 "}>
                        {dm ? (<>
                            <div className={" text-center p-2 bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                                <div>
                                    <input type="text" id="website-admin"
                                           class="bg-gray-50 border opacity-80 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[13rem] p-1.5  dark:bg-[#1E1F22] dark:border-gray-700 dark:placeholder-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </div>
                            <div className={"bg-[#2B2D31] h-full flex flex-col-reverse border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                                <div className="h-full flex flex-col">
                                    {chat.map((data) => (<div
                                        className="yeetfont text-[#eaeaea] flex flex-row chat-item text-lg w-full mt-2 h-[3.2rem] p-1 rounded-md text-left"
                                        onClick={() => {
                                            handelChatClick(data._id, data.users[1].firstName)
                                        }}>
                                        <div className="w-[30%] h-full rounded-full  bg-white">
                                            <img className="rounded-full" src={OtherPro(data)}></img>
                                        </div>
                                        <div className="ml-1 flex flex-col w-full">
                                            {data.isGroupChat ? (<>
                                                <div className="overflow-x-clip"> {data.chatName}</div>
                                            </>) : (<></>)}
                                            {!data.isGroupChat ? (<>
                                                <div> {data.users[1].firstName}</div>
                                            </>) : (<></>)}
                                            <div className="text-xs -mt-1 flex flex-row">
                                                <div className="w-[4rem] overflow-x-auto no-scrollbar">
                                                    {/*{data.latestMessage.content[0]}*/}
                                                </div>
                                                <div className="w-[6rem%] ml-1 text-xs ">
                                                    {/*<div> {extractDateTime(data.latestMessage.createdAt)} {extractedDateTimeString}*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>
                                
                            </div>
                            <div className="h-[4rem] flex items-center text-[#ffffff] " onClick={ecomm}>
                            <div className="ml-2"><FaCartShopping color="white" size={"20px"}/></div> <div className="ml-2">E-commerce</div>
                            </div>
                        </>) : (<>

                            <div
                                className={" text-center p-2 text-white bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                                <div>
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
                                    className="yeetfont text-[#ff3c3c] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left"
                                    onClick={() => exitComm(selectedCommunity._id)}>
                                    EXIT
                                </div>
                            </div>
                        </>)}
                    </div>
                    <div className={"flex flex-col w-screen"}>

                        {seeChat ? (<>
                            <div
                                className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"}>

                                {sessionStorage.getItem("name") ? (<div>
                                    {sessionStorage.getItem("name")}
                                </div>) : (
                                    <div>
                                        EngiVerse
                                    </div>
                                )}
                            </div>
                            <div
                                className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                                <div className="flex">
                                    <input placeholder="Type your message..."
                                           className="focus:ring-gray-900 bg-[#202C33] focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-100 placeholder-gray-300 pl-10 rounded-full py-3 border-gray-200"
                                           value={newMessage.content}
                                           onChange={(event) => {
                                               setNewMessage({content: event.target.value})
                                           }}
                                           onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div
                                    className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}
                                    ref={messagesRef}>

                                </div>
                            </div>
                        </>) : (<>
                            <div
                                className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"}>
                                {localStorage.getItem("comsele") ? (<div>
                                    {localStorage.getItem("comsele")}
                                </div>) : (
                                    <div>
                                        EngiVerse
                                    </div>
                                )}
                            </div>

                        </>)}
                    </div>
                </div>

            </div>


            {showList ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"}>
                <div className={" flex flex-col h-[32rem] w-[50rem] rounded-lg shadow-lg "}>
                    <div className="h-12 bg-white rounded-t-lg" onClick={list}> Add Connections</div>
                    <div className="h-full bg-gray-800 overflow-y-auto flex flex-wrap p-1 no-scrollbar">
                        {chat.map((data) => (
                            <div className="bg-[#ffffff] rounded-md flex flex-row mr-1 h-[3rem] w-[18rem] items-center">
                                <div className=" text-lg w-fit mt-2 h-10 px-2 flex-col-reverse rounded-md text-left"
                                     onClick={() => {
                                         handelChatClick(data._id, data.users[1].firstName)
                                     }}>
                                    <div> {data.users[1].firstName} </div>
                                    <div className=" text-xs -mt-1"> {data.users[1].firstName}</div>
                                </div>
                                <div className="w-full h-full  flex flex-row-reverse items-center">
                                    <button className="w-[6rem] mr-1 bg-[#11ff00] h-6 rounded-lg"
                                            onClick={() => addUser(data.users[1]._id)}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>) : (<></>)}

            {setting ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"}>
                <div className={" flex flex-col h-[32rem] w-[45rem] rounded-lg shadow-lg bg-[#1E1F22]"}>
                    <div className="h-12 bg-white pt-2 text-2xl yeetfont1" onClick={openSetting}>
                        Select Profile Picture
                    </div>
                    <div className="h-full overflow-y-auto flex flex-wrap no-scrollbar">
                        {proPic.map((data) => (
                            <div className="" onClick={() => setPro(data)}>
                                <img className="h-[7rem] cursor-pointer rounded-full m-6" src={data}></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>) : (<div></div>)}

            {addPolls ? (<div className={"fixed inset-0 flex items-end justify-end z-50 backdrop-blur-sm"}>
                <div className={" flex flex-col-reverse h-[29rem] w-[30rem] rounded-lg shadow-lg bg-[#2b384a]"}>
                    <div className="h-[3.5rem] p-1 flex flex-row-reverse bg-[#2b384a] rounded-b-lg ">
                        <button className="h-[3rem] bg-green-600 hover:bg-green-400 rounded-md w-[12rem] "
                                onClick={() => postPoll(selectedCommunity._id)}> POST
                        </button>
                        <button className="h-[3rem] bg-slate-500 hover:bg-slate-400 rounded-md mr-1 w-[9rem]"
                                onClick={crtPolls}>Cancel
                        </button>
                        <div className="w-full flex flex-row">
                            {sendPoll.options.length < 6 && (
                                <div>
                                    <button
                                        className=" h-[3rem] text-white bg-green-600 hover:bg-green-400 rounded-md w-[6rem]"
                                        onClick={handleAddOption}>Add Option
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="h-full flex flex-col">
                        <div className="h-[3rem] text-xl pt-2 text-white yeetfont1">
                            POST A POLL
                        </div>
                        <div className="h-full flex flex-col text-white">
                            <div className="h-[6rem] w-full flex flex-col text-left p-1 justify-center items-center">
                                <input className="w-[20rem] rounded-md pl-2 bg-[#1F2937] h-[3.7rem]"
                                       placeholder="Context" value={sendPoll.context} onChange={(event) => {
                                    setSendPoll({...sendPoll, context: event.target.value})
                                }}></input>
                            </div>
                            <div className="option h-full w-full flex flex-col mt-2 text-left p-1">

                                {sendPoll.options.map((option, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={option}
                                            placeholder="Add option..."
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="mb-1 text-white h-[1.7rem] mt-1 bg-[#1F2937] pl-2 rounded"
                                        />
                                        <button className="bg-red-600 p-1 ml-1 mt-1 rounded-md"
                                                onClick={() => handleRemoveOption(index)}>Remove
                                        </button>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (<div></div>)}
        </div>
    )
}

export default Chatmain;
