import React from 'react'
import { isLoading } from '../../../Utility/General';
import CustomeButton from '../../Common/CustomeButton/CustomeButton'
import RadioLabel from '../../Common/RadioLabel/RadioLabel'

function Delivery(props: any) {
    return (
        <div className="delivery">
            <p className="tl">DELIVERY</p>
            {/* 
            <RadioLabel defaultChecked={true} name="delivery">
                $0.00 Free Standard Delivery
            </RadioLabel>
            <br />
            <RadioLabel name="delivery">$12.00 Express Delivery</RadioLabel>
            <br /> */}

            {props.deliveryOptions?.map((items: any, index: number) => (
                <>
                    <RadioLabel
                        defaultChecked={items.isSelected === "1" ? true : false}
                        onChange={(e: any) => {
                            props.setDeliveryOptionData("shipingId", e.target.checked ? items.id : "")
                        }} name="delivery">{items.leftText + ' ' + items.rightText}
                    </RadioLabel>
                    <br />
                </>
            ))}
            {
                props.error &&
                <span className="error">{props.error}</span>
            }
            <br />
            {
                props.isDeliveryOptionSet === false ?
                    /* <CustomeButton bg="fill" onClick={() => props.setIsDeliveryOptionSet(true)}>Continue</CustomeButton> */
                    <CustomeButton isLoading={isLoading(props.updateDeliveryOptionApiStatus)} bg="fill"
                        onClick={props.onSubmit}
                        disabled={props.isDeliveyOptionFormButtonDisabled}
                    /* onClick={() => {
                        props.setIsDeliveryOptionSet(true);
                        props.onSubmit()
                    }} */
                    >Continue</CustomeButton>
                    : null
            }
        </div>
    )
}

export default Delivery