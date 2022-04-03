import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51H4FFfGUMnNXbOx0cnb8RA8ATK5Yp7s2r57OPFmCNGB2Qp9i9YJcst9917gA87mbMp5qmzRjgFbYadb9yU4o6VJy001SyNmKJJ';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
