import React, { useState, useEffect } from "react";
import axios from "axios";
import EditForm from "./EditForm";



function TestingTable() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  const handleUpdate = (updatedItem) => {
    axios
      .put(`http://localhost:3000/data/${editItem.btsid}`, updatedItem)
      .then(() => {
        // Update the data state with the updated item
        setData((prevData) =>
          prevData.map((item) =>
            item.btsid === editItem.btsid ? { ...item, ...updatedItem } : item
          )
        );
        // Close the edit form
        setEditItem(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">API Data Table</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-2 border-gray-300">
            <th className="px-4 py-2">Match</th>
            <th className="px-4 py-2">Field</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Movement</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.match}>
              <td className="px-4 py-2">{item.match}</td>
              <td className="px-4 py-2">{item.field}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">{item.level}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.movement}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editItem && (
        <EditForm item={editItem} onSubmit={handleUpdate} onCancel={handleCancel} />
      )}
    </div>
  );
}
export default TestingTable;
