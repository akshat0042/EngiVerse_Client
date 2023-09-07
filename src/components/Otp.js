import { useState } from "react";
import axios from "axios" //helps in communicating with server

const Otp=()=>{
    const [data,setData] = useState({
        phone:''
    })

    const [verify,setVerify] = useState({
        phone:sessionStorage.getItem("num"),
        otp:""
    })

    const [click,setClick] = useState(true)

    const OTPP = async(event)=>{
        event.preventDefault()
        await axios.post("http://localhost:5000/user/otp",data).then(()=>{ //comunicate with url
            // window.location.reload(false) //stops page from auto reloading
            console.log(data)
        })
        sessionStorage.setItem("num",data.phone)
        console.log(data)
        setClick(false)
    }

    const ver = async(event)=>{
        event.preventDefault()
        // console.log(verify)
        await axios.post("http://localhost:5000/user/verify",verify).then(()=>{ //comunicate with url
            // window.location.reload(false) //stops page from auto reloading
            console.log(verify)
        })
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