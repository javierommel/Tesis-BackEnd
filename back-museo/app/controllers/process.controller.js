require('dotenv').config();
const fs = require('fs');
const axios = require('axios')
const FormData = require('form-data');
const logger = require('../utils/logger');

const PROCESS_URL = process.env.URL_PROCESS + "servicio1/";

exports.getRecomendation = async (req, res) => {
  try {
    const { usuario, tokenid } = req.body;
    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('tokenid', tokenid);
    const headers = formData.getHeaders();
    const response = await axios.post(PROCESS_URL + "recomendation", formData, {
      headers
    }
    );
    res.send(response.data);
  } catch (error) {
    logger.error('Error al obtener recomendación Python: ' + error.message);
    logger.error(error.stack);
    res.status(500).send({ mensaje: 'Error al obtener recomendacion', retcode: 96 });
  }
};

exports.getTranscribe = async (req, res) => {
  try {
    const { language, tipo } = req.body;
    const file = req.file;
    if (!file) {
      logger.info('getTranscribe: Archivo no cargado ');
      return res.status(400).send('Archivo de audio no encontrado.');
    }
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(file.path));
    formData.append('language', language);
    formData.append('tipo', tipo);
    const headers = formData.getHeaders();
    const response = await axios.post(PROCESS_URL + "transcribe", formData, {
      headers
    }
    );
    fs.unlink(file.path, (err) => {
      if (err) {
        logger.error('Error al borrar el audio: '+ err);
      } else {
        logger.info('Audio borrado exitosamente')
      }
    });
    res.send(response.data);
  } catch (error) {
    logger.error('Error transcribir Python: ' + error.message);
    logger.error(error.stack);
    res.status(500).send({ mensaje: error, retcode: 96 });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { user, token, question } = req.body;
    const formData = new FormData();
    formData.append('user', user);
    formData.append('token', token);
    formData.append('question', question);
    const response = await axios.post(PROCESS_URL + "chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    res.send(response.data);
  } catch (error) {
    logger.error('Error al consultar chat Python: ' + error.message);
    logger.error(error.stack);
    res.status(500).send({ mensaje: 'Error al  consultar Chat', retcode: 96 });
  }
};
exports.cargarModelo = (req, res) => {
  try {
    const { usuario } = req.body;
    const formData = new FormData();
    formData.append('usuario', usuario);
    const response = axios.post(PROCESS_URL + "cargarmodelo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    res.send(response.data);
  } catch (error) {
    logger.error('Error fetching message from Python: ' + error.message);
    logger.error(error.stack);
    res.status(500).send('Error fetching message');
  }
};

exports.cargarPiezas = async (req, res) => {
  try {
    const { usuario_modificacion } = req.body;
    const file = req.file;
    if (!file) {
      logger.info('cargar Piezas: Archivo no cargado ');
      return res.status(400).send('Archivo no cargado.');
    }
    const formData = new FormData();
    formData.append('usuario_modificacion', usuario_modificacion);
    formData.append('archivo', fs.createReadStream(file.path));
    const headers = formData.getHeaders();
    const response = await axios.post(PROCESS_URL + "cargarpiezas", formData, {
      headers
    }
    );
    fs.unlink(file.path, (err) => {
      if (err) {
        logger.error('Error al borrar el archivo: ' + err);
      } else {
        logger.info('Archivo borrado exitosamente ');
      }
    });
    res.send(response.data);
  } catch (error) {
    logger.error('Error fetching message from Python: ' + error.message);
    logger.error(error.stack);
    res.status(500).json({ message: 'Error al cargar piezas de arte.' });
  }
};

