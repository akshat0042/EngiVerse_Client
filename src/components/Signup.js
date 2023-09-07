import { useState } from "react";
import axios from "axios"

const Signup = ()=>{
    const [data,setData] = useState({
        Name:'',
        Username:'',
        Email:'',
        Phone:'',
        Password:''
    })

    const [rePass,setRePass] = useState({
        repass:""
    })

    const [passMatch,setPassMatch]=useState(true) //initially password does not match

    const Loggin = async()=>{
        await axios.post("http://localhost:5000/user/Signup",data).then(()=>{
            window.location.reload(false)
            console.log(data)
        })
    }

    const ValidatePass = async(event)=>{
        event.preventDefault()
        if(rePass.repass===data.Password){
            console.log("YEEETTTTTTTTTTTTT")
            setPassMatch(true)
        }
        else{
            setPassMatch(false)
        }
    }

    return(
        <>
            <form>
                <lable>Name</lable>
                <input type="text" name="name" value={data.Name} onChange={(event)=>{
                    setData({...data,Name:event.target.value})
                }}/>
                
                <lable>Username</lable>
                <input type="text" name="username" value={data.Username} onChange={(event)=>{
                    setData({...data,Username:event.target.value})
                }}/>

                <lable>Email</lable>
                <input type="email" name="Email" placeholder="xyz@email.com" value={data.Email} onChange={(event)=>{
                    setData({...data,Email:event.target.value})
                }}/>
                
                <lable>Phone</lable>
                <input type="number" name="phone" value={data.Phone} onChange={(event)=>{
                    setData({...data,Phone:event.target.value})
                }}/>

                <label>Password</label>
                <input type="password" name="password" value={data.Password} onChange={(event)=>{
                    setData({...data,Password:event.target.value})
                }}/>

                <label>Re-enter Password</label>
                <input type="password" name="repass" value={rePass.repass} onChange={(event)=>{
                    setRePass({...rePass,repass:event.target.value})
                }}/>
                {passMatch?(<div></div>):(<div>not match</div>)}
                <button onClick={ValidatePass}>Signup</button>
            </form>
        </>
    )
}

export default Signup