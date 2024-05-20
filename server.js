const express = require('express');
const cors = require('cors');
const http = require('http');
const port = 3008;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.Server(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})