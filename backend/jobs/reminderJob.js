const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

//0 8 * * * for 8 am within 24 hrs of appointment
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Only appointments that are accepted and fall 24h later
    const appointments = await Appointment.find({
      status: "Accepted",
      date: {
        $gte: new Date(next24h.setHours(0, 0, 0, 0)),
        $lt: new Date(next24h.setHours(23, 59, 59, 999)),
      }
    });

    for (const appointment of appointments) {
      const formattedDate = new Date(appointment.date).toLocaleString("en-IN", {
        day: "numeric", month: "long", year: "numeric", hour: '2-digit', minute: '2-digit'
      });

      const message = `
🩺 Hello ${appointment.name},

📅 This is a kind reminder for your appointment with ${appointment.doctor} scheduled on ${formattedDate}.

📍 Please make sure to arrive on time. If you need assistance, call +91 12345 67890.

---

🩺 नमस्ते ${appointment.name},

📅 ${appointment.doctor} के साथ आपकी अपॉइंटमेंट ${formattedDate} को निर्धारित है।

📍 समय पर पहुंचने का प्रयास करें। सहायता के लिए +91 12345 67890 पर कॉल करें।
      `;

      const subject = "⏰ Healifi - Appointment Reminder";

      await sendEmail(appointment.email, subject, message);
    }

    console.log("✅ Reminder emails sent successfully.");
  } catch (error) {
    console.error("❌ Error sending reminder emails:", error.message);
  }
});
