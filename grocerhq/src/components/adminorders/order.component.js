import React from "react";
import axios from "axios";
import OrderRow from "./display.component";
import AdminHeader from "../Navbar/AdminHeader"

export default class StoreOrder extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          orders: [],
          tag: "all",
        }
    }

    fetchorders = () => {
        console.log(this.state.tag);
        if (this.state.tag === "all") {
            axios.get("http://localhost:5001/allorders")
            .then((res) => {
                res.data.find(orders => {
                // console.log("orders from API", orders)
            });
            console.log("orders from API", res.data)
            this.setState({ orders: res.data});
            })
        } else {
            const tag_product = {
                tag: this.state.tag
              }
            axios.post("http://localhost:5001/allorders", tag_product)
            .then((res) => {
            res.data.find(orders => {
                // console.log("orders from API", orders)
            });
            console.log("orders from API", res.data)
            this.setState({ orders: res.data});
        })
        }
    }

    componentDidMount() {
        this.fetchorders();
    }

    render() {
        const handleChange = (e) => {
            console.log(this.state.tag)
            this.setState({ tag: e.target.value }, () => {
                this.fetchorders();
              }); 
            console.log(this.state.tag, e.target.value)
            
        }
        return (
         <>
         <AdminHeader></AdminHeader>
            <br />
            <div className="mt-md-5 col-md-12 d-flex justify-content-center align-content-center flex-wrap">
                <label htmlFor="category">Choose a Specific tag to filter:</label>
                <select name="category" onChange={(e) => handleChange(e)}> 
    		        <option value="all">All</option>
    		        <option value="Completed">Completed</option>
    		        <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
   		        </select>
            </div>
            <div className="col-md-11 d-flex-column align-content-around justify-content-around flex-wrap">
                    {this.state.orders.map(order => {
                        return <OrderRow key={order._id}
                            id={order._id}
                            userid={order.userid}
                            status = {order.status}
                            items={order.items} />;
                    })}
                </div></>
        );
      }
  } 