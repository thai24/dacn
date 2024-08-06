import IUser from "../common/types/user";
import instance from "../config/axios";

export const createUser = async (item: IUser) => {
  try {
    const response = await instance.post("/register", item);
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};

export const LoginUser = async (item: { email: string; password: string }) => {
  try{
    const response = await instance.post("/login", item);
  return response;
  }catch(error){
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};
