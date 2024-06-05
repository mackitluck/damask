import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function Stripe(props: any) {
  const stripe = useStripe();
  const elements = useElements();
  /* const [cardNumberError, setCardNumberError] = useState<any>('');
    const [cardExpiryError, setCardExpiryError] = useState<any>('');
    const [cardCvvError, setCardCvvError] = useState<any>(''); */

  useEffect(() => {
    if (props.cardTokenCreated) {
      if (elements == null) {
        return;
      }
      const cardElement = elements.getElement(CardNumberElement);
      if (cardElement == null) {
        return;
      }
      stripe
        ?.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            address: {
              city: props?.addressData?.address?.b_city?.value,
              country: props?.addressData?.address?.b_countryId?.value,
              line1: props?.addressData?.address?.b_street?.value,
              postal_code: props?.addressData?.address?.b_zipCode?.value,
              state: props?.addressData?.address?.b_states?.value,
            },
          },
        })
        .then((result: any) => {
          console.log("result", result);
          if (result.error) {
          } else {
            props.setCardToken(true);
            props.setOrderData("cardToken", result.paymentMethod.id);
          }
        });
    }
  }, [props.cardTokenCreated]);

  // const handleSubmit = async (event: any) => {
  //     event.preventDefault();

  //     if (elements == null) {
  //         return;
  //     }
  //     const cardElement = elements.getElement(CardNumberElement);
  //     if (cardElement == null) {
  //         return;
  //     }
  //     // const paymentMethod: any = await stripe?.createPaymentMethod({
  //     //     type: 'card',
  //     //     card: cardElement,
  //     //     billing_details: {
  //     //         address: {
  //     //             city: props?.addressData?.address?.b_city?.value,
  //     //             country: props?.addressData?.address?.b_countryId?.value,
  //     //             line1: props?.addressData?.address?.b_street?.value,
  //     //             postal_code: props?.addressData?.address?.b_zipCode?.value,
  //     //             state: props?.addressData?.address?.b_states?.value
  //     //         }
  //     //     }
  //     // });
  //     // stripe?.createPaymentMethod({
  //     //     type: 'card',
  //     //     card: cardElement,
  //     //     billing_details: {
  //     //         address: {
  //     //             city: props?.addressData?.address?.b_city?.value,
  //     //             country: props?.addressData?.address?.b_countryId?.value,
  //     //             line1: props?.addressData?.address?.b_street?.value,
  //     //             postal_code: props?.addressData?.address?.b_zipCode?.value,
  //     //             state: props?.addressData?.address?.b_states?.value
  //     //         }
  //     //     }
  //     // }).then((result: any) => {
  //     //     console.log("result", result);
  //     //     if (result.error) {

  //     //     } else {
  //     //         // props.setCardTokenCreated(true);
  //     //         // props.setCardToken(result.paymentMethod.id);
  //     //     }
  //     // });
  // };

  return (
    <div className="card-input-wrapper">
      <Row>
        <Col xs={12}>
          <label>Card Number</label>
          <CardNumberElement
            options={{
              showIcon: true,
              iconStyle: "solid",
              classes: {
                base: "form-control",
                complete: "form-control",
                invalid: "form-control",
              },
            }}
            onChange={(e: any) => {
              console.log("e-number", e);
              if (e.error) {
                props.setCardNumberError(e.error.message);
              } else if (e.empty) {
                props.setCardNumberError("Please enter your card number");
              } else {
                props.setCardNumberError("");
              }
            }}
          />
          {props.cardNumberError && (
            <span className="error">{props.cardNumberError}</span>
          )}
        </Col>
        <Col xs={7}>
          <label>Expiry Date</label>
          <CardExpiryElement
            options={{
              classes: {
                base: "form-control",
                complete: "form-control",
                invalid: "form-control",
              },
            }}
            onChange={(e: any) => {
              if (e.error) {
                props.setCardExpiryError(e.error.message);
              } else if (e.empty) {
                props.setCardExpiryError("Please enter your card expiry");
              } else {
                props.setCardExpiryError("");
              }
            }}
          />
          {props.cardExpiryError && (
            <span className="error">{props.cardExpiryError}</span>
          )}
        </Col>
        <Col xs={5}>
          <label>CVV</label>
          <CardCvcElement
            options={{
              classes: {
                base: "form-control",
                complete: "form-control",
                invalid: "form-control",
              },
              placeholder: "CVV",
            }}
            onChange={(e: any) => {
              console.log("e-cvv", e);
              if (e.error) {
                props.setCardCvvError(e.error.message);
              } else if (e.empty) {
                props.setCardCvvError("Please enter your card cvv");
              } else {
                props.setCardCvvError("");
              }
            }}
          />
          {props.cardCvvError && (
            <span className="error">{props.cardCvvError}</span>
          )}
        </Col>
      </Row>

      {/* <button onClick={(e: any) => handleSubmit(e)} type="submit" disabled={!stripe || !elements}>
                Pay
            </button> */}
    </div>
  );
}
