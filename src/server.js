const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

require("dotenv").config();
const { PORT, URL_DB } = process.env;

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,"..","uploads")))
app.use(routes);

server.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`)
})

