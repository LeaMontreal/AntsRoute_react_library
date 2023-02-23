import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// loads the Stripe.js script and initializes a Stripe object
const stripePromise = loadStripe('pk_test_51MUWRkGZOyLNVjLVIJCf5buo7nhKTYFTeK6mCMf1VMwTIjU2DN6EGCnmQYxTc2oJ5f44X6Y48CAzPdTLLmEPiCsF00s2teiP5g');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
  </BrowserRouter>
);
