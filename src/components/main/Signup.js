import { useState } from "react";
import axios, { Axios } from "axios";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png"
import Random from "../images/random.jpg"
import Otp from './Otp'

const Signup = ()=>{
    const navigate =useNavigate()
    const [data,setData] = useState({
        fName:'',
        lName:'',
        userName:'',
        phone:sessionStorage.getItem("phone"),
        password:'',
        gender:'',
        dob:'',
        mail:'',
        e1:''
    })

    let res
    
    const [rePass,setRePass] = useState({
        repass:""
    })

    const [passMatch,setPassMatch]=useState(true)
    const [firstNameError, setFirstNameError] = useState(""); 
    const [lastNameError, setlastNameError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [dobError, setdobError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [passError, setPassError] = useState("");
    const [ageError, setAgeError] = useState("");
    
    const aurthAxios=axios.create({
        baseURL:"http://localhost:5000/",
        headers:{
            Authorization:`bearer ${sessionStorage.getItem('token')}`
        }
    })

   

    const Loggin = async(event)=>{
        event.preventDefault()
        console.log(data)
        console.log(sessionStorage.getItem("phone"))
        
        try{
            res = await aurthAxios.post("http://localhost:5000/user/signUp",data)
            // window.location.reload(false)
            console.log(data)
            console.log(res)
            if(res.status===200){
                navigate("/login")
            }
        }
        catch(e){
            console.log(e)
        }
      
    }

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        console.log(age)
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1;
        }
        
        return age;
      };

    const Validate = async(event)=>{
        // event.preventDefault()
 
        

        // if (data.fName === "") {
        //     setFirstNameError("First name is required");
        //     return; 
        // } 
        // else {
        //     setFirstNameError(""); 
        // }

        // if (data.lName === "") {
        //     setlastNameError("last name is required");
        //     return; 
        // } 
        // else {
        //     setlastNameError(""); 
        // }
        // if (data.userName === "") {
        //     setUserNameError("user name is required");
        //     return; 
        // } 
        // else {
        //     setUserNameError(""); 
        // }
        // if (data.dob === "") {
        //     setdobError("date of birth is required");
        //     return; 
        // } 
        // else {
        //     setdobError(""); 
        // }

        // const age = calculateAge(data.dob);
        // if (age < 18) {
        //     setAgeError("You must be at least 18 years old to sign up.");
        //     return;
        // } 
        // else {
        //     setAgeError("");
        // }

        // if (data.gender === "") {
        //     setGenderError("gender is required");
        //     return; 
        // } 
        // else {
        //     setGenderError(""); 
        // }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;
        // if (!passwordRegex.test(data.password)) {
        //   setPassError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        //   return;
        // } else {
        //   setPassError("");
        // }


        // if(rePass.repass===data.password){
        //     console.log("YEEETTTTTTTTTTTTT")
        //     setPassMatch(true)
        // }
        // else{
        //     setPassMatch(false)
        //     return
        // }

         Loggin()
    }


    return(
        <>
            <div className="w-full h-screen items-start">
                {/* <div className="z-100">
                    <Otp/>
                </div> */}
                <div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md fit rounded-xl"}>
                    <div className={"p-8 rounded-lg relative z-10"}>
                        <Otp/>
                    </div>
                 </div>

                <div className="absolute right-4">
                        <img src={logo} alt="Logo" className="w-50 h-50" />
                </div>

                <div className=' absolute top-[12%] rounded-lg left-[10%] transition-transform duration-500 h-[75%] w-[40%] backdrop-blur-md'>
                    <div className="flex flex-col h-full">
                        <div className='text-4xl  font-momcake mt-4'>
                            Sign-Up
                        </div>
                        <div className=" flex-col h-full  mt-3">
                            <div className=" flex flex-row h-[5rem] ">
                                <div className=" w-1/2 text-left  pl-2">
                                    Firstname
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.fName}  onChange={(event)=>{
                                        setData({...data,fName:event.target.value})
                                    }}/>
                                    <span style={{ color: "red" }}>{firstNameError}</span>
                                </div>
                                <div className=" w-1/2 text-left  pl-2">
                                Lastname
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.lName} onChange={(event)=>{
                                        setData({...data,lName:event.target.value})
                                    }}/>
                                    <span style={{ color: "red" }}>{lastNameError}</span>
                                </div>
                            </div>
                            
                            <div className=" flex flex-row h-[5rem] ">
                                <div className=" w-1/2 text-left  pl-2">
                                    User-Name
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.userName} onChange={(event)=>{
                                        setData({...data,userName:event.target.value})
                                    }}/>
                                    <span style={{ color: "red" }}>{userNameError}</span>
                                </div>
                                <div className=" w-1/2 text-left  pl-2">
                                    Date of birth
                                    <input type="date" className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.dob} onChange={(event)=>{
                                        setData({...data,dob:event.target.value})
                                    }}></input>
                                    <span style={{ color: "red" }}>{dobError}</span>
                                    <span style={{ color: "red" }}>{ageError}</span>
                                </div>
                            </div>

                            <div className=" flex flex-row h-[5rem] ">
                                <div className=" w-1/2 text-left  pl-2">
                                    Password
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.password} onChange={(event)=>{
                                        setData({...data,password:event.target.value})
                                    }}/>
                                    <span style={{ color: "red" }}>{passError}</span>
                                </div>
                                <div className=" w-1/2 text-left  pl-2">
                                    Re-enter Password
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={rePass.repass} onChange={(event)=>{
                                        setRePass({...rePass,repass:event.target.value})
                                    }}/>
                                    {passMatch?(<div></div>):(<div>not match</div>)}
                                </div>
                            </div>

                            <div className=" flex flex-row h-[5rem] ">
                                <div className=" w-2/5 text-left  pl-2">
                                    phone<br/>
                                    <input className="mt-1 p-2 w-5/6 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.phone} onChange={(event)=>{
                                        setData({...data,phone:event.target.value})
                                    }}></input>
                                </div>
                                <div className=" w-3/5 text-left  pl-2">
                                    E-mail<br/>
                                    <input className="mt-1 p-2 w-[86%] border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.mail} onChange={(event)=>{
                                        setData({...data,mail:event.target.value})
                                    }}></input>
                                </div>
                            </div>
                            <div className=" flex flex-row h-[5rem] ">
                                <div className=" w-2/5 text-left  pl-2">
                                    gender<br/>
                                    <input type="radio" name="gender" value="male" onChange={(event)=>{
                                        setData({...data,gender:event.target.value})
                                    }}/>male
                                    <input type="radio" name="gender" className="ml-2" value="female" onChange={(event)=>{
                                        setData({...data,gender:event.target.value})
                                    }}/>female <br/>
                                    <input type="radio" name="gender" value="other" onChange={(event)=>{
                                        setData({...data,gender:event.target.value})
                                    }}></input>others
                                    <span style={{ color: "red" }}>{genderError}</span>
                                </div>
                                <div className=" w-3/5 text-left pl-2">
                                    specialisation<br/>
                                    <select className=" w-5/6 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={data.e1} onChange={(event)=>{
                                        setData({...data,e1:event.target.value})
                                    }} >
                                        <option value="0" >please select an option</option>
                                        <option value="Mechanical" >Mechenical Engineering</option>
                                        <option value="ComputerScience" >Computer Science</option>
                                        <option value="Chemical" >Chemical Engineering</option>
                                        <option value="Biomedical" >Biomedical Engineering</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full h-[5rem]">
                            <button className="bg-gray-500 mt-3 text-white p-3 w-1/5 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300" onClick={Loggin}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={Random} className='w-full h-full'/>
                </div>
                 
        </>
    )
}

export default Signup