import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { AuthContext } from "../../../common/hooks/storageUser";

type Props = {};

const Cart = (props: Props) => {
  const { items, removeItem, updateItemQuantity, emptyCart } = useCart();
  const cart = JSON.parse(localStorage.getItem("react-use-cart"))
  const { storageUser } = useContext(AuthContext);

  

  return (
    <div>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Shop Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to={"/"}>Home</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Cart</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

     {/* Cart Start */}
<div className="container-fluid pt-5">
  <div className="row px-xl-5">
    <div className="col-lg-8 table-responsive mb-5">
      <table className="table table-bordered text-center mb-0">
        <thead className="bg-secondary text-dark">
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map(item=>{
            return(
              <tr key={item.id}>
            <td className="align-middle"><img src={`../../img/${item.image}`}  style={{width: 50}} /> {item.name}</td>
            <td className="align-middle">${item.price}</td>
            <td className="align-middle">
              <div className="input-group quantity mx-auto" style={{width: 100}}>
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-minus" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input type="text" className="form-control form-control-sm bg-secondary text-center" value={item.quantity} />
                <div className="input-group-btn" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                  <button className="btn btn-sm btn-primary btn-plus">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </td>
            <td className="align-middle">${item.price * item.quantity}</td>
            <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={()=>{removeItem(item.id)}}><i className="fa fa-times" /></button></td>
          </tr>
            )
          })}
          
        </tbody>
      </table>
    </div>
    <div className="col-lg-4">
      <form className="mb-5" >
        <div className="input-group">
          <input type="text" className="form-control p-4" placeholder="Coupon Code" />
          <div className="input-group-append">
            <button className="btn btn-primary">Apply Coupon</button>
          </div>
        </div>
      </form>
      <div className="card border-secondary mb-5">
        <div className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Tổng phụ </h6>
            <h6 className="font-weight-medium">${cart.cartTotal}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">$10</h6>
          </div>
        </div>
        <div className="card-footer border-secondary bg-transparent">
          <div className="d-flex justify-content-between mt-2">
            <h5 className="font-weight-bold">Tổng giá</h5>
            <h5 className="font-weight-bold">${cart.cartTotal +10}</h5>
          </div>
          <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Cart End */}

    </div>
  );
};

export default Cart;
