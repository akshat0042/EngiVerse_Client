import React, { useState, useEffect } from "react"; 
import axios from "axios"
import { MdNavigateNext } from "react-icons/md";
import image1 from "../images/loginbabla.svg"; // Import your images
import image2 from "../images/random.jpg";
import image3 from "../images/t.png";
import image4 from "../images/back.jpeg";
import image5 from "../images/qwer.png";
import image6 from "../images/rgsdfgsdfg.jpg";
import '../others/media.css';
import Side from './searchbar'

const MainE = () => {
  
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

    

const slideshowImages = [image1, image2, image3, image4, image5, image6];

// State for slideshow
const [currentSlide, setCurrentSlide] = useState(0);

// Function to handle slideshow animation


const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slideshowImages.length) % slideshowImages.length
    );
  };


return (
        <div className="flex flex-row">
            <div className="w-48 bg-slate-400 h-screen flex flex-col p-1">
                
                <div className="h-16 w-full p-2">
                    {/* <img src={logo}></img> */}
                </div>

                

                <div className="text-white flex flex-col justify-center py-8 px-8">
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-300">
                                Civil
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-300">
                                Software
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="hover:text-gray-300">
                                Mechanical
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center text-sm">
                    <label>
                        Ranges: 
                    </label>
                    
                        <select name="range">
                            <option value="100-200">100-200</option>
                            <option value="100-200">200-300</option>
                            <option value="100-200">400-600</option>
                            <option value="100-200">600-1000</option>
                        </select>
                </div>
            </div>

            <div className="flex flex-col w-screen h-screen bg-neutral-600">
            <Side/>

                <div className="h-full w-full p-3 bg-orange-300 overflow-y-auto">
                    <div className="flex flex-row slideshow h-[30rem]">
                        <button
                            className="top-[16rem] left-[13rem] w-[10%] bg-white p-2 rounded-full"
                            onClick={prevSlide}
                        >
                            Previous
                        </button>
                        <div className="w-[80%] flex flex-row justify-between">
                            {slideshowImages.slice(currentSlide, currentSlide + 2).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`slide-${currentSlide + index}`}
                                    className="w-[50%] h-full object-cover"
                                />
                            ))}
                        </div>
                        <button
                            className="bg-white top-[16rem] w-[10%] right-[2rem] p-2 rounded-full"
                            onClick={nextSlide}
                        >
                            <MdNavigateNext />
                        </button>
                    </div>
                    <div className="ml-4 mt-24 grid grid-cols-4 gap-4 md:grid-cols-2">
                        {prod.map((item)=>(
                            <div className="h-[27rem] w-[17rem] m-2 bg-lime-500 rounded-lg border border-gray-500 shadow-xl relative flex flex-col">
                                <div className="h-[17rem] w-full bg-slate-950 rounded-lg">
                                    <div className="h-fit w-fit">
                                        {/* <img src={mjolnir}></img> */}
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <div>Name: {item.productName} </div>
                                    <div className="text-sm">Price: {item.productPrice}</div>
                                    <div className="text-sm">Catagory: {item.productCat}</div>
                                    <div className="text-xs">Description: {item.productDesc}</div>
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

