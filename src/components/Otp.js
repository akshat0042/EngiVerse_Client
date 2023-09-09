import { useState } from "react";
import axios from "axios" //helps in communicating with server
import {useNavigate} from "react-router-dom";


const Otp=()=>{
    const navigate = useNavigate()
    const [data,setData] = useState({
        phone:""
    })

    const [verify,setVerify] = useState({
        phone:"",
        otp:""
    })

    let res

    const [click,setClick] = useState(true)

    const OTPP = async(event)=>{
        event.preventDefault()
        await axios.post("http://localhost:5000/user/otp",data).then(()=>{ //comunicate with url
            // window.location.reload(false) //stops page from auto reloading
            console.log(data)
        })
        setVerify({...verify, phone:data.phone})
        console.log(data)
        setClick(false)
    }

    const ver = async(event)=>{
        event.preventDefault()
        // console.log(verify)
        try{
            res= await axios.post("http://localhost:5000/user/verify",verify) 
            if(res.status === 200){
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("phone",data.phone)
                navigate("/signup")
                // console.log("yeeee") REMOVE
            }
        }
        catch(e){

        }
    }
    return(
        <>
            <form>
                <label>Number : </label>
                <input type="text" value={data.phone} onChange={(event)=>{
                    setData({...data,phone:event.target.value})
                }}></input>
                {click?(<div></div>):(<div>
                    <label>Otp : </label>
                    <input type="text"value={verify.otp} onChange={(event)=>{
                        setVerify({...verify,otp:event.target.value})
                    }} ></input>
                    <button onClick={ver}>verify otp</button>
                </div>)}
                {click?(<div><button onClick={OTPP}>Send OTP</button></div>):(<div></div>)}
            </form>
        </>
    )
}

export default Otp;