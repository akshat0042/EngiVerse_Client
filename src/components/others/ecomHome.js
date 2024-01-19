import React from 'react';
import Footer from "./Footer";
import Head from './headerecom';

function EcomHome() {
    const yet=(event)=>{
        event.preventDefault()
        // console.log(SearchBar.data.Search)
    }
    return (
        <>
            <Head/>
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
