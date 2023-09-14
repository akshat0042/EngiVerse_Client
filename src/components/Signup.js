import { useState } from "react";
import axios, { Axios } from "axios";
import {useNavigate} from "react-router-dom";

const Signup = ()=>{
    const navigate =useNavigate()
    const [data,setData] = useState({
        fName:'',
        lName:'',
        userName:'',
        phone:sessionStorage.getItem("phone"),
        password:'',
        gender:'',
        dob:''
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
            res = await aurthAxios.post("http://localhost:5000/user/Signup",data)
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
            <form>
                <lable>First Name</lable>
                <input type="text" name="name" value={data.fName} onChange={(event)=>{
                    setData({...data,fName:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{firstNameError}</span>
                <br/>  

                <lable>Last Name</lable>
                <input type="text" name="name" value={data.lName} onChange={(event)=>{
                    setData({...data,lName:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{lastNameError}</span>
                <br/>
                
                <lable>Username</lable>
                <input type="text" name="username" value={data.userName} onChange={(event)=>{
                    setData({...data,userName:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{userNameError}</span>
                <br/>
                
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
                }}></input>
                <span style={{ color: "red" }}>{genderError}</span>
                
                <br/>
                
                <label>Date of Birth</label>
                <input type="date" name="DOB" value={data.dob} onChange={(event)=>{
                    setData({...data,dob:event.target.value})
                }}></input>
                <span style={{ color: "red" }}>{dobError}</span>
                <span style={{ color: "red" }}>{ageError}</span>
                
                <br/>

                <label>Password</label>
                <input type="password" name="password" value={data.password} onChange={(event)=>{
                    setData({...data,password:event.target.value})
                }}/>
                <span style={{ color: "red" }}>{passError}</span>
                <br/>

                <label>Re-enter Password</label>
                <input type="password" name="repass" value={rePass.repass} onChange={(event)=>{
                    setRePass({...rePass,repass:event.target.value})
                }}/><br/>

                {passMatch?(<div></div>):(<div>not match</div>)}
                <button onClick={Loggin}>Signup</button>
            </form>
        </>
    )
}

export default Signup