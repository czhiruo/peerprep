import axios from "axios";

const BASE_URL = process.env.REACT_APP_USER_SERVICE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Logs in a user with the provided email and password
// Stores the access token in localStorage and returns it.
const userLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.data.accessToken;

    localStorage.setItem('accessToken', token);
    return token;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Login failed");
  }
}

const getToken = () => {
  return localStorage.getItem('accessToken');
}

const verifyToken = async (token) => {
  try {
    const response = await api.get('/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.message === 'Token verified';
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Token verification failed");
  }
}

const isUserAdmin = async (token) => {
  try {
    const response = await api.get('/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data.isAdmin;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : "Token verification failed");
  }
}

const createUser = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/users', {
      username,
      email,
      password,
    });
    return response.data; // 201 Created
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // 200 OK
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // 200 OK
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.patch(`http://localhost:3001/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // 200 OK
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

const updateUserPrivilege = async (userId, isAdmin) => {
  try {
    const response = await axios.patch(`http://localhost:3001/users/${userId}`, { isAdmin }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data; // 200 OK
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // 200 OK
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export { userLogin, createUser, getUser, getAllUsers, getToken, isUserAdmin, updateUser, updateUserPrivilege, deleteUser, verifyToken };