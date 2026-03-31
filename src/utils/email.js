import emailjs from '@emailjs/browser'
import { FORM_CONFIG } from '../constants'

let initialized = false

export const sendContactEmail = async (formData) => {
    try {
        const { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_PUBLIC } = FORM_CONFIG

        if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_PUBLIC) {
            throw new Error('EmailJS config missing. Check .env')
        }

        // Init once
        if (!initialized) {
            emailjs.init(EMAILJS_PUBLIC)
            initialized = true
        }

        // Honeypot protection
        if (formData['bot-field']) {
            return { success: true } // silently ignore bot
        }

        const cleanData = Object.fromEntries(
            Object.entries(formData).filter(([key]) => key !== 'bot-field')
        )

        const result = await emailjs.send(
            EMAILJS_SERVICE,
            EMAILJS_TEMPLATE,
            cleanData,
            EMAILJS_PUBLIC
        )

        if (result.status !== 200) {
            throw new Error('Email failed to send')
        }

        return {
            success: true,
            message: 'Email sent successfully!',
        }
    } catch (error) {
        console.error('EmailJS error:', error)

        return {
            success: false,
            message: 'Failed to send email. Please try again later.',
        }
    }
}

export default sendContactEmail