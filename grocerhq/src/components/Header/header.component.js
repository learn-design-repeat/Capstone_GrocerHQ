import React, { Component } from "react";
export default class Cart extends Component {
  render() {
    let log = <></> 

    const isUserLoggedIn = () => {
      let id = localStorage.getItem("userId")
      console.log(id)
      if(id != null) {
        return true;
      }
      return false;
    }

    const handleLogoutClick = () => {
      console.log("Delete id")
      localStorage.removeItem("userId");
      document.cookie = "g_state= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
  

    if(!isUserLoggedIn()) {
      log =  <><li className="nav-item"><a className="nav-link" href="login">Login</a></li></>
    } else {
      log = <><li className="nav-item"><a className="nav-link" href="allorders">My Orders</a></li>
              <li className="nav-item"><a className="nav-link" href="login" onClick={handleLogoutClick}>Logout</a></li>
            </>
    }

    return (
      
      <header className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
			
          <a className="navbar-brand" href="index.html"><h2>GROCER <em>HQ</em></h2></a>
			
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="index.html">Home
                  <span className="sr-only">(current)</span>
                </a>
              </li> 
              <li className="nav-item">
                <a className="nav-link" href="/productlisting">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">Cart</a>
              </li>
              {log}
            </ul>
          </div>
        </div>
      </nav>
    </header>

    );
  }
}
