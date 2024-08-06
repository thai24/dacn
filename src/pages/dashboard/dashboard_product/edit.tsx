import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import IProduct from '../../../common/types/Product';
import { dashboardContext } from '../../../common/hooks/context';
import ICaterory from '../../../common/types/caterory';
import IBrand from '../../../common/types/brand';
import { joiResolver } from '@hookform/resolvers/joi';
import SchemaProduct from '../../../common/validations/Product';
import { createProduct, editProduct, getOneProducts } from '../../../services/products';
import instance from '../../../config/axios';
import { Link, useParams } from 'react-router-dom';

type Props = {};

const DashboardProductEdit: React.FC<Props> = () => {
  const { caterory, brand } = useContext(dashboardContext);
  const { register, handleSubmit, formState: { errors } } = useForm<IProduct>(
    {
    resolver:joiResolver(SchemaProduct)
  }
  );
  const {id} =useParams();
  console.log(id)
  const [product,setProduct]=useState<IProduct>()
  useEffect(()=>{
    (async()=>{
      const {data}=await getOneProducts(id);
      setProduct(data)
    })()
  },[])
  console.log(product)

  const onSubmit = async(item: IProduct) => {
    const confirm = window.confirm(`Bạn có muốn thêm sản phẩm: ${item.name} không?`)
    if(confirm){
      console.log(item)
      editProduct(id,item)
      window.location.reload()
      alert("Thêm sản phẩm thành công")
    }
  };
 
  return (
    <div className="app-content">
      <div className="app-content-header">
        <h1 className="app-content-headerText"> <Link to={"/admin/product"} className='app-content-headerText'>Danh sách sản phẩm</Link> | Thêm</h1>
        <button className="mode-switch" title="Switch Theme">
          <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} width={24} height={24} viewBox="0 0 24 24">
            <defs />
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
      </div>
      <div className="products-area-wrapper tableView">
        <form className='dashboard-text' onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
      <label htmlFor="productCategory">Category</label>
    {errors.caterory &&<div className="text-danger">{errors.caterory?.message}</div>}
      <select  className={`form-control ${errors.caterory ? `invalid` : ""}`} id="productCategory" {...register("caterory")} >
        {caterory.map((item)=>{
          return (
            <option key={item.id} value={`${item.id}`}>{item.name}</option>

          )
        })}      
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="productBrand">Brand</label>
    {errors.brand &&<div className="text-danger">{errors.brand?.message}</div>}
      <select className={`form-control ${errors.brand ? `invalid` : ""}`} id="productBrand" {...register("brand")} >
      {brand.map((item)=>{
          return (
            <option key={item.id} value={`${item.id}`}>{item.name}</option>
          )
        })}
      </select>
    </div>
    <div className="form-group  ">
      <label htmlFor="productName" className='dashboard-text'>Product Name</label>
      <input type="text" className={`form-control ${errors.name ? `invalid` : ""}`} id="productName" placeholder="Enter product name" {...register("name")} defaultValue={product?.name} />
    {errors.name &&<div className="text-danger">{errors.name?.message}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="productDescription">Description</label>
      <textarea className="form-control" id="productDescription" rows={3} placeholder="Enter product description" value={"mo ta"} {...register("description")} defaultValue={product?.description} />
    </div>
    <div className="form-group">
      <label htmlFor="productPrice">Price</label>
      <input type="number" className={`form-control ${errors.price ? `invalid` : ""}`} id="productPrice" placeholder="Enter product price" {...register("price")} defaultValue={product?.price} />
    {errors.price &&<div className="text-danger">{errors.price?.message}</div>}
    </div>
        <div className="form-group">
      <label htmlFor="productSizes">Sizes:</label>
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox" value="1" {...register("size")} />XS
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox" value="2" {...register("size")} />S
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox" value="3" {...register("size")} />M
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox" value="4" {...register("size")} />L
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox" value="5" {...register("size")} />SL
    {errors.size &&<div className="text-danger">{errors.size?.message}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="productColors">Colors:</label>
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox"  value="1" {...register("color")} />yellow
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox"  value="2" {...register("color")} />black
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox"  value="3" {...register("color")} />blue
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox"  value="4" {...register("color")} />white
      <input className= { ` dashboard-input  ${errors.price ? `invalid` : ""}`} type="checkbox"  value="5" {...register("color")} />green
    {errors.color &&<div className="text-danger">{errors.color?.message}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="productPrice">quantity</label>
      <input type="number" className={`form-control ${errors.quantity ? `invalid` : ""}`} id="productPrice" placeholder="Enter product price" {...register("quantity")} defaultValue={product?.quantity} />
    {errors.quantity &&<div className="text-danger">{errors.quantity?.message}</div>}
    </div>

          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
      </div>
    </div>

  );
};

export default DashboardProductEdit;
