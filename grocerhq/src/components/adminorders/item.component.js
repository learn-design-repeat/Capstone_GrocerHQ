import './display.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function ItemRow({ id, name, price, quantity}) {

    return (
        <>
        <Form className="col-md-12"   >
            <div className='d-flex flex-row align-content-around justify-content-around flex-wrap'>
                <Form.Group className="mb-1 col-md-9"  controlId={id}>
                    <Form.Label>Item ID</Form.Label>
                    <Form.Control type="text" placeholder={id} disabled/>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" placeholder={name} disabled />
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" placeholder={price} disabled />
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control type="number" placeholder={quantity} disabled />
                    <br></br>
                </Form.Group>
            </div>    
        </Form>
        </>
    );
  }