import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
// references to variables inside .env files in react must start with REACT_APP_

const api = axios.create({
  baseURL: baseUrl,
});

const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const addData = async (url, dataToBeAdded) => {
  try {
    const response = await api.post(url, dataToBeAdded);
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

const updateData = async (url, updatedData) => {
  try {
    const response = await api.patch(url, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export { getData, updateData, deleteData, addData };
