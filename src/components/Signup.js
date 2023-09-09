import { useState } from "react";
import axios, { Axios } from "axios";
import {useNavigate} from "react-router-dom";
// import {ReCAPTCHA} from "react-google-recaptcha";


const Signup = ()=>{
    const navigate =useNavigate()
    const [data,setData] = useState({
        fName:'',
        lName:'',
        userName:'',
        phone:'',
        password:'',
        gender:'',
        dob:''
    })

    let res
    
    const [rePass,setRePass] = useState({
        repass:""
    })

    const [passMatch,setPassMatch]=useState(true)
    const [valFName,setValFName]=useState(false)
    const [valLName,setValLName]=useState(false)
    const [valUName,setValUName]=useState(false)

    const [valdob,setValdob]=useState(false) //initially password does not match
    // const [hCaptcha,sethCaptcha]=useState(false)

    const aurthAxios=axios.create({
        baseURL:"http://localhost:5000/",
        headers:{
            Authorization:`bearer ${sessionStorage.getItem('token')}`
        }
    })

    const Loggin = async()=>{
        // event.preventDefault()
        
        try{
            res =await aurthAxios.post("http://localhost:5000/user/Signup",data).then(()=>{
            window.location.reload(false)
            console.log(data)
            if(res.status===200){
                navigate("/login")
            
            }
        })
        }
        catch(e){
            console.log(e)
        }
      
    }

    const ValidatePass = async(event)=>{
        event.preventDefault()
        const currentYear = new Date().getDate();
        
        // year=currentYear-year
        // console.log(year)
        setData({...data,phone:sessionStorage.getItem("phone")})
        console.log(data)
        Loggin()
        if(rePass.repass===data.password){
            console.log("YEEETTTTTTTTTTTTT")
            setPassMatch(true)
            
        }
        else{
            setPassMatch(false)
        }

        if(data.fName===""){
            setValFName(true)
        }
        else{
            setValFName(false)
        }

        if(data.lName===""){
            setValLName(true)
        }
        else{
            setValLName(false)
        }

        if(data.userName===""){
            setValUName(true)
        }
        else{
            setValUName(false)
        }
        if(data.dob===""){
            setValdob(true)
        }
        else{
            setValdob(false)
        }
    }

    // const ValidateHuman = async(event)=>{
    //     event.preventDefault()
    //     alert("please enter the captcha")
    //     if(hCaptcha===false){
    //         alert("please enter the captcha")
    //     }
    //     else{
    //         alert("verification succesfull")
    //     }
    // }

    return(
        <>
            <form>
                <lable>First Name</lable>
                <input type="text" name="name" value={data.fName} onChange={(event)=>{
                    setData({...data,fName:event.target.value})
                }}/><br/>  
                {valFName?(<div>enter a Firstname</div>):(<div></div>)}

                <lable>Last Name</lable>
                <input type="text" name="name" value={data.lName} onChange={(event)=>{
                    setData({...data,lName:event.target.value})
                }}/><br/>
                {valLName?(<div>enter a Lastname</div>):(<div></div>)}
                
                <lable>Username</lable>
                <input type="text" name="username" value={data.userName} onChange={(event)=>{
                    setData({...data,userName:event.target.value})
                }}/><br/>
                {valUName?(<div>enter a Valid username</div>):(<div></div>)}
                
                <label>gender :</label>
                <label>male</label>
                <input type="radio" name="gender" value="male" onChange={(event)=>{
                    setData({...data,gender:event.target.value})
                }}></input>
                <label>female</label>
                <input type="radio" name="gender" value="female" onChange={(event)=>{
                    setData({...data,gender:event.target.value})
                }}></input>
                <label>rather not say</label>
                <input type="radio" name="gender" value="Rather not say" onChange={(event)=>{
                    setData({...data,gender:event.target.value})
                }}></input><br/>
                
                <label>Date of Birth</label>
                <input type="date" name="DOB" value={data.dob} onChange={(event)=>{
                    setData({...data,dob:event.target.value})
                }}></input><br/>
                {valdob?(<div>enter a valid date</div>):(<div></div>)}

                <label>Password</label>
                <input type="password" name="password" value={data.password} onChange={(event)=>{
                    setData({...data,password:event.target.value})
                }}/><br/>

                <label>Re-enter Password</label>
                <input type="password" name="repass" value={rePass.repass} onChange={(event)=>{
                    setRePass({...rePass,repass:event.target.value})
                }}/><br/>

                {passMatch?(<div></div>):(<div>not match</div>)}
                <button onClick={ValidatePass}>Signup</button>
            </form>
        </>
    )
}

export default Signup