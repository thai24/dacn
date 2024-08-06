import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../common/hooks/storageUser";
import { dashboardContext } from "../../../common/hooks/context";
import IProduct from "../../../common/types/Product";
import instance from "../../../config/axios";

type Props = {};
const arr= [1,2,3]
const HomePage = (props: Props) => {
  const { storageUser } = useContext(AuthContext);
  const { brand, caterory ,products ,cart} = useContext(dashboardContext);
  const idcart = cart.map(item=>item.idUser)
  const detailCart = cart.filter((item)=>item.idUser === storageUser?.id);
  const handleLogout = async() => {
    const confirm = window.confirm("bạn có muốn đăng xuất ?");
    if (confirm) {
      const cart = JSON.parse(localStorage.getItem("react-use-cart"))
      if(idcart.includes(storageUser.id)){
        await instance.put(`/cart/${detailCart[0]?.id}`,{cart:cart,idUser:storageUser?.id})
        localStorage.removeItem("react-use-cart");
        localStorage.removeItem("user");
          window.location.reload();
      }else{
        await instance.post(`/cart`,{cart:cart,idUser:storageUser?.id})
        localStorage.removeItem("react-use-cart");
        localStorage.removeItem("user");
          window.location.reload();
      }
    }
  };
  const URL_Image = "img/";
  const banner = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
  const limitedProducts = products.slice(0, 8);

  const getQuantityProductByBrand = (id:number)=>{
    const response = products.filter((item)=>item.brand === id)
    return response.length
  }
  const dataR=JSON.parse(localStorage.getItem("react-use-cart"))
  return (
    <div>
       {/* Navbar Start */}
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">Categories</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: 410 }}
              >
                {caterory.map((item, index) => {
                  return (
                    <Link
                      to={`/home/caterory/${item.id}/0`}
                      className="nav-item nav-link"
                      key={index}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                {!storageUser && (
                  <div className="navbar-nav ml-auto py-0">
                    <Link className="nav-item nav-link" to={"/home/login"}>
                      Login
                    </Link>
                    <Link className="nav-item nav-link" to={"/home/register"}>
                      Register
                    </Link>
                  </div>
                )}
                {storageUser && (
                  <div className="navbar-nav ml-auto py-0">
                    <Link className="nav-item nav-link" to={"/home/user"}>
                      {storageUser.nameUser}
                    </Link>
                    <button
                      className="btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
            <div id="demo" className="carousel slide " data-bs-ride="carousel">
              {/* Indicators/dots */}

              {/* The slideshow/carousel */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./img/banner1.jpg"
                    alt="Los Angeles"
                    className="d-block"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./img/banner2.jpg"
                    alt="Chicago"
                    className="d-block"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./img/banner1.jpg"
                    alt="New York"
                    className="d-block"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
      {/* Featured Start */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>
      {/* Featured End */}
      {/* Categories Start */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {brand.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6 pb-1" key={index}>
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: 30 }}
                >
                  <p className="text-right">{getQuantityProductByBrand(item.id)} Products</p>
                  <Link to={`/home/caterory/0/${item.id}`} className="cat-img position-relative overflow-hidden mb-3">
                    <img className="img-fluid" src={`img/logo1.jpg`} />
                  </Link>
                  <h5 className="font-weight-semi-bold m-0">{item.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Categories End */}
      {/* Offer Start */}
      <div className="container-fluid offer pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
              <img src="img/offer-1.png" />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  20% off the all order
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">
                  Spring Collection
                </h1>
                <a className="btn btn-outline-primary py-md-2 px-md-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
              <img src="img/offer-2.png" />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  20% off the all order
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">
                  Winter Collection
                </h1>
                <a className="btn btn-outline-primary py-md-2 px-md-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Offer End */}
      {/* Products Start */}
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Sản phẩm mới</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {limitedProducts.map((item,index)=>{
            return (
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
            <div className="card product-item border-0 mb-4">
              <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img className="img-fluid w-100" src={`img/${item.image}`} />
              </div>
              <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 className="text-truncate mb-3">{item.name}</h6>
                <div className="d-flex justify-content-center">
                  <h6>${item.price}.00</h6>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-light border">
                <Link to={`home/detail/${item.id}`} className="btn btn-sm text-dark p-0">
                  <i className="fas fa-eye text-primary mr-1" />
                  View Detail
                </Link>
                <a className="btn btn-sm text-dark p-0">
                  <i className="fas fa-shopping-cart text-primary mr-1" />
                  Add To Cart
                </a>
              </div>
            </div>
          </div>
            )
          })}
        </div>
      </div>
      {/* Products End */}
    </div>
  );
};

export default HomePage;
