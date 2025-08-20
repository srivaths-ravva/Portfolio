import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { name, email, company, message } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const myEmail = String(process.env.INBOX_TO);
    const fromEmail = String(process.env.FROM_EMAIL);
    await resend.emails.send({
      from: fromEmail,
      to: myEmail,
      subject: `New project inquiry from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
