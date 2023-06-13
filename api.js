import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};