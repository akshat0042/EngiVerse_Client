import { useState,useEffect } from "react";
import axios from "axios";
import Sidebar from '../others/Sidebar';

const Productshow = ()=>{
    const baseURL = "http://localhost:5000/";
    const token = sessionStorage.getItem("token");
    const authAxios = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const [data, setData] = useState([]);
    let res;

    const getAll = async () => {
        try {
            res = await authAxios.get("user/YEEETTT");
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);
    
    const products = [
        {
            pName: 'Product 1',
            pPrice: '$100',
            pImage: 'product1.jpg',
            pDesc: 'Description for Product 1',
            pCat: 'Category 1'
        },
        {
            pName: 'Product 2',
            pPrice: '$150',
            pImage: 'product2.jpg',
            pDesc: 'Description for Product 2',
            pCat: 'Category 2'
        },
        {
            pName: 'Product 1',
            pPrice: '$100',
            pImage: 'product1.jpg',
            pDesc: 'Description for Product 1',
            pCat: 'Category 1'
        },
        {
            pName: 'Product 2',
            pPrice: '$150',
            pImage: 'product2.jpg',
            pDesc: 'Description for Product 2',
            pCat: 'Category 2'
        },
        {
            pName: 'Product 1',
            pPrice: '$100',
            pImage: 'product1.jpg',
            pDesc: 'Description for Product 1',
            pCat: 'Category 1'
        },
        {
            pName: 'Product 2',
            pPrice: '$150',
            pImage: 'product2.jpg',
            pDesc: 'Description for Product 2',
            pCat: 'Category 2'
        },
        // Add more products as needed
    ];

    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['Category 1', 'Category 2'];

    const handleSelectCategory = (category) => {
        // If the clicked category is already selected, reset the selected category
        if (category === selectedCategory) {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.pCat === selectedCategory)
        : products;

        const [searchTerm, setSearchTerm] = useState('');

        // Filter products based on search term
        const filteredProductsBySearch = products.filter(product =>
            product.pName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        
    return(
        <>
            <div className="flex flex-wrap m-4">
            <Sidebar categories={categories} onSelectCategory={handleSelectCategory} />
            <div className="w-1/4 p-4 flex flex-wrap">
            <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredProductsBySearch.map((product, index) => (
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8" key={index}>
                    <div className="bg-red-100 p-6 rounded-lg shadow-md">
                    <img src={product.pImage} alt={product.pName} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-lg font-semibold mb-2">{product.pName}</h2>
                        <p className="text-gray-700 mb-2">Price: {product.pPrice}</p>
                        <p className="text-gray-700 mb-2">Description: {product.pDesc}</p>
                        <p className="text-gray-700 mb-4">Category: {product.pCat}</p>
                        
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
            </div>
            </div>
        </>
    )
}

export default Productshow