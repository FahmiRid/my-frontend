import { useState } from "react";
import axios from "axios";

function EditForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    match: item.match,
    field: item.field,
    type: item.type,
    level: item.level,
    category: item.category,
    movement: item.movement,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="match"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Match
                  </label>
                  <input
                    type="text"
                    name="match"
                    id="match"
                    value={formData.match}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Field
                  </label>
                  <input
                    type="text"
                    name="field"
                    id="field"
                    value={formData.field}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Level
                  </label>
                  <input
                    type="text"
                    name="level"
                    id="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                    />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="movement"
                className="block text-sm font-medium text-gray-700"
              >
                Movement
              </label>
              <input
                type="text"
                name="movement"
                id="movement"
                value={formData.movement}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
  }

  export default EditForm;
