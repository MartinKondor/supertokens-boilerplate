
export default function verifyPhoneTemplate(
    token: string
) {
    const baseUrl = process.env.BASE_URL;
    const verifyPhoneUrl = `${baseUrl}/api/auth/verify-phone-token?token=${token}`;
    return `
    Hello, please verify your phone number by clicking the following link: <a href="${verifyPhoneUrl}">Verify Phone</a>
    `.trim();
}
