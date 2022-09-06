
import Header from "../Navbar/Header";
import React from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import ProductRow1 from "./main";
import { axiosInstance } from "../../config/axios.config";


export default class productlisting extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          products: [],
          tag: "all",
          userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : null,
        }
    }
    fetchProducts = () => {
        console.log(this.state.tag);
        if (this.state.tag === "all") {
            axios.get("http://localhost:5001/products")
            .then((res) => {
                res.data.find(products => {
                // console.log("Products from API", products)
            });
            console.log("Products from API", res.data)
            this.setState({ products: res.data});
            })
        } else {
            const tag_product = {
                tag: this.state.tag
              }
            axios.post("http://localhost:5001/products", tag_product)
            .then((res) => {
            res.data.find(products => {
                // console.log("Products from API", products)
            });
            console.log("Products from API", res.data)
            this.setState({ products: res.data});
        })
        }
    }
    componentDidMount() {
        this.fetchProducts();
    }
    render() {

        const handleChange = (e) => {
            console.log(this.state.tag)
            this.setState({ tag: e.target.value }, () => {
                this.fetchProducts();
              }); 
            console.log(this.state.tag, e.target.value)
            
        }

        const addToCart = async (id) => {
            console.log('id', id);
            try{
                if(this.state.userId){
                    let c = [...this.state.products];
                    let findProduct = c.find(product => product._id === id);
                    console.log('findProduct', findProduct);
                    let cartData = {
                        user_id: this.state.userId,
                        product_id: findProduct._id,
                        tag: findProduct.tag,
                    }
                    let resp = await axiosInstance.post('/cart/add', cartData)
                    console.log('resp', resp.data);
                }else{
                    alert("Please login to add product to cart");
                }
            }
            catch(error){
                console.log(error);
            }
        }

        const productDetail = (id) => {
        }

       
    return (
      <><Header></Header>
       <br />
       <div class="container-fluid pt-5">
        <div class="row px-xl-5">

           


        <div class="col-lg-3 col-md-12">
                
                <div class="border-bottom mb-4 pb-4">
                    <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="price-all"/>
                            <label class="custom-control-label" for="price-all">All Price</label>
                            <span class="badge border font-weight-normal">1000</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-1"/>
                            <label class="custom-control-label" for="price-1">$0 - $20</label>
                            <span class="badge border font-weight-normal">15</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-2"/>
                            <label class="custom-control-label" for="price-2">$20 - $40</label>
                            <span class="badge border font-weight-normal">10</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-3"/>
                            <label class="custom-control-label" for="price-3">$40 - $60</label>
                            <span class="badge border font-weight-normal">4</span>
                        </div>
                        
                    </form>
                </div>
                   <div class="border-bottom mb-4 pb-4">
                    <h5 htmlFor="category" class="font-weight-semi-bold mb-4">Filter by Category</h5>
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked id="color-all"/>
                            <label class="custom-control-label" for="price-all">All</label>
                            <span class="badge border font-weight-normal">100</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-1"/>
                            <label class="custom-control-label" for="color-1">Creals</label>
                            <span class="badge border font-weight-normal">15</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-2"/>
                            <label class="custom-control-label" for="color-2">Dairy</label>
                            <span class="badge border font-weight-normal">9</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-3"/>
                            <label class="custom-control-label" for="color-3">Masalas</label>
                            <span class="badge border font-weight-normal">24</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="color-4"/>
                            <label class="custom-control-label" for="color-4">Snacks</label>
                            <span class="badge border font-weight-normal">14</span>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="color-5"/>
                            <label class="custom-control-label" for="color-5">Spices</label>
                            <span class="badge border font-weight-normal">6</span>
                        </div>
                    </form>
                  
                </div>

            </div>
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name"/>
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                
                
                            <div class="dropdown ml-4">
                                <label htmlFor="category">Filter By   </label>    
                                            
                                        
                               
                                <select name="category" onChange={(e) => handleChange(e)}> 
                                    <option value="all">All</option>
                                    <option value="dal">Dal</option>
                                    <option value="dairy">Dairy</option>
                                    <option value="spices">Spices</option>
                                    <option value="snacks">Snacks</option>
                                    <option value="masala">Masala</option>
                                </select>
                                
                            </div>
                         
                        </div>
                    </div>
    
           
            <div className="col-md-12 d-flex align-content-around justify-content-around flex-wrap">
                    {this.state.products.map(product => {
                        return <ProductRow1 key={product._id}
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            tag={product.tag}
                            quantity={product.quantity}
                            price={product.price} 
                            onAddToCart={addToCart}
                            onProductDetail={productDetail}
                            />;
                    }) }
                </div>
 </div>
 </div>
 </div>
 </div>
 <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center mb-3">
                            <li class="page-item disabled">
                              <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>


    <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

 
</>
    );
  }
}
