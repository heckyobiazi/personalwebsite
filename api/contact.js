import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { fname, number, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Hecky Studio <onboarding@resend.dev>",
      to: "heckystudio@gmail.com",
      subject: `New message from ${fname}`,
      html: `
        <p><strong>Name:</strong> ${fname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", error: error.message });
  }
}
