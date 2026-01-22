'use server'

import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function createOrder(amount: number) {
    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)
        return { orderId: order.id, amount: order.amount, currency: order.currency }
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        return { error: 'Failed to create payment order' }
    }
}

export async function verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
) {
    try {
        const body = razorpay_order_id + '|' + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex')

        if (expectedSignature === razorpay_signature) {
            return { success: true }
        } else {
            return { success: false, error: 'Invalid signature' }
        }
    } catch (error) {
        console.error('Error verifying payment:', error)
        return { success: false, error: 'Payment verification failed' }
    }
}
