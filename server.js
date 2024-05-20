const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const port = 3008;
const apiRouter = require("./routes/index")

const app = express();

app.use(express.json());
app.use(cors());
app.use(apiRouter)

const server = http.Server(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})