import { useState } from "react";
<<<<<<< HEAD
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
    
=======
import axios from "axios"

const Signup = ()=>{
    const [data,setData] = useState({
        Name:'',
        Username:'',
        Email:'',
        Phone:'',
        Password:''
    })

>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
    const [rePass,setRePass] = useState({
        repass:""
    })

<<<<<<< HEAD
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
      
=======
    const [passMatch,setPassMatch]=useState(true) //initially password does not match

    const Loggin = async()=>{
        await axios.post("http://localhost:5000/user/Signup",data).then(()=>{
            window.location.reload(false)
            console.log(data)
        })
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
    }

    const ValidatePass = async(event)=>{
        event.preventDefault()
<<<<<<< HEAD
        const currentYear = new Date().getDate();
        
        // year=currentYear-year
        // console.log(year)
        setData({...data,phone:sessionStorage.getItem("phone")})
        console.log(data)
        Loggin()
        if(rePass.repass===data.password){
            console.log("YEEETTTTTTTTTTTTT")
            setPassMatch(true)
            
=======
        if(rePass.repass===data.Password){
            console.log("YEEETTTTTTTTTTTTT")
            setPassMatch(true)
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
        }
        else{
            setPassMatch(false)
        }
<<<<<<< HEAD

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
=======
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
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53

                <label>Re-enter Password</label>
                <input type="password" name="repass" value={rePass.repass} onChange={(event)=>{
                    setRePass({...rePass,repass:event.target.value})
<<<<<<< HEAD
                }}/><br/>

=======
                }}/>
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
                {passMatch?(<div></div>):(<div>not match</div>)}
                <button onClick={ValidatePass}>Signup</button>
            </form>
        </>
    )
}

export default Signup