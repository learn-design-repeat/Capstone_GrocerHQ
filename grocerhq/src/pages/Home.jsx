import React from "react";
import Header from "../components/Navbar/Header";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div class=" header-text">
          <div class="owl-banner owl-carousel">
            <div class="banner-item-01">
              <div class="text-content">
                <h2>New Offers this season</h2>
                <a class="shop-now" href="/productlisting">
                  Shop now
                </a>
              </div>
            </div>
            <div class="banner-item-02">
              <div class="text-content">
                <h2>Get your best products</h2>
                <a class="shop-now" href="/productlisting">
                  Shop now
                </a>
              </div>
            </div>
            <div class="banner-item-03">
              <div class="text-content">
                <h2>Grab last minute deals</h2>
                <a class="shop-now" href="/productlisting">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="latest-products">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-heading">
                  <h2> Products</h2>
                  <a href="products.html">
                    view all products <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_01.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>Vegetables</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_02.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>Spices</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_03.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>Flours</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur..
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_04.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>juice</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_05.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>Dairy</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="product-item">
                  <a href="#">
                    <img src="/assets/assets/images/product_06.jpg" alt="" />
                  </a>
                  <div class="down-content">
                    <a href="#">
                      <h4>Grains</h4>
                    </a>

                    <p>
                      Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                      corporis nulla aspernatur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
