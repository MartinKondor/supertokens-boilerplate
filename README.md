# SuperTokens-Bolierplate

This project is a boilerplate for implementing a local SuperTokens API with Managed SuperTokens database and Twilio for user verification.

## Routes

### `/api/auth/login`

- Method: POST
- Description: Authenticates a user and generates an access token.
- Request Body:
    - `email` (string): The email address of the user.
    - `password` (string): The password for the user account.
    - `tenantId` (string | optional): The id of the user account's tenant.
- Response:
    - `status` (string): The status of the request.
    - `message` (string): A message indicating the result of the login process.
    - `accessToken` (string): An access token for the authenticated user.

### `/api/auth/verify`

- Method: POST
- Description: Verifies a user's phone number using Twilio.
- Request Body:
    - `phoneNumber` (string): The phone number to verify.
    - `verificationCode` (string): The verification code sent to the user's phone.
- Response:
    - `status` (string): The status of the request.
    - `message` (string): A message indicating the result of the verification process.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/MartinKondor/supertokens-boilerplate.git`
2. Install the dependencies: `npm install`
3. Configure the environment variables in a `.env.local` file:
     - `SUPERTOKENS_URL`: Your SuperTokens connection URI.
     - `SUPERTOKENS_API_KEY`: Your SuperTokens API key.
     - `TWILIO_SID`: Your Twilio account SID.
     - `TWILIO_TOKEN`: Your Twilio auth token.
4. Start the server: `npm run dev`
5. Open `http://localhost:3000/auth`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.