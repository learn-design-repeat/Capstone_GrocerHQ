import './display.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function ProductRow({ id, image, name, quantity, price, tag}) {

    const updateHandler = (e) => {
        console.log(id);
        let url = "http://localhost:5001/products/" + id;
        const product = {
		    tag: tag,
		    name: name,
		    price: price,
		    image: image,
		    quantity: quantity
          }
        console.log(url, product); 
        axios.put(url, product)
        .then((res) => {
            console.log("Products from API", res)
        })
        window.location.reload();
        e.preventDefault();
    }
    const deleteHandler = (e) => {
        console.log(id);
        let url = "http://localhost:5001/products/" + id;
        console.log(url); 
        axios.delete(url)
        .then((res) => {
            console.log("Products from API", res)
        })
        window.location.reload();
        e.preventDefault();
    }

    return (
        <>
        <Form className="col-md-5 product-detail-wrapper"   >
            <img className="mb-3 col-md-12 prod-image" src={process.env.PUBLIC_URL + '/assets/assets/' + image} alt={name}   />
            <Form.Group className="mb-3 col-md-12"  controlId={id}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder={name} onChange={(e) => name = (e.target.value)} />
                <Form.Label>Product Tag</Form.Label>
                <Form.Control type="text" placeholder={tag} onChange={(e) => tag = (e.target.value)} />
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder={price} onChange={(e) => price = (e.target.value)} />
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="text" placeholder={quantity} onChange={(e) => quantity = (e.target.value)} />
                <Form.Label>Image name</Form.Label>
                <Form.Control type="text" placeholder={image} onChange={(e) => image = (e.target.value)} />
            </Form.Group>
            <div className='d-flex flex-row align-content-around justify-content-around flex-wrap'>
                <Button className="mb-3 col-md-3"  variant="dark" type="submit" onClick={updateHandler}> Update </Button>
                <Button className="mb-3 col-md-3"  variant="danger" type="submit" onClick={deleteHandler}> Delete </Button>
            </div>
            
        </Form>
        </>
    );
  }