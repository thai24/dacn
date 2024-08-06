import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneProducts } from '../../../services/products'
import IProduct from '../../../common/types/Product'

type Props = {}

const DashboardProductDetail = (props: Props) => {
    const {id}= useParams()
  const [product,setProduct] = useState<IProduct>()
      // one product
  useEffect(() => {
    (async () => {
      try {
        const response = await getOneProducts(id);
        if (response.status !== 200) {
          console.log(response);
        }
        setProduct(response.data);
      } catch (error) {
        console.log("error:" + error);
      }
    })();
  }, []);
  return (
    <div className="app-content">
      <div className="app-content-header">
        <h1 className="app-content-headerText"><Link to={"/admin/product"} className='app-content-headerText'>Danh sách sản phẩm</Link> | {product?.name}</h1>
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
          Sửa sản phẩm
        </Link>
      </div>
    </div>
  )
}

export default DashboardProductDetail