import React from "react";
import Header from "../../components/ui/website/Header";
import Footer from "../../components/ui/website/Footer";
import { Outlet } from "react-router-dom";
import "../../styles/css/website/style.css";
import AuthProvider from "../../common/hooks/storageUser";
import UserProvider from "../../common/hooks/contextUser";
import DashboardProvider from "../../common/hooks/context";
import { CartProvider } from "react-use-cart";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div>
      <DashboardProvider>
        <CartProvider>
          <Header />
          <Outlet />
          <Footer />
        </CartProvider>
      </DashboardProvider>
    </div>
  );
};

export default Layout;
