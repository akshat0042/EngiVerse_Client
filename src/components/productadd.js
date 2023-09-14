import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const ProductAdd = ()=>{
    const navigate =useNavigate()
    const [data,setData]=useState({
        pName:'',
        pPrice:'',
        pImage:'',
        pDesc:'',
        pCat:''
    })

    let res
    const [productName, setProductName] = useState(""); 
    const [priceError, setPriceError] = useState("");
    const [descerror, setDescError] = useState("");
    const [ratingError, setRatingError] = useState("");
    const [catagotyError, setCatagotyError] = useState("");
   
    const ecom = async(event)=>{
        event.preventDefault()
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

        // if (data.pName === "") {
        //     setPriceError("last name is required");
        //     return; 
        // } 
        // else {
        //     setPriceError(""); 
        // }
        // if (data.pPrice === "") {
        //     setDescError("user name is required");
        //     return; 
        // } 
        // else {
        //     setDescError(""); 
        // }
        // if (data.pDesc === "") {
        //     setRatingError("date of birth is required");
        //     return; 
        // } 
        // else {
        //     setRatingError(""); 
        // }

        // if (data.pCat === "") {
        //     setCatagotyError("gender is required");
        //     return; 
        // } 
        // else {
        //     setCatagotyError(""); 
        // }

        ecom()
    }


    return(
        <>
            <form>
                <lable>product Name</lable>
                <input type="text" value={data.pName} onChange={(event)=>{
                    setData({...data,pName:event.target.value})
                }}/><br/>
                
                <lable>product Price</lable>
                <input type="text" value={data.pPrice} onChange={(event)=>{
                    setData({...data,pPrice:event.target.value})
                }}/><br/>

                <lable>product image</lable>
                <input type="file" value={data.pImage} onChange={(event)=>{
                    setData({...data,pImage:event.target.value})
                }}/><br/>

                <lable>Product description</lable>
                <textarea type="text" value={data.pDesc} onChange={(event)=>{
                    setData({...data,pDesc:event.target.value})
                }}/><br/>

                <lable>product catagoty</lable>
                <select name="cars" id="cars">
                    <option value="Mechenical">Mechenical Engineering</option>
                    <option value="CS">Computer Science</option>
                    <option value="Chemical">Chemical Engineering</option>
                    <option value="Bio">Biomedical Engineering</option>
                </select><br/>
                <button onClick={ecom}>post</button>
            </form>
        </>
    )
}

export default ProductAdd