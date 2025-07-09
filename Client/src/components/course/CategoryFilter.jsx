// src/components/course/CategoryFilter.jsx
import React from "react";
import { FaCheck } from "react-icons/fa"; // optional tick mark

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md sticky top-24 min-h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Filter by Category</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onSelect("All")}
            className={`flex justify-between items-center text-left w-full px-4 py-2 rounded ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === "All" && <FaCheck className="text-white text-xs" />}
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`flex justify-between items-center text-left w-full px-4 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <FaCheck className="text-white text-xs" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
