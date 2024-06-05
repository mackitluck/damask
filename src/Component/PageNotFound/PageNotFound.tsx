import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import PNF from "../../Assets/img/404.svg";
import { HOME } from '../../Constant/Route';
import CustomeButton from '../Common/CustomeButton/CustomeButton';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <Container>
        <Row>
          <Col md={12} lg={{ span: 10, offset: 1 }} xl={{ span: 9, offset: 1 }}>
            <div className="PNF-wrapper">
              <div className="PNF-content">
                <h2>404:<br />Page not found</h2>
                <p className="bl">The link you clicked may be broken or the page may have been removed.</p>
                <CustomeButton 
                onClick={() => navigate(HOME)}
                
                bg="fill">Go TO HomePAGE</CustomeButton>
              </div>
              <img src={PNF} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PageNotFound;
