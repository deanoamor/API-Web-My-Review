//config
const baseConfig = require('./config/base_config');

//middleware
const routeMiddleware = require('./middlewares/route_middleware');

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

//route
require('./routes/api_route')(app,urlApi);
require('./routes/web_route')(app,urlWeb);

//if route not found
app.use(routeMiddleware.notfoundCheckRoute);

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port} and url ${baseConfig.base_url}`);
});