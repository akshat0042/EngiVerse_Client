import React, { useEffect, useRef,  useState } from "react";
import axios from "axios"
import '../others/media.css';
import {useNavigate} from "react-router-dom";
import photo from "../images/ehehe.png"
import lolo from "../images/eleang.jpg"
import back from "../images/hehe.png"
import grpb from "../images/grpc.jpg"
import { RxExit } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

const Chatmain = () => {
  const navigate =useNavigate()
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
  
  
  const handelChatClick=(chatId,name)=>{
    console.log(name)
    sessionStorage.setItem("chatId",chatId)
    sessionStorage.setItem("name",name)
    setChatId(chatId)
    setChatName(name)
    fetchMsg(chatId)
  }

  const [newMessage, setNewMessage] = useState({
    data:""
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
      console.log(data.gtype)
      setListV(false)
      console.log(listV)
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
        setNewMessage((prevMessage) => ({ ...prevMessage, data: '' }));
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
  console.log(data,"haha")

  useEffect(()=>{
    req()
  },[])
  
  return (
    <div>
      <div className={"flex flex-row h-screen w-screen"}>
      <div className=" flex flex-row h-full w-full z-10 ">
            <div className={`w-14  h-screen bg-[#232E3E] top-0 left-0 flex flex-col-reverse`}>
                <div className=" space-y-2">
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`} onClick={grp}>
                    +<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`} onClick={exp}>
                    Explor<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`}>
                    set<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338]  -ml-2`} onClick={ecomm}>
                    ecom<br/>
                  </button>
                </div>
                <div className=" flex h-full flex-col">
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] mt-3 -ml-2 ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    gc<br/>
                  </button>
                  <button className={`w-12 rounded-full h-12 bg-[#313338] mt-3 -ml-2 ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    gc<br/>
                </button>
                </div>
                {/* {isHovered && (
                  <div className="absolute top-0 left-0 text-black mt-3 ml-14">
                    hello
                  </div>
                )} */}
              </div>

                <div className={"flex flex-col h-screen w-72 backdrop-blur-yeet "}>
                    <div className={" text-center p-2 bg-[#232e3e]  bg-opacity-90 border-b border-r border-[#2c2e30] "}>
                        <div>
                          <input type="text" id="website-admin" class="bg-gray-50 border opacity-80 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[13rem] p-1.5  dark:bg-[#24304e] dark:border-gray-700 dark:placeholder-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className={"bg-[#232E3E] bg-opacity-85 h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                        {chat.map((data)=>(<div className="chat-item  text-lg w-full mt-2 h-10 px-2 rounded-md text-left" onClick={() => { handelChatClick(data._id, data.users[1].firstName) }}>
                          {data.users[1].firstName}
                        </div>))}
                        
                    </div>
                </div>
                <div className={"flex flex-col w-screen"}>
                    <div className={"bg-gradient-to-r from-[#232e3e] to-[#333333] opacity-80 p-[0.80rem] shadow-2xl text-white w-full text-center"} >
                        {sessionStorage.getItem("name")?(<div>
                          {sessionStorage.getItem("name")}
                        </div>):(null)}
                    </div>
                    <div className={" h-[92.9%] backdrop-blur-yeet hover:backdrop-blur-sm w-full flex flex-col-reverse p-3"}>
                        <div className="flex">
                            <input placeholder="Type your message..."
                              className="focus:ring-gray-900 bg-[#202C33] focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-100 placeholder-gray-300 pl-10 rounded-full py-3 border-gray-200"
                              value={newMessage.data}
                              onChange={(event)=>{setNewMessage({ data: event.target.value })}}
                              onKeyDown={handleKeyDown}
                            />
                        </div>
                        
                        <div className={"p-3 shadow-lg hover:shadow-2xl rounded-md transition-shadow mb-4 h-full w-full overflow-y-auto no-scrollbar"}>
                            
                          
                            {fetchChat.map((data)=>(
                              <div>
                              {data.status?(<div className="flex items-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div>
                                        <span
                                            className="px-4 py-2 mt-1 inline-block rounded-tl-lg rounded-r-lg bg-gray-200 text-gray-600">
                                             {data.content[0]}<br/>
                                        </span>
                                    </div>
                                </div>
                            </div>):(<div className="flex items-end justify-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                    <div>
                                        <span className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-[#0e7a06] text-white">
                                          {data.content[0]}<br/>
                                        </span>
                                    </div>
                                </div>
                            </div>)}
                            
                            </div>
                            ))}
                        </div>
                    </div>
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
      <img src={back} className=' object-cover fixed w-screen h-screen'/>
      </div>
      {/* model */}
      {exploreCom?(<div className={"fixed inset-0  flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={"flex flex-col h-[90%] w-[90%] p-2 rounded-lg shadow-lg relative z-10"} >
                    <div className="h-[10%] text-[#ffffff] rounded-t-lg bg-[#202C33]"><div> Explore communities</div>
                      <input type="text" className="mt-1 rounded-md text-black pl-3" placeholder="Search...." />
                    </div>
                    <div className="h-[80%] mt-2  bg-[#202C33] overflow-y-auto flex flex-wrap">
                      
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
                    <div className="h-[7%] mt-2 rounded-b-lg bg-[#202C33] text-white origin-center" onClick={exp}> <RxExit /></div>
                </div>
            </div>):(<></>)
            }

            {createGrp?(<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"}>
                <div className={" bg-[#202C33] flex flex-col h-[90%] w-[90%] p-[.3rem] rounded-lg shadow-2xl relative z-10"} >
                  <div className={`h-[40%] ${isHoveredProfilePic ? 'opacity-75 ' : 'group-hover:opacity-30'} rounded-t-md`} onMouseEnter={() => setIsHoveredProfilePic(true)} onMouseLeave={() => setIsHoveredProfilePic(false)}>
                    <img src={grpb} className=" h-full w-full "></img>
                  {isHoveredProfilePic && (
                    <div className=" absolute top-0 bg-black opacity-90 rounded-full flex items-center justify-center text-white cursor-pointer">
                    <span><MdEdit /></span>
                    </div>
                  )}
                  
                    </div>
                    
                    <div className="h-[60%] flex flex-row bg-white">
                      <div className="w-7/12 flex flex-col bg-slate-300">
                        <div className="h-[2.6rem] bg-black"></div>
                        <div className="h-[4rem] bg-red-500 flex flex-row">
                          <div className="w-1/3 p-1 bg-green-200 flex flex-col">
                            <div className="text-left text-lg ">name</div>
                            <input type="text" className=" h-full text-[1.10rem]"></input>
                          </div>
                          <div className="w-1/3 p-1 bg-green-100 flex flex-col" >
                            <label className=" text-lg text-left">type</label>
                            <select name="cars" id="cars" value={data.gtype} onChange={handleChatTypeChange}>
                              <option value="0">please select any one</option>
                              <option value="private">private</option>
                              <option value="Public">public all</option>
                              <option values="f">Connections</option>
                              <option values="invite only">invite only</option>
                            </select>
                          </div>
                          <div className="w-1/3 flex flex-col p-1 bg-green-300" >
                            <label className=" text-lg text-left overflow-y-hidden">Add people </label>
                            <button disabled={listV} className={`bg-green-500 disabled:opacity-40 rounded-lg shadow-xl`} onClick={list}>show list</button>
                          </div>
                        </div>
                        <div className="h-[17.71rem] flex flex-col p-1 bg-orange-600">
                          <label className="mt-1 text-left">Description</label>
                          <textarea className="h-full  rounded-md"></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="fixed p-[.2rem] z-10 rounded-lg mt-[12.5rem] ml-[3.2rem] h-[5rem] w-[5rem] bg-fuchsia-700">
                      <div className=" h-full w-full bg-white rounded-lg">  </div>
                    </div>
                  <div className=" fixed h-5 w-5 bg-white ml-2 rounded-sm mt-1 " onClick={grp}>
                          
                  </div>
                </div>
                
            </div>):(<></>)

            }

            {showList?(<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"}>
                <div className={" flex flex-col  h-[32rem] w-[50rem] rounded-lg shadow-lg relative z-10"} onClick={list}>
                    <div className="h-12 bg-white rounded-t-lg"> Add Connections</div>
                    <div className="h-full bg-gray-800 overflow-y-auto flex flex-wrap p-1 no-scrollbar">
                      
                    {chat.map((data)=>(
                    <div className="bg-[#ffffff] flex flex-row mb-1 mr-1 h-[3rem] w-[18rem] items-center">
                          <div className=" text-lg w-fit mt-2 h-10 px-2 rounded-md text-left" onClick={() => { handelChatClick(data._id, data.users[1].firstName) }}>
                               {data.users[1].firstName}
                            </div>
                            <button className="bg-green-500 rounded-md w-[4.5rem] h-[2rem]">
                              Add
                            </button>
                        </div>
                        
                         ))}
                        
                    </div>
                </div>
            </div>):(<></>)}
    </div>
  );
};

export default Chatmain;