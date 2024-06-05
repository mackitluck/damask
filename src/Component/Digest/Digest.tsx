import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Digest1 from "../../Assets/img/digest-1.png"
import Digest2 from "../../Assets/img/digest-2.png"
import Digest3 from "../../Assets/img/digest-3.png"
import Digest4 from "../../Assets/img/digest-4.png"

const Digest = () => {

  const obj:any = [
    {
      img: Digest1,
      title: 'Donec ac ante at massa mattis blandit eget sed nisi.',
      details: 'Suspendisse potenti. Fusce risus erat, sagittis et nunc id, pretium fringilla purus. Fusce at libero laoreet, vehicula est ut, convallis metus. Donec vitae metus eget felis sempe...'
    },
    {
      img: Digest2,
      title: 'Curabitur hendrerit ex tortor. Etiam consequat.',
      details: 'Etiam sit amet libero egestas, rutrum libero vitae, tempor neque. Suspendisse cursus, libero sit amet consectetur bibendum, dui enim mattis nunc, eu mollis purus justo n...'
    },
    {
      img: Digest3,
      title: 'Vestibulum faucibus elit sem, ac dignissim lectus.',
      details: 'Nunc condimentum quam eget consequat tempor. Maecenas eu scelerisque urna. Etiam eget dolor felis. Nam sodales lorem at neque vehicula elementum.'
    },
    {
      img: Digest4,
      title: 'Maecenas bibendum viverra lorem, eget efficitur.',
      details: 'Nam ullamcorper urna quis justo consequat rutrum. Duis blandit neque sit amet dolor imperdiet, eget faucibus nisi lacinia. In laoreet scelerisque tortor, sit amet scelerisqu...'
    },
    {
      img: Digest1,
      title: 'Donec ac ante at massa mattis blandit eget sed nisi.',
      details: 'Suspendisse potenti. Fusce risus erat, sagittis et nunc id, pretium fringilla purus. Fusce at libero laoreet, vehicula est ut, convallis metus. Donec vitae metus eget felis sempe...'
    },
    {
      img: Digest2,
      title: 'Curabitur hendrerit ex tortor. Etiam consequat.',
      details: 'Etiam sit amet libero egestas, rutrum libero vitae, tempor neque. Suspendisse cursus, libero sit amet consectetur bibendum, dui enim mattis nunc, eu mollis purus justo n...'
    },
    {
      img: Digest3,
      title: 'Vestibulum faucibus elit sem, ac dignissim lectus.',
      details: 'Nunc condimentum quam eget consequat tempor. Maecenas eu scelerisque urna. Etiam eget dolor felis. Nam sodales lorem at neque vehicula elementum.'
    },
    {
      img: Digest4,
      title: 'Maecenas bibendum viverra lorem, eget efficitur.',
      details: 'Nam ullamcorper urna quis justo consequat rutrum. Duis blandit neque sit amet dolor imperdiet, eget faucibus nisi lacinia. In laoreet scelerisque tortor, sit amet scelerisqu...'
    },
  ]; 

  return (
    <div className="digest">
      <Container>
        <Row>
          <Col lg={12} xl={{ span: 10, offset: 1 }}>
            {
              obj.map((items: any, index:number) => (
                <div className="digest-box" key={index}>
                  <div className="digest-box-content">
                    <a className="h2"><h2>{items.title}</h2></a>
                    <a className="bl">{items.details}</a>
                  </div>
                  <a className="digest-img">
                    <img src={items.img} alt="" />
                  </a>
                </div> 
              ))
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Digest;
