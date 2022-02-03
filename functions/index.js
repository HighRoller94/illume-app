const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51JRx82AWnX2oR3avb450DkwRCugFYcf9Thhd475T4XEBfC1mcafmWTBXu9b8q8cm16M2zblTSiJBvr5aOtV4qaCo003Xq7qmEK')

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received for', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "gbp",
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/illume-68c8e/us-central1/api