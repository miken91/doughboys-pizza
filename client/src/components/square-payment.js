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
    const handleAddTip = (value) => {
        state.setOrder((prevState => ({
            ...prevState,
            orderTip: parseFloat(value * state.order.orderTotal).toFixed(2)
        })))
    }
    const evaluateAndReturnTotal = () => {
        if(state.order.orderTip) {
            return ((parseFloat(state.order.orderTotal) * .04) + parseFloat(state.order.orderTotal) + parseFloat(state.order.orderTip)).toFixed(2);
        } else {
            return ((parseFloat(state.order.orderTotal) * .04) + parseFloat(state.order.orderTotal)).toFixed(2)
        }
    }
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
                setLoading(false);
                if (response.ok) {
                    props.orderReceipt.setOrderReceipt(response)
                    window.scrollTo(0,0);

                } else {
                    setErrorMessages(['An Error Has Occured Please Try Again'])
                }
            })
    }
    return (
        <>
            <SquarePaymentForm
                sandbox={process.env.REACT_APP_SQ_SANDBOX}
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
                <div class="columns">
                    <div class="column">
                        <span class="sq-label">Tip Amount</span>
                        <div class="columns is-mobile">
                            <div class="column is-one-third">
                                <button onClick={()=> handleAddTip(.10)} class="sq-creditcard">10%</button>
                            </div>
                            <div class="column is-one-third">
                                <button onClick={()=> handleAddTip(.15)} class="sq-creditcard">15%</button>
                            </div>
                            <div class="column is-one-third">
                                <button onClick={()=> handleAddTip(.20)} class="sq-creditcard">20%</button>
                            </div>
                        </div>
                    </div>
                </div>

                <CreditCardSubmitButton>Submit Order And Pay ${evaluateAndReturnTotal()}</CreditCardSubmitButton>

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