import { Container } from "react-bootstrap";
import InputGroups from "../Common/InputGroups/InputGroups";
import CheckboxLabel from "../Common/CheckboxLabel/CheckboxLabel";
import CustomeButton from "../Common/CustomeButton/CustomeButton";

const SignUp = () => {
  return (
    <div className="signup form-section">
      <Container>
        <div className="max-352">
          <h2>Ready to bake?</h2>
          <div>
            <InputGroups label="Zip Code*" type="number" />
            <InputGroups label="Email Address*" type="email" />
            <InputGroups label="Birthday (MM/DD)*" type="email" />
          </div>
          <div className="remember-forgot">
            <CheckboxLabel>
              Sign up for secret recipes and sneak peeks.{" "}
            </CheckboxLabel>
          </div>
          <CustomeButton bg="fill">Log In</CustomeButton>

          <p className="bm content-link">
            Already have an account?<a className="pages-link">Log In</a>
          </p>

          <p className="bm text-center mt-28">
            By clicking above, you agree to our{" "}
            <a className="pages-link"> Terms of Use </a> and consent to our{" "}
            <a className="pages-link"> Privacy Policy.</a>{" "}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
