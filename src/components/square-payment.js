import React, { useState } from 'react';
import {
    SquarePaymentForm,
    ApplePayButton,
    CreditCardCVVInput,
    CreditCardExpirationDateInput,
    CreditCardNumberInput,
    CreditCardPostalCodeInput,
    CreditCardSubmitButton,
    GooglePayButton,
    MasterpassButton,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';

const APPLICATION_ID = 'sandbox-sq0idb-x0bV_9Wr6Jt5NqrJ8rfOmA';
const LOCATION_ID = 'TMFB84WRJX7JS';

const PaymentPage = () => {
    const [errorMessages, setErrorMessages] = useState([]);

    function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
        if (errors) {
            setErrorMessages(errors.map(error => error.message));
            return;
        }

        setErrorMessages([]);

        alert('nonce created: ' + nonce + ', buyerVerificationToken: ' + buyerVerificationToken);
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
            console.log(data);
        })
        // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
    }

    function createPaymentRequest() {
        return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: 'USD',
            countryCode: 'US',
            total: {
                label: 'MERCHANT NAME',
                amount: '1',
                pending: false,
            },
            lineItems: [
                {
                    label: 'Subtotal',
                    amount: '1',
                    pending: false,
                },
            ],
        };
    }

    function createVerificationDetails() {
        return {
            amount: '100.00',
            currencyCode: 'USD',
            intent: 'CHARGE',
            billingContact: {
                familyName: 'Smith',
                givenName: 'John',
                email: 'jsmith@example.com',
                country: 'GB',
                city: 'London',
                addressLines: ["1235 Emperor's Gate"],
                postalCode: 'SW7 4JA',
                phone: '020 7946 0532',
            },
        };
    }

    return (
        <SquarePaymentForm
            sandbox={true}
            applicationId={APPLICATION_ID}
            locationId={LOCATION_ID}
            cardNonceResponseReceived={cardNonceResponseReceived}
            createPaymentRequest={createPaymentRequest}
            createVerificationDetails={createVerificationDetails}
        >
            <fieldset className="sq-fieldset">
                <CreditCardNumberInput />

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
    );
};

export default PaymentPage;