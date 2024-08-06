import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dashboardContext } from '../../../common/hooks/context';
import IProduct from '../../../common/types/Product';
import ReactPaginate from 'react-paginate';

type Props = {}

const Caterory = (props: Props) => {
  const { brand, caterory ,products } = useContext(dashboardContext);
  const [filter,setFilter]=useState<IProduct[]>([]);
    const {id1}=useParams();
    const {id2}=useParams();
    useEffect(()=>{
        if(id1 === "0" && id2 === "0"){
            setFilter(products)
        
        }if(id1 !== "0" && id2 ==="0"){
            const response = products.filter((item)=>item.caterory=== Number(id1) )
            setFilter(response)
        }if(id1 === "0" && id2 !=="0"){
            const response = products.filter((item)=>item.brand=== Number(id2) )
            setFilter(response)
        }if(id1 !== "0" && id2 !=="0"){
            const response = products.filter((item)=>item.caterory=== Number(id1) && item.brand === Number(id2) )
            setFilter(response)
        }
    },[id1,id2,products])

    //paginate
  const [itemOffset, setItemOffset] = useState(0); //mặc định
  const itemsPerPage = 9; // số products trên 1 trang
  const endOffset = itemOffset + itemsPerPage;
  const currentProduct = filter.slice(itemOffset, endOffset); //sản phẩm
  const pageCount = Math.ceil(filter.length / itemsPerPage); //số trang

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filter.length;
    setItemOffset(newOffset);
    console.log(newOffset);
  };

  return (
    <div>
 <div className="container-fluid bg-secondary mb-5">
  <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
    <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
    <div className="d-inline-flex">
      <p className="m-0"><Link to={"/"} >Home</Link></p>
      <p className="m-0 px-2">-</p>
      <p className="m-0">Danh mục sản phẩm</p>
    </div>
  </div>
    </div>
  {/* Shop Start */}
<div className="container-fluid pt-5">
  <div className="row px-xl-5">
    {/* Shop Sidebar Start */}
    <div className="col-lg-3 col-md-12">
      {/* Price Start */}
      <div className="border-bottom mb-4 pb-4">
        <h5 className="font-weight-semi-bold mb-4">Filter by caterory</h5>
        <div>
        <Link to={`/home/caterory/0/${id2}`}  className='custom-control' >All</Link>
            {caterory.map((item,index)=>{
                return(
                    <Link to={`/home/caterory/${item.id}/${id2}`} key={index} className='custom-control' >{item.name}</Link>
                )
            })}
        </div>
      </div>
      <div className="border-bottom mb-4 pb-4">
        <h5 className="font-weight-semi-bold mb-4">Filter by brand</h5>
        <div>
        <Link to={`/home/caterory/${id1}/0`}  className='custom-control' >All</Link>
            {brand.map((item,index)=>{
                return(
                    <Link to={`/home/caterory/${id1}/${item.id}`} key={index} className='custom-control' >{item.name}</Link>
                )
            })}
        </div>
      </div>
      {/* Price End */}
      {/* Color Start */}
      <div className="border-bottom mb-4 pb-4">
        <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" defaultChecked id="color-all" />
            <label className="custom-control-label" htmlFor="price-all">All Color</label>
            <span className="badge border font-weight-normal">1000</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="color-1" />
            <label className="custom-control-label" htmlFor="color-1">Black</label>
            <span className="badge border font-weight-normal">150</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="color-2" />
            <label className="custom-control-label" htmlFor="color-2">White</label>
            <span className="badge border font-weight-normal">295</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="color-3" />
            <label className="custom-control-label" htmlFor="color-3">Red</label>
            <span className="badge border font-weight-normal">246</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="color-4" />
            <label className="custom-control-label" htmlFor="color-4">Blue</label>
            <span className="badge border font-weight-normal">145</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" className="custom-control-input" id="color-5" />
            <label className="custom-control-label" htmlFor="color-5">Green</label>
            <span className="badge border font-weight-normal">168</span>
          </div>
        </form>
      </div>
      {/* Color End */}
      {/* Size Start */}
      <div className="mb-5">
        <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" defaultChecked id="size-all" />
            <label className="custom-control-label" htmlFor="size-all">All Size</label>
            <span className="badge border font-weight-normal">1000</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-1" />
            <label className="custom-control-label" htmlFor="size-1">XS</label>
            <span className="badge border font-weight-normal">150</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-2" />
            <label className="custom-control-label" htmlFor="size-2">S</label>
            <span className="badge border font-weight-normal">295</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-3" />
            <label className="custom-control-label" htmlFor="size-3">M</label>
            <span className="badge border font-weight-normal">246</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-4" />
            <label className="custom-control-label" htmlFor="size-4">L</label>
            <span className="badge border font-weight-normal">145</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" className="custom-control-input" id="size-5" />
            <label className="custom-control-label" htmlFor="size-5">XL</label>
            <span className="badge border font-weight-normal">168</span>
          </div>
        </form>
      </div>
      {/* Size End */}
    </div>
    
    {/* Shop Sidebar End */}
    {/* Shop Product Start */}
    <div className="col-lg-9 col-md-12">
      <div className="row pb-3">
        <div className="col-12 pb-1">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <form >
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search by name" />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
            <div className="dropdown ml-4">
              <button className="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {id1 === "0"? <>ALL</> : <>{id1}</>} | {id2 ==="0"? <>ALL</> : <>{id2}</>}
              </button>
            </div>
          </div>
        </div>
        {currentProduct.map((item,index)=>{
            return (
                <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
                    <div className="card product-item border-0 mb-4">
                      <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img
                          className="img-fluid w-100"
                          src={`../../../img/${item.image}`}
                        />
                      </div>
                      <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">
                          {item.name}
                        </h6>
                        <div className="d-flex justify-content-center">
                          <h6>${item.price}.00</h6>
                          
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link to={`/home/detail/${item.id}`} className="btn btn-sm text-dark p-0">
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



        <div className="col-12 pb-1">
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
      </div>
    </div>
    {/* Shop Product End */}
  </div>
</div>
{/* Shop End */}


    </div>
  )
}

export default Caterory