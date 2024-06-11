require('dotenv').config();
const fs = require('fs');
const axios= require('axios')
const FormData = require('form-data');

const PROCESS_URL = process.env.URL_PROCESS + "servicio1/";

exports.getRecomendation = async (req, res) => {
  try {
    const { usuario, tokenid } = req.body;
    console.log("asdf  "+usuario+"  "+tokenid)
    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('tokenid', tokenid);
    const response = await axios.post(PROCESS_URL + "recomendation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    console.log(response.data)
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching message from Python:', error);
    res.status(500).send({mensaje:'Error fetching message', retcode:96 });
  }
};

exports.getTranscribe = async (req, res) => {
  try {
    const { language, tipo } = req.body;
    console.log("asdf  "+language+"  "+tipo)
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
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
    console.log(response.data)
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error al borrar el audio:', err);
      } else {
        console.log('Audio borrado exitosamente');
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching message from Python:', error);
    res.status(500).send({mensaje:error, retcode:96 });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { user, token } = req.body;
    console.log("asdf 1 "+user+"  "+token)
    const formData = new FormData();
    formData.append('user', user);
    formData.append('token', token);
    const response = await axios.post(PROCESS_URL + "chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    console.log(response.data)
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching chat from Python:', error);
    res.status(500).send({mensaje:'Error fetching message', retcode:96 });
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

exports.cargarPiezas = (req, res) => {
  try {
    const { usuario } = req.body;
    const formData = new FormData();
    formData.append('usuario', usuario);
    const response = axios.post(PROCESS_URL + "cargarpiezas", formData, {
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

