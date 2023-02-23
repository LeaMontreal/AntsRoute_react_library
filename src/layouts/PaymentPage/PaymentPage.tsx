import { useOktaAuth } from "@okta/okta-react"; // mannually change
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaymentInfoRequest from "../../models/PaymentInfoRequest";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {
  const { authState } = useOktaAuth();

  const [fees, setFees] = useState(0);
  const [httpError, setHttpError] = useState(false);
  const [isLoadingFees, setIsLoadingFees] = useState(true);

  // lock flag for avoiding repeat sending paymentInfo
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // myDebugForOkta
  const authorizationString = `Bearer `;
  const userEmail = `watera@gmail.com`;

  // const authorizationString = `Bearer ${authState?.accessToken?.accessToken}`;
  // const userEmail = `authState.accessToken?.claims.sub`;

  // fetchFees
  useEffect(() => {
    const fetchFees = async () => {
      // myDebugForOkta
      // if (authState && authState.isAuthenticated) 
      {
        const url = `${process.env.REACT_APP_BASE_URL}/payments/search/findByUserEmail?userEmail=${userEmail}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: authorizationString,
            "Content-Type": "application/json",
          },
        };
        const paymentResponse = await fetch(url, requestOptions);
        if (!paymentResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const paymentResponseJson = await paymentResponse.json();
        setFees(paymentResponseJson.amount);
        setIsLoadingFees(false);
      }
    };
    fetchFees().catch((error: any) => {
      setIsLoadingFees(false);
      setHttpError(error.message);
    });
  }, [authState]);

  if (isLoadingFees) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const elements = useElements();
  const stripe = useStripe();

  async function checkout() {
      if (!stripe || !elements || !elements.getElement(CardElement)) {
          return;
      }

      // set lock flag for avoiding repeat sending paymentInfo
      setSubmitDisabled(true);

      let paymentInfo = new PaymentInfoRequest(Math.round(fees * 100), 'USD', userEmail);

      const url = `${process.env.REACT_APP_BASE_URL}/payment/secure/payment-intent`;
      const requestOptions = {
          method: 'POST',
          headers: {
              Authorization: authorizationString,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentInfo)
      };
      const stripeResponse = await fetch(url, requestOptions);
      if (!stripeResponse.ok) {
          setHttpError(true);
          // open lock flag
          setSubmitDisabled(false);
          throw new Error('Something went wrong!');
      }
      const stripeResponseJson = await stripeResponse.json();

      stripe.confirmCardPayment(
          stripeResponseJson.client_secret, {
              payment_method: {
                  card: elements.getElement(CardElement)!,
                  billing_details: {
                      email: userEmail
                  }
              }
          }, {handleActions: false}
      ).then(async function (result: any) {
          if (result.error) {
              // open lock flag
              setSubmitDisabled(false)
              alert('There was an error')
          } else {
              const url = `${process.env.REACT_APP_BASE_URL}/payment/secure/payment-complete`;
              const requestOptions = {
                  method: 'PUT',
                  headers: {
                      Authorization: authorizationString,
                      'Content-Type': 'application/json'
                  }
              };
              const stripeResponse = await fetch(url, requestOptions);
              if (!stripeResponse.ok) {
                  setHttpError(true)
                  // open lock flag
                  setSubmitDisabled(false)
                  throw new Error('Something went wrong!')
              }
              setFees(0);
              // open lock flag
              setSubmitDisabled(false);
          }
      });
      setHttpError(false);
  }

  return (
    <div className="container">
      {fees > 0 && (
        <div className="card mt-3">
          <h5 className="card-header">
            Fees pending: <span className="text-danger">${fees}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title mb-3">Credit Card</h5>
            <CardElement id="card-element"/>
            <button disabled={submitDisabled}
              onClick={checkout}
              type="button"
              className="btn btn-md main-color text-white mt-3">
              Pay fees
            </button>
          </div>
        </div>
      )}

      {fees === 0 && (
        <div className="mt-3">
          <h5>You have no fees!</h5>
          <Link type="button" className="btn main-color text-white" to="search">
            Explore top books
          </Link>
        </div>
      )}
    </div>
  );
};