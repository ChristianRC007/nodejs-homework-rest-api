const nodemailer = require('nodemailer')
require('dotenv').config()

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: `"Contacts App" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Account activation on my NOT SUSPICIOUS web site',
      text: '',
      html: `<div>
      <h1>For activation click on face</h1>
      <a href="${link}">
      <img src="https://static.wikia.nocookie.net/mems/images/3/37/Epic_troll_face_wallpapers.png/revision/latest/scale-to-width-down/1000?cb=20150323132936&path-prefix=ru" width="400" height="300"/></a>
      </div>`,
    })
  }
}

module.exports = new MailService()
