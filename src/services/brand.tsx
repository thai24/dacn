import instance from "../config/axios";

export const getAllBrand = async () => {
  try {
    const response = await instance.get("/brand");
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};
