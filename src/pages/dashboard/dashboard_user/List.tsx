import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardContext } from "../../../common/hooks/context";
import IUser from "../../../common/types/user";
import instance from "../../../config/axios";

type Props = {};

const DashboardUserList = (props: Props) => {
  const { users } = useContext(dashboardContext);
  const handleEdit = async(user:IUser)=>{
    const confirm =window.confirm("Bạn có chắc chắn muốn đổi vai trò tài khoản")
    if(confirm){
      console.log(user.role)
    }
  }
  
  return (
    <div className="app-content">
      <div className="app-content-header">
        <h1 className="app-content-headerText">Loại</h1>
        <button className="mode-switch" title="Switch Theme">
          <svg
            className="moon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <defs />
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
        <Link to="/admin/caterory/add" className="btn btn-primary">
          Thêm Loại
        </Link>
      </div>
      <div className="app-content-actions">
        <form>
          <input className="search-bar" placeholder="Search..." type="text" />
        </form>
      </div>
      <div className="products-area-wrapper tableView dashboard-table">
        <div className="products-header">
          <div className="product-cell image">#</div>
          <div className="product-cell category">Tên</div>
          <div className="product-cell category">Email</div>
          <div className="product-cell category">Mật khẩu</div>
          <div className="product-cell category">Địa chỉ</div>
          <div className="product-cell category">Số điện thoại</div>
          <div className="product-cell category">Vai trò</div>
          <div className="product-cell price">Hành động</div>
        </div>
        <div>
          {users.map((item, index) => {
            return (
              <div className="products-row" key={item.id}>
                <div className="product-cell sales">{index +1}</div>
                <div className="product-cell sales">{item.nameUser}</div>
                <div className="product-cell sales">{item.email.split("").slice(0,10).join("") + "..."}</div>
                <div className="product-cell sales">{item.password.split("").slice(0,10).join("") + "..."}</div>
                <div className="product-cell sales">{(!item.address  ? "null":item.address)}</div>
                <div className="product-cell sales">{(!item.phone ? "null" :item.phone)}</div>
                <div className="product-cell sales">{(item.role === 1 ? "người dùng" : "admin")}</div>

                <div className="product-cell sales">
                  <button className="btn btn-danger">Xóa</button>
                  <button
                    onClick={()=>{handleEdit(item)}}
                    className="btn btn-warning"
                  >
                    Sửa
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardUserList;
