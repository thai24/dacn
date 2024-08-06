import React, { useContext, useEffect, useState } from 'react'
import { dashboardContext } from '../../../common/hooks/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOneProducts } from '../../../services/products';
import { any, number } from 'joi';
import IProduct from '../../../common/types/Product';
import { AuthContext } from '../../../common/hooks/storageUser';
import instance from '../../../config/axios';
import { useCart } from 'react-use-cart';

type Props = {}

const DetailProduct = (props: Props) => {
  const { brand, caterory ,products } = useContext(dashboardContext);
  const { storageUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const limitedProducts = products.slice(0, 4);

  const {id}= useParams()

  const [product,setProduct]=useState<IProduct | null>(null)
  useEffect(()=>{
    (async()=>{
    const {data} =await getOneProducts(id)
        setProduct(data)
    })()
  },[id])


  //cart
  const { addItem, inCart } = useCart();
  const handleAddToCart=(item:IProduct)=>{
    if(!storageUser){
      alert("Bạn vui lòng đăng nhập để thực hiện chức năng")
      navigate("/home/login")
    }else{
      alert("thêm sản phẩm thành công")   
      addItem(item);
      
    }
  }

  return (
   <div>
  {/* Page Header Start */}
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
      <div className="d-inline-flex">
        <p className="m-0"><Link to={"/"} >Home</Link></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Shop Detail</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Shop Detail Start */}
  <div className="container-fluid py-5">
    <div className="row px-xl-5">
      <div className="col-lg-5 pb-5">
        <div id="product-carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner border">
            <div className="carousel-item active">
              <img className="w-100 h-100" src={`../../img/${product?.image}`} alt="Image" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-7 pb-5">
        <h3 className="font-weight-semi-bold">{product?.name}</h3>
        <div className="d-flex mb-3">

          <small className="pt-1">(Còn {product?.quantity} sản phẩm )</small>
        </div>
        <h3 className="font-weight-semi-bold mb-4">${product?.price}.00</h3>
        <p className="mb-4">{product?.description}</p>
        <div className="d-flex mb-3">
          <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
          <form>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="size-1" name="size" />
              <label className="custom-control-label" htmlFor="size-1">XS</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="size-2" name="size" />
              <label className="custom-control-label" htmlFor="size-2">S</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="size-3" name="size" />
              <label className="custom-control-label" htmlFor="size-3">M</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="size-4" name="size" />
              <label className="custom-control-label" htmlFor="size-4">L</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="size-5" name="size" />
              <label className="custom-control-label" htmlFor="size-5">XL</label>
            </div>
          </form>
        </div>
        <div className="d-flex mb-4">
          <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
          <form>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="color-1" name="color" />
              <label className="custom-control-label" htmlFor="color-1">Black</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="color-2" name="color" />
              <label className="custom-control-label" htmlFor="color-2">White</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="color-3" name="color" />
              <label className="custom-control-label" htmlFor="color-3">Red</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="color-4" name="color" />
              <label className="custom-control-label" htmlFor="color-4">Blue</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input" id="color-5" name="color" />
              <label className="custom-control-label" htmlFor="color-5">Green</label>
            </div>
          </form>
        </div>
        <div className="d-flex align-items-center mb-4 pt-2">
          <div className="input-group quantity mr-3" style={{width: 130}}>
            <div className="input-group-btn">
              <button className="btn btn-primary btn-minus">
                <i className="fa fa-minus" />
              </button>
            </div>
            <input type="text" className="form-control bg-secondary text-center" defaultValue={1} />
            <div className="input-group-btn">
              <button className="btn btn-primary btn-plus">
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
          <button className="btn btn-primary px-3" onClick={()=>{handleAddToCart(product)}}><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
        </div>
        <div className="d-flex pt-2">
          <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
          <div className="d-inline-flex">
            <a className="text-dark px-2" >
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-dark px-2" >
              <i className="fab fa-twitter" />
            </a>
            <a className="text-dark px-2" >
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-dark px-2" >
              <i className="fab fa-pinterest" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row px-xl-5">
      <div className="col">
        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
          <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
          <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Product Description</h4>
            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
            <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
          </div>
          <div className="tab-pane fade" id="tab-pane-2">
            <h4 className="mb-3">Additional Information</h4>
            <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                  </li>
                </ul> 
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                  </li>
                </ul> 
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="tab-pane-3">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                <div className="media mb-4">
                  <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: 45}} />
                  <div className="media-body">
                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <i className="far fa-star" />
                    </div>
                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>Your email address will not be published. Required fields are marked *</small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea id="message" cols={30} rows={5} className="form-control" defaultValue={""} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" defaultValue="Leave Your Review" className="btn btn-primary px-3" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Shop Detail End */}
  {/* Products Start */}
  <div className="container-fluid py-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">You May Also Like</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
          {limitedProducts.map((item,index)=>{
            return (
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
            <div className="card product-item border-0 mb-4">
              <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img className="img-fluid w-100" src={`../../img/${item.image}`} />
              </div>
              <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 className="text-truncate mb-3">{item.name}</h6>
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
        </div>
  </div>
  {/* Products End */}
</div>

  )
}

export default DetailProduct