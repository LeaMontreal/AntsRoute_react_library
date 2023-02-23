import { useOktaAuth } from "@okta/okta-react"; // mannually change
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {
    const {authState} = useOktaAuth();
    
    const [fees, setFees] = useState(0);
    const [httpError, setHttpError] = useState(false);
    const [isLoadingFees, setisLoadingFees] = useState(true);

    const [submitDisabled, setSubmitDisabled] = useState(false);

    // fetchFees
    useEffect(() => {
        const fetchFees = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                };
                const paymentResponse = await fetch(url, requestOptions);
                if (!paymentResponse.ok) {
                    throw new Error('Something went wrong!')
                }
                const paymentResponseJson = await paymentResponse.json();
                setFees(paymentResponseJson.amount);
                setisLoadingFees(false);
            }
        }
        fetchFees().catch((error: any) => {
            setisLoadingFees(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoadingFees) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return ();
};