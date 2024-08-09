require('dotenv').config();
const crypto = require('crypto');

//const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_KEY, 'utf8'); // 32 bytes para AES-256
const algorithm = 'aes-256-cbc';
// Clave secreta de 32 bytes (asegúrate de que sea la misma que en React)
//const secretKey = Buffer.from('12345678901234567890123456789012', 'utf8'); // 32 bytes

const encrypt = (data) => {
  const iv = crypto.randomBytes(16); // Genera un IV de 16 bytes
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (ciphertext) => {
  console.log(process.env.SECRET_KEY)
  console.log(secretKey)
  const [ivHex, encryptedData] = ciphertext.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

module.exports = {
  encrypt,
  decrypt
};