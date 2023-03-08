import React, { useRef, useEffect } from 'react';
import { useState } from 'react';


interface EmergencyInvestmentDropDownMenuProps {
    title: string;
    data: any[];
}

const EmergencyInvestmentDropDownMenu: React.FC<EmergencyInvestmentDropDownMenuProps> = ({ title, data}) => {
    const [selectedItem, setSelectedItem] = useState("");
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    };
    
    return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={selectedItem}
          onChange={handleSelect}
        >
          <option value="">Select an item</option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.293 7.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 9.414l-7.293 7.293a1 1 0 01-1.414-1.414l7-7a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {selectedItem && (
        <table className="w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item.id === selectedItem)
              .map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
    );
};

export default EmergencyInvestmentDropDownMenu;