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

const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID;
const LOCATION_ID = process.env.REACT_APP_LOCATION_ID;

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
        fetch('/complete-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nonce: nonce, buyerVerificationToken: buyerVerificationToken, order: state.order, orderPlacer: props.orderPlacer }),
        })
            .then((response) => {
                return response.json();
            }).then((data) => {
                setLoading(false)
                if (data.status === "200") {
                    props.orderReceipt.setOrderReceipt(data);
                } else {
                    setErrorMessages(["An Error Has Occured Please Try Again."])
                }
            })
    }
    return (
        <>
            <SquarePaymentForm
                sandbox={true}
                applicationId={APPLICATION_ID}
                locationId={LOCATION_ID}
                cardNonceResponseReceived={cardNonceResponseReceived}
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
                        <div className="payment-error-message" key={`sq-error-${errorMessage}`}>{errorMessage}</div>
                    ))}
                </div>
            </SquarePaymentForm>
            {loading ? <progress class="progress is-small is-primary" /> : null}
        </>
    );
};

export default PaymentPage;