import React from 'react'
import { Accordion } from 'react-bootstrap'

function ProductDetailPanel(props:any) {
  return (
    <div className="panel-box">
                  <Accordion defaultActiveKey="0">
                  {props.panelData?.ingredients?.title?
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <p className="tl">{props.panelData?.ingredients?.title}</p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: props.panelData?.ingredients?.htmlData }} ></div>
                      </Accordion.Body>
                    </Accordion.Item>
                  : ""}

                  {props.panelData.nutrifacts?.title?
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <p className="tl">{props.panelData.nutrifacts?.title}</p>
                      </Accordion.Header>
                      <Accordion.Body>
                      <div dangerouslySetInnerHTML={{ __html: props.panelData?.nutrifacts?.htmlData }} ></div>
                      </Accordion.Body>
                    </Accordion.Item>
                  : ""}
                  {props.panelData?.howThisWorks?.title?
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <p className="tl">{props.panelData?.howThisWorks?.title}</p>
                      </Accordion.Header>
                      <Accordion.Body>
                      {props.panelData?.howThisWorks?.data?.map((items: any, index: number) => (
                        <div className="HTW-box" key={'HTW-box'+index}>
                          <img src={items.image} alt="" />
                          <div className="HTW-content">
                            <p>{items.title}</p>
                            <span>
                              {items.titleIntro}
                            </span>
                          </div>
                        </div>
                      ))}
                      </Accordion.Body>
                    </Accordion.Item>
                    : ""}
                  </Accordion>
                </div>  
  )
}

export default ProductDetailPanel