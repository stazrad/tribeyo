// IMPORTS //
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const firebase = require('../firebase')

exports.createCharge = (config) => stripe.charges.create(config)

exports.createInvoiceItem = (config) => stripe.invoiceItems.create(config)

exports.createSubscription = (config) => (
    stripe.subscriptions.create(config)
        .then(({ plan }) => {
            const result = {
                amount: plan.amount,
                plan: plan.name,
                subscriptionId: plan.id
            }
            return result
        })
        .catch(err => {
            console.log(err)
        })
)

exports.createUser = (config) => (
    stripe.customers.create(config)
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err)
        })
)
