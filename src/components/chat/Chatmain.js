import React, { useEffect, useRef,  useState } from "react";
import axios from "axios"
import '../others/media.css';
import {useNavigate} from "react-router-dom";

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

  const chatRef = useRef(null);
  
  const [chat,setChat]=useState([])
  // useEffect(() => {
  //   // Scroll to the bottom when the component mounts
  //   chatRef.current.scrollIntoView({ behavior: "instant" });
  // }, []);

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

  useEffect(()=>{
    req()
  },[])
  
  return (
    <div>
            <div className={"flex flex-row"}>
              <div className={`w-14 h-screen bg-[#141414] top-0 left-0 flex flex-col-reverse`}>
                <div className=" space-y-2">
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`}>
                    gc<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`}>
                    gc<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338] -ml-2`}>
                    gc<br/>
                  </button>
                  <button className={`w-12 rounded-full center h-12 bg-[#313338]  -ml-2`} onClick={ecomm}>
                    ecom<br/>
                  </button>
                </div>
                <div className=" flex h-full flex-col">
                  <div className={`w-12 rounded-full center h-12 bg-[#313338] mt-3 -ml-2 ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    gc<br/>
                  </div>
                  <div className={`w-12 rounded-full h-12 bg-[#313338] mt-3 -ml-2 ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    gc<br/>
                </div>
                </div>
                {/* {isHovered && (
                  <div className="absolute top-0 left-0 text-black mt-3 ml-14">
                    hello
                  </div>
                )} */}
              </div>

                <div className={"flex flex-col h-screen w-72 "}>
                    <div className={" text-center p-2 bg-[#4a4c50] border-b border-r border-[#2c2e30] "}>
                        <div>
                          <input type="text" id="website-admin" class="bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[13rem] p-1.5  dark:bg-[#232e3e] dark:border-gray-700 dark:placeholder-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className={"bg-[#4a4c50] h-full flex-col border-r border-[#2c2e30] overscroll-contain overflow-auto scrolling-touch"}>
                        {chat.map((data)=>(<div className="chat-item haha text-lg w-full mt-2 h-10 px-2 rounded-md text-left" onClick={() => { handelChatClick(data._id, data.users[1].firstName) }}>
                          {data.users[1].firstName}
                        </div>))}
                        
                    </div>
                </div>
                <div className={"flex flex-col w-screen"}>
                    <div className={"bg-[#2B2D31] p-[0.80rem] shadow-2xl text-white w-full text-center"} >
                        {sessionStorage.getItem("name")?(<div>
                          {sessionStorage.getItem("name")}
                        </div>):(null)}
                    </div>
                    <div className={"bg-[#292a2b] h-full w-full flex flex-col-reverse p-3"}>
                        <div className="flex">
                            <input placeholder="Type your message..."
                              className="focus:ring-gray-900 bg-[#202C33] focus:border-gray-900 w-full focus:placeholder-gray-400 text-gray-100 placeholder-gray-300 pl-10 rounded-full py-3 border-gray-200"
                              value={newMessage.data}
                              onChange={(event)=>{setNewMessage({ data: event.target.value })}}
                              onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className={"p-3 shadow-2xl  mb-4 h-full w-full overflow-y-auto"}>
                            <div className="flex items-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div>
                                        <span
                                            className="px-4 py-2 inline-block rounded-tl-lg rounded-r-lg bg-gray-200 text-gray-600">
                                            ligma balls
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {fetchChat.map((data)=>(
                            <div className="flex items-end justify-end">
                                <div
                                    className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                                    <div>
                                      <span className="px-4 py-2 mt-1 inline-block rounded-l-lg rounded-tr-lg bg-[#0e7a06] text-white">
                                        {data.content[0]}<br/>
                                      </span>
                                    </div>
                                </div>
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
        </div>
  );
};

export default Chatmain;