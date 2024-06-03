import React, { useState } from 'react';
import './payment.css';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = ({ price, currency, eventName, fullName, email }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [selectedCurrency, setSelectedCurrency] = useState(currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setSelectedCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        // value: "8.99",
                        value: price,
                    },
                description: "Ticket for "+eventName+" for "+fullName,
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        // <div className="checkout">
        //     {isPending ? <p>LOADING...</p> : (
        //         <>
        //             <h2>Please select a payment method:</h2>
        //             <select value={currency} onChange={onCurrencyChange}>
        //                 <option value="EUR">💶 Euro</option>
        //                 <option value="USD">💵 USD</option>
        //             </select>
        //             <PayPalButtons
        //                 style={{ layout: "vertical" }}
        //                 createOrder={(data, actions) => onCreateOrder(data, actions)}
        //                 onApprove={(data, actions) => onApproveOrder(data, actions)}
        //             />
        //         </>
        //     )}
        // </div>
        <div className="checkout">
            {isPending ? <p>Loading...</p> : (
                <>
                    {/*{if eventName? (<h2>Checkout for {eventName} </h2>)}*/}
                    <h3>Please select a payment method:</h3>
                    <select value={selectedCurrency} onChange={onCurrencyChange}>
                        <option value="EUR">💶 Euro</option>
                        <option value="USD">💵 USD</option>
                    </select>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;