import Contact from "../models/Contact.js";
import { transporter } from "../config/email.js";

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send Email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact from ${name}`,
      text: `
You have a new contact message:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Message stored & email sent successfully" });
  } catch (error) {
    console.error("❌ Error handling contact:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
