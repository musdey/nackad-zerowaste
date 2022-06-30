'use strict'
import nodemailer, { SentMessageInfo } from 'nodemailer'
import { MailType } from '../types'
const hostName = process.env.HOST_NAME || 'localhost:3000'
const applicationName = process.env.APPLICATION_NAME || 'Test Application'
const applicationEmail = process.env.APPLICATION_EMAIL || 'test@application.com'
const applicationEmailPW = process.env.APPLICATION_EMAIL_PW || 'test'
const applicationEmailHost = process.env.APPLICATION_EMAIL_HOST || 'mail.teststerver.net'
const applicationEmailPort = process.env.APPLICATION_EMAIL_PORT
  ? Number.parseInt(process.env.APPLICATION_EMAIL_PORT)
  : 587

const transporter = nodemailer.createTransport({
  host: applicationEmailHost,
  port: applicationEmailPort,
  secure: false, // true for 465, false for other ports
  auth: {
    user: applicationEmail, // generated ethereal user
    pass: applicationEmailPW // generated ethereal password
  }
})

const sendMail = async (
  username: string,
  receiverEmail: string,
  data: string,
  type: MailType
): Promise<SentMessageInfo> => {
  const { subject, content } = buildEmailContent(username, data, type)
  console.log('ENV:', process.env.NODE_ENV)

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    console.log('DEVELOPMENT: Email would have been sent.')
    console.log('Subject: ', subject)
    console.log('Content: ', content)
    return Promise.resolve('ok')
  } else {
    const info = await transporter.sendMail({
      from: `"${applicationName}" <${applicationEmail}>`, // sender address
      to: receiverEmail, // list of receivers
      subject: subject, // Subject line
      text: content
    })
    return info
  }
}

const buildEmailContent = (username: string, data: string, type: MailType) => {
  let subject
  let content
  switch (type) {
    case MailType.OTP:
      subject = `[${applicationName}] Verify your login!`
      content =
        `Hey ${username}!  \n\n` +
        'Two factor authentication is acitvated for your account! \n\n' +
        'In order to proceed you login, please type in the following PIN: \n\n' +
        data +
        '\n\n'
      break
    case MailType.RESETPW:
      subject = `[${applicationName}] Please reset your password!`
      content =
        `Hey ${username}!  \n\n` +
        'You are receiving this e-mail because you requested the reset of the password for your account.\n\n' +
        'Please click the following link, or paste it into your browser to complete the process:\n\n' +
        'https://' +
        hostName +
        '/resetpw/' +
        data +
        '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      break
    case MailType.VERIFYMAIL:
      subject = `[${applicationName}] Verify your email address!`
      content =
        `Hey ${username}!  \n\n` +
        `Thank you for signing up on ${applicationName}. :) \n\n` +
        'In order to finish your signup process please click the following link, or paste it into your browser: \n\n' +
        hostName +
        '/api/verifyMail?token=' +
        data +
        '\n\n'
      break
  }

  return { subject, content }
}

export default sendMail
