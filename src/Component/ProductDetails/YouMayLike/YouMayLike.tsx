import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { PRODUCTDETAIL } from '../../../Constant/Route'
import PRODUCT_DETAIL from '../../../Language/ProductDetail'
import ProductBox from '../../Common/ProductBox/ProductBox'

function YouMayLike(props:any) {
  return (
    <div className="YMAL-wrapper">
    <h4>{PRODUCT_DETAIL.YOU_MAY_LIKE}</h4>
    <Row>
      {props.youMayAlsoLike.map((items: any, index: number) => (
        <Col xs={12} sm={6} md={4} key={'YMAL-wrapper'+index}>
          <ProductBox value={items} wishListedFlg={items?.isWishlisted} /* onClick={() => props.navigate(PRODUCTDETAIL +'/' + items.urlKey)} */ />
        </Col>
      ))}
    </Row>
  </div>
  )
}

export default YouMayLike