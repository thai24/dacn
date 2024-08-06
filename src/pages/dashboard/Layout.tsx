import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/css/dashboard/style.css";
import Sidebar from "../../components/ui/dashboard/Sidebar";
import DashboardProvider from "../../common/hooks/context";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="app-container">
      <DashboardProvider>
        <Sidebar />
        <Outlet />
      </DashboardProvider>
    </div>
  );
};

export default Layout;
