# SuperTokens-Bolierplate

This project is a boilerplate for implementing a local SuperTokens API with Managed SuperTokens database and Twilio for user verification.

## Used Tools

* Using [SuperTokens](https://supertokens.com/) for authentication
* Swagger at `http://localhost:3000/api-doc` with OpenAPI 3.0
* Using [FontAwesome](https://fontawesome.com/) for icons
* TODO: Using [Resend](https://resend.com/) for email address verification
* TODO: Using [Twilio](https://www.twilio.com/en-us) for phone number verification with SMS
* TODO: Using a [Postgres](https://www.postgresql.org) database with [Docker](https://www.docker.com/)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/MartinKondor/supertokens-boilerplate.git`
2. Install the dependencies: `npm install`
3. Configure the environment variables in a `.env.local` file:
     - `NODE_ENV`: `development` or `production`.
     - `SUPERTOKENS_URL`: Your SuperTokens connection URI.
     - `SUPERTOKENS_API_KEY`: Your SuperTokens API key.
     - `TWILIO_SID`: Your Twilio account SID.
     - `TWILIO_TOKEN`: Your Twilio auth token.
4. Start the server: `npm run dev`
5. Open `http://localhost:3000/auth` or `http://localhost:3000/api-doc` for Swagger UI.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.