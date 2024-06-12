require('dotenv').config();
const fs = require('fs');
const axios = require('axios')
const FormData = require('form-data');

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
    console.error('Error al obtener recomendación Python:', error);
    res.status(500).send({ mensaje: 'Error al obtener recomendacion', retcode: 96 });
  }
};

exports.getTranscribe = async (req, res) => {
  try {
    const { language, tipo } = req.body;
    const file = req.file;
    if (!file) {
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
        console.error('Error al borrar el audio:', err);
      } else {
        console.log('Audio borrado exitosamente');
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error transcribir Python:', error);
    res.status(500).send({ mensaje: error, retcode: 96 });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { user, token } = req.body;
    const formData = new FormData();
    formData.append('user', user);
    formData.append('token', token);
    const response = await axios.post(PROCESS_URL + "chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Error al consultar chat Python:', error);
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
    console.error('Error fetching message from Python:', error);
    res.status(500).send('Error fetching message');
  }
};

exports.cargarPiezas = async (req, res) => {
  try {
    const { usuario_modificacion } = req.body;
    const file = req.file;
    if (!file) {
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
        console.error('Error al borrar el archivo:', err);
      } else {
        console.log('Archivo borrado exitosamente');
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching message from Python:', error);
    res.status(500).json({ message: 'Error al cargar piezas de arte.' });
  }
};

