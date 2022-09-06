import React, { useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import {Link,useNavigate} from "react-router-dom";
import { Rings,Circles,InfinitySpin,TailSpin } from  'react-loader-spinner'
import { axiosInstance } from '../../config/axios.config'; 

import Header from '../Navbar/Header'

function Cart() {
const [cartData, setCartData] = useState();
const [totalAndDiscount, setTotalAndDiscount] = useState({});

let cartDetails = useRef(null);
const navigate = useNavigate();

  const getCartData = async () => {
    try {
      cartDetails.current = await axiosInstance.get('/cart');
      console.log("cartData",cartDetails.current.data);
      setCartData(cartDetails.current.data.data);
    }catch(err){
      console.log("error",err.response.data);
    }
  }

  const getTotalAndDiscount = async () => {
    try {
      console.log("Calling getTotalAndDiscount", cartDetails.current);
      let c = [...cartData];
      let total = c.reduce((acc, curr) => {
        return acc + parseFloat(curr.product.price) * parseInt(curr.cart.quantity);
      } , 0);
      console.log("total", total);
      // let discount = c.reduce((acc, curr) => {
      //   return acc + parseFloat(curr.product.discount) * parseInt(curr.cart.quantity);
      // } , 0);
      // console.log("discount", discount);
      setTotalAndDiscount({total: total, discount: 0});
    }catch(err){
      console.log("error",err);
    }
  }

  const incrementQuantity = async (id) => {
    try {
      console.log("Calling increaseQuantity", id);
      let c = [...cartData];
      let cartItem = c.find(item => item.cart._id === id);
      if(parseInt(cartItem.cart.quantity) < parseInt(cartItem.product.quantity)){
      cartItem.cart.quantity = (parseInt(cartItem.cart.quantity) + 1).toString();
      await axiosInstance.put(`/cart/update/${id}`, cartItem.cart);
      }else{
        alert("Sorry, we don't have enough quantity in stock");
      }
      console.log("cartItem", cartItem);
      setCartData(c);
    }catch(err){
      console.log("error",err);
    }
  }

  const decrementQuantity = async (id) => {
    try {
      console.log("Calling decreaseQuantity", id);
      let c = [...cartData];
      let cartItem = c.find(item => item.cart._id === id);
      if(parseInt(cartItem.cart.quantity) > 1){
        cartItem.cart.quantity = parseInt(cartItem.cart.quantity) - 1;
      await axiosInstance.put(`/cart/update/${id}`, cartItem.cart);
      }else{
        alert("Do you want to remove this item from cart?");
        await removeItem(id);
        return;
      }
      console.log("cartItem", cartItem);
      console.log("cartDetails", c);
      setCartData(c);
    }catch(err){
      console.log("error",err);
    }
  }

  const removeItem = async (id) => {
    try {
      console.log("Calling removeItem", id);
      let c = [...cartData];
      let cartItem = c.findIndex(item => item.cart._id === id);
      c.splice(cartItem, 1);
      let response = await axiosInstance.delete(`/cart/delete/${id}`);
      console.log("response", response.data);
      setCartData(c);
    }catch(err){
      console.log("error",err);
    }
  }





  useEffect(() => {
    getCartData();
  },[])

  useEffect(() => {
    getTotalAndDiscount();
  } , [cartData])

  return (
    <>
      <Header></Header>
        <div>
          <div className="container-fluid">
            <div className="row">
              <aside className="col-lg-9 cart-container">
                <div className="card">
                  <div className="table-responsive">
                    { cartData ? 
                    <table className="table table-borderless table-shopping-cart">
                      <thead className="text-muted">
                        <tr className="small text-uppercase">
                          <th scope="col">Product</th>
                          <th scope="col" width="120">
                            Quantity
                          </th>
                          <th scope="col" width="120">
                            Price
                          </th>
                          <th
                            scope="col"
                            className="text-right d-none d-md-block"
                            width="200"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                      {cartData?.length > 0 ? cartData.map((item, index) => {
                        return (
                        <tr key={index} >
                          <td>
                            <figure className="itemside align-items-center">
                              <div className="aside">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/assets/${item.product.image}`}
                                  className="img-sm cart-image" />
                              </div>
                              <figcaption className="info">
                                {" "}
                                <a className="title text-dark" data-abc="true">
                                  {item.product.name}
                                </a>
                                <p className="text-muted small">Category : {item.product.tag}</p>
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <div className="input-group input-group-sm ">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  data-abc="true"
                                  onClick={()=>decrementQuantity(item.cart._id)}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                data-abc="true"
                                value={item.cart.quantity}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  data-abc="true"
                                  onClick={()=>incrementQuantity(item.cart._id)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="price-wrap w-100 ">
                              <var className="price w-50 ">${parseInt(item.product.price).toFixed(2)}</var>
                              <br/>
                              <small className="text-muted w-100 "> ${(parseInt(item.product.price) * parseInt(item.cart.quantity)).toFixed(2)} each </small>{" "}
                            </div>
                          </td>
                          <td className="text-right d-none d-md-block">
                            <a
                              data-original-title="Save to Wishlist"
                              title=""
                              href=""
                              className="btn btn-light"
                              data-toggle="tooltip"
                              data-abc="true"
                            >
                              {" "}
                              <i className="fa fa-heart"></i>
                            </a>{" "}
                            <a className="btn btn-light" data-abc="true" onClick={()=>removeItem(item.cart._id)} >
                              {" "}
                              Remove
                            </a>{" "}
                          </td>
                        </tr>)
                        }):
                        <>
                        <div className="pb-1 h-100 text-center ">
                          <p className='text-center h4'> Cart is empty. </p>
                        </div>
                        </>
                        }
                      </tbody>
                    </table>
                    :
                    <div className="h-100 p-4 ">
                      {/* <Circles color="#00BFFF" height={80} width={80} wrapperStyle={{display: "flex",justifyContent: "center",alignItems: "center" }} /> */}
                      <TailSpin color="#f00" height={50} width={50} wrapperStyle={{display: "flex",justifyContent: "center",alignItems: "center" }} />
                    </div>
                    }
                  </div>
                </div>
              </aside>
              <aside className="col-md-3 cart-container">
                <div className="card mb-3 ">
                  <div className="card-body ">
                    <form>
                      <div className="form-group row">
                        <div className="input-group">
                          <label>Have coupon?</label>
                          <div className="col-12 m-0 p-0 ">
                          <input
                            type="text"
                            className="form-control w-50 " 
                            name=""
                            placeholder="Coupon code" />
                          </div>
                          <div className="input-group-append col-md-6">
                            <span className="mt-3 m-auto ">
                              <button className="btn btn-primary btn-apply coupon mt-3">
                                Apply
                              </button>
                          </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <dl className="dlist-align">
                      <dt>Total price:</dt>
                      <dd className="text-right ml-3">{totalAndDiscount.total?`$${parseFloat(totalAndDiscount.total).toFixed(2)}`:"0.00"}</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>Discount:</dt>
                      <dd className="text-right text-danger ml-3">- {totalAndDiscount.discount?`$${parseFloat(totalAndDiscount.discount).toFixed(2)}`:"$0.00"}</dd>
                    </dl>
                    <dl className="dlist-align">
                      <dt>Total:</dt>
                      <dd className="text-right text-dark b ml-3">
                        <strong>{
                          totalAndDiscount.total?
                          `$${parseFloat(totalAndDiscount.total - totalAndDiscount.discount).toFixed(2)}`
                          :"$0.00"}</strong>
                      </dd>
                    </dl>
                    <hr />
                    <div className="text-center">
                    <a
                      style={{display:`${cartData?.length<1? "none":""}`}}
                      id="btn_make_Purchase"
                      className="btn btn-out btn-primary btn-square btn-main mr-3"
                      data-abc="true"
                      onClick={()=>navigate("/checkout")}
                    >
                      Make Purchase
                    </a>
                    <a
                      href="productlisting"
                      className="btn btn-out btn-success btn-square btn-main"
                      data-abc="true"
                    >
                      Continue Shopping
                    </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </>
  )
}

export default Cart