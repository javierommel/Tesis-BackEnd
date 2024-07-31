const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const accountTransport = require('../config/mail.config');
const logger = require('../utils/logger');

exports.sendMail = async (to, token) => {
  const mailConfirmacion = '<!DOCTYPE html>'
		+ '<html lang="es">'
		+ '<head>'
		+ '    <meta charset="UTF-8">'
		+ '    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
		+ '    <title>Confirmación de Suscripción</title>'
		+ '    <style>'
		+ '        body {'
		+ '            font-family: Arial, sans-serif;'
		+ '            background-color: #f4f4f4;'
		+ '            padding: 20px;'
		+ '            margin: 0;'
		+ '        }'
		+ '        .container {'
		+ '            max-width: 600px;'
		+ '            margin: 0 auto;'
		+ '            background-color: #fff;'
		+ '            border-radius: 10px;'
		+ '            padding: 40px;'
		+ '            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);'
		+ '        }'
		+ '        h1 {'
		+ '            color: #007bff;'
		+ '            text-align: center;'
		+ '        }'
		+ '        p {'
		+ '            font-size: 16px;'
		+ '            line-height: 1.5;'
		+ '        }'
		+ '        .btn {'
		+ '            display: inline-block;'
		+ '            background-color: #007bff;'
		+ '            color: #fff;'
		+ '            text-decoration: none;'
		+ '            padding: 10px 20px;'
		+ '            border-radius: 5px;'
		+ '            margin-top: 20px;'
		+ '            transition: background-color 0.3s ease;'
		+ '        }'
		+ '        .btn:hover {'
		+ '            background-color: #0056b3;'
		+ '        }'
		+ '    </style>'
		+ '</head>'
		+ '<body>'
		+ '    <div class="container">'
		+ '        <h1>Confirmación de su cuenta</h1>'
		+ '        <p>Gracias por registrarte al "Museo Las Conceptas". Para confirmar tu cuenta, por favor haz clic en el botón de abajo:</p>'
		+ `        <a href="${accountTransport.url_confirmation}${token}" class="btn">Confirmar Registro</a>`
		+ '        <p>Si no solicitaste esta suscripción, puedes ignorar este mensaje.</p>'
		+ '    </div>'
		+ '</body>'
		+ '</html>';

  //const user = 'rommel2211@gmail.com';
  const subject = 'Confirmación de Cuenta';

  // Configuración de OAuth2
  /*const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    'https://developers.google.com/oauthplayground',
  );
  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false,
    },
  });*/

  // Obtener accessToken
  /*oauth2Client.getAccessToken((err, accessToken) => {
    if (err) {
      console.error('Error al obtener el accessToken:', err);
      return;
    }*/

    // Configuración del transportador SMTP para Gmail
    /*const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user,
        clientId: accountTransport.auth.clientId,
        clientSecret: accountTransport.auth.clientSecret,
        refreshToken: accountTransport.auth.refreshToken,
        accessToken,
      },
    });*/
	const transporter = nodemailer.createTransport(accountTransport);

    // Configuración del correo electrónico a enviar
    const mailOptions = {
      from: accountTransport.auth.user, // Remitente
      to, // Destinatario
      subject,
      html: mailConfirmacion, // Utiliza html en lugar de text para el contenido del correo
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
		logger.error('Error al enviar correo: '+mailOptions.to +' '+ error);
      } else {
		logger.info('Correo enviado: '+mailConfirmacion.to +' '+info.response);
      }
    });
  //});
};
