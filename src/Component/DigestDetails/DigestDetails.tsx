import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DD1 from "../../Assets/img/DD1.png"
import DD2 from "../../Assets/img/DD2.png"

const DigestDetails = () => {

  const recentPost:any = [
    'Nam sodales lorem at neque vehicula elementum.',
    'Sed venenatis erat odio, ut molestie odio porta eget.',
    'Praesent auctor et justo quis sagittis.',
    'Nam ullamcorper urna quis justo consequat rutrum.'
  ];

  return (
    <div className="digest-details-wrapper">
      <Container>
        <Row>
          <Col lg={12} xl={{ span: 10, offset: 1 }}>
            <div className="digest-details">
              <div className="content-part">

                <h2>Donec ac ante at massa mattis blandit eget sed nisi.</h2>
                <p className="bl">Suspendisse potenti. Fusce risus erat, sagittis et nunc id, pretium fringilla purus. Fusce at libero laoreet, vehicula est ut, convallis metus. Donec vitae metus eget felis semper vulputate quis at nunc. Donec consectetur dignissim blandit.</p>
                <img src={DD1} alt="" />

                <h4>Nulla ultrices ante in ex maximus.</h4>
                <p className="bl">Aliquam vel ornare arcu. Cras tellus sem, hendrerit vel erat a, ornare pellentesque turpis. Fusce ac molestie mauris, nec accumsan eros. Duis ac ornare tortor. Integer imperdiet, augue ac congue condimentum, quam sapien hendrerit tellus, sed facilisis orci lectus in velit.<br /><br />Aliquam eu magna lacus. In blandit mi diam, ut pretium orci congue ut. Ut velit urna, pharetra facilisis tristique et, porta aliquam ligula. Aliquam sit amet erat molestie, malesuada ipsum et, euismod sem. Duis mi sem, sagittis eget luctus quis, vulputate sed elit.</p>

                <h4>Curabitur sagittis nulla dolor.</h4>
                <p className="bl">Maecenas eu scelerisque urna. Etiam eget dolor felis. Nam sodales lorem at neque vehicula elementum. Sed venenatis erat odio, ut molestie odio porta eget. Praesent auctor et justo quis sagittis. Nam ullamcorper urna quis justo consequat rutrum. Duis blandit neque sit amet dolor imperdiet, eget faucibus nisi lacinia. In laoreet scelerisque tortor.</p>

                <img src={DD2} alt="" />

                <h4>Pretium orci congue.</h4>
                <p className="bl">Cras tellus sem, hendrerit vel erat a, ornare pellentesque turpis. Fusce ac molestie mauris, nec accumsan eros. Duis ac ornare tortor. Integer imperdiet, augue ac congue condimentum.<br /><br />Aliquam eu magna lacus. In blandit mi diam, ut pretium orci congue ut. Ut velit urna, pharetra facilisis tristique et, porta aliquam ligula. Aliquam sit amet erat molestie, malesuada ipsum et.</p>

                <h4>Nam sodales lorem.</h4>
                <p className="bl">Etiam eget dolor felis. Nam sodales lorem at neque vehicula elementum. Sed venenatis erat odio, ut molestie odio porta eget. Praesent auctor et justo quis sagittis. Nam ullamcorper urna quis justo consequat rutrum. Duis blandit neque sit amet dolor imperdiet, eget faucibus nisi lacinia. In laoreet scelerisque tortor, sit amet scelerisque justo hendrerit eget.<br /><br />Ut ultricies semper consectetur. Donec ac ante at massa mattis blandit eget sed nisi. In tortor purus, imperdiet quis felis eu, efficitur malesuada neque. Etiam sit amet libero egestas, rutrum libero vitae, tempor neque.<br /><br />Suspendisse cursus, libero sit amet consectetur bibendum, dui enim mattis nunc, eu mollis purus justo non nisl. Quisque imperdiet ipsum id sapien condimentum, dignissim facilisis nulla laoreet. Vestibulum faucibus elit sem, ac dignissim lectus dignissim quis. In nunc eros, iaculis in velit id, hendrerit congue dui. Quisque ut sem libero.</p>

              </div>
              <div className="recent-post">
                <p className="tl">Recent Posts</p>
                <ul>
                  {
                    recentPost.map((items: any, index:number) => (
                      <li key={index}>
                        <a className="recent-post-link">{items}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DigestDetails;
