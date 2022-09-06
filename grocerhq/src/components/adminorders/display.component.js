import './display.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ItemRow from './item.component';
import axios from 'axios';


export default function OrderRow({ id, userid, items, status}) {

    const updateStatus = (e) => {
        console.log(id, userid, status, items);
        let url = "http://localhost:5001/allorders/" + id;
        const updatedStatus = {
		    status: status
          }
        console.log(url, "The status", updatedStatus); 
        axios.put(url, updatedStatus)
        .then((res) => {
            console.log("Products from API", res)
        })
        window.location.reload();
        e.preventDefault();
    }

    return (
        <>
        <Form className="col-md-12 product-detail-wrapper"   >
            <div className='d-flex flex-row align-content-around justify-content-around flex-wrap '>
                <Form.Group className="mb-1 col-md-9"  controlId={id}>
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control type="text" placeholder={id} disabled/>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" placeholder={userid} disabled />
                    <br></br>
                    <label htmlFor="status_update">Order Status:</label>
                    <select name="status_update" onChange={(e) => status = (e.target.value)}>
                        <option value={status}>{status}</option> 
    		            <option value="Completed">Completed</option>
    		            <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
   		            </select>
                       <div className="col-md-12 d-flex-column align-content-around justify-content-around flex-wrap product-detail-wrapper">
                        {items.map(item => {
                        return <ItemRow key={item._id}
                            id={item._id}
                            name={item.name}
                            quantity = {item.quantity}
                            price = {item.price} />;
                    })}
                    </div>
                </Form.Group>
            </div>
            <div className='d-flex flex-row align-content-around justify-content-around flex-wrap'>
                <Button className="mb-3 col-md-3"  variant="dark" type="submit" onClick={updateStatus}> Update Order Status</Button>
            </div>
            
        </Form>
        </>
    );
  }