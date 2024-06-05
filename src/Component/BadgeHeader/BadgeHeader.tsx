import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const BadgeHeader = () => {
  const masterResponse: any = useSelector((state: any) => state.master);
  return (
    masterResponse &&
    masterResponse.data &&
    masterResponse.data.offerMessage && (
      <div className="badge-header">
        <Container>
          <div className="bh-wrapper">
            <p className="ts">{masterResponse.data.offerMessage}</p>
          </div>
        </Container>
      </div>
    )
  );
};

export default BadgeHeader;
