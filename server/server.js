const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Resend } = require('resend');
require('dotenv').config();

const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Resend client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // 1. Save message to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // 2. Send Email Notification via Resend
    let emailSent = false;
    const recipient = process.env.NOTIFICATION_EMAIL;

    if (resend && recipient) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipient,
          reply_to: email,
          subject: `New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Contact Form Message</h2>
              <p><strong>Sender Name:</strong> ${name}</p>
              <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Date & Time:</strong> ${new Date().toLocaleString()}</p>
              <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #0284c7; margin-top: 15px; border-radius: 4px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
              </div>
              <hr style="margin-top: 25px; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 0.85rem; color: #64748b;">Delivered securely via Resend from your Portfolio Website.</p>
            </div>
          `
        });

        if (error) {
          console.error('Resend delivery error:', error);
        } else {
          emailSent = true;
          console.log(`Notification email successfully delivered via Resend to ${recipient}:`, data);
        }
      } catch (sendError) {
        console.error('Error invoking Resend API:', sendError.message);
      }
    } else {
      if (!resend) {
        console.log('Notice: RESEND_API_KEY is missing in .env.');
      } else if (!recipient) {
        console.log('Notice: NOTIFICATION_EMAIL is not set in .env. Message saved to MongoDB only.');
      }
    }

    res.status(201).json({
      message: 'Message saved successfully!',
      emailSent
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

// Database connection & Server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} (without MongoDB)`);
    });
  });