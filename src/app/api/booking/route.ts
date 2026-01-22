import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { businessName, providerId, name, email, mobile, date, time, service } = body

        // Validate
        if (!businessName || !name || !email || !mobile || !date || !time || !service) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const supabase = await createClient()

        // 1. Insert into Supabase
        const { data, error } = await (supabase as any)
            .from('bookings')
            .insert([
                {
                    business_name: businessName,
                    provider_id: providerId || null,
                    customer_name: name,
                    customer_email: email,
                    customer_phone: mobile,
                    booking_date: date,
                    booking_time: time,
                    service_type: service,
                    status: 'pending' // default
                }
            ])
            .select()

        if (error) {
            console.error('Supabase booking error:', error)
            return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
        }

        // 2. Send Email via Gmail SMTP
        // Only attempt to send if GMAIL_USER is configured
        if (process.env.GMAIL_USER) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            })

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: email, // Send to customer
                // bcc: process.env.GMAIL_USER, // Optional: Receive a copy to admin if you want
                subject: `Booking Confirmation - ${businessName}`,
                text: `
    Dear ${name},

    Your booking request for ${service} with ${businessName} has been received.

    Details:
    Date: ${date}
    Time: ${time}
    Phone: ${mobile}

    We will contact you shortly to confirm.

    Best regards,
    Connect Team
                `,
                html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563eb;">Booking Requested</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your booking request for <strong>${service}</strong> with <strong>${businessName}</strong> has been received.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${mobile}</p>
        </div>

        <p>We will contact you shortly to confirm the appointment.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an automated message.</p>
    </div>
                `
            }

            try {
                await transporter.sendMail(mailOptions)
            } catch (emailError) {
                console.error('Email sending failed:', emailError)
                // We don't fail the request if email fails, but we might want to log it or warn
            }
        }

        return NextResponse.json({ success: true, booking: data })

    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
