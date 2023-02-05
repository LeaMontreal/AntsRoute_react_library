import OktaSignIn from "@okta/okta-signin-widget";
import { useEffect, useRef } from "react";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"; // manually import
import { oktaConfig } from "../lib/oktaConfig";

// onSucess, onError are the call back function
const OktaSignInWidget = ({ onSucess, onError }) => {
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    // use config infor (ClientId, Issuer...) to create widget object
    const widget = new OktaSignIn(oktaConfig);

    console.log('OktaSignInWidget start render the widget...');
    // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   widget.otp = searchParams.get('otp');
   widget.state = searchParams.get('state');
    // render the widget, assign the widget instance to widgetRef.current
    widget
      .showSignInToGetTokens({ el: widgetRef.current })
      .then(onSucess)
      .catch(onError);

      return () => widget.remove();
  }, [onSucess, onError]);

  return (
    <div className="container mt-5 mb-5">
      <div ref={widgetRef}></div>
    </div>
  );
};

export default OktaSignInWidget
