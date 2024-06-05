import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NDF from "../../Assets/img/no-data-found.svg";
import CustomeButton from '../Common/CustomeButton/CustomeButton';

const NoDataFound = () => {
  return (
    <div className="no-data-found">
      <Container>
        <Row>
          <Col md={12} lg={{ span: 10, offset: 1 }} xl={{ span: 9, offset: 1 }}>
            <div className="PNF-wrapper">
              <div className="PNF-content">
                <h2>No data found</h2>
                <p className="bl">Try adjusting your search or filter to find what you are looking for.</p>
              </div>
              <img src={NDF} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NoDataFound;
