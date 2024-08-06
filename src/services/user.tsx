import instance from "../config/axios";

export const getAllUsers = async () => {
  try {
    const response = await instance.get("/users");
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};