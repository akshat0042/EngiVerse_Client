import {useNavigate} from "react-router-dom";
import { useState } from "react";

const Origin =()=>{
    const navigate =useNavigate()


  const toChat = () => {
    navigate('/logIn');
  };

  const toEcom = () => {
    navigate('/logInSkip');
  };

    return(
        <>
            <div className="h-screen flex">
                {/* Left Section */}
                <div className="w-1/2 bg-blue-500" onClick={toChat}>
                    {/* Content for the left section */}
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-green-500" onClick={toEcom}>
                    {/* Content for the right section */}
                </div>
    </div>
        </>
    )
}
export default Origin