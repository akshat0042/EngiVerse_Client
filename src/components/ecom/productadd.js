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
        <div className="flex flex-col">

            <div className="h-16 text-2xl">
              ADD PRODUCT
            </div>
            <form>
              <table className="border border-table-3">
                <tr>
                  <th>hollo</th>
                  <th>input</th>
                </tr>
                
                <tr>
                  <td><lable>product Name</lable></td>
                  <td><input type="text" value={data.pName} onChange={(event)=>{
                      setData({...data,pName:event.target.value})
                  }}/></td>
                </tr>

                <tr>
                  <td><lable>product Price</lable></td>
                  <td><input type="text" value={data.pPrice} onChange={(event)=>{
                      setData({...data,pPrice:event.target.value})
                  }}/></td>
                </tr>

                <tr>
                  <td><lable>product image</lable></td>
                  <td><input type="file" accept="image/*"></input></td>
                  <br/>
                </tr>

                <tr>
                  <td><lable>Product description</lable></td>
                  <td><textarea type="text" value={data.pDesc} onChange={(event)=>{
                      setData({...data,pDesc:event.target.value})
                  }}/></td>
                </tr>

                <tr>
                  <td> <lable>Product Quantity</lable></td>
                  <td>  <input type="text" value={data.pquanttity} onChange={(event)=>{
                      setData({...data,pquant:event.target.value})
                  }}/></td>
                </tr>

                <tr>
                  <td><lable>product catagory</lable></td>
                  <td><select name="cars" id="cars" value={data.pCat} onChange={(event)=>{
                      setData({...data,pCat:event.target.value})
                  }}>
                      <option value="0" >please select an option</option>
                      <option value="Mechanical" >Mechenical Engineering</option>
                      <option value="ComputerScience" >Computer Science</option>
                      <option value="Chemical" >Chemical Engineering</option>
                      <option value="Biomedical" >Biomedical Engineering</option>
                  </select></td>
                  </tr>
                  <tr> 
                  <td colSpan={2}> <button onClick={Validate}>post</button></td>
                  </tr>
                </table>
            </form>
        </div>
        </>
    )
}

export default ProductAdd