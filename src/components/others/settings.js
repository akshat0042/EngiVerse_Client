import React, { useState } from 'react';
import thor from '../images/qwer.png';
import { MdEdit } from "react-icons/md";

const Settings = () => {
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [isHoveredProfilePic, setIsHoveredProfilePic] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleEditClick = (field) => {
    switch (field) {
      case 'profilePic':
        setIsEditingProfilePic(!isEditingProfilePic);
        break;
      case 'all':
        setIsEditingUsername(!isEditingUsername);
        setIsEditingEmail(!isEditingEmail);
        setIsEditingAddress(!isEditingAddress);
        break;
      default:
        break;
    }
  };

  const final =()=>{
    setIsEditingUsername(false);
        setIsEditingEmail(false);
        setIsEditingAddress(false);
  }

  return (
    <>
    <div className="max-w-md mt-5 mx-auto bg-white p-6 rounded-md shadow-md">
        <div className='flex flex-row'>    
        <div className=' w-1/3'>
        
        </div>
            <div
            className="mb-4 w-1/3 relative group flex items-center justify-center"
            onMouseEnter={() => setIsHoveredProfilePic(true)}
            onMouseLeave={() => setIsHoveredProfilePic(false)}
            >
            <div className={`mb-2 ${isHoveredProfilePic ? 'opacity-75' : 'group-hover:opacity-75'} transition-opacity relative`}>
                <img
                src={thor}
                alt="Profile Picture"
                className="w-[7rem] h-[7rem] rounded-full relative"
                />
                {isHoveredProfilePic && (
                <div
                    onClick={() => handleEditClick('profilePic')}
                    className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-75 rounded-full flex items-center justify-center text-white cursor-pointer"
                >
                    <span><MdEdit /></span>
                </div>
                )}
            </div>
            </div>
            <div className=' flex flex-row w-1/3'>
            <div className='h-1/2 w-1/2'></div>
                
                <div className='h-1/2 w-1/2'>
                <div
                    onClick={() => handleEditClick('all')}
                    className=" ml-5 h-[2.5rem] w-[2.5rem] bg-black opacity-75 rounded-full flex items-center justify-center text-white cursor-pointer"
                >
                    <span  ><MdEdit /></span>
                </div>
                </div>
            </div>
        </div>

     
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        {isEditingUsername ? (
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 border rounded-md w-full"
          />
        ) : (
          <div><input type="email" id="username" name="username" disabled={true} className=" mt-1 p-2 border rounded-md w-full" /></div>
        )}
        
      </div>

     
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        {isEditingEmail ? (
          <input type="email" id="email" name="email" className="mt-1 p-2 border rounded-md w-full" />
        ) : (
          <div><input type="email" id="email" name="email" disabled={true} className=" mt-1 p-2 border rounded-md w-full" /></div>
        )}
        
      </div>

     
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-600">
          Change Address
        </label>
        {isEditingAddress ? (
          <textarea
            id="address"
            name="address"
            className="mt-1 p-2 border rounded-md w-full"
          ></textarea>
        ) : (
          <div><textarea
          id="address"
          name="address"
          disabled={true}
          className="mt-1 p-2 border rounded-md w-full"
        ></textarea></div>
        )}
        
      </div>

      
      <div className="mb-4">
        <a href="#" className="text-blue-500 hover:underline">
          Manage Wishlist
        </a>
      </div>

     
      <div className="flex justify-between mb-4">
        <button className="text-red-500 hover:underline">Delete Account</button>
        <button className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600">
          Log Out
        </button>
        <button onClick={final} className="bg-green-500 text-white px-2 py-2 rounded-md hover:bg-green-600">
          Save Changes
        </button>
      </div>
    </div>
    </>
  )
}

export default Settings;