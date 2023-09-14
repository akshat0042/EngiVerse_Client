import { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const Login = ()=>{
    const navigate =useNavigate()
    const [data,setData] = useState({
        userName:'',        
        password:''
    })

    const [userNameError, setUserNameError] = useState("");
    const [passError, setPassError] = useState("");
    const [skip,setSkip] = useState(false)
    let res
    var logskip=window.location.href
    
    console.log(logskip)

    if(logskip==="http://localhost:5000/logInSkip"){
        setSkip(true)
    }

    const Loggin = async(event)=>{
        event.preventDefault()
        
        if (data.userName === "") {
            setUserNameError("user name is required");
            return; 
        } 
        else {
            setUserNameError(""); 
        }
        if (data.password === "") {
            setPassError("Password is required");
            return; 
        } 
        else {
            setPassError(""); 
        }
        try{
            res = await axios.post("http://localhost:5000/user/Login",data)
                // window.location.reload(false)
                console.log(data)
                console.log(res)
                if(res.status===200){
                    console.log("happy")
                    navigate("/")
                }
        }
        catch(e){

        }
        
    }

    const signUUp = ()=>{
        navigate("/signup")
    }

    const skipp = ()=>{
        navigate("/ecomhome")
    }

    return(
        <>
            <form>
                <lable>Username</lable>
                <input type="text" value={data.userName} onChange={(event)=>{
                    setData({...data,userName:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{userNameError}</span>
                <br/>
                <label>Password</label>
                <input type="password" value={data.password} onChange={(event)=>{
                    setData({...data,password:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{passError}</span>
                <br/>
                <button onClick={Loggin}>Login</button><br/>
                <label>Not a User?</label><button onClick={signUUp}>Sign-up</button>
                {skip?(<div>
                    <label>Skip</label><button onClick={skipp}>Sign-up</button>
                </div>):(<div></div>)}
            </form>
        </>
    )
}

export default Login    