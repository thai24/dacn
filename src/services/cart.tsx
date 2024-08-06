import instance from "../config/axios";

export const getAllCart = async () => {
  try {
    const response = await instance.get("/cart");
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};