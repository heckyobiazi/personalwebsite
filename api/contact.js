import nodemailer from 'nodemailer';

console.log("API hit!");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { fname, number, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heckystudio@gmail.com',
      pass: 'kvly daqa cyab vdkw' // Use an App Password (not your main Gmail password)
    }
  });

  const mailOptions = {
    from: 'heckystudio@gmail.com',
    to: 'heckystudio@gmail.com',
    subject: `New message from ${fname} (${email})`,
    html: `
      <p><strong>First name:</strong> ${fname}</p>
      <p><strong>Number:</strong> ${number}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', error: error.message });
  }
}
