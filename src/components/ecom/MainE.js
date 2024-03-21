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
import '../others/media.css';
import Searchbar from './searchbar'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";


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

return (
        <div className="flex flex-row">
            <div className="w-48 bg-[#1E1F22] h-screen flex flex-col p-1">
                
                <div className="h-16 w-full p-2">
                    {/* <img src={logo}></img> */}
                </div>
                
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
                    <label>
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

            <div className="flex flex-col w-screen h-screen ">
            <Searchbar/>
            <input type="text"  onChange={handleSearchInputChange} value={searchQuery}></input>

                <div className="h-full w-full p-3 bg-[#2E2F32] overflow-y-auto">
                    
                    <div className="ml-4  overflow-y-auto flex flex-wrap">
                    {filteredProducts.map(item => (
                            <div className="h-[25rem] w-[17rem] m-4 bg-[#e8e8e8] rounded-lg hover:shadow-xl border border-gray-500 shadow-sm relative flex flex-col" onClick={() => gotop(item._id)}>
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
                                    <button className="bg-[#7d7d7d] w-fit mr-1 rounded-md p-2">
                                        Check out
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

