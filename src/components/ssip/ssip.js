import React, { useEffect, useState } from 'react';
import Sidu from './Ssipsidebar';
import Nabu from './Ssipnavbar';
import { AiFillCaretUp, AiOutlineCaretDown, AiFillMessage } from 'react-icons/ai';
import axios from 'axios';

export const UserHomu = () => {
    const baseURL = 'http://localhost:5000/';
    const token = sessionStorage.getItem('token');
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Initialize filteredData as an array

    const getAll = async () => {
        try {
            const response = await authAxios.get('user/getAll');
            setData(response.data);
            setFilteredData(response.data); // Initialize filtered data with all data
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const countAllAnswers = (ansArray) => {
        let count = 0;

        const countAnswers = (array) => {
            array.forEach((item) => {
                if (item.ANS) {
                    count += item.ANS.length;
                    countAnswers(item.ANS); // Recursively count nested answers
                }
            });
        };

        if (ansArray) {
            countAnswers(ansArray);
        }

        return count;
    };

    const handleFilter = (category) => {
      const filteredData = data.filter(item => item.Classified === category);
      setFilteredData(filteredData);
  };

    const formatTime = (time) => {
        const currentDate = new Date();
        const responseDate = new Date(time);

        const timeDifference = currentDate.getTime() - responseDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        if (minutesDifference < 60) {
            return `${minutesDifference}m ago`;
        } else {
            const hoursDifference = Math.floor(minutesDifference / 60);
            if (hoursDifference < 24) {
                return `${hoursDifference}h ago`;
            } else {
                const daysDifference = Math.floor(hoursDifference / 24);
                return `${daysDifference}d ago`;
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-searchbarup flex">
                <Sidu />
                <div className="flex-grow p-4">
                <Nabu onDataUpdate={setData} onFilter={handleFilter} />
                    <div className="flex flex-wrap">
                        {filteredData ? (
                            filteredData.map((item) => (
                                <div key={item._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                    <div className="bg-white border border-gray-300 rounded-md overflow-hidden mb-4">
                                        <div className="p-4">
                                            <h1 className="text-2xl font-bold mb-2">{item.query}</h1>
                                            <div className="flex mb-2 items-start mt-4">
                                                <label className="text-sm text-gray-500">{item.Classified} | {formatTime(item.createdAt)}</label>
                                            </div>
                                            <br/><br/>
                                            <div className='flex flex-row py-1 justify-center'>
                                                <div className="flex flex-col mb-2 mr-4">
                                                    <button> {<AiFillCaretUp size="28"/>}</button>
                                                    <div className='w-7 items-center'>
                                                        <label>01</label>
                                                    </div>
                                                    <button> {<AiOutlineCaretDown size="28"/>}</button>
                                                </div>
                                                <div className='mt-10'>
                                                    <button>{<AiFillMessage size="28"/>}</button>
                                                    <label>{countAllAnswers(item.Ans)}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHomu;