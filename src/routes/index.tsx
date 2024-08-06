import { Route, Routes } from "react-router-dom";
import Layoutdashboard from "../pages/dashboard/Layout";
import Layoutwebsite from "../pages/website/Layout";
import HomePage from "../pages/website/home/Page";
import DashboardPage from "../pages/dashboard/dashboardPage/Page";
import DashboardProductList from "../pages/dashboard/dashboard_product/list";
import DashboardCateroryList from "../pages/dashboard/dashboard_caterory/list";
import DashboardProductAdd from "../pages/dashboard/dashboard_product/add";
import DashboardProductEdit from "../pages/dashboard/dashboard_product/edit";
import Register from "../pages/website/auth/Register";
import Login from "../pages/website/auth/Login";
import ForgotPass from "../pages/website/auth/ForgotPass";
import NotFound from "../pages/notFound/NotFound";
import ProtectedRoute from "./protectedRoute";
import AuthProvider from "../common/hooks/storageUser";
import DashboardProductDetail from "../pages/dashboard/dashboard_product/detail";
import DashboardCateroryEdit from "../pages/dashboard/dashboard_caterory/edit";
import DashboardCateroryAdd from "../pages/dashboard/dashboard_caterory/add";
import DashboardBrandList from "../pages/dashboard/dashboard_brand/List";
import DashboardBrandAdd from "../pages/dashboard/dashboard_brand/Add";
import DashboardBrandEdit from "../pages/dashboard/dashboard_brand/Edit";
import DashboardUserAdd from "../pages/dashboard/dashboard_user/Add";
import DashboardUserList from "../pages/dashboard/dashboard_user/List";
import DashboardUserEdit from "../pages/dashboard/dashboard_user/Edit";
import Logout from "../pages/website/auth/Logout";
import DetailProduct from "../pages/website/home/Detail";
import Caterory from "../pages/website/home/Caterory";
import Cart from "../pages/website/home/Cart";

type Props = {};

const Router = (props: Props) => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <Layoutwebsite />
          }>
            <Route index element={<HomePage />} />
            <Route path="/home/register" element={<Register />} />
            <Route path="/home/cart" element={<Cart />} />
            <Route path="/home/login" element={<Login />} />
            <Route path="/home/logout" element={<Logout />} />
            <Route path="/home/forgot" element={<ForgotPass />} />
            <Route path="/home/caterory/:id1/:id2" element={<Caterory />} />
            <Route path="/home/detail/:id" element={<DetailProduct />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute>
            <Layoutdashboard />
            </ProtectedRoute>
            }>
            <Route index element={<DashboardPage />} />
            <Route path="/admin/brand" element={<DashboardBrandList />} />
            <Route path="/admin/brand/add" element={<DashboardBrandAdd />} />
            <Route path="/admin/brand/edit/:id" element={<DashboardBrandEdit />} />
            <Route path="/admin/caterory" element={<DashboardCateroryList />} />
            <Route path="/admin/caterory/add" element={<DashboardCateroryAdd />} />
            <Route path="/admin/caterory/edit/:id" element={<DashboardCateroryEdit />} />
            <Route path="/admin/product" element={<DashboardProductList />} />
            <Route path="/admin/product/detail/:id" element={<DashboardProductDetail />} />
            <Route path="/admin/product/add" element={<DashboardProductAdd />} />
            <Route
              path="/admin/product/edit/:id"
              element={<DashboardProductEdit />}
            />
            <Route path="/admin/user/add" element={<DashboardUserAdd />} />
            <Route path="/admin/user" element={<DashboardUserList />} />
            <Route path="/admin/user/edit/:id" element={<DashboardUserEdit />} />
          </Route>{" "}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Router;
