import IProduct from "../common/types/Product";
import instance from "../config/axios";

export const getAllProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};

export const getOneProducts = async (id:IProduct) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};

export const createProduct= async (item:IProduct)=>{
  try {
    const response = await instance.post("/products",item);
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
}

export const editProduct= async (id:number,item:IProduct)=>{
  try {
    const response = await instance.put(`/products/${id}`,item);
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
}
