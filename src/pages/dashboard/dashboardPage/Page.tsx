import React, { useContext, useEffect, useState } from "react";
import IProduct from "../../../common/types/Product";
import { getAllProducts } from "../../../services/products";
import { dashboardContext } from "../../../common/hooks/context";

type Props = {};

const DashboardPage = (props: Props) => {
  const {products} = useContext(dashboardContext)
  return (
    <div>
      <h1>DashboardPage</h1>
      <table className="">
        <thead>
          <tr>
            <th>#</th>
            <th>caterory</th>
            <th>name</th>
            <th>price</th>
            <th>act</th>
          </tr>
        </thead>
        <tbody>
            {products.map((item,index)=>{
                return (
                    <tr key={item.id_sp}>
                        <td>{index +1}</td>
                        <td>{item.brand.name}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>xoa</td>
                    </tr>
                    
                )
            })}
          
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
