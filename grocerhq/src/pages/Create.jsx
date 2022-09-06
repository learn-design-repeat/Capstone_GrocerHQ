import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../components/Login/login.css';
import AdminHeader from '../components/Navbar/AdminHeader';

export default function Create() {
  const [productName, setProductName] = useState('');
  const [tag, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const addProduct = (producttag) => {
    var productfound = false;
    axios.get("http://localhost:5001/products")
      .then((res) => {
            res.data.find(products => {
              if (products.productName === productName) {
                productfound = true;
                console.log(productfound);
                console.log("A match productName:", products.productName)
              } else {
                console.log("Not a match productName:", products.productName)
              }
            });
      })
      .finally(() => {
            console.log("after Call", productfound);
            if (productfound) {
              console.log("User ProductName already Exists: ", productName);
            } else {
              const newProduct = {
                tag: tag,
                name: productName,
                price: price,
                image: image,
                quantity: quantity
              }
              console.log(newProduct);
              axios.post("http://localhost:5001/products/add", newProduct)
              .then((res) => {
                console.log("CAlled post")
                console.log(res)
              });
            }
        });
    return productfound;
  }
  const submitHandler = (e) => {
    addProduct(productName);
    e.preventDefault();
  };

  return (
    <div> 
      <AdminHeader></AdminHeader>
      <br /><br /><br /><br />
      <div className='col-md-8 loginWrapper'>
        <div>
          <Form onSubmit={submitHandler}>
          <Form.Group className='form-group' controlId="tag">
            <Form.Label className='col-form-label label-text'>Tag Name</Form.Label>
            <Form.Control className='form-control-lg'
              type="text"
              value={tag}
              placeholder="Enter tag"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="formBasicProductName">
            <Form.Label className='col-form-label label-text' >Product Name</Form.Label>
            <Form.Control className='form-control-lg'
              type="text"
              value={productName}
              placeholder="Enter productName"
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="formBasicPrice">
            <Form.Label className='col-form-label label-text' >Price</Form.Label>
            <Form.Control className='form-control-lg'
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="Quantity">
            <Form.Label className='col-form-label label-text' >Quantity</Form.Label>
            <Form.Control className='form-control-lg'
              type="number"
              value={quantity}
              placeholder="No of Products in Stock"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="Image">
            <Form.Label className='col-form-label label-text' >Product Image</Form.Label>
            <Form.Control className='form-control-lg'
              type="text"
              value={image}
              placeholder="Image 'name' placed in asset/images/<name.fmt>"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <div className='loginbtn'>
            <Button variant="dark" type="submit">
              Add
            </Button>
            <br></br>
          </div>
        </Form>
        </div>
      </div>
    </div>
  );
}
