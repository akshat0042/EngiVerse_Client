import image from '../images/qwer.png'
import { MdDelete } from "react-icons/md";
import Side from './searchbar'
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import rod from "../images/rod.jpg"
import Screws from "../images/screws.webp"
import Thermal from "../images/thermal2.webp"
import Arduino from "../images/ardiuno.webp"
import Driller from "../images/driller.webp"
import wires from "../images/wires.webp"
import piews from "../images/pipes.webp"
import grills from "../images/grill.webp"

const Cart = () =>{

  const token = sessionStorage.getItem("token");
    const baseURL = "http://localhost:5000";
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const navigate =useNavigate()
    const [quantity, setQuantity] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);
    const [uCart,setUCart] = useState([])
    const [data,setData] = useState({
        Name:"",
        Email:"",

    })
    const [itemsBoughtVisible, setItemsBoughtVisible] = useState(false);
    const id=sessionStorage.getItem("CartId")
    const handleCheckout = () => {
      setItemsBoughtVisible(true);
    };

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };

    useEffect(() => {
      req();
    }, [])

    const req=async()=>{
      try{
        let res=await authAxios.post("/user/viewCart",id)
        console.log(res.data.data.product)
          setUCart(res.data.data.product)

      }catch(e){

      }
    }

    // console.log(uCart)
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleDelete = () => {
        console.log("haha")
      };
    
      const ecom=()=>{
        navigate("/ecom")
      }

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

    return(
        <div className="flex flex-col h-screen w-screen">
         <div> <Side/></div>   
        <div className="flex flex-row justify-center items-center h-full w-full">
            <div className="flex flex-none bg-white shadow-xl ring-1 ring-slate-900/5 rounded-2xl z-10 left overflow-contain overflow-y-auto h-[30rem] w-1/2 rounded-tr-none rounded-br-none text-center text-lg p-7">

                <div className="flex flex-col">
                    {uCart?(<>
                        {uCart.map((data)=>(
                    <div className="flex items-center mb-4">
                        <img src={imga(data.pName.productName)} alt="Product Image" className="w-16 h-16 mr-4 rounded-full"/>
                    <div className="px-1 text-left">
                        <h2 className="text-lg font-semibold">{data.pName.productName}</h2>
                        <p className="text-sm text-gray-500">{data.pName.productCat}</p>
                    </div>
                    <div className="flex items-center mr-4 px-2">
                      {/* <button onClick={handleDecrease} className="less bg-blue-500 text-white px-2 py-1 rounded">-</button> */}
                      <span className="mx-2">{data.pCount}</span>
                      {/* <button onClick={handleIncrease} className="more bg-blue-500 text-white px-2 py-1 rounded">+</button> */}
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{data.pName.productPrice}*{data.pCount}</p>
                    </div>
                    <div className="delete ml-11 mt-2">
                      <button onClick={handleDelete}><MdDelete /></button>
                    </div>
                    <div className='h-full ml-2 flex items-center w-[8rem]'>
                        Total: <div className="total ml-2">{parseFloat(data.pName.productPrice) * parseInt(data.pCount)}</div>
                    </div>
                  </div>
                ))}
                    </>):(<></>)}

                </div>
            </div>
            <div className="flex flex-shrink-0 bg-white shadow-xl ring-1 ring-slate-900/5 rounded-2xl left h-[30rem] w-72 rounded-tl-none rounded-bl-none text-center text-lg p-7">
               
                    <div className="flex flex-col">

                        <div className="h-[80%]">
                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Name: {sessionStorage.getItem("Uname")}</h2>
                            </div>
                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Email: {sessionStorage.getItem("Email")}</h2>
                            </div>
                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Phone: 9998992227</h2>
                            </div>
                            <div className="mb-4 text-left text-sm">
                                <h2 className="text-sm font-semibold mb-2">Address</h2>
                                <textarea type="textarea" placeholder="Enter your address" className="w-full border p-2 rounded h-44"/>
                            </div>
                        </div>
                        <div className="flex justify-center px-16">
                            <button className="bg-green-500 text-white px-2 py-2 rounded" onClick={handleCheckout}>Check Out</button>
                        </div>
                        {itemsBoughtVisible && (
                          <div className="mt-2">Items Bought</div>
                        )}
                    </div>
            </div>
          <div className=' fixed top-[5.4rem] right-[2rem] rounded-full h-[3rem] w-[3rem] bg bg-black text-white' onClick={ecom}>
          <div className='ml-[.7rem] mt-[.7rem]'><CgWebsite size={"25px"}/></div>
          </div>
        </div>
        </div>
    )
}

export default Cart