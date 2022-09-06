import React from "react";
import axios from "axios";
import ProductRow from "./display.component";
import AdminHeader from "../Navbar/AdminHeader"

export default class Update extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          products: [],
          tag: "all",
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
        return (
         <>
         <AdminHeader></AdminHeader>
            <br />
            <div className="mt-md-5 col-md-12 d-flex justify-content-center align-content-center flex-wrap filter-category">
                <label htmlFor="category">Choose a Specific tag to filter:</label>
                <select name="category" onChange={(e) => handleChange(e)}> 
    		        <option value="all">All</option>
    		        <option value="dal">Dal</option>
    		        <option value="dairy">Dairy</option>
                    <option value="spices">Spices</option>
                    <option value="snacks">Snacks</option>
                    <option value="masala">Masala</option>
   		        </select>
            </div>
            <div className="col-md-12 d-flex align-content-around justify-content-around flex-wrap">
                    {this.state.products.map(product => {
                        return <ProductRow key={product._id}
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            tag={product.tag}
                            quantity={product.quantity}
                            price={product.price} />;
                    })}
                </div></>
        );
      }
  } 