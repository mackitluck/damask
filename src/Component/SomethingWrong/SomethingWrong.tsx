import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SW from "../../Assets/img/somthing-wrong.svg";
import { HOME } from '../../Constant/Route';
import CustomeButton from '../Common/CustomeButton/CustomeButton';

const SomethingWrong = () => {
  const navigate = useNavigate();
  return (
    <div className="something-wrong">
      <Container>
        <Row>
          <Col md={12} lg={{ span: 10, offset: 1 }} xl={{ span: 9, offset: 1 }}>
            <div className="PNF-wrapper">
              <div className="PNF-content">
                <h2>Something went wrong!</h2>
                <p className="bl">Looks like we are not able to connect to our server.</p>
                <CustomeButton onClick={() => navigate(HOME)} bg="fill">TRY AGAIN</CustomeButton>
              </div>
              <img src={SW} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SomethingWrong;
