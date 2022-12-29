const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_REDIRECT_URI,
    EMAIL_SENDER,
    
} = process.env;

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function sendEmail(to, subject, html) {
    return new Promise(async (resolve, reject) => {
        try {
          const accessToken = await oauth2Client.getAccessToken();
  
          const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "umar.ovie@gmail.com",
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
              refreshToken: GOOGLE_REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
  
          const mailOptions = {
            to,
            subject,
            html,
          };
  
          const response = transport.sendMail(mailOptions);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
}
module.exports = {
    sendEmail
}