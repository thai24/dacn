import { createContext, FC, ReactNode, useEffect, useState } from "react";
import IUser from "../types/user";

interface TDashboard {
    storageUser:IUser | null
}

export const AuthContext = createContext<TDashboard>({storageUser:null});

interface dashboardProps {
  children: ReactNode;
}

const AuthProvider: FC<dashboardProps> = ({ children }) => {

  const [storageUser, setStorageUser] = useState<IUser | null>(null);

  useEffect(()=>{
    const storageString = localStorage.getItem("user");
    if (storageString !== null) {
        try {
          const storageData = JSON.parse(storageString);
          // Kiểm tra cấu trúc của storageData
          if (storageData && storageData.data && storageData.data.user) {
            setStorageUser(storageData.data.user);
          } else {
            console.log("Invalid storage data structure");
          }
        } catch (error) {
          console.error("Error parsing JSON from localStorage", error);
        }
      } else {
        console.log("Chua dang nhap");
      }
    }, []);

  return (
    <AuthContext.Provider value={{storageUser}}>
    {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
