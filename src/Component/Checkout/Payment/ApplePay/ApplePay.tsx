import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

function ApplePay({ totalAmount, setPaidUsingApplePay, setOrderData }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [applePaySupported, setApplePaySupported] = useState(true);

  // const placeOrderResponse = useSelector((state: any) => state?.placeOrder);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
    const payableAmountIncents = Math.round(totalAmount.toFixed(2) * 100);

    // CREATE PAYMENT REQUEST FOR STRIPE
    const pr = stripe?.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Total amount",
        amount: payableAmountIncents,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // CHECK IF USER CAN MAKE PAYMENT OR NOT USING APPLE PAY
    if (pr) {
      pr.canMakePayment()
        .then((result) => {
          if (result?.applePay) {
            setPaymentRequest(pr);
            pr.on("cancel", handleCancelPayment);
            pr.on("paymentmethod", handleApplePayPayment);
            // Mount paymentRequestButtonElement to the DOM
          } else {
            setApplePaySupported(false);
          }
        })
        .catch((errror) => {
          alert(errror?.message);
        });
    }
  }, [stripe, elements]);

  const handleCancelPayment = () => {
    // handle cancel event
    alert("Payment Canceled");
  };

  // Give control to apple pay for handling payment [APPLE PAY POPOU OPENS FOR PAYMENT]

  const handleApplePayPayment = async (event: any) => {
    // GET CURRENT QUOTE FROM APPLE PAY AND CREATE PAYMENT INTENT
    try {
      setOrderData("cardToken", event?.paymentMethod?.id);
      setTimeout(() => {
        setPaidUsingApplePay(true);
        event.complete("success");
      }, 100);
    } catch (error: any) {
      alert(error?.message);
    }
  };

  return (
    <>
      {/* {paymentRequest && <PaymentElement />} */}
      {/* <h3>Apple pay</h3> */}
      <div>
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}

        {!applePaySupported && (
          <p>
            Apple pay not supported by this browser or you have not added card
            on wallet to make payment with Apple Pay.
          </p>
        )}
      </div>
    </>
  );
}

export default ApplePay;
