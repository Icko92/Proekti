const express = require('express');
var bodyParser = require('body-parser');
var appRouter = require('./router/index')
const middleware = require('./middlewares/common')



const app = express();

app.use(middleware.logger)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type: '*/*'}));

app.use('/api', appRouter);

app.use(middleware.wrongRoute);
app.use(middleware.errorHandler);

var port = process.env.PORT || 8080;
app.listen(port, () =>{
    console.log(`Api is listening on port ${port} !`);
})