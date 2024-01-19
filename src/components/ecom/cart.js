import image from '../images/qwer.png'
import { MdDelete } from "react-icons/md";
import Side from './searchbar'
import React, { useState } from "react";

const Cart = () =>{
    const [quantity, setQuantity] = useState(1);


    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
    return(
        <div className="flex flex-col h-screen w-screen">
         <div> <Side/></div>   
        <div className="flex flex-row justify-center items-center h-full w-full">
            <div className="flex flex-none bg-white shadow-xl ring-1 ring-slate-900/5 rounded-2xl z-10 left overflow-contain overflow-y-auto h-[30rem] w-1/2 rounded-tr-none rounded-br-none text-center text-lg p-7">

                <div className="flex flex-col">
    
                <div className="flex items-center mb-4">
              <img src={image} alt="Product Image" className="w-16 h-16 mr-4 rounded-full"/>
              <div className="px-12 text-left">
                <h2 className="text-lg font-semibold">Mjolnir</h2>
                <p className="text-sm text-gray-500">Product Subheading</p>
              </div>
              <div className="flex items-center mr-4 px-6">
                <button onClick={handleDecrease} className="less bg-blue-500 text-white px-2 py-1 rounded">-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={handleIncrease} className="more bg-blue-500 text-white px-2 py-1 rounded">+</button>
              </div>
              <div>
                <p className="text-lg font-semibold">$20</p>
              </div>
              <div className="ml-11 mt-2">
                <button><MdDelete /></button>
              </div>
            </div>
   
                </div>

            </div>

            <div className="flex flex-shrink-0 bg-white shadow-xl ring-1 ring-slate-900/5 rounded-2xl left h-[30rem] w-72 rounded-tl-none rounded-bl-none text-center text-lg p-7">
               
                    <div className="flex flex-col">

                        <div className="h-[80%]">
                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Name: Dhruvil Kanziya</h2>
                                
                            </div>

                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Email: xyz@gmail.com</h2>
                                
                            </div>

                            <div className="mb-4 text-left">
                                <h2 className="text-sm font-semibold mb-2">Phone: 9909545562</h2>
                                
                            </div>
                            
                            <div className="mb-4 text-left text-sm">
                                <h2 className="text-sm font-semibold mb-2">Address</h2>
                                <textarea type="textarea" placeholder="Enter your address" className="w-full border p-2 rounded"/>
                            </div>
                        </div>
                        

                        

                        <div className="flex justify-center px-16">
                            <button className="bg-green-500 text-white px-2 py-2 rounded">Check Out</button>
                        </div>
                    </div>
                

            </div>

        </div>
        </div>
    )
}

export default Cart