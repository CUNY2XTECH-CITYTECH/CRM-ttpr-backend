import nodemailer from 'nodemailer';
import { catchAsync } from '../utils/commonFunctions.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
export const sendEmail = catchAsync(async (req, res, next) => {

  const { to, action } = req.body;
  const __filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(__filename).replace('/controllers', '');
  const approvalTemplatePath = path.join('/static-data/approvalTemplate.html')
  const rejectionTemplatePath = path.join('/static-data/rejectionTemplate.html')
  const approvalTemplateHTML = fs.readFileSync(dirname + approvalTemplatePath, 'utf-8')
  const rejectionTemplateHTML = fs.readFileSync(dirname + rejectionTemplatePath, 'utf-8')
  console.log(req.body, 'body')
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS
    }
  })
  const subject = action == 'reject' ? 'Application Rejected' : 'Application Approved'
  const mailOptions = {
    from: "crm@cuny.com",
    to: to,
    subject: subject,
    html: action == 'reject' ? rejectionTemplateHTML : approvalTemplateHTML
  }
  // retry sending mail if it fails
  // max 3 attempts
  let attempts = 0;
  const maxAttempts = 3;
  const sendMailWithRetry = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        attempts++;
        if (attempts < maxAttempts) {
          console.log(`Retrying to send email... Attempt ${attempts}`);
          sendMailWithRetry();
        } else {
          console.log('Max attempts reached. Email not sent.');
          res.status(500).json({ message: 'Error sending email', error: error.message });
        }
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  }
  sendMailWithRetry();
})

