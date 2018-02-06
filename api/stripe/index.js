// IMPORTS //
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

exports.createCharge = (config) => stripe.charges.create(config)

exports.createCustomer = (config) => stripe.customers.create(config)

exports.createInvoiceItem = (config) => stripe.invoiceItems.create(config)

exports.createSubscription = (config) => {
    return(
        stripe.subscriptions.create(config)
            .then(({ plan }) => {
                const res = {
                    amount: plan.amount,
                    plan: plan.name,
                    subscriptionId: plan.id
                }
                return res
            })
            .catch(err => {
                console.log(err)
            })
    )
}
