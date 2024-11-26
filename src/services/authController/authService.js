import axiosInstance from "../axiosInstance";

// Signup function (unchanged)
export const signup = async (userData) => {
  const response = await axiosInstance.post("/Auth/signup", userData);
  return response.data;
};

export const login = async (userName, password) => {
  try {
    const response = await axiosInstance.post("/Auth/login", {
      userName,
      password,
    });

    console.log("Login successful✅:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Login error💥:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("Login error💥: No response from server", error.request);
    } else {
      console.error("Login error💥:", error.message);
    }
    throw error;
  }
};
