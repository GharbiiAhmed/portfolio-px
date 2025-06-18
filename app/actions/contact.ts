"use server"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Option 1: Log to console (for development)
  console.log("📧 New Contact Form Submission:")
  console.log("Name:", name)
  console.log("Email:", email)
  console.log("Subject:", subject)
  console.log("Message:", message)
  console.log("---")

  // Option 2: Send email using a service like Resend
  /*
  try {
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: 'aghx01@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send message' }
  }
  */

  // For now, just simulate success
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, message: "Message received! I'll get back to you soon." }
}
