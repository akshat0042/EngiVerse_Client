import { useState,useEffect } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const ProductAdd = ()=>{
    const navigate =useNavigate()
    const [data,setData]=useState({
        pName:'',
        pPrice:'',
        pDesc:'',
        pquant:'',
        pCat:''
    })

    let res
    const [productName, setProductName] = useState(""); 
    const [priceError, setPriceError] = useState("");
    const [descerror, setDescError] = useState("");
    const [catagotyError, setCatagotyError] = useState("");

    const ecom = async()=>{
        console.log(data)

        try{
            res =await axios.post("http://localhost:5000/admin/product",data).then(()=>{
            window.location.reload(false)
            console.log(data)
            if(res.status===200){
                console.log("helo")
            }
        })
        }
        catch(e){
            console.log(e)
        }
    }

    const Validate = async(event)=>{
        event.preventDefault()
        
        // if (data.pName === "") {
        //     setProductName("First name is required");
        //     return; 
        // } 
        // else {
        //     setProductName(""); 
            
        // }

        // if (data.pPrice === "") {
        //     setPriceError("user name is required");
        //     return; 
        // } 
        // else {
        //     setPriceError(""); 
            
        // }
        // if (data.pDesc === "") {
        //     setDescError("date of birth is required");
        //     return; 
        // } 
        // else {
        //     setDescError("");
             
        // }

        // if (data.pCat === "") {
        //     setCatagotyError("gender is required");
        //     return; 
        // } 
        // else {
            // setCatagotyError(""); 
            console.log(data)
           
        // }
        console.log("haha")
        ecom()
    }


    return(
        <>
        <div className="h-screen w-screen flex items-center">
            <div className="flex flex-col mx-auto w-[50rem] p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">ADD PRODUCT</h1>
                <form onSubmit={Validate}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="productName" className="block mb-1">Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                className="w-full border rounded-md py-2 px-3"
                                value={data.pName}
                                onChange={(event) => setData({ ...data, pName: event.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="productPrice" className="block mb-1">Product Price</label>
                            <input
                                type="text"
                                id="productPrice"
                                className="w-full border rounded-md py-2 px-3"
                                value={data.pPrice}
                                onChange={(event) => setData({ ...data, pPrice: event.target.value })}
                            />
                        </div>
                        {/* Add similar structures for other input fields */}
                        <div>
                            <label htmlFor="productDesc" className="block mb-1">Product Description</label>
                            <textarea
                                id="productDesc"
                                className="w-full border rounded-md py-2 px-3"
                                value={data.pDesc}
                                onChange={(event) => setData({ ...data, pDesc: event.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="productQuantity" className="block mb-1">Product Quantity</label>
                            <input
                                type="text"
                                id="productQuantity"
                                className="w-full border rounded-md py-2 px-3"
                                value={data.pquant}
                                onChange={(event) => setData({ ...data, pquant: event.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="productCategory" className="block mb-1">Product Category</label>
                            <select
                                id="productCategory"
                                className="w-full border rounded-md py-2 px-3"
                                value={data.pCat}
                                onChange={(event) => setData({ ...data, pCat: event.target.value })}
                            >
                                <option value="0">Please select an option</option>
                                <option value="Mechanical">Mechanical Engineering</option>
                                <option value="ComputerScience">Computer Science</option>
                                <option value="Chemical">Chemical Engineering</option>
                                <option value="Biomedical">Biomedical Engineering</option>
                                <option value="Biomedical">Electircal Engineering</option>
                                <option value="Biomedical">Aerospace Engineering</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="productQuantity" className="block mb-1">Product Image</label>
                            <input
                                type="file"
                                id="productimage"
                                className="w-full border rounded-md py-2 px-3"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                        Add Product
                    </button>
                </form>
            </div>
            </div>
        </>
    )
}

export default ProductAdd