import Checkout from './Checkout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const initialOptions = {
    "client-id": "AXyqCtH4B3nhlHpGzb9C866uy8I7ryfyrIRmBWj5X8soVhz9COBCK6dg1kdT7yN2qiKDz4TTpadwaH4g",
    // "client-id": "YOUR-CLIENT-ID-HERE",
    currency: "EUR",
    intent: "capture",
};

function Payment() {

    const { ticket_id } = useParams();
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/tickets/${ticket_id}`)
            .then(response => {
                setTicketDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ticket details:', error);
                setLoading(false);
            });
    }, [ticket_id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!ticketDetails) {
        return <p>Unable to load ticket details. Please try again later.</p>;
    }

    const { price, currency, eventName, fullName, email } = ticketDetails;

    

    return (
        <PayPalScriptProvider options={initialOptions}>
            {/*<Checkout/>*/}
            <Checkout
                price={price}
                currency={currency}
                eventName={eventName}
                fullName={fullName}
                email={email}
            />
        </PayPalScriptProvider>
    );
}

export default Payment;