const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

app.use(express.json());

require("dotenv").config();
const { PORT, URL_DB } = process.env;

mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`)
})

