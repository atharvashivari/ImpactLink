import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripeCheckout = ({ amount, campaignId }) => {
    const handlePayment = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, campaignId }),
            });

            const session = await response.json();
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            console.error("Error handling payment:", error);
        }
    };

    return <button onClick={handlePayment}>Donate ${amount}</button>;
};

export default StripeCheckout;
