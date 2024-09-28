import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL
});

export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addData = async (url, dataToBeAdded) => {
  try {
    const response = await api.post(url, dataToBeAdded);
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const updateData = async (url, updatedData) => {
  try {
    const response = await api.patch(url, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};