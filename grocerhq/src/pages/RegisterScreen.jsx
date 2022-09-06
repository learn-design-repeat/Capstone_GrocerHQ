import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import '../components/Login/login.css';
import Navbar from 'react-bootstrap/Navbar';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const addUser = (email) => {
    var userfound = false;
    axios.get("http://localhost:5001/login")
      .then((res) => {
            res.data.find(users => {
              if (users.email === email) {
                userfound = true;
                console.log(userfound);
                console.log("A match email:", users.email)
              } else {
                console.log("Not a match email:", users.email)
              }
            });
      })
      .finally(() => {
            console.log("after Call", userfound);
            if (userfound) {
              setErr("User Email already Exists: ", email);
            } else {
              const newUser = {
                username: name,
                email: email,
                password: password,
              }
              console.log(newUser);
              axios.post("http://localhost:5001/login/register", newUser)
              .then((res) => {
                console.log("CAlled post")
                console.log(res)
                localStorage.setItem("userId", res.data);
                setisLoggedIn(true);
              });
            }
        });
    return userfound;
  }
  const submitHandler = (e) => {
    setErr('');
    if (password !== confirmpassword) {
      setErr("Password and ConfirmPassword must match");
    } else {
      addUser(email);
    }
    
    e.preventDefault();
  };

  return (
    <div> 
     <Navbar bg="dark" variant="dark" className='col-md-12 navbar-login'>
      <Navbar.Brand className='mx-5' >
      <a className="navbar-brand" href="/"><h2>GROCER <em>HQ</em></h2></a>
      </Navbar.Brand>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
      <div className='col-md-8 loginWrapper'>
        <div>
          <Form onSubmit={submitHandler}>
          <p className='error-message'>{err}</p>
          <Form.Group className='form-group' controlId="name">
            <Form.Label className='col-form-label label-text'>Name</Form.Label>
            <Form.Control className='form-control-lg'
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="formBasicEmail">
            <Form.Label className='col-form-label label-text' >Email address</Form.Label>
            <Form.Control className='form-control-lg'
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="formBasicPassword">
            <Form.Label className='col-form-label label-text' >Password</Form.Label>
            <Form.Control className='form-control-lg'
              type="password"
              value={password}
              autoComplete="section-new password new-password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='form-group' controlId="confirmPassword">
            <Form.Label className='col-form-label label-text' >Confirm Password</Form.Label>
            <Form.Control className='form-control-lg'
              type="password"
              autoComplete="section-confirm password confirm-password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <div className='loginbtn'>
            <Button variant="dark" type="submit">
              Register
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to='/Login'>Login</Link>
          </Col>
        </Row>
        { isLoggedIn ? <Navigate to="/" /> : <br/>}
        </div>
      </div>
    </div>
  );
}
