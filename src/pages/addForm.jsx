import React, { useState, useEffect } from "react";
import axios from "axios";

function AddForm({ onSubmit, onCancel }) {
    const [match, setMatch] = useState("");
    const [field, setField] = useState("");
    const [type, setType] = useState("");
    const [level, setLevel] = useState("");
    const [category, setCategory] = useState("");
    const [movement, setMovement] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/data/dropDown')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRule = { match, field, type, level, category, movement };

        axios.post('http://localhost:3000/addData', newRule)
            .then(response => {
                console.log(response);
                // Update the UI or perform any other actions on success
            })
            .catch(error => console.log(error));

    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Add New Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="match">
                            Match
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 w-full"
                            type="text"
                            id="match"
                            name="match"
                            value={match}
                            onChange={(event) => setMatch(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="field">
                            Field
                        </label>
                        <select
                            className="border rounded-lg py-2 px-3 w-full"
                            id="field"
                            name="field"
                            value={field}
                            onChange={(event) => setField(event.target.value)}
                        >
                            <option value="">-- Select Field --</option>
                            {options.fields.map((item, index) => (
                                <option key={index} value={item ? item.name : null}>{item ? item.name : null}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 w-full"
                            type="text"
                            id="type"
                            name="type"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="level">
                            Level
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 w-full"
                            type="text"
                            id="level"
                            name="level"
                            value={level}
                            onChange={(event) => setLevel(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 w-full"
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="movement">
                            Movement
                        </label>
                        <input
                            className="border rounded-lg py-2 px-3 w-full"
                            type="text"
                            id="movement"
                            name="movement"
                            value={movement}
                            onChange={(event) => setMovement(event.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddForm;
