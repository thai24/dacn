import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dashboardContext } from "../../../common/hooks/context";

type Props = {};

const DashboardCateroryList = (props: Props) => {
  const { caterory } = useContext(dashboardContext);
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
          <div className="product-cell category">Loại</div>
          <div className="product-cell price">Hành động</div>
        </div>
        <div>
          {caterory.map((item, index) => {
            return (
              <div className="products-row" key={item.id}>
                <div className="product-cell sales">{index+1}</div>
                <div className="product-cell sales">{item.name}</div>

                <div className="product-cell sales">
                  <button className="btn btn-danger">Xóa</button>
                  <Link
                    to={`/admin/caterory/edit/${item.id}`}
                    className="btn btn-warning"
                  >
                    Sửa
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardCateroryList;
