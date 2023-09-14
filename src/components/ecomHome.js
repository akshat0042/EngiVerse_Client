import React from 'react';
import { useState } from "react";
import Sidebar from './Sidebar';
import Footer from "./Footer";

function EcomHome() {

    return (
        <>
        {/* <div class="flex">
            <div class="flex space-x-1">
                <input
                    type="text"
                    class="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button class="px-4 text-white bg-purple-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            <div class="flex space-x-1 pl-12">
                <button class="px-4 text-white bg-purple-600 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div> */}
    <div className="bg-blue-100 py-4 px-4 flex justify-between items-center">
      <button className="bg-green-500 text-white py-2 px-4 rounded-md">Left Button</button>
      <h1 className="text-white text-2xl font-semibold">Your Title</h1>
      <button className="bg-red-500 text-white py-2 px-4 rounded-md">Right Button</button>
    </div>
            <div class="container mx-auto mt-12">
                <div class="grid grid-cols-1 gap-6 mb-30 lg:grid-cols-1">
                    <div class="w-full px-10 py-5 bg-white rounded-lg shadow">
                        <div class="text-3xl font-semibold  text-gray-900 truncate">
                            about us
                        </div>
                    </div>
                    <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div class="text-3xl font-semibold text-gray-900 truncate">
                            what is engiverse
                        </div>
                    </div>
                    
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default EcomHome;
