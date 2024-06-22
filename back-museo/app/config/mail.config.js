require('dotenv').config();

/*module.exports = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.USER_MAIL,
    clientId: process.env.CLIENT_ID_MAIL,
    clientSecret: process.env.CLIENT_SECRET_MAIL,
    refreshToken: process.env.REFRESH_TOKEN_MAIL,
  },
  url_confirmation: process.env.URL_CONFIRMATION,
};*/

module.exports = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.REFRESH_TOKEN_MAIL,
  },
};