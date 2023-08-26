import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import User from '../../models/userModel';
import {
  findUserAndUpdate,
  findUserByEmail,
} from '../../services/user/user.service';

/**
 * Check if the provided email exists in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const emailExists = async (req, res) => {
  const { email } = req.body;
  try {
    const val = await findUserByEmail(email);
    if (val) {
      sendEmailNotice(email).then(async (result1: any) => {
        if (result1.status) {
          const { newcode } = result1;
          findUserAndUpdate(email, newcode, 'code').then(
            async (result2: any) => {
              if (result2.status) {
                res.status(200).json({ message: 'success' });
              } else {
                res.status(500).json({ message: result2 });
              }
            },
          );
        } else {
          res.status(200).json({ message: 'Unable to send code' });
        }
      });
    } else {
      res.status(200).json({ message: val });
    }
  } catch (error) {
    res.status(404).json({ message: 'Server Error' });
  }
};

/**
 * Sends an email notice to the specified email address.
 * @param {string} email - The email address to send the notice to.
 * @return {Promise} - A promise that resolves to an object indicating the status of the email sending process.
 */
async function sendEmailNotice(email) {
  return await new Promise((resolve, reject) => {
    const newcode = Math.floor(Math.random() * 999999 + 111111);
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APPPASSWORD,
        },
      }),
    );

    const mailOptions = {
      from: 'Hailemelekot@gmail.com',
      to: email,
      subject: 'PackRat verification code',
      text: 'Your verification code is ' + newcode,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({ status: false });
      } else {
        resolve({ status: true, newcode });
      }
    });
  });
}