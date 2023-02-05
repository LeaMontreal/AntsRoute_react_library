import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSignInWidget from "./OktaSignInWidget"; // manually import

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  // function after auth success
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };
  // function when auth failed
  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  // auth process haven't finished
  if (!authState) {
    return <SpinnerLoading />;
  }

  // take unAuthenticated user to Login component
  // take Authenticated user to home path
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
