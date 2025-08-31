import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    const data = await resend.emails.send({
      from: "COMSATS PLUS Contact <contact@najamulhassan.tech>",
      to: ["najamulhassan1033@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: 'Barlow Semi Condensed', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #1E1F4A 0%, #3B82F6 100%); padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1E1F4A; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">From:</h3>
              <p style="margin: 0; color: #64748b; font-weight: 500;">${name} (${email})</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1E1F4A; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Subject:</h3>
              <p style="margin: 0; color: #64748b; font-weight: 500;">${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1E1F4A; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Message:</h3>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #1E1F4A;">
                <p style="margin: 0; color: #475569; line-height: 1.6; font-weight: 500;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 14px; font-weight: 500;">
                This message was sent from the COMSATS PLUS contact form.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: "COMSATS PLUS Team <noreply@najamulhassan.tech>",
      to: [email],
      subject: "Thank you for contacting COMSATS PLUS!",
      html: `
        <div style="font-family: 'Barlow Semi Condensed', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #1E1F4A 0%, #3B82F6 100%); padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="color: #1E1F4A; font-size: 16px; font-weight: 600; margin-bottom: 15px;">Hi ${name},</p>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">
              Thank you for contacting COMSATS PLUS! We've received your message about "${subject}" and our team will get back to you within 24 hours.
            </p>
            
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">
              In the meantime, feel free to explore our features and join our student community for instant support.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://cuiplus.com" style="background: linear-gradient(135deg, #1E1F4A 0%, #3B82F6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Visit COMSATS PLUS
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                Best regards,<br>
                The COMSATS PLUS Team
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
