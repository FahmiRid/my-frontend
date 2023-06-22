export const fetchEditTable = async () => {
    const response = await fetch(`http://localhost:3000/data/${editItem.btsid}`);
    const data = await response.json();
    return data; // wrap the data inside an array
  };