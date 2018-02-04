// IMPORTS //
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const firebase = require('../firebase')

exports.createCharge = (config) => stripe.charges.create(config)

exports.createCustomer = (config) => stripe.customers.create(config)

exports.createInvoiceItem = (config) => stripe.invoiceItems.create(config)

exports.createSubscription = (config) => stripe.subscriptions.create(config)
