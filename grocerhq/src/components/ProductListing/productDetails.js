import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Navbar/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Rings, Circles, InfinitySpin, TailSpin } from "react-loader-spinner";
import { axiosInstance } from "../../config/axios.config";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id, tag } = useParams();
  const [product, setProduct] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const userId = localStorage.getItem("userId") || null;

  const getProduct = async () => {
    console.log(id, tag);
    const response = await axiosInstance.post(`/products`, { tag: tag });
    console.log("response", response.data);
    let product = response.data.find((product) => product._id === id);
    console.log("product", product);
    setAllProducts(response.data);
    setProduct(product);
  };

  const addToCart = async () => {
    console.log("id", id);
    try {
      if (userId) {
        let cartData = {
          user_id: userId,
          product_id: product._id,
          tag: product.tag,
        };
        let resp = await axiosInstance.post("/cart/add", cartData);
        console.log("resp", resp.data);
      } else {
        alert("Please login to add product to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log("product", product);
  console.log("allProducts", allProducts);

  return (
    <>
      <Header />
      {product ? (
        <>
          <div className="row">
            <div class=" col-12 col-md-6 m-4 ">
              <div class="card border-0 m-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-5 mt-5">
                  <img
                    class="img-fluid w-100 h-75 "
                    src={
                      process.env.PUBLIC_URL + "/assets/assets/" + product.image
                    }
                    alt={product.name}
                  />
                </div>
              </div>
            </div>
            <div class=" col-12 col-md-5 m-4 w-100 ">
              <div class="w-100 m-4">
                <div class="card border-0 m-4 d-flex justify-content-center align-item-center ">
                  <div class="card-body border p-5 mt-5 ">
                    <h1 className="text-center">{product.name}</h1>
                    <div class="d-flex justify-content-center">
                      <h4>{product.price}$</h4>
                    </div>
                    <div class="d-flex justify-content-center">
                      <h4 class="text-success">Category: {product.tag}</h4>
                    </div>
                    <div class="d-flex justify-content-center">
                      <p>
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quidem. Quisquam, quidem.
                      </p>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        class="btn btn-success btn-lg"
                        onClick={addToCart}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-100 m-4">
                <div class="card border-0 m-4 d-flex justify-content-center align-item-center ">
                  <div class="card-body border p-5 mt-5 ">
                    <h3 className="text-center">Discription</h3>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <h3 class="ml-5">You may also like...</h3>
            <div className="row ">
              {allProducts ? (
                allProducts.map((item, index) => (
                  <div class=" col-3 col-md-2 ml-5">
                    <div class="card card-block product-img bg-transparent border p-4 mt-1">
                      <p class="text-center">{item.name}</p>
                      <img
                        class="img-fluid "
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/assets/" +
                          item.image
                        }
                        alt={item.name}
                      />
                      <p class="text-center">{item.price}$</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <p>No Products Found</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <TailSpin
          color="#f00"
          height={50}
          width={50}
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </>
  );
}
