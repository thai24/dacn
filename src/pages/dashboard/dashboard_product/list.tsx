import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardContext } from "../../../common/hooks/context";
import { AuthContext } from "../../../common/hooks/storageUser";
import IProduct from "../../../common/types/Product";
import { any } from "joi";
import ReactPaginate from "react-paginate";
type Props = {};
const DashboardProductList = (props: Props) => {
  const { products, caterory, brand } = useContext(dashboardContext);
  const getCateroryName = (id: any) => {
    const cater = caterory.find((cater) => cater.id === id);
    return cater;
  };

  const getBrandName = (id: any) => {
    const cater = brand.find((cater) => cater.id === id);
    return cater;
  };

  const [search, setSearch] = useState<string>(String);
  const [searchProduct, setSearchProduct] = useState<IProduct[]>([]);
  const handleSeach = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    if (search === "") {
    } else {
      const searchProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search?.toLowerCase())
      );
      setSearchProduct(searchProducts);
    }
  }, [search]);

    //fillter caterory
    const [categoryID, setCategoryID] = useState(0);
    const [filterProduct, setFilterProduct] = useState<IProduct[]>([]);
  
    const handleCaterory = (event:any)=>{
      const response = parseInt(event.target.value);
      setCategoryID(response)
    }
    useEffect(()=>{
      if(categoryID !==0){
        const filter = products.filter((item)=>item.brand === categoryID)
        setFilterProduct(filter)
      }else{
        setFilterProduct(products)
      }
    },[categoryID,products]) 

  //paginate
  const [itemOffset, setItemOffset] = useState(0); //mặc định
  const itemsPerPage = 5; // số products trên 1 trang
  const endOffset = itemOffset + itemsPerPage;
  const currentProduct = filterProduct.slice(itemOffset, endOffset); //sản phẩm
  const pageCount = Math.ceil(filterProduct.length / itemsPerPage); //số trang

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filterProduct.length;
    setItemOffset(newOffset);
    console.log(newOffset);
  };

  //sap xep
  const [sortProduct, setSortProduct] = useState(0);
  //mac dinh
  const sortdefault = () => {
    const response = filterProduct.sort((a, b) => a.id - b.id);
    setSortProduct(0);
  };

  //giam dan
  const sortDescending = () => {
    const response = filterProduct.sort((a, b) => b.price - a.price);
    setSortProduct(1);
  };

  //tang dan
  const sortAsending = () => {
    const response = filterProduct.sort((a, b) => a.price - b.price);
    setSortProduct(2);
  };

  useEffect(() => {
    if (sortProduct !== 0) {
      if (sortProduct === 1) {
        const response = filterProduct.sort((a, b) => b.price - a.price);
        setFilterProduct(response);
      } else {
        const response = filterProduct.sort((a, b) => a.price - b.price);
        setFilterProduct(response);
      }
    } else {
      const response = filterProduct.sort((a, b) => a.id - b.id);
      setFilterProduct(response);

    }
  }, [sortProduct,filterProduct]);

  return (
    <div className="app-content">
      <div className="app-content-header">
        <h1 className="app-content-headerText">Products</h1>
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
        <Link to="/admin/product/add" className="btn btn-primary">
          Thêm sản phẩm
        </Link>
      </div>
      <div className="app-content-actions">
        <form>
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            value={search}
            onChange={handleSeach}
          />
          <ul className="search-ul ${search === `` && searchProduct.length > 0 ? 'show' : ''}`}">
            {searchProduct.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={`./detail/${item.id}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </form>
        <div className="app-content-actions-wrapper">
          <div className="filter-button-wrapper">
            <div className="filter-menu">
              <select onChange={handleCaterory}>
                <option value={0}>All</option>
                {brand.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
          <button type="submit" onClick={sortdefault}>
        mac dinh
      </button>
      <button type="submit" onClick={sortDescending}>
        giam dan
      </button>
      <button type="submit" onClick={sortAsending}>
        tang dan
      </button>
          </div>
        </div>
      </div>
      <div className="products-area-wrapper tableView dashboard-table">
        <div className="products-header">
          <div className="product-cell image">Tên sản phẩm</div>
          <div className="product-cell category">Loại</div>
          <div className="product-cell status-cell">Thương hiệu</div>
          <div className="product-cell sales">Số lượng</div>
          <div className="product-cell stock">Đã bán</div>
          <div className="product-cell price">Giá</div>
          <div className="product-cell price">Hành động</div>
        </div>
        <div>
          {currentProduct.map((item) => {
            return (
              <div className="products-row" key={item.id}>
                <div className="product-cell image">
                  <span>
                    <Link
                      className="product-cell category"
                      to={`./detail/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </span>
                </div>
                <div className="product-cell category">
                  {getCateroryName(item.caterory)?.name}
                </div>
                <div className="product-cell category">
                  {getBrandName(item.brand)?.name}
                </div>
                <div className="product-cell sales">{item.quantity}</div>
                <div className="product-cell stock">{item.sold}</div>
                <div className="product-cell price">${item.price}</div>
                <div className="product-cell price">
                  <button className="btn btn-danger">Xóa</button>
                  <Link
                    to={`/admin/product/edit/${item.id}`}
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
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default DashboardProductList;
