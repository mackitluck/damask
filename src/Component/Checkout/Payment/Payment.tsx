import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckboxLabel from "../../Common/CheckboxLabel/CheckboxLabel";
import InputGroups from "../../Common/InputGroups/InputGroups";
import RadioLabel from "../../Common/RadioLabel/RadioLabel";
import Stripe from "./Stripe/Stripe";
import { loadStripe } from "@stripe/stripe-js";
import PaypalExpress from "./Paypal/PaypalExpress";
import { useDispatch } from "react-redux";
import { createPaypalExpressTokenAction } from "../../../Redux/CheckOut/CheckOutAction";
import ApplePay from "./ApplePay/ApplePay";

const PUBLISHABLE_KEY =
  "pk_live_51LhxgOHfvLm1V19H2qVpY5gaCYBFoAL2AHNfEcosABkCPppI5N4jETxBNvoHxLClkzfbglABJqcETdQjvz4TtDq300Za4oNfC1";

const stripePromise = loadStripe(PUBLISHABLE_KEY, {
  stripeAccount: "acct_1LhxgOHfvLm1V19H",
});

function Payment(props: any) {
  //const stripePromise = loadStripe('pk_test_51Jx3F9AflprgPQpU0lMYkT6hR9wOP29x5kWl3APotnJCBgoDlWYh6ixWwVArKHYztzYWnb4sFY9TOL4xAGyopVXA00DISqZ5Nb'); // test stripe
  // const stripePromise = loadStripe(
  //   "pk_live_51LhxgOHfvLm1V19H2qVpY5gaCYBFoAL2AHNfEcosABkCPppI5N4jETxBNvoHxLClkzfbglABJqcETdQjvz4TtDq300Za4oNfC1"
  // );

  const [toalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();
  // useEffect(() => {

  // }, [])

  useEffect(() => {
    if (props.paymentData) {
      dispatch(createPaypalExpressTokenAction());
    }
    console.log("FBQ :: TRACK EVENT --> AddPaymentInfo");
    const data = props.checkOutListData;

    let total = props.checkOutListData?.priceDetails?.priceDetailsData?.total;
    total = parseFloat(total.replace(/[^0-9.]/g, ""));
    setTotalAmount(total);
    typeof window.fbq === "function" &&
      window.fbq("track", "AddPaymentInfo", {
        content_category: "paymentInfo",
        content_ids: data?.purchasedProduct?.purchasedProductData?.list?.map(
          (i: any) => i.id
        ),
        contents: data?.purchasedProduct?.purchasedProductData?.list?.map(
          (i: any) => {
            return {
              id: i.id,
              title: i.title,
              sku: i.prosku || "SKU",
              type: i.type || "TYPE",
              price: i.price.split("$")[1],
              qty: i.selectedQuantity,
            };
          }
        ),
        currency: "$",
        value:
          data?.purchasedProduct?.priceDetails?.priceDetailsData?.total?.replace(
            /^\D+/g,
            ""
          ),
      });
  }, [props.checkOutListData, props.paymentData]);

  return (
    <>
      <div className="payment">
        <p className="tl">PAYMENT</p>

        {props.paymentData?.map((items: any, index: number) => (
          <>
            <RadioLabel
              name="payment"
              onChange={(e: any) => {
                props.setOrderData(
                  "paymentMethod",
                  e.target.checked ? items.paymentId : ""
                );
                props.whichPaymentMothodSelected(items.paymentId);
              }}
            >
              <div className="payment-img">
                <p>{items.title}</p>
              </div>
            </RadioLabel>
            {
              <>
                {props.selectedPaymentMethod === "stripe_payments_apple_pay" &&
                  toalAmount &&
                  items?.paymentId === "stripe_payments_apple_pay" && (
                    <>
                      <Elements stripe={stripePromise}>
                        <ApplePay
                          totalAmount={toalAmount}
                          handleCountinueToApplePay={props?.handleSubmitOrder}
                          setPaidUsingApplePay={props?.setPaidUsingApplePay}
                          setOrderData={props?.setOrderData}
                        />
                      </Elements>
                    </>
                  )}
              </>
            }
            <>
              {props.selectedPaymentMethod === "stripe_payments" &&
                items?.paymentId === "stripe_payments" && (
                  <Elements stripe={stripePromise}>
                    <Stripe
                      cardNumberError={props.cardNumberError}
                      setCardNumberError={props.setCardNumberError}
                      cardExpiryError={props.cardExpiryError}
                      setCardExpiryError={props.setCardExpiryError}
                      cardCvvError={props.cardCvvError}
                      setCardCvvError={props.setCardCvvError}
                      setOrderData={props.setOrderData}
                      addressData={props.addressData}
                      cardTokenCreated={props.cardTokenCreated}
                      setCardTokenCreated={props.setCardTokenCreated}
                      setCardToken={props.setCardToken}
                    />
                  </Elements>
                )}
            </>

            {props.selectedPaymentMethod === "paypal_express" &&
              items?.paymentId === "paypal_express" && (
                <>
                  <PaypalExpress
                    paymentImage={items?.image}
                    handleContinuePaypal={props?.handleSubmitOrder}
                  />
                </>
              )}

            <br />
          </>
        ))}
        {props.error && <span className="error">{props.error}</span>}

        {/* <RadioLabel defaultChecked={true} name="payment">
          <div className="payment-img">
            <p>Credit card</p>
            <img src={props.Payment1} alt="" />
            <img src={props.Payment2} alt="" />
            <img src={props.Payment3} alt="" />
            <img src={props.Payment4} alt="" />
          </div>
        </RadioLabel>
        <br />
        <RadioLabel name="payment">
          <div className="payment-img">
            <p>PayPal</p>
            <img src={props.Payment5} alt="" />
          </div>
        </RadioLabel> */}
      </div>

      <div className="giving-gift">
        <div className="gift-title">
          <img src={props.Gift} alt="" />
          <p className="bl">Giving a Gift?</p>
        </div>
        <CheckboxLabel
          //onChange={() => props.toggleGift()}
          onChange={() => {
            props.toggleGift();
            props.setOrderData(
              "isGiftWrap",
              props.giftField === true ? "0" : "1"
            );
          }}
        >
          Gift wrap and add gift card message!
        </CheckboxLabel>
        <InputGroups
          label="Add a special message to your gift"
          className={!props.giftField ? "hide" : ""}
          error={
            props.isOrderPlaceDataFormValidated &&
            props.orderPlaceDataError.giftMessage
              ? props.orderPlaceDataError.giftMessage
              : null
          }
          onChange={(e: any) =>
            props.setOrderData("giftMessage", e.target.value)
          }
        />
      </div>
    </>
  );
}

export default Payment;
