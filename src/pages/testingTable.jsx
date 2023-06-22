import React, { useState, useEffect } from "react";
import axios from "axios";
import EditForm from "./EditForm";
import { fetchDataTable } from "./apiTestingTable";
import AddForm from "./addForm";
import '@fortawesome/fontawesome-free/css/all.min.css';




function TestingTable() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [filteredDropdownData, setFilteredDropdownData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/data/dropDown')
      .then(response => {
        setDropdownData(response.data[0]);
        setFilteredDropdownData(response.data[0]);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataTable();
      setData(result);
    };

    fetchData();
  }, []);

  const handleAdd = (newData) => {
    setData((prevData) => [...prevData, newData]);
    setIsAdding(false);
  };

  function handleDropdownSearch(searchValue) {
    const filteredData = dropdownData.fields.filter(fields => fields.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredDropdownData(filteredData);
  }




  const handleChange = (formData) => {
    const btsid = formData.btsid;
    axios
      .put(`http://localhost:3000/data/${btsid}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">API Data Table</h1>
      <div>
        <div>
          <input type="text" placeholder="Search" onChange={(event) => handleDropdownSearch(event.target.value)} />
          <select>
            {filteredDropdownData.fields?.map(fields => (
              <option key={fields.btsId} value={fields.name}>{fields.name}</option>
            ))}
          </select>
        </div>
        {isAdding ? (
          <AddForm handleAdd={handleAdd} setIsAdding={setIsAdding} />
        ) : (
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
            onClick={() => setIsAdding(true)}
          >
            <i className="fas fa-plus"></i>
          </button>
        )}
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Software Engineer</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">johndoe@example.com</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Designer</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Inactive
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">janesmith@example.com</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="my-button" onclick="myFunction()">
                <i class="fa-regular fa-pen-to-square"></i> 
              </button>
              {/* fa-regular fa-pen-to-square */}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      </div>
      {
        editItem && (
          <EditForm item={editItem} onSubmit={handleChange} onCancel={handleCancel} />
        )
      }
    </div >
  );
}
export default TestingTable;
