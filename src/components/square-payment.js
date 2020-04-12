import React, { useState, useContext } from 'react';
import ApplicationContext from '../ApplicationContext';
import {
    SquarePaymentForm,
    CreditCardCVVInput,
    CreditCardExpirationDateInput,
    CreditCardNumberInput,
    CreditCardPostalCodeInput,
    CreditCardSubmitButton,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';

const APPLICATION_ID = 'sandbox-sq0idb-x0bV_9Wr6Jt5NqrJ8rfOmA';
const LOCATION_ID = 'TMFB84WRJX7JS';

const PaymentPage = (props) => {
    const state = useContext(ApplicationContext);
    const [loading, setLoading] = useState(false); 
    const [errorMessages, setErrorMessages] = useState([]);

    function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
        if (errors) {
            setErrorMessages(errors.map(error => error.message));
            return;
        }

        setErrorMessages([]);

        setLoading(true)
        fetch('https://doughboys-pizza-express.herokuapp.com/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nonce: nonce, buyerVerificationToken: buyerVerificationToken}),
        })
        .then((response) => {
           return response.json(); 
        }).then((data) => {
            setLoading(false)
            props.orderReceipt.setOrderReceipt(data);
        })
    }

    function createPaymentRequest() {
        return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: 'USD',
            countryCode: 'US',
            total: {
                label: 'MERCHANT NAME',
                amount: state.order.orderTotal,
                pending: false,
            },
        };
    }

    // function createVerificationDetails() {
    //     return {
    //         amount: '100.00',
    //         currencyCode: 'USD',
    //         intent: 'CHARGE',
    //         billingContact: {
    //             familyName: 'Smith',
    //             givenName: 'John',
    //             email: 'jsmith@example.com',
    //             country: 'GB',
    //             city: 'London',
    //             addressLines: ["1235 Emperor's Gate"],
    //             postalCode: 'SW7 4JA',
    //             phone: '020 7946 0532',
    //         },
    //     };
    // }

    return (
        <>
        <SquarePaymentForm
            sandbox={true}
            applicationId={APPLICATION_ID}
            locationId={LOCATION_ID}
            cardNonceResponseReceived={cardNonceResponseReceived}
            createPaymentRequest={createPaymentRequest}
        >
            <fieldset className="sq-fieldset">
                <CreditCardNumberInput/>

                <div className="sq-form-third">
                    <CreditCardExpirationDateInput />
                </div>

                <div className="sq-form-third">
                    <CreditCardPostalCodeInput />
                </div>

                <div className="sq-form-third">
                    <CreditCardCVVInput />
                </div>
            </fieldset>

            <CreditCardSubmitButton>Submit Payment</CreditCardSubmitButton>

            <div className="sq-error-message">
                {errorMessages.map(errorMessage => (
                    <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                ))}
            </div>
        </SquarePaymentForm>
        {loading ? <progress class="progress is-small is-primary"/> : null}
        </>
    );
};

export default PaymentPage;