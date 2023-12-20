const express = require('express');
const router = express.Router();
require('dotenv').config({ "path": "../.env" });
const Article = require('../model/Article.model.js');
const User = require('../model/User.model.js');
const nodemailer = require('nodemailer');
const path = require('path');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});


router.post("/create/checkout/session", async (req, res) => {
    try {
        const allItems = await Article.find({});
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map((item) => {
                const storeItem = allItems.find((i) => i._id.toString() === item._id);
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItem.title
                        },
                        unit_amount: storeItem.price
                    },
                    quantity: 1
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/`
        })

        res.json({ url: session.url })
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
})

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event = req.body;

    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          break;

        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          const user = await User.findOne({ email: checkoutSessionCompleted.customer_details.email });
          const sessionId = event.data.object.id;
          const items = await stripe.checkout.sessions.listLineItems(sessionId);


          const attachments = items.data.map(item => {
            return {
              filename: item.description + '.glb',
              path: path.join(__dirname, '../articles', item.description + '.glb')
            };
          });

          let mailOptions = {
            from: process.env.MY_EMAIL,
            to: user.email,
            subject: 'Purchase Confirmation',
            text: 'Thank you for your purchase!',
            attachments: attachments
          };
          
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
          
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});


module.exports = router;