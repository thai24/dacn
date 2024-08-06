import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../common/hooks/storageUser";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
type Props = {};

const Header = (props: Props) => {
  const { storageUser } = useContext(AuthContext);
  const { items, removeItem, updateItemQuantity, emptyCart } = useCart();
  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark">FAQs</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark">Help</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark">Support</a>
            {storageUser && storageUser.role === 2 && (
              <div>
                <span className="text-muted px-2">|</span>
                <Link to={"admin/product"} className="text-dark">
                  admin
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-twitter" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-dark px-2">
              <i className="fab fa-instagram" />
            </a>
            <a className="text-dark pl-2">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">
                E
              </span>
              Shopper
            </h1>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
              />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <a className="btn border">
            <i className="fas fa-heart text-primary" />
            <span className="badge">0</span>
          </a>
          <Link to={`/home/cart`} className="btn border">
            <i className="fas fa-shopping-cart text-primary" />
            <span className="badge">{items?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
