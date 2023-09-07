import { useState } from "react";
import axios from "axios"

const Login = ()=>{
    const [data,setData] = useState({
        Username:'',
        Password:''
    })

    const Loggin = async()=>{
        await axios.post("http://localhost:5000/user/Login",data).then(()=>{
            window.location.reload(false)
            console.log(data)
        })
    }

    return(
        <>
            <form>
                <lable>Username</lable>
                <input type="text" value={data.Username} onChange={(event)=>{
                    setData({...data,Username:event.target.value})
                }}/>
                <label>Password</label>
                <input type="text" value={data.Password} onChange={(event)=>{
                    setData({...data,Password:event.target.value})
                }}/>
                <label>Not a User?</label><button>Sign-up</button>
                <button onClick={Loggin}>Login</button>
            </form>
        </>
    )
}

export default Login