import React, { Component } from "react";
import {useNavigate} from 'react-router-dom'
import Header from "../Header/header.component";
import axios from 'axios';
import './style.css'

export default function ProductRow1({ id, image, name, quantity, price, tag, onAddToCart, onProductDetail }) {

    const navigate = useNavigate();

    return (
      <>
             <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4 ">
                            <div style={{cursor:"pointer"}} onClick={()=>navigate(`/product-details/${id}/${tag}`)} >
                                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img class="img-fluid w-100" src={process.env.PUBLIC_URL + '/assets/assets/' + image} alt={name} />
                                </div>
                                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6>{name}</h6>
                                    <div class="d-flex justify-content-center">
                                        <h6>{price}$</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border">
                                <a class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                <a class="btn btn-sm text-dark p-0" onClick={()=>onAddToCart(id)} ><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                            </div>
                        </div>
                    </div>
                





    </>
    );
  }

