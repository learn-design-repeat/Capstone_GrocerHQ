import React, { useEffect, useState } from "react";
import { Rings, Circles, InfinitySpin, TailSpin } from "react-loader-spinner";
import { axiosInstance } from "../../config/axios.config";
import Header from "../Navbar/Header";

function Checkout() {
  const userId = localStorage.getItem("userId") || null;
  const shippingCharges = {
    "Instore-pickup": 0,
    Ground: 10,
    "2nd Day Air": 20,
    "Next Day Air": 30,
  };

  const [userShippingDetails, setUserShippingDetails] = useState({});
  const [userBillingDetails, setUserBillingDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAndDiscount, setTotalAndDiscount] = useState({});
  const [
    isShippingAddressSameAsBillingAddress,
    setIsShippingAddressSameAsBillingAddress,
  ] = useState(false);
  const [shippingMethodAndPaymentMethord, setShippingMethodAndPaymentMethord] =
    useState({
      shippingMethord: null,
      paymentMethord: null,
    });

  const getOrderDetails = async () => {
    try {
      console.log("getOrderDetails", userId);
      if (userId) {
        const response = await axiosInstance.post("/checkout", {
          userId: userId,
        });
        console.log("order", response.data.data);
        const totalAndDiscount = getTotalAndDiscount(
          response.data.data.cartItems
        );
        console.log("final obj", response.data.data);
        setUserShippingDetails(response.data.data.user);
        setCartItems(response.data.data.cartItems);
        setTotalAndDiscount(totalAndDiscount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAndDiscount = (cartItems) => {
    try {
      let totalAmount = cartItems.reduce((acc, curr) => {
        return (
          acc + parseFloat(curr.product.price) * parseInt(curr.cart.quantity)
        );
      }, 0);
      console.log("total", totalAmount);
      // let discount = c.reduce((acc, curr) => {
      //     return acc + parseFloat(curr.product.discount) * parseInt(curr.cart.quantity);
      //   } , 0);
      //   console.log("discount", discount);
      return { totalAmount, discount: 0 };
    } catch (err) {
      console.log("error", err);
    }
  };

  const __DEV__ = document.domain;

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement(`script`);
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error(`Script load error for ${src}`));
      };
      document.head.appendChild(script);
    });
  };

  const showRazorPay = async (e) => {
    e.preventDefault();

    const script = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    //validate form
    if (
      !userShippingDetails.username ||
      !userShippingDetails.email ||
      !userShippingDetails.phone ||
      !userShippingDetails.address ||
      !userShippingDetails.city ||
      !userShippingDetails.state ||
      !userShippingDetails.zip ||
      !userShippingDetails.country
    ) {
      console.log("form is not valid", userShippingDetails);
      alert("Please fill all the fields");
      return;
    }

    //validate card shipping method and payment method
    if (
      !shippingMethodAndPaymentMethord.shippingMethord ||
      !shippingMethodAndPaymentMethord.paymentMethord
    ) {
      console.log("form is not valid", shippingMethodAndPaymentMethord);
      alert("Please select shipping method and payment method");
      return;
    }
    debugger;
    if (script) {
      const response = await axiosInstance.post("/checkout/paymentinitiated", {
        userId: userId,
        shippingMethord: shippingMethodAndPaymentMethord?.shippingMethord,
        paymentMethod: shippingMethodAndPaymentMethord?.paymentMethord,
      });
      console.log(response.data.data);
      const { id, amount, currency, orderId } = response.data.data;

      var options = {
        key:
          __DEV__ == "localhost"
            ? "rzp_test_SaZq2c9ROy1KmS"
            : "__NOT__AVAILABLE__FOR__NOW__", //Key is generated for only test purpose
        amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 1.00 INR
        currency: currency,
        name: "Grocer_HQ",
        description: "Test Transaction",
        order_id: id,
        image: "https://s3.amazonaws.com/rzp-uploads/images/rzp.png",
        handler: async function (response) {
          console.log(response);
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const res = await axiosInstance.post("/checkout/paymentcompleted", {
            userId: userId,
            orderId: orderId,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
          });
          console.log(res.data);
          if (res.data.message === "Success") {
            alert("Payment Successful, Thank you for shopping with us");
            window.location.href = "/";
          }
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9995575570",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };
      //var rzp1 = new Razorpay(options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  const getShippingDetails = (e) => {
    e.preventDefault();
    setUserShippingDetails({
      ...userShippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const getBillingDetails = (e) => {
    e.preventDefault();
    setUserBillingDetails({
      ...userBillingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addShippingAddressToBillingAddress = () => {
    if (isShippingAddressSameAsBillingAddress) {
      setUserBillingDetails({ ...userBillingDetails, ...userShippingDetails });
    }
  };

  const getShippingMethord = (e) => {
    console.log("shippingMethord", e.target.value);
    setShippingMethodAndPaymentMethord({
      ...shippingMethodAndPaymentMethord,
      shippingMethord: e.target.value,
    });
  };

  const getPaymentMethord = (e) => {
    console.log("paymentMethord", e.target.value);
    setShippingMethodAndPaymentMethord({
      ...shippingMethodAndPaymentMethord,
      paymentMethord: e.target.value,
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    addShippingAddressToBillingAddress();
  }, [isShippingAddressSameAsBillingAddress]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        {!cartItems.length ? (
          <div className="h-100 p-4 ">
            {/* <Circles color="#00BFFF" height={80} width={80} wrapperStyle={{display: "flex",justifyContent: "center",alignItems: "center" }} /> */}
            <TailSpin
              color="#f00"
              height={50}
              width={50}
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-5 col-12 border m-4 bg-secondary ">
              <div className="card-body">
                <form className="">
                  <p className="text-center">Shipping Address</p>
                  <div className="form-group w-auto ">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control "
                      name="username"
                      id="name"
                      placeholder="Enter name"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.username}
                    />
                  </div>
                  <div className="form-group w-auto ">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control "
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.email}
                    />
                  </div>
                  <div className="form-group w-auto ">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control "
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.address}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control "
                      name="phone"
                      id="phone"
                      placeholder="Enter phone"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.phone}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control "
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.city}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control "
                      name="state"
                      id="state"
                      placeholder="Enter state"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.state}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control "
                      name="zip"
                      id="zip"
                      placeholder="Enter zip"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.zip}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control "
                      name="country"
                      id="country"
                      placeholder="Enter country"
                      onChange={getShippingDetails}
                      value={userShippingDetails?.country}
                    />
                  </div>
                  <div className="form-check">
                    <span className="">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="same-address"
                        onClick={() =>
                          setIsShippingAddressSameAsBillingAddress(
                            (prevValue) => !prevValue
                          )
                        }
                      />
                      <label htmlFor="same-address">
                        Shipping address same as billing
                      </label>
                    </span>
                  </div>
                </form>
                <form className="">
                  <p className="text-center">Billing Address</p>
                  <div className="form-group w-auto ">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control "
                      name="username"
                      id="name"
                      placeholder="Enter name"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.username}
                    />
                  </div>
                  <div className="form-group w-auto ">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control "
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.email}
                    />
                  </div>
                  <div className="form-group w-auto ">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control "
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.address}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control "
                      name="phone"
                      id="phone"
                      placeholder="Enter phone"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.phone}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control "
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.city}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control "
                      name="state"
                      id="state"
                      placeholder="Enter state"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.state}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control "
                      name="zip"
                      id="zip"
                      placeholder="Enter zip"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.zip}
                    />
                  </div>
                  <div className="form-group w-auto">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control "
                      name="country"
                      id="country"
                      placeholder="Enter country"
                      disabled={isShippingAddressSameAsBillingAddress}
                      onChange={getBillingDetails}
                      value={userBillingDetails?.country}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5 col-12 m-4">
              <div className="row">
                <div className="col-12 pb-3 ">
                  <div className="card-body border bg-secondary ">
                    <form className="" onChange={getShippingMethord}>
                      <p className="text-center">Shippig methord</p>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="shipping-methord"
                          aria-label="Radio button"
                          value="Instore-pickup"
                          checked={
                            shippingMethodAndPaymentMethord.shippingMethord ==
                            "Instore-pickup"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          Instore-pickup ($0.00)
                        </p>
                        <span
                          className="font-weight-light ml-3"
                          style={{ fontSize: ".8rem" }}
                        >
                          {" "}
                          Pick up your item from the store.{" "}
                        </span>
                      </div>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="shipping-methord"
                          aria-label="Radio button"
                          value="Ground"
                          checked={
                            shippingMethodAndPaymentMethord.shippingMethord ==
                            "Ground"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          Ground ($10.00)
                        </p>
                        <span
                          className="font-weight-light ml-3"
                          style={{ fontSize: ".8rem" }}
                        >
                          {" "}
                          Compare to other shipping, ground shipping is carried
                          out closer to the earth.{" "}
                        </span>
                      </div>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="shipping-methord"
                          aria-label="Radio button"
                          value="2nd Day Air"
                          checked={
                            shippingMethodAndPaymentMethord.shippingMethord ==
                            "2nd Day Air"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          2nd Day Air. ($20.00)
                        </p>
                        <span
                          className="font-weight-light ml-3"
                          style={{ fontSize: ".8rem" }}
                        >
                          {" "}
                          The two day air shipping.{" "}
                        </span>
                      </div>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="shipping-methord"
                          aria-label="Radio button"
                          value="Next Day Air"
                          checked={
                            shippingMethodAndPaymentMethord.shippingMethord ==
                            "Next Day Air"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          Next Day Air. ($20.00)
                        </p>
                        <span
                          className="font-weight-light ml-3"
                          style={{ fontSize: ".8rem" }}
                        >
                          {" "}
                          The one day air shipping.{" "}
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-12 pb-3 ">
                  <div className="card-body border bg-secondary ">
                    <form className="" onChange={getPaymentMethord}>
                      <p className="text-center">Payment methord</p>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="payment-methord"
                          aria-label="Radio button"
                          value="UPI"
                          checked={
                            shippingMethodAndPaymentMethord.paymentMethord ==
                            "UPI"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          UPI{" "}
                        </p>
                      </div>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="payment-methord"
                          aria-label="Radio button"
                          value="Credit/Debit Card"
                          checked={
                            shippingMethodAndPaymentMethord.paymentMethord ==
                            "Credit/Debit Card"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          Credit/Debit Card
                        </p>
                      </div>
                      <div className="input-group w-auto d-flex  align-items-center pb-2">
                        <input
                          type="radio"
                          name="payment-methord"
                          aria-label="Radio button"
                          value="RazorPay"
                          checked={
                            shippingMethodAndPaymentMethord.paymentMethord ==
                            "RazorPay"
                          }
                        />
                        <p className="m-0 pl-1 text-black font-weight-bold ">
                          {" "}
                          RazorPay{" "}
                        </p>
                        {shippingMethodAndPaymentMethord.paymentMethord ==
                        "RazorPay" ? (
                          <button
                            className="btn btn-success btn-group-lg ml-5"
                            onClick={showRazorPay}
                          >
                            {" "}
                            Pay Now{" "}
                          </button>
                        ) : null}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-12 pb-3 ">
                  <div className="card-body border bg-secondary ">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price($)</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems
                          ? cartItems.map((item, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <div className="row">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/assets/assets/" +
                                        item.product.image
                                      }
                                      className="col-2"
                                      alt="..."
                                    />
                                    <p>{item.product.name}</p>
                                  </div>
                                </td>
                                <td>{item.product.price}</td>
                                <td>{item.cart.quantity}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-12 pb-3 ">
                  <div className="card-body border bg-secondary ">
                    <div className="card">
                      <div className="card-body">
                        <dl className="dlist-align">
                          <dt>Total price:</dt>
                          <dd className="text-right ml-3">
                            {totalAndDiscount.totalAmount
                              ? `$${parseFloat(
                                  totalAndDiscount.totalAmount
                                ).toFixed(2)}`
                              : "0.00"}
                          </dd>
                        </dl>
                        <dl className="dlist-align">
                          <dt>Discount:</dt>
                          <dd className="text-right text-danger ml-3">
                            - $
                            {totalAndDiscount.discount
                              ? `${parseFloat(
                                  totalAndDiscount.discount
                                ).toFixed(2)}`
                              : "0.00"}
                          </dd>
                        </dl>
                        <dl className="dlist-align">
                          <dt>Shipping Charge:</dt>
                          <dd className="text-right ml-3">
                            $
                            {shippingMethodAndPaymentMethord.shippingMethord
                              ? `${parseFloat(
                                  shippingCharges[
                                    shippingMethodAndPaymentMethord
                                      .shippingMethord
                                  ]
                                ).toFixed(2)}`
                              : "0.00"}
                          </dd>
                        </dl>
                        <dl className="dlist-align">
                          <dt>Total:</dt>
                          <dd className="text-right text-dark b ml-3">
                            <strong>
                              {totalAndDiscount.totalAmount
                                ? "$" +
                                  parseFloat(
                                    totalAndDiscount.totalAmount -
                                      totalAndDiscount.discount +
                                      (shippingMethodAndPaymentMethord.shippingMethord
                                        ? shippingCharges[
                                            shippingMethodAndPaymentMethord
                                              .shippingMethord
                                          ]
                                        : 0)
                                  ).toFixed(2)
                                : "$0.00"}
                            </strong>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
