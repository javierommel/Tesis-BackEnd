const express = require("express")
const cors = require("cors")

const app = express()
var corsOptions = { origin: "http://localhost:8081" };
app.unsubscribe(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))