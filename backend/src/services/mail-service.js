const nodemailer = require('nodemailer')
const prisma = require('../../config/prismaClient')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, 
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_SECRET
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `Acoount activation. Your link is: ${process.env.API_URL}`,
			text: "",
			html: `<div>
						<h1>You can verify your account using the link bellow</h1>
						<a href=${link}}>${link}</a>
					</div>`,
		})
    }
}

module.exports = new MailService()
