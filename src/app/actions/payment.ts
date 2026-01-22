'use server'

import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay credentials are not configured in environment variables")
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
}

export async function createOrder(amount: number) {
    try {
        const instance = razorpay()
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }

        const order = await instance.orders.create(options)
        return {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        }
    } catch (error: any) {
        console.error('Error creating Razorpay order:', error)
        return { error: error.message || 'Failed to create payment order' }
    }
}

export async function verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
) {
    try {
        if (!process.env.RAZORPAY_KEY_SECRET) {
            throw new Error("Razorpay secret is missing")
        }

        const body = razorpay_order_id + '|' + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex')

        if (expectedSignature === razorpay_signature) {
            return { success: true }
        } else {
            return { success: false, error: 'Invalid signature' }
        }
    } catch (error: any) {
        console.error('Error verifying payment:', error)
        return { success: false, error: error.message || 'Payment verification failed' }
    }
}
