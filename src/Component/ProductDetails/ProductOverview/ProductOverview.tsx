import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LazyImage from '../../Common/LazyImage/LazyImage'

function ProductOverview(props: any) {
  return (
    <div className="overview">
      <Row>
        <Col sm={12} md={6} lg={6}>
          <div className="content-block">
            <p className="tl">{props.overview?.title}</p>
            {/* <span className="bl pre-line">
            {props.overview?.overview}
          </span> */}

            <span className="bl">
              <div dangerouslySetInnerHTML={{
                __html: props.overview?.overview,
              }}></div>
            </span>
          </div>
        </Col>
        <Col sm={12} md={6} lg={6}>
          <div className="img-block">
            <LazyImage src={props.overview?.image} alt="" />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductOverview