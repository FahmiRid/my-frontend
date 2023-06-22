export const fetchDataTable = async () => {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    return data; // wrap the data inside an array
  };