import dotenv from "dotenv";
dotenv.config();
import { EMAIL_VERIFICATION_TEMPLATE, FORGOT_PASSWORD_TEMPLATE, RESET_PASSWORD_TEMPLATE, STOCK_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplates.js"
import transporter from "./nodemailer.config.js"

export const verifyEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Verify your Email",
        html: EMAIL_VERIFICATION_TEMPLATE.replace("{VERIFICATION CODE}", code)
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log("Email sent:", info.response)
        }
    })


}

export const welcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Welcome Email",
        html: WELCOME_TEMPLATE.replace("{name}", name)
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log("Email sent:", info.response)
        }
    })
}

export const forgotPassword = async (email, url) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Reset Password",
        html: FORGOT_PASSWORD_TEMPLATE.replace("{FRONTEND_URL}", url)
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log("Email sent:", info.response)
        }
    })
}

export const resetPassword = async (email) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Reset Password Successfull",
        html: RESET_PASSWORD_TEMPLATE
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log("Email sent:", info.response)
        }
    })
}

export const lowStock = async (items) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "kuttysaran1515@gmail.com",
        subject: "Low Stock Alert",
        html: STOCK_TEMPLATE.replace("{LOW_STOCK_ITEMS}", items.map(item => `<li>${item}</li>`).join(""))
    }

    console.log("Email HTML:", STOCK_TEMPLATE.replace("{LOW_STOCK_ITEMS}", items.map(item => `<li>${item}</li>`).join("")));

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error', error);
        } else {
            console.log("Email sent:", info.response)
        }
    })
}