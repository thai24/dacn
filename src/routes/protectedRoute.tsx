import React, { Children, ReactNode, useContext } from "react";
import { AuthContext } from "../common/hooks/storageUser";
import { Navigate, useNavigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: ReactNode;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {storageUser}=useContext(AuthContext);

    if(!storageUser){
      return <Navigate to="/" />;
    }
    if(storageUser.role ===1){
      return <Navigate to="/" />;
    }

    return <>{children}</>;
}
export default ProtectedRoute