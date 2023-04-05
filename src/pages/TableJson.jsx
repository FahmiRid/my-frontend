import React, { useState } from "react";
import jsonData from './jsonData.json';
import EditForm from './EditForm';

function TableJson() {
  const [data, setData] = useState(jsonData.filter(item => {
    return (
      item.hasOwnProperty("match") &&
      item.hasOwnProperty("field") &&
      item.hasOwnProperty("type") &&
      item.hasOwnProperty("level") &&
      item.hasOwnProperty("category") &&
      item.hasOwnProperty("movement")
    );
  }));
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditFormOpen(true);
  };

  const handleUpdate = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.btsid === editItem.btsid ? { ...item, ...updatedItem } : item
      )
    );
    setEditItem(null);
    setIsEditFormOpen(false);
  };

  const handleDelete = (item) => {
    setData((prevData) => prevData.filter((dataItem) => dataItem !== item));
  };

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return (
        (item.field && item.field.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.level && item.level.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.movement && item.movement.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setData(filteredData);
  };

  const handleReset = () => {
    setSearchTerm('');
    setData(jsonData.filter(item => {
      return (
        item.hasOwnProperty("match") &&
        item.hasOwnProperty("field") &&
        item.hasOwnProperty("type") &&
        item.hasOwnProperty("level") &&
        item.hasOwnProperty("category") &&
        item.hasOwnProperty("movement")
      );
    }));
  };

  return (
    <div className="w-full">
      <div className="flex mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <table className="table-auto w-full border border-gray-400">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Match</th>
            <th className="px-4 py-2 text-left">Field</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Level</th>
            <th className="px-4 py-2 text-left">Category</th>
        <th className="px-4 py-2 text-left">Movement</th>
        <th className="px-4 py-2 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.btsid} className="hover:bg-gray-200">
          <td className="border px-4 py-2">{item.match}</td>
          <td className="border px-4 py-2">{item.field}</td>
          <td className="border px-4 py-2">{item.type}</td>
          <td className="border px-4 py-2">{item.level}</td>
          <td className="border px-4 py-2">{item.category}</td>
          <td className="border px-4 py-2">{item.movement}</td>
          <td className="border px-4 py-2 text-right">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={() => handleEditClick(item)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {isEditFormOpen && (
    <EditForm item={editItem} onUpdate={handleUpdate} onCancel={() => setIsEditFormOpen(false)} />
  )}
</div>
);
}

export default TableJson;