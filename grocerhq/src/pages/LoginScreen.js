import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Login from '../components/Login/login.component';
import axios from 'axios';
import '../components/Login/login.css';
import Navbar from 'react-bootstrap/Navbar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [url, setURL] = useState('');
  const [msg, setMessgae] = useState('');

  const submitHandler = (e) => {
    console.log(e);
    console.log(email, password)
    const creds = {
      email: email,
      password: password,
    }
    axios.post("http://localhost:5001/login", creds)
              .then((res) => {
                console.log("CAlled post for calueee")
                console.log(res.data)
                if (res.data != false) {
                  localStorage.setItem("userId", res.data._id);
                  setisLoggedIn(true);
                  if(res.data.username === "admin") {
                    localStorage.setItem("userName", res.data.username);
                    console.log("Logged in as ADmin: ", res.data.username)
                    setURL("/update");
                  } else {
                    localStorage.setItem("userName", res.data.username);
                    console.log("Logged in as a customer: ", res.data.username);
                    setURL("/");
                  }
                }  else {
                  setisLoggedIn(false);
                  setMessgae("Error. Username or Password invalid. Please try again")
                }
              });
    e.preventDefault();
  };
  return (
    <><Login></Login>
    <div>
      <Navbar bg="dark" variant="dark" className='col-md-12 navbar-login'>
        <Navbar.Brand className='mx-5'>
          <a className="navbar-brand" href="/"><h2>GROCER <em>HQ</em></h2></a>
        </Navbar.Brand>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
      <div className='col-md-6 loginWrapper'>
        <div className='loginform' title="LOGIN">
          <div>
            <span className='error-message'>{msg}</span>
            <Form onSubmit={submitHandler}>
              <Form.Group className='form-group' controlId="formBasicEmail">
                <Form.Label className='col-form-label label-text'>Enter your Email address</Form.Label>
                <Form.Control className='form-control-lg'
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className='form-group' controlId="formBasicPassword">
                <Form.Label className='col-form-label label-text'>Enter your Password</Form.Label>
                <Form.Control
                  className='form-control-lg'
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <br />
              <div className='loginbtn'>
                <Button className="btn-lg btn-block btn-outline-light" variant="dark" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <Row className="py-3">
              <Col>New Customer?<Link to='/register'>Register</Link> </Col>
            </Row>
            {isLoggedIn ? <Navigate to={url} /> : <br />}
          </div>
        </div>
      </div>
    </div></>
  );
}
