import React, { Component } from "react";
export default class Billing extends Component {
  render() {
    return (
      <div>
        <h2>Checkout Form</h2>
        <div class="container text-center ">
          <div class="row ">
            <div class="col ">
              <h3>Billing Details</h3>
              <div class="mb-3 ">
                <label for="exampleFormControlInput1" class="form-label">
                  First name
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />

                <label for="exampleFormControlInput1" class="form-label">
                  Last name
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Address
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <label for="exampleFormControlInput1" class="form-label">
                Zip code
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />

              <label for="exampleFormControlInput1" class="form-label">
                Province
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
              <br />
              <hr></hr>
              <h4>Payment methods</h4>

              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Radio button for following text input"
                    />
                  </div>
                </div>

                <p class="razo_paragraph">Razorpay</p>
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Radio button for following text input"
                    />
                  </div>
                </div>

                <p class="razo_paragraph">Paypal</p>
              </div>

              <button type="button" class="btn btn-primary paybutton">
                PAY
              </button>
            </div>

            <div class="col ">
              <h3>Amount</h3>

              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <p>Price</p>
                    <p>Tax</p>
                    <p>Delivery charges</p>
                  </div>
                  <div class="col">
                    <p>$000</p>
                    <p>$000</p>
                    <p>$000</p>
                  </div>
                  <hr class="paymenthr"></hr>
                  <div class="container text-center">
                    <div class="row">
                      <div class="col">Amount Payable</div>
                      <div class="col">$000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
