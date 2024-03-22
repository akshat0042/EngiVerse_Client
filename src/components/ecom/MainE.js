import React, { useState, useEffect } from "react"; 
import axios from "axios"
import { MdNavigateNext } from "react-icons/md";
// import image1 from "../images/loginbabla.svg"; // Import your images
// import image2 from "../images/random.jpg";
// import image3 from "../images/t.png";
// import image4 from "../images/back.jpeg";
// import image5 from "../images/qwer.png";
// import image6 from "../images/rgsdfgsdfg.jpg";
import rod from "../images/rod.jpg"
import Screws from "../images/screws.webp"
import Thermal from "../images/thermal2.webp"
import Arduino from "../images/ardiuno.webp"
import Driller from "../images/driller.webp"
import wires from "../images/wires.webp"
import piews from "../images/pipes.webp"
import grills from "../images/grill.webp"
import { FaCartShopping } from "react-icons/fa6";
import '../others/media.css';
import Searchbar from './searchbar'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png"
import user1 from "../images/user1.png"
import user2 from "../images/user2.svg"
import user3 from "../images/user3.png"
import user4 from "../images/user4.png"
import user5 from "../images/user5.png"
import user6 from "../images/user6.png"
import user7 from "../images/user7.png"
import user8 from "../images/user8.png"
import { CiChat1 } from "react-icons/ci";


const MainE = () => {
    const navigate =useNavigate()
    function valuetext(value) {
        return `${value}°C`;
      }
    
      
    const [value, setValue] = React.useState([20, 37000]);
    const [imageSrc, setImageSrc] = useState("");
    const step = 500;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Step 1: State for search query



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
      
    const marks = Array.from({ length: 51 }, (_, index) => ({
        value: index * step,
        label: index % 5 === 0 ? `${index * step}` : '',
      }));
      
    // Function to handle slideshow animation
    const token=sessionStorage.getItem("token")

    const baseURL="http://localhost:5000"
    const [prod,setProd]=useState([]);

    const authAxios = axios.create({
      baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      
      const gotop=(id)=>{
        sessionStorage.setItem("id",id)
        navigate("/indip")
      }

      const req= async()=>{ 
        try{
          const res=await authAxios.post("/admin/productShow")
          console.log(res)
          setProd(res.data.data) 
        }catch(e){
    
        }
      }

      useEffect(()=>{
        req()
      },[])
      

    const imga=(yeet)=>{
        if(yeet==="Driller"){
            return Driller
        }
        else if(yeet==="Screws"){
            return Screws
        }
        else if(yeet==="Arduino Uno"){
            return Arduino
        }
        else if(yeet==="Thermal Paste"){
            return Thermal
        }
        else if(yeet==="wires"){
            return wires
        }
        else if(yeet==="rod"){
            return rod
        }
        else if(yeet==="pipews"){
            return piews
        }
        else if(yeet==="grills"){
            return grills
        }   
        
    }




    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const clearFilter = () => {
        setSelectedCategory(null);
    };
    
    const filteredProducts = prod.filter(item => {
        const withinPriceRange = item.productPrice >= value[0] && item.productPrice <= value[1];
        const withinCategory = !selectedCategory || item.productCat === selectedCategory;
        const matchesSearchQuery = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
        return withinPriceRange && withinCategory && matchesSearchQuery;
    });

    // Step 2: Implement function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const [prof, setProf] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dp = sessionStorage.getItem("Dp")
    const name = sessionStorage.getItem("Uname")
    const email = sessionStorage.getItem("Email")

    const profile = (e) => {
    setProf(!prof);
    setPosition({ x: e.clientX, y: e.clientY });
    };

    const Cart=()=>{
        navigate("/cart")
    }

    const sett=()=>{
        navigate("/setting")
    }

    const signout=()=>{
        navigate("/login")
        sessionStorage.clear()
    }

    const OtherPro = (dp) => {
        if (dp === "1") {
            return user1
        } else if (dp === "2") {
            return user2
        } else if (dp === "3") {
            return user3
        } else if (dp === "4") {
            return user4
        } else if (dp === "5") {
            return user5
        } else if (dp === "6") {
            return user6
        } else if (dp === "7") {
            return user7
        } else if (dp === "8") {
            return user8
        }
    }
    const chat=()=>{
        navigate("/chatmain")
    }

    return (
        <div className="flex flex-row">
            <div className="w-48 bg-[#1E1F22] h-screen flex flex-col-reverse p-1">
                <div className="h-[4rem] flex items-center text-white" onClick={chat}>
                    <CiChat1 size={"30px"}/><div className="ml-2"> Community/chat</div>
                </div>
                <div className="h-full flex flex-col">
                <div className="text-white flex flex-col justify-center py-8 px-8">
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <ul>
                        <li className="mb-2">
                            <button href="#" className="civil hover:text-gray-300" onClick={() => handleCategoryClick("Civil")}>
                                Civil
                            </button>
                        </li>
                        <li className="mb-2">
                            <button href="#" className="software hover:text-gray-300" onClick={() => handleCategoryClick("Software")}>
                                Software
                            </button>
                        </li>
                        <li className="mb-2">
                            <button href="#" className="Mechanical hover:text-gray-300" onClick={() => handleCategoryClick("Mechanical")}>
                                Mechanical
                            </button>
                        </li>
                        <li className="mb-2">
                            <button href="#" className="Mechanical hover:text-gray-300" onClick={() => handleCategoryClick("Electrical")}>
                                Electircal
                            </button>
                        </li>
                    </ul>
                </div>
                {selectedCategory && (
                    <button onClick={clearFilter} className="text-white hover:text-gray-300">Clear Filter</button>
                )}
                <div className=" p-3 flex flex-col justify-center text-sm">
                    <label className="text-white">
                        Ranges: 
                    </label>
                    <Box sx={{ width: 130 }}>
                        <Slider
                            getAriaLabel={() => 'price range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            max={10000}
                            step={step}
                        />
                    </Box>
                </div>
                </div>
            </div>

            <div className="flex flex-col w-screen h-screen ">
            <div className=" flex flex-row h-20 p-4 w-full bg-[#ffffff]">
           <img src={logo}>
            </img> 
            <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-l w-full focus:outline-none"
            onChange={handleSearchInputChange} value={searchQuery}                />
            <div className=" flex flex-row w-[10rem] p-1"> 
                   
                <div className="w-1/2">
                    <button className="profile flex bg-black ml-5 rounded-full text-white w-9 h-9 justify-center items-center" onClick={profile}>
                        <img src={OtherPro(dp)}></img>
                    </button>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <button className=" bg-black flex rounded-full  text-white w-9 h-9 justify-center items-center" onClick={Cart}><FaCartShopping /></button>
                </div>
                {prof && (
                    <div
                    className="flex flex-col z-10 absolute w-[16rem] h-[16rem] bg-slate-100"
                    style={{ top: `${position.y+20}px`, left: `${position.x-180}px` }}
                    >
                        <div className=" flex flex-col h-[50%] shadow-xl">
                            <div className="flex h-3/5 bg-white justify-center items-center ">
                                <div className="h-14 w-14 rounded-full  "><img className="rounded-full" src={OtherPro(dp)}></img> </div>
                            </div>
                            <div className="flex flex-col h-2/5 bg-white ">
                                <div className="w-full" >{name}</div>
                                <div className="w-full">{email}</div>
                            </div>
                        </div>
                        <div className="flex flex-col h-3/5 rounded-lg p-1 gap-y-1">
                            <button className="h-1/2 bg-white shadow-xl" onClick={sett}>setting</button>
                            <button className="h-1/3 bg-white shadow-xl" onClick={signout}> sign-out</button>
                        </div>
                    </div>
                )}
                </div>
            </div>

                <div className="h-full w-full p-3 bg-[#2E2F32] overflow-y-auto">
                    
                    <div className="ml-4  overflow-y-auto flex flex-wrap">
                    {filteredProducts.map(item => (
                            <div className="h-[25rem] w-[17rem] m-4 pb-1 bg-[#ffffff] rounded-lg hover:shadow-xl border border-gray-500 shadow-sm relative flex flex-col" onClick={() => gotop(item._id)}>
                                <div className="h-[17rem] w-full bg-slate-950 rounded-lg">
                                    <div className="h-full w-full">
                                        <img src={imga(item.productName)} className="w-full h-full rounded-md" alt="product"></img> 
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <div>Name: {item.productName} </div>
                                    <div className="text-sm">Price: {item.productPrice}</div>
                                    <div className="text-sm">Category: {item.productCat}</div>
                                    <div className="text-xs">Description: {item.productDesc}</div>
                                </div>
                                <div className=" mt-1 flex flex-row-reverse ">
                                    <button className="bg-green-400 w-fit mr-1 rounded-md px-4 p-2">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default MainE;