import { useOktaAuth } from "@okta/okta-react"; // mannually change
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {
  const { authState } = useOktaAuth();

  const [fees, setFees] = useState(0);
  const [httpError, setHttpError] = useState(false);
  const [isLoadingFees, setIsLoadingFees] = useState(true);

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

  return (
    <div className="container">
      {fees > 0 && (
        <div className="card mt-3">
          <h5 className="card-header">
            Fees pending: <span className="text-danger">${fees}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title mb-3">Credit Card</h5>
            <p>Credit Card Info</p>
            <button
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