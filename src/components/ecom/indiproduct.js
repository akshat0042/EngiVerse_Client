import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import Side from './searchbar';
import { useNavigate } from "react-router-dom";
import rod from "../images/rod.jpg"
import Screws from "../images/screws.webp"
import Thermal from "../images/thermal2.webp"
import Arduino from "../images/ardiuno.webp"
import Driller from "../images/driller.webp"
import wires from "../images/wires.webp"
import pipews from "../images/pipes.webp"
import grills from "../images/grill.webp"
import rod2 from "../images/rod2.jpg"
import Screws2 from "../images/screws2.jpg"
import Thermal2 from "../images/thermal.jpg"
import Arduino2 from "../images/ardiuno2.jpg"
import Driller2 from "../images/driller2.jpg"
import wires2 from "../images/wires2.jpg"
import pipews2 from "../images/pipes2.jpg"
import grills2 from "../images/grill.webp"

const Chatmain = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInStock, setIsInStock] = useState(true);
    const [prod, setProd] = useState([]);
    const [indiProd, setIndiProd] = useState([]);
    const [images, setImages] = useState([]);
    const [id,setid]=useState({
        id:sessionStorage.getItem("id")
    })
//    const id=sessionStorage.getItem("id")
    // console.log(id)
    const [data,setData] = useState({
        pName:"",
        pCount:""
    })
    const imgMap = {
        "Driller": Driller,
        "Screws": Screws,
        "Arduino Uno": Arduino,
        "Thermal Paste": Thermal,
        "wires": wires,
        "rod": rod,
        "pipews": pipews,
        "grills": grills
    };

    // const images = {
    //     "Driller": [Driller,Driller2],
    //     "Screws": [Screws,Screws2],
    //     "Arduino Uno": [Arduino,Arduino2],
    //     "Thermal Paste": [Thermal,Thermal2],
    //     "wires": [wires,wires2],
    //     "rod": [rod,rod2],
    //     "pipews": [pipews,pipews2],
    //     "grills": [grills,grills2]
    // };

    const token = sessionStorage.getItem("token");
    const baseURL = "http://localhost:5000";
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    const req = async () => {
        try {
            const res = await authAxios.post("/admin/productShow");
            setProd(res.data.data);
        } catch (e) {

        }
    };

    const prodinfo=async()=>{
        try{
            console.log(id)
            const res = await authAxios.post("/admin/productDesc",id)
            console.log(res.data.temp)
            setIndiProd(res.data.temp)

        }catch(e){

        }
    }
//    console.log(indiProd)
    useEffect(() => {
        req();
        prodinfo()
    }, [])

    useEffect(() => {
        prodimg()
    }, [indiProd])

//    useEffect(() => {
//        prodimg().then(data=>console.log(data))
//    }, [images])

    const gotop = (id) => {
        sessionStorage.setItem("id", id);
        navigate("/indip");
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    const handleAddToCart = async() => {
        setData({...data,pName:indiProd._id,pCount:quantity})
        
        try{
            console.log(data)
            let res=await authAxios.post("/user/addToCart",data)
            sessionStorage.setItem("CartId",res.data.cart._id)
        }catch(e){
            console.log(e)
        }
    }


    const handleAddToWishlist = () => {
        console.log("Adding to Wishlist");
    };

    const prodimg = () => {
        if (indiProd && indiProd.productName) {
            if (indiProd.productName === "Driller") {
                setImages([Driller, Driller2]);
            }else if(indiProd.productName === "pipews"){
                setImages([pipews, pipews2]);
            } else if(indiProd.productName === "rod"){
                setImages([rod, rod2]);
            } else if(indiProd.productName === "wires"){
                setImages([wires, wires2]);
            } else if(indiProd.productName === "grills"){
                setImages([grills, grills2]);
            } else if(indiProd.productName === "Arduino Uno"){
                setImages([Arduino, Arduino2]);
            } else if(indiProd.productName === "Screws"){
                setImages([Screws, Screws2]);
            } else if(indiProd.productName === "Thermal Paste"){
                setImages([Thermal, Thermal2]);
            } 
            else {
                setImages([""]);
            }
        }
    };

    // console.log(images)

    return (
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-8">
            <Side />
            <hr className="w-full lg:w-0 lg:border-gray-300 my-8 lg:my-0 lg:mx-8" />
            <div className="flex flex-col items-center">
                <div className="relative w-full h-96 mb-4">
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}>
                        <FaCaretLeft />
                    </button>
                    <img
                        src={images[currentImageIndex]}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                    />
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}>
                        <FaCaretRight />
                    </button>
                </div>
                <div className="flex justify-center items-center mb-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className={`w-16 h-12 object-cover mx-2 cursor-pointer ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-[97%] bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-4">{indiProd.productName}</h2>
                <h3 className="text-gray-500 text-lg mb-2">₹{indiProd.productPrice}</h3>
                <h3 className="text-gray-500 text-lg mb-2">{indiProd.productCat}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    {indiProd.productDesc}
                </p>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500 text-xl">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <span className="text-gray-700 ml-2">5 stars</span>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 border rounded p-2"
                    />
                </div>
                {isInStock ? (
                    <div className="mb-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600 transition duration-300"
                        >
                            Add to Cart
                        </button>

                    </div>
                ) : (
                    <p className ="text-red-500">Out of Stock</p>
                    )}
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-wrap justify-center items-center">
                        {prod
                            .filter(item => item.productCat === indiProd.productCat) // Filter products by category
                            .map(item => (
                                <div key={item._id} className="h-[28rem] w-[17rem] m-4 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={() => gotop(item._id)}>
                                    <img src={imgMap[item.productName]} alt={item.productName} className="h-[19rem] w-full object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                                        <p className="text-sm text-gray-600">${item.productPrice}</p>
                                        <p className="text-sm text-gray-600">{item.productCat}</p>
                                        <p className="text-xs text-gray-500">{item.productDesc}</p>
                                        <div className="mt-2 flex justify-end">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-300">Add to Cart</button>
                                            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    </div>
                    );
                    }
                    export default Chatmain;
