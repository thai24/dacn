import { useContext } from "react";
import instance from "../config/axios";
import { dashboardContext } from "../common/hooks/context";

export const getAllCaterory = async () => {
  try {
    const response = await instance.get("/caterory");
    return response;
  } catch (error) {
    return {
      data: null,
      status: 500,
      statusText: "internal server error",
    };
  }
};

//get caterory name
export const getCateroryName = (id: any) => {
  const { caterory } = useContext(dashboardContext);
  const cater = caterory.find((cater) => cater.id === id);
  return cater;
};
