import React, { useEffect, useRef,  useState } from "react";
import axios from "axios"
import '../others/media.css';
import {useNavigate} from "react-router-dom";
import photo from "../images/ehehe.png"
import lolo from "../images/eleang.jpg"
import back from "../images/hehe.png"
import grpb from "../images/grpc.png"
import eleC from "../images/elec.png"
import { RxExit } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Chatmain = () => {
  const navigate =useNavigate()
  const messagesRef = useRef(null);
  const token=sessionStorage.getItem("token")
  const baseURL="http://localhost:5000/user"
  const authAxios = axios.create({
    baseURL: baseURL,
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    
    const [data,setData]=useState({
      gtype:'', 
  })

  const chatRef = useRef(null);
  
  const [chat,setChat]=useState([])

  const [isHovered, setIsHovered] = useState(false);
  
  const req= async()=>{
    try{
      const res=await authAxios.get("/fetchChat")
      console.log(res)
      setChat(res.data) 
    }catch(e){

    }
  }

  const ecomm=()=>{
    navigate("/ecom")
  }

  const [chatId,setChatId]=useState([])
  const [chatName,setChatName]=useState([])
  const [fetchChat,setFetchChat]=useState([])
  const [exploreCom,setExploreCom]=useState(false)
  const [createGrp,setCreategrp]=useState(false)
  const [showList,setShowList]=useState(false)
  const [listV,setListV]=useState(true)
  const [isHoveredProfilePic, setIsHoveredProfilePic] = useState(false);
  const [dm,setDm]=useState(true)
  const [comm,setComm]=useState(true)
  const [seeChat,setSeeChat]=useState(true)
  
  
  const handelChatClick=(chatId,name)=>{
    // console.log(name)
    sessionStorage.setItem("chatId",chatId)
    sessionStorage.setItem("name",name)
    setChatId(chatId)
    setChatName(name)
    fetchMsg(chatId)
    if(seeChat===false){
      setSeeChat(true)
    }
  }

  const [newMessage, setNewMessage] = useState({
    content:""
  });
  // console.log(listV)
  const handleChatTypeChange = (event) => {
    // Update the chat type in the state
    setData({ ...data, gtype: event.target.value });

    // Call frndList function
    frndList();
  };
  const frndList=()=>{
    if(data.gtype!="0"){
      // console.log(data.gtype)
      setListV(false)
      // console.log(listV)
    }
    if(data.gtype=="0"){
      setListV(true)
    }
  }

  // useEffect(()=>{
  //   frndList()
  // },[data.gtype])

  const sendMessage = async () => {
    // if (newMessage.trim() === "") {
    //     return;
    // }
    console.log("abc")
    try {
        const res = await authAxios.post(`/sendMsg/${chatId}`, newMessage)
         console.log(res)
        fetchMsg(chatId);
        // socket.emit("new message",res.data)
        setNewMessage((prevMessage) => ({ ...prevMessage, content: '' }));
    } catch (error) {
        console.error("Error sending message:", error);
    }
  };

  const exp =()=>{
    setExploreCom(!exploreCom)
  }

  const grp =()=>{
    setCreategrp(!createGrp)
  }

  const list =()=>{
    setShowList(!showList)
  }

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevents the default behavior of the Enter key (e.g., submitting a form)
          sendMessage();
      }
  };

  const fetchMsg = async(id)=>{
    const res= await authAxios.post(`/getMsg/${id}`)
     console.log(res)
    setFetchChat(res.data)
  }

  const comG = ()=>{
    if(dm===true){
      setDm(false)
    }
    if(seeChat===true){
      setSeeChat(false)
    }
  }

  const checkChat = ()=>{
    if(dm===false){
      setDm(true)
    }
    
  }
  // console.log(data,"haha")

  useEffect(()=>{
    req()
  },[])
  
  useEffect(() => {
    if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
}, [fetchChat]);

  return (
    <div>
      <div className={" bg-[#1E1F22] flex flex-row h-screen w-screen"}>
      <div className=" flex flex-row h-full w-full z-10 ">
            <div className={`w-20  h-screen bg-[#1E1F22] top-0 left-0 flex flex-col-reverse`}>
                <div className=" h-[31.5%] pt-2 space-y-2">
                  <button className={`w-12 text-[#60e43f] rounded-full center h-12 bg-[#313338]`} onClick={grp}>
                    +<br/>
                  </button>
                  <button className={`w-12 text-[#60e43f] rounded-full center h-12 bg-[#313338] `} onClick={exp}>
                  <FaSearch /><br/>
                  </button>
                  <button className={`w-12 text-[#60e43f] rounded-full center h-12 bg-[#313338]`}>
                    set<br/>
                  </button>
                  <button className={`w-12 text-[#60e43f] rounded-full center h-12 bg-[#313338] `} onClick={ecomm}>
                    ecom<br/>
                  </button>
                </div>
                <div className="h-[60%] flex-col overflow-y-auto no-scrollbar" >
                  <button className={`w-12 mb-1 text-[#ff2d2d] rounded-full center h-12 bg-[#b3c6f6]`} onClick={comG}>
                      <img src={eleC} className="rounded-full"></img>
                    </button>
                </div>
                <div className="h-[9%] ">
                  <button className={`w-12 mt-2 text-[#E1E4E6] rounded-full center h-12 bg-[#313338] `} onClick={checkChat}>
                    Chat<br/>
                  </button>
                </div>
                {/* {isHovered && (
                  <div className="absolute top-0 left-0 text-black mt-3 ml-14">
                    hello
                  </div>
                )} */}
              </div>

                <div className={"flex flex-col h-screen w-72 "}>
                    
                    {dm?(<><div className={" text-center p-2 bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                        <div>
                          <input type="text" id="website-admin" class="bg-gray-50 border opacity-80 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[13rem] p-1.5  dark:bg-[#1E1F22] dark:border-gray-700 dark:placeholder-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className={"bg-[#2B2D31] h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                        {chat.map((data)=>(<div  className="yeetfont text-[#eaeaea] chat-item  text-lg w-full mt-2 h-10 px-2 rounded-md text-left" onClick={() => { handelChatClick(data._id, data.users[1].firstName) }}>
                          {data.users[1].firstName}
                        </div>))}
                    </div></>):(<><div className={" text-center p-2 text-white bg-[#2B2D31] border-b border-r border-[#2c2e30] "}>
                        <div>
                          communities name
                        </div>
                    </div>
                    <div className={"bg-[#2B2D31] h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                        {/* gc hacka broc
                        intro polls */}
                        <div className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left" >
                          Intro
                        </div>
                        <div className="text-center items-center origin-center justify-center  w-full">
                          <hr className="w-[13rem] border-[#949494] mx-auto" ></hr>
                        </div>
                        <div className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left" >
                          General
                        </div>
                        <div className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left" >
                          Polls
                        </div>
                        <div className="text-center items-center origin-center justify-center  w-full">
                          <hr className="w-[13rem] border-[#949494] mx-auto" ></hr>
                        </div>
                        <div className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left" >
                          BroadCast
                        </div>
                        <div className="yeetfont text-[#eaeaea] chat-item mx-auto text-lg w-full mt-2 h-10 px-2 rounded-md text-left" >
                          Hackathon
                        </div>
                    </div></>)}
                </div>
                <div className={"flex flex-col w-screen"}>
                    
                       {seeChat?(<><div className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"} >
                              {sessionStorage.getItem("name")?(<div>
                                {sessionStorage.getItem("name")}
                              </div>):(null)}
                          </div>
                       <div className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                       <div className="flex">
                            <input placeholder="Type your message..."
                              className="focus:ring-gray-900 bg-[#202C33] focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-100 placeholder-gray-300 pl-10 rounded-full py-3 border-gray-200"
                              value={newMessage.content}
                              onChange={(event)=>{setNewMessage({ content: event.target.value })}}
                              onKeyDown={handleKeyDown}
                            />
                        </div>
                        
                        <div className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"} ref={messagesRef}>
                            {fetchChat.map((data)=>(
                              <div>
                              {!data.status?(<div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                      <div>
                                          <span
                                            className="px-4 py-2 mt-1 inline-block rounded-tl-lg rounded-r-lg  bg-[#1E1F22] text-[#ffffff]">
                                            {data.content[0]}<br/>
                                          </span>
                                        </div>
                                      </div>
                                    </div>):(<div className="flex items-end justify-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                        <div>
                                            <span className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-gray-200 text-[#000000]">
                                              {data.content[0]}<br/>
                                            </span>
                                        </div>
                                    </div>
                                </div>)}
                            </div>))}
                        </div>
                        </div></>):(<><div className={"bg-gradient-to-r from-[#313338] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"} >
                             EngiVerse
                          </div>
                          <div className={" h-[92.9%] bg-[#cacaca] rounded-se-full  backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                          <div className="flex">
                            
                          </div>
                        
                          <div className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"} ref={messagesRef}>
                              
                          </div>
                          </div></>)}
                    
                </div>
                {/* <div className={"flex flex-col w-5/12"}>
                    <div className={"bg-fuchsia-700 p-4"}>
                        asdasd
                    </div>
                    <div className={"bg-indigo-600 h-full"}>
                        asdasdasd
                    </div>
                </div> */}
      </div>
      {/* <img src={back} className=' object-cover fixed w-screen h-screen'/> */}
      </div>
      {/* model */}
      {exploreCom?(<div className={"fixed inset-0  flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={"flex flex-col h-[90%] w-[90%] p-2 rounded-lg shadow-lg relative z-10"} >
                    <div className="h-[10%] text-[#ffffff] rounded-t-lg bg-[#242529]"><div> Explore communities</div>
                      <input type="text" className="mt-1 rounded-md text-black pl-3" placeholder="Search...." />
                    </div>
                    <div className="h-[80%] mt-2  bg-[#242529] overflow-y-auto flex flex-wrap">
                      
                      <div className="h-[19rem] ml-2 w-[17rem] flex flex-col mt-2 hover:shadow-2xl hover:h-[19.1rem] hover:w-[17.05rem] transition-all duration-150 ease-linear rounded-b-lg">
                        <div className="h-[43%] bg-[#202C33]">
                            <img src={photo} className="rounded-lg"></img>
                        </div>
                        <div className="h-[57%] flex flex-col-reverse rounded-b-lg bg-white">
                            <div className="h-7 p-[.2rem]  flex flex-row rounded-b-lg">
                              <div className="w-[7.5rem] ml-2 items-center flex-row flex bg-white text-left"> <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-gray-500"/>
                                <div className="">123 members</div></div>
                              <div className=" flex flex-row w-[6rem] ml-[.2rem] items-center text-left bg-white">
                                <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-green-500"/>
                                <div className="">123 online</div></div>
                            </div>
                            <div className="h-full flex flex-col m-[.2rem] "> 
                              <div className="mt-3 ml-2 h-7 text-left bg-white">
                                  <b>name</b>
                              </div>
                              <div className=" h-full ml-2 overflow-hidden text-sm text-left bg-white">
                              loram ipsumloram ipsumloram ipsumloram ipsumloram ipsumloram ipsum
                              </div>
                            </div>
                        </div>
                        <div className="fixed p-[.2rem] z-10 mt-[6.5rem] rounded-lg ml-[.6rem] h-[2.5rem] w-[2.5rem] bg-white ">
                          <div className=" h-full w-full bg-white rounded-lg"> <img src={lolo} className="rounded-lg"></img>  </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className="h-[7%] mt-2 rounded-b-lg bg-[#242529] text-white origin-center" onClick={exp}> <RxExit /></div>
                </div>
            </div>):(<></>)
            }

            {createGrp?(<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={" bg-[#1E1F22] flex flex-col h-[90%] w-[90%] p-[.3rem] rounded-lg shadow-2xl relative z-10"} >
                  <div className={`h-[40%] ${isHoveredProfilePic ? 'opacity-75 ' : 'group-hover:opacity-30'} rounded-t-md`} onMouseEnter={() => setIsHoveredProfilePic(true)} onMouseLeave={() => setIsHoveredProfilePic(false)}>
                    <img src={grpb} className=" h-full w-full rounded-t-md "></img>
                        {isHoveredProfilePic && (
                          <div className=" absolute top-0 bg-black opacity-90 rounded-full flex  text-white cursor-pointer">
                          <span className="h-full w-full origin-center"><MdEdit /></span>
                          </div>
                        )}

                    </div>
                    
                    <div className="h-[60%] flex flex-row bg-[#1E1F22]">
                      <div className="w-[140%] flex flex-col bg-slate-300">
                        <div className="h-[2.6rem] bg-[#1E1F22]"></div>
                        <div className="h-[4.3rem] bg-[#2B2D31] flex flex-row">
                          <div className="w-1/3 p-1 flex flex-col">
                            <div className="text-left text-[#CACACA] sheeshfont text-xl ">name</div>
                            <input type="text" className=" rounded-md pl-1 bg-[#eaeaea] text-[1.10rem]"></input>
                          </div>
                          <div className="w-1/3 p-1 flex flex-col" >
                            <label className=" text-left text-[#CACACA] sheeshfont text-xl">type</label>
                            <select name="cars" id="cars" className="h-[1.65rem] bg-[#eaeaea] pl-1 rounded-md" value={data.gtype} onChange={handleChatTypeChange}>
                              <option value="0">please select any one</option>
                              <option value="private">private</option>
                              <option value="Public">public all</option>
                              <option values="f">Connections</option>
                              <option values="invite only">invite only</option>
                            </select>
                          </div>
                          <div className="w-1/3 flex flex-col p-1 " >
                            <label className=" text-left text-[#CACACA] overflow-y-hidden sheeshfont text-xl">Add people </label>
                            <button disabled={listV} className={`bg-[#999da5] disabled:opacity-40 rounded-lg shadow-xl`} onClick={list}>show list</button>
                          </div>
                        </div>
                        <div className="h-[17.5rem] flex flex-col p-1 bg-[#313338]">
                          <label className="mt-1 text-left sheeshfont text-xl text-[#CACACA]">Description</label>
                          <textarea className="h-full bg-[#e4e4e4] rounded-md"></textarea>
                        </div>
                      </div>
                      <div className=" flex flex-col h-full bg-black w-full">
                          <div className="h-[12%] bg-[#1E1F22] text-[#CACACA] sheeshfont text-xl"> people added</div>
                          <div className="h-full p-[0.3rem] bg-[#2B2D31]">
                            <div className="h-full bg-[#313338] flex flex-col-reverse">
                              <div className="h-[2.4rem] items-center flex flex-row-reverse">
                                <button className="bg-[#26ec18] rounded-lg w-[6rem] h-8"> create</button>
                                <button className="bg-[#a2a2a2] rounded-lg mr-2 w-[6rem] h-8" onClick={grp}>Cancel</button>
                              </div>
                              <div className="h-full"></div>
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
                
            </div>):(<></>)

            }

            {showList?(<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"}>
                <div className={" flex flex-col  h-[32rem] w-[50rem] rounded-lg shadow-lg relative z-10"} onClick={list}>
                    <div className="h-12 bg-white rounded-t-lg"> Add Connections</div>
                    <div className="h-full bg-gray-800 overflow-y-auto flex flex-wrap p-1 no-scrollbar">
                      
                    {chat.map((data)=>(
                    <div className="bg-[#ffffff] rounded-md flex flex-row mb-1 mr-1 h-[3rem] w-[18rem] items-center">
                          <div className=" text-lg w-fit mt-2 h-10 px-2 flex-col-reverse rounded-md text-left" onClick={() => { handelChatClick(data._id, data.users[1].firstName) }}>
                              <div> {data.users[1].firstName} </div>
                              <div className=" text-xs -mt-1"> {data.users[1].firstName}</div>
                            </div>
                            <div className="w-full h-full  flex flex-row-reverse items-center">
                              <button className="w-[6rem] mr-1 bg-[#11ff00] h-6 rounded-lg">
                                Add      
                              </button>
                            </div>
                        </div>
                        
                         ))}
                        
                    </div>
                </div>
            </div>):(<></>)}
    </div>
  );
};

export default Chatmain;