import React, { useState } from 'react';
import axios from 'axios';

const Nabu = ({ onFilter }) => {
    const baseURL = 'http://localhost:5000/';
    const token = sessionStorage.getItem('token');
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


    const filterSearch = async (query) => {
      try {
          const res = await authAxios.get(`/user/filterQuery/${query}`);
          // Filter data based on item.query
          const filteredData = res.data.filter(item => item.query.toLowerCase().includes(query.toLowerCase()));
          onDataUpdate(filteredData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  
    const handleFilterClick = (category, e) => {
      e.preventDefault();
      sessionStorage.setItem("filter", category);
      onFilter(category); // Call the onFilter prop with the selected category
  };


    return (
        <nav className="bg-searchbardown">
            <div className="bg-searchbarup">
                <div className="flex justify-center p-5">
                    <input
                        type="text"
                        className="bg-white text-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-3/4 appearance-none leading-normal"
                        placeholder="Search"
                        onChange={(e) => filterSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="ml-10 flex items-baseline space-x-3">
                            <button
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={() => handleFilterClick('crime')}
                            >
                                CRIME
                            </button>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={(e) => handleFilterClick('civil', e)}
                            >
                                CIVIL
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={(e) => handleFilterClick('matrimonial', e)}
                            >
                                MATRIMONIAL
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nabu;