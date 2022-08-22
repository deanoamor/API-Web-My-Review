//config
const configBase = require('./config/config_base');

//express
const express = require('express');
const app = express();
const port = 3000;
const urlApi = "/api";
const urlWeb = "/web";

//cors
var cors = require('cors')
app.use(cors())
app.use(express.static('public'));

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port} and url ${configBase.base_url}`);
});