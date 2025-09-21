import nodemailer from 'nodemailer';
import { catchAsync } from '../utils/commonFunctions.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
export const sendEmail = catchAsync(async (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url)
   const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname,'/static-data/emailTemplate')
  console.log(templatePath,'path')
  const approvalTemplateHTML= fs.readFileSync(templatePath,'utf-8')
  const rejectionTemplateHTML= fs.readFileSync(templatePath,'utf-8')
  const { recipient, action} = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS
    }
      })
  const mailOptions = {
    from:"crm@cuny.com",
    to: recipient,
    subject: subject,
    html: action=='reject'?rejectionTemplateHTML:approvalTemplateHTML
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
    else{
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  })
})

