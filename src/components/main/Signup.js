import { useState } from "react";
import axios, { Axios } from "axios";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png"
import back from "../images/hehe.png"
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
    const [mod, setMod] = useState(true);
    const [page, setPage] = useState(true);
    const [ottp, setOttp] = useState(true);
    
    const aurthAxios=axios.create({
        baseURL:"http://localhost:5000/",
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem('token')}`
        }
    })

   

    const signuup = async(event)=>{
        event.preventDefault()
        console.log(data)
        console.log(sessionStorage.getItem("phone"))
        
        try{
            res = await aurthAxios.post("user/signUp",data)
            // window.location.reload(false)
            console.log(data)
            console.log(res)
            console.log("balls")
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

         signuup()
    }
    const signUUp = ()=>{
        navigate("/login")
    }
    const changeP = ()=>{
        setPage(!page)
    }

    return(
        <>
            <div className="w-full h-screen items-start">
                 {/* {mod?<div className={"fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md fit rounded-xl"}>
                    <div className={"p-8 rounded-lg relative z-10"}>
                        <Otp/>
                    </div>
                 </div>:<></>}   */}

                <div className="absolute right-4">
                        <img src={logo} alt="Logo" className="w-50 h-50" />
                </div>

                <div className=' absolute top-[15%] shadow-xl rounded-lg left-[10%] transition-transform duration-500 h-[68%] w-[40%] backdrop-blur-md'>
                    <div className="flex flex-col h-full">
                        <div className='text-4xl  font-momcake mt-4'>
                            Sign-Up
                        </div>
                        <div className="h-full w-full p-10">
                            {page?(<>
                                <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Firstname</label>
                                <input type="text" class="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Max" value={data.fName}  onChange={(event)=>{
                                    setData({...data,fName:event.target.value})
                                }}/>
                                <label for="input-group-1" class="block mb-2 mt-5 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Lastname</label>
                                <input type="text" class="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Verstappen" value={data.lName} onChange={(event)=>{
                                    setData({...data,lName:event.target.value})
                                }}/>
                                <label for="input-group-1" class="block mb-2 mt-5 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Username</label>
                                <input type="text" class="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MaxVers" value={data.userName} onChange={(event)=>{
                                    setData({...data,userName:event.target.value})
                                }}/>
                                <div className="h-[3rem] mt-5 mr-3 flex flex-row-reverse items-center ">
                                    <button className="h-[2.8rem] w-[6.5rem] rounded-lg bg-[#7c7c7c]" onClick={changeP}>Next Page</button>
                                </div>
                                <div className="h-[2rem] mt-3 mr-3 flex items-center justify-center">
                                    <div className=" h-[.6rem] w-[.6rem] bg-[#ffffff] mr-1 rounded-full"> </div>
                                    <div className=" h-[.6rem] w-[.6rem] bg-[#b7b7b7] ml-1 rounded-full"> </div>
                                </div>
                                <div className="mt-[1rem]">
                                    <label className=" text-white">Already a User?</label><button className=" text-violet-500" onClick={signUUp}>login</button>
                            </div>
                            </>):(<>
                                <div className="flex flex-row">
                                    <div className="w-[50%]">
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Password</label>
                                        <input type="password" class="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********" value={data.password} onChange={(event)=>{
                                            setData({...data,password:event.target.value})
                                        }}/>
                                    </div>
                                    <div className="w-[50%]">
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Re-Enter Password</label>
                                        <input type="password" class="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********" value={rePass.repass} onChange={(event)=>{
                                            setRePass({...rePass,repass:event.target.value})
                                        }}/>
                                    </div>
                                </div>
                                <div className="flex flex-row mt-[0.8rem]">
                                    <div className="w-[50%]">
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Date of Birth</label>
                                        <input type="date" className="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={data.dob} onChange={(event)=>{
                                         setData({...data,dob:event.target.value})
                                     }}></input>
                                    </div>
                                    <div className="w-[50%]">
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Phone</label>
                                        <input className="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.phone} placeholder="9998****27" onChange={(event)=>{
                                         setData({...data,phone:event.target.value})
                                     }}></input>
                                    </div>
                                </div>
                                <div className="flex flex-row mt-[0.8rem]">
                                    <div className="w-[50%]">
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">E-mail</label>
                                        <input className="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={data.mail} onChange={(event)=>{
                                        setData({...data,mail:event.target.value})
                                    }}></input>
                                    </div>
                                    <div className="w-[50%] text-left">
                                        <label for="input-group-1" class="block mb-2  text-sm font-medium text-left text-gray-900 dark:text-gray-900">gender</label>
                                        <select className="bg-gray-50 border -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[90%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.gender} onChange={(event)=>{
                                            setData({...data,gender:event.target.value})
                                        }} >
                                         <option value="0" >please select an option</option>
                                         <option value="Male" >Male</option>
                                         <option value="Female" >Female</option>
                                         <option value="other" >Other</option>
                                         <option value="Pns" >Prefer not say</option>
                                     </select>
                                        
                                    </div>
                                </div>
                                <div className="flex flex-row mt-[0.8rem] ">
                                    <div className="w-[20%]"></div>
                                    <div className="w-[80%] ">
                                        <div className=" w-full text-center mb-2">
                                            <label for="input-group-1" className="mb-2 text-sm font-medium text-left text-gray-900 dark:text-gray-900">Specialisation</label>
                                        </div>
                                        <select className="bg-gray-50 border ml-[10%] -mt-2 border-gray-300 text-[#ffffff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] ps-3 p-2.5  dark:bg-[#2B2D31] dark:border-gray-500 dark:placeholder-gray-300 dark:text-[#ffffff] dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.e1} onChange={(event)=>{
                                            setData({...data,e1:event.target.value})
                                        }} >
                                         <option value="0" >please select an option</option>
                                         <option value="Mechanical" >Mechenical Engineering</option>
                                            <option value="Electircal" >Electircal Engineering</option>
                                         <option value="Software" >Computer Science</option>
                                         <option value="Environmental" >Chemical Engineering</option>
                                         <option value="Biomengineer" >Biomedical Engineering</option>
                                            <option value="Civil" >Civil Engineering</option>
                                            <option value="Robotics" >Robotics Engineering</option>
                                            <option value="Aerospace" >Aerospace Engineering</option>
                                     </select>
                                    </div>
                                    <div className="w-[20%]"></div>
                                </div>
                                <div className="h-[2rem] mt-3 mr-3 flex items-center justify-center">
                                    <div className=" h-[.6rem] w-[.6rem] bg-[#b7b7b7] mr-1 rounded-full"> </div>
                                    <div className=" h-[.6rem] w-[.6rem]  bg-[#ffffff] ml-1 rounded-full"> </div>
                                </div>
                                <div className="w-full h-[5rem] -mt-[3%] flex flex-row text-right">
                                    <button className="bg-[#9b9b9b] h-[3rem] mr-7 mt-3 text-white p-3 w-[12rem] rounded-md hover:bg-[#838383] " onClick={changeP}>Previous Page</button>
                                    <div className="w-full">
                                        <button className="bg-[#0da100] h-[3rem] mr-7 mt-3 text-white p-3 w-[8rem] rounded-md hover:bg-[#19bb19] " onClick={signuup}>Signup</button>
                                    </div>    
                                </div>
                            </>)}
                        </div>
                    </div>
                </div>
                <img src={back} className='w-full h-full'/>

                </div>
                 
        </>
    )
}

export default Signup
