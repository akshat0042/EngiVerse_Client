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
    const [phoneError, setPhoneError] = useState("");
    const [isFocused, setIsFocused] = useState(false);


    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };


    const OTPP = async(event)=>{
        event.preventDefault()
        if (/^\d{10}$/.test(data.phone)) {
            setPhoneError("");
          } else {
            setPhoneError("Phone number must be exactly 10 digits.");
            return;
          }
        await axios.post("http://localhost:5000/user/otp",data).then(()=>{ //comunicate with url
            // window.location.reload(false) //stops page from auto reloading
            console.log(data)
        })
        setVerify({...verify, phone:data.phone})
        // console.log(data)
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
        await axios.post("http://localhost:5000/user/verify",verify).then(()=>{ //comunicate with url
            // window.location.reload(false) //stops page from auto reloading
            console.log(verify)
        })
    }
    return(
        <>
            <form>
                <label>Number : </label>
                <input type="text" className={"border-2"} value={data.phone} onChange={(event)=>{
                    setData({...data,phone:event.target.value})
                }}></input>
                <div style={{ color: "red" }}>{phoneError}</div>
                {click?(<div></div>):(<div>
                    <label>Otp : </label>
                    <input type="text" className={"border-2"} value={verify.otp} onChange={(event)=>{
                        setVerify({...verify,otp:event.target.value})
                    }} ></input>
                    <button className={"border-2"} onClick={ver}>verify otp</button>
                </div>)}
                {click?(<div><button className={"border-2"} onClick={OTPP}>Send OTP</button></div>):(<div></div>)}
            </form>
        </>
    )
}

export default Otp;