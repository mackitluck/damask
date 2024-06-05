import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Step1 from "../../../Assets/img/step1.svg";
import Step2 from "../../../Assets/img/step2.svg";
import Step3 from "../../../Assets/img/step3.svg";

const SimpleSteps = (props: any) => {
  return (
    <div className="simple-steps">
      <div className="text-center">
        <div className="data-hidden">
          <h4 data-aos="fade-up">{props.title}</h4>
        </div>
      </div>
      <Row>
        {props?.steps?.map((items: any, index: number) => (
          <Col sm={12} md={4} key={index}>
            <div className="step-box" data-aos="fade-right">
              <img src={items?.image} alt="" />
              
              <div className="step-box-content">
                <p className="tl">{items?.title}</p>
                <span className="bl">{items?.text}</span>
              </div>
            </div>
          </Col>
        ))}
        {/* <Col sm={12} md={4}>
          <div className="step-box" data-aos="fade-right">
            <img src={Step1} alt="" />
            <div className="step-box-content">
              <p className="tl">Customize your baking kit</p>
              <span className="bl">Choose from our sweet selection of cakes, frostings, cupcakes and cake pops.</span>
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="step-box" data-aos="fade-up">
            <img src={Step2} alt="" />
            <div className="step-box-content">
              <p className="tl">We’ll deliver it to your doorstep</p>
              <span className="bl">Pre-measured ingredients and simple recipe instructions are carefully packaged just for you. Add eggs and butter and you’re ready to go.</span>
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="step-box" data-aos="fade-left">
            <img src={Step3} alt="" />
            <div className="step-box-content">
              <p className="tl">Get baking</p>
              <span className="bl">No complicated shopping list, no measuring, no guesswork. Your perfect dessert, every time.</span>
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
}

export default SimpleSteps;
