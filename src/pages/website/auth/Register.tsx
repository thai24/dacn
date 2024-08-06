import { joiResolver } from "@hookform/resolvers/joi";
import React from "react";
import { useForm } from "react-hook-form";
import schemaUser from "../../../common/validations/User";
import IUser from "../../../common/types/user";
import { createUser } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom"; 

type Props = {};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: joiResolver(schemaUser),
  });
  const navigate = useNavigate();
  const onSubmit = async (user: IUser) => {
    const data = {
      nameUser: user.nameUser,
      email: user.email,
      password: user.password,
      role: 1,
    };
    const confirm = window.confirm(`Bạn có muốn tạo không?`);
    if (confirm) {
      await createUser(data);
      alert("Tạo tài khoản thành công");
      navigate("/home/login");
    }
  };

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
          <p className="m-0">Đăng kí</p>
        </div>
      </div>
      <form onClick={handleSubmit(onSubmit)}>
        <div className="form-group  ">
          <label htmlFor="productName" className="dashboard-text text-dark">
            Tên của bạn
          </label>
          <input
            type="text"
            className={`form-control ${errors.nameUser ? `invalid` : ""}`}
            placeholder="Tên của bạn"
            {...register("nameUser")}
          />
          {errors.nameUser && (
            <div className="text-danger">{errors.nameUser?.message}</div>
          )}
        </div>
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
          {errors.email && (
            <div className="text-danger">{errors.email?.message}</div>
          )}
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
          {errors.password && (
            <div className="text-danger">{errors.password?.message}</div>
          )}
        </div>
        <p>Đã có tài khoản <Link to={`/home/login`}>đăng nhập tại đây</Link> ( <Link to={`/home/forgot`} className="">Quên mật khẩu</Link>)</p>
        <button type="submit" className="btn btn-primary">
          Đăng kí
        </button>
      </form>
    </div>
  );
};

export default Register;
