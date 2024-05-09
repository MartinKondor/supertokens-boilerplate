
export default function verifyEmailTemplate(
    email: string,
    token: string
) {
    const baseUrl = process.env.BASE_URL;
    const verifyEmailUrl = `${baseUrl}/verify-email?token=${token}&email=${email}`;
    return `
    <html>
        <body>
            <h1>Verify your email address</h1>
            <p>Click the link below to verify your email address:</p>
            <a href="${verifyEmailUrl}">Verify email address</a>
        </body>
    </html>
    `;
}
