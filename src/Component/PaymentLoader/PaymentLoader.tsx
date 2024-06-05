import React from "react";
import Cupcake from "../../Assets/img/cupcake.svg";

export default function PaymentLoader() {
  return (
    <div className="payment-loader-wrapper">
      <div className="loader">
        <div className="wrapper">
      <div className="cake-wrapper">
      <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
          <img src={Cupcake} alt="cupcake" />
      </div>
          <p className="mt-3">
            Please wait while we are processing your payment.
          </p>
        </div>
      </div>
    </div>
  );
}
