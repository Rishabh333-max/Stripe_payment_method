// import {SECRET_KEY} from '@env'

const stripe = require('stripe')(process.env.SECRET_KEY);
const express = require('express')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send('Please integrate stripe payment')
})

app.post('/payment-sheet', async (req, res) => {

    const {amount,currency}=req.body
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2024-06-20'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      payment_method_types:['card'],
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  });

app.listen(4002,()=>console.log('Running on http://localhost:4002'))