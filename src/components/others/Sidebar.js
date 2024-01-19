import React from 'react';

const Sidebar = ({ categories, onSelectCategory }) => {
    return (
        <div className="w-1/4 p-4">
            <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="cursor-pointer mb-2" onClick={() => onSelectCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
