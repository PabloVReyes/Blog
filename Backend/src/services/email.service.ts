import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

interface SendCredentialsParams {
    email: string
    name: string
    password: string
    message: string
}

export const sendUserCredentials = async ({
    email,
    name,
    password,
    message
}: SendCredentialsParams) => {
    const escapeHtml = (str: string) =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;')

    await transporter.sendMail({
        from: `"Intranet" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Credenciales de acceso",
        html: `
      <h2>Bienvenido ${escapeHtml(name)}</h2>

      <p>${escapeHtml(message)}</p>

      <p><b>Usuario:</b> ${escapeHtml(email)}</p>
      <p><b>Contraseña:</b> ${password}</p>

      <p>Te recomendamos cambiar tu contraseña después de iniciar sesión.</p>
    `
    })
}