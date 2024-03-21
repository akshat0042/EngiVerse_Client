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
                            {fetchUCom.map((data) => (<>
                                <button
                                    className={`w-12 mb-3 text-[#ff2d2d] rounded-full center h-12 bg-[#ffffff] sidebar-iconn`}
                                    onClick={() => comG(data)}>
                                    <img src={imgb(data.name)} className="rounded-full bg-white sidebar-iconn"></img>
                                </button>
                            </>))}
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
                                    {fetchChat.map((data) => (
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
                                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                                    <div>
                                                        <span className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-gray-200 text-[#000000]">
                                                            {data.content[0] ? (data.content[0]) : (null)}
                                                            <button className="h-3 w-6 ml-1 -mr-6 " onClick={(e)=>delemsg(e)}>
                                                            <FaAngleDown />

                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>)}
                                             {prof && (
                                                <div
                                                className="flex flex-col z-10 absolute w-[4rem] h-[1.5rem] bg-slate-100"
                                                style={{ top: `${position.y-30}px`, left: `${position.x-340}px` }}
                                                >
                                                    <button className=" shadow-xl h-full text-red-600" onClick={()=>delem()}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>))}
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
            {/* model */}
            {exploreCom ? (<div className={"fixed inset-0  flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={"flex flex-col h-[90%] w-[90%] p-2 rounded-lg shadow-lg relative z-10"}>
                    <div className="h-[10%] text-[#ffffff] yeetfont1 rounded-t-lg bg-[#242529]">
                        <div> Explore Communities</div>
                        <input type="text" className="mt-1 rounded-md text-black pl-3" placeholder="Search...."/>
                    </div>
                    <div className="h-[80%] mt-2  bg-[#242529] overflow-y-auto flex flex-wrap  no-scrollbar">
                        {fetchCom ? (<>{fetchCom.map((data) => (
                            <div
                                className="h-[19rem] ml-2 w-[17rem] flex flex-col mb-1 mt-2 hover:shadow-2xl hover:h-[19.1rem] hover:w-[17.05rem] transition-all duration-150 ease-linear rounded-b-lg cursor-pointer"
                                onClick={() => joinCom(data._id)}>
                                <div className="h-[43%] bg-[#202C33]">
                                    <img src={imga(data.name)} className="rounded-lg h-fit"></img>
                                </div>
                                <div className="h-[57%] flex flex-col-reverse rounded-b-lg bg-white">
                                    <div className="h-7 p-[.2rem]  flex flex-row rounded-b-lg">
                                        <div className="w-[7.5rem] ml-2 items-center flex-row flex bg-white text-left">
                                            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-500"/>
                                            <div className="ml-1">{data.users.length} members</div>
                                        </div>
                                        <div
                                            className=" flex flex-row w-[6rem] ml-[.2rem] items-center text-left bg-white">
                                            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-green-500"/>
                                            <div className="ml-1">-- online</div>
                                        </div>
                                    </div>
                                    <div className="h-full flex flex-col m-[.2rem] ">
                                        <div className="mt-3 ml-2 h-7 text-left bg-white">
                                            <b>{data.name}</b>
                                        </div>
                                        <div className=" h-full ml-2 overflow-hidden text-sm text-left bg-white">
                                            {data.desc}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className=" abolute p-[.2rem] z-10 -mt-[12.5rem] rounded-lg ml-[.6rem] h-[2.5rem] w-[2.5rem] bg-white ">
                                    <div className=" h-full w-full bg-white rounded-lg"><img src={imgb(data.name)}
                                                                                             className="rounded-lg"></img>
                                    </div>
                                </div>
                            </div>
                        ))} </>) : (null)}
                    </div>
                    <div
                        className="h-[7%] mt-2 rounded-b-lg bg-[#242529] text-white origin-center yeetfont1 pt-[0.7rem] cursor-pointer"
                        onClick={exp}> EXIT
                    </div>
                </div>
            </div>) : (<></>)
            }

            {createGrp ? (<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div
                    className={" bg-[#1E1F22] flex flex-col h-[90%] w-[90%] p-[.3rem] rounded-lg shadow-2xl relative z-10"}>
                    <div
                        className={`h-[40%] ${isHoveredProfilePic ? 'opacity-75 ' : 'group-hover:opacity-30'} rounded-t-md`}
                        onMouseEnter={() => setIsHoveredProfilePic(true)}
                        onMouseLeave={() => setIsHoveredProfilePic(false)}>
                        <img src={grpb} className=" h-full w-full rounded-t-md "></img>
                        {isHoveredProfilePic && (
                            <div
                                className=" absolute top-0 bg-black opacity-90 rounded-full flex origin-center justify-center text-white cursor-pointer">
                                <span className=""><MdEdit/></span>
                            </div>
                        )}
                    </div>

                    <div className="h-[60%] flex flex-row bg-[#1E1F22]">
                        <div className="w-[140%] flex flex-col bg-slate-300">
                            <div className="h-[2.6rem] bg-[#1E1F22]"></div>
                            <div className="h-[4.3rem] bg-[#2B2D31] flex flex-row">
                                <div className="w-1/3 p-1 flex flex-col">
                                    <div className="text-left text-[#CACACA] sheeshfont text-xl ">name</div>
                                    <input type="text" className=" rounded-md pl-[0.4rem] bg-[#eaeaea] text-[1.10rem]"
                                           value={gData.chatName} onChange={(event) => {
                                        setGData({...gData, chatName: event.target.value})
                                    }}></input>
                                </div>
                                <div className="w-1/3 p-1 flex flex-col">
                                    <label className=" text-left text-[#CACACA] sheeshfont text-xl">type</label>
                                    <select name="cars" id="cars" className="h-[1.65rem] bg-[#eaeaea] pl-1 rounded-md"
                                            value={gData.chatType} onChange={(event) => {
                                        setGData({...gData, chatType: event.target.value})
                                    }}>
                                        <option value="0">please select any one</option>
                                        <option value="private">private</option>
                                        <option value="Public">public all</option>
                                        <option values="f">Connections</option>
                                        <option values="invite only">invite only</option>
                                    </select>
                                </div>
                                <div className="w-1/3 flex flex-col p-1 ">
                                    <label className=" text-left text-[#CACACA] overflow-y-hidden sheeshfont text-xl">Add
                                        people </label>
                                    <button className={`bg-[#999da5] disabled:opacity-40 rounded-lg shadow-xl`}
                                            onClick={list}>show list
                                    </button>
                                </div>
                            </div>
                            <div className="h-[17.5rem] flex flex-col p-1 bg-[#313338]">
                                <label className="mt-1 text-left sheeshfont text-xl text-[#CACACA]">Description</label>
                                <textarea className="h-full bg-[#e4e4e4] p-1 rounded-md" value={gData.chatDesc}
                                          onChange={(event) => {
                                              setGData({...gData, chatDesc: event.target.value})
                                          }}></textarea>
                            </div>
                        </div>
                        <div className=" flex flex-col h-full bg-black w-full">
                            <div className="h-[12%] bg-[#1E1F22] text-[#CACACA] sheeshfont text-xl"> people added</div>
                            <div className="h-full p-[0.3rem] bg-[#2B2D31]">
                                <div className="h-full bg-[#313338] flex flex-col-reverse">
                                    <div className="h-[2.4rem] items-center flex flex-row-reverse">
                                        <button className="bg-[#26ec18] rounded-lg w-[6rem] h-8"
                                                onClick={() => createNewGrp()}> create
                                        </button>
                                        <button className="bg-[#a2a2a2] rounded-lg mr-2 w-[6rem] h-8"
                                                onClick={grp}>Cancel
                                        </button>
                                    </div>
                                    <div className="h-full">
                                        {gData.userIds.map((data) => (
                                            <>{data}</>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="fixed p-[.2rem] z-10 rounded-lg mt-[12.5rem] ml-[3.2rem] h-[5rem] w-[5rem] bg-[#2B2D31]">
                        <div className=" h-full w-full bg-white rounded-lg"></div>
                    </div>
                    <button className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 justify-center" onClick={grp}>
                        X
                    </button>
                </div>
            </div>) : (<></>)
            }

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
