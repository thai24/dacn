import { joiResolver } from "@hookform/resolvers/joi";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IUser from "../../../common/types/user";
import { createUser, LoginUser } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { dashboardContext } from "../../../common/hooks/context";

type Props = {};

const schemaUser = Joi.object({
    email:Joi.string().required().email({tlds:false}),
    password:Joi.string().required().min(8),
})

interface IUserLogin {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const {cart} = useContext(dashboardContext);
  const idcart = cart.map(item=>item.idUser)
  const detailCart = cart.map(item=>item.cart)
  const items = detailCart === null ? "" : JSON.stringify(detailCart)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: joiResolver(schemaUser),
  });
  const navigate=useNavigate()

  // const [storageUser ,setStorageUser]=useState<any>(null);
  // console.log(storageUser) 
  const onSubmit =async (user:IUserLogin)=>{
        const confirm = window.confirm(`Bạn có muốn đăng nhập không?`)
        if(confirm){
           const response= await LoginUser(user)
      localStorage.setItem("user",JSON.stringify(response))
          const detailuser=JSON.parse(localStorage.getItem("user"))
          const idUser =detailuser.data.user.id;
          if(idcart.includes(idUser)){
            // localStorage.setItem("react-use-cart", items);
          }else{
            console.log(2)
          }

      // const storageString = localStorage.getItem("user")
      // if(storageString !== null){
      //   const storageData = JSON.parse(storageString).data.user
      //   setStorageUser(storageData)
      // }else{
      //   console.log("storage null")
      // }
      navigate("/")
      window.location.reload()
      alert("Đăng nhập thành công")
  }
}

  return (
    <div className="container-fluid bg-secondary mb-5">
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: 300 }}
      >
        <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
        <div className="d-inline-flex">
          <p className="m-0">
            <Link to={"/"}>Home</Link>
          </p>
          <p className="m-0 px-2">-</p>
          <p className="m-0">Đăng nhập</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group  ">
          <label htmlFor="productName" className="dashboard-text text-dark">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? `invalid` : ""}`}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email &&<div className="text-danger">{errors.email?.message}</div>}
        </div>
        <div className="form-group  ">
          <label htmlFor="productName" className="dashboard-text text-dark">
            mật khẩu
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? `invalid` : ""}`}
            placeholder="mật khẩu"
            {...register("password")}
          />
          {errors.password &&<div className="text-danger">{errors.password?.message}</div>}
        </div>
        <p>Chưa có tài khoản <Link to={`/home/register`}>đăng kí tại đây</Link> ( <Link to={`/home/forgot`} className="">Quên mật khẩu</Link>)</p>
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
