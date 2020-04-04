const express=require('express');
const sql=require('mssql');
const debug=require('debug')('app');
const bodyparser=require('body-parser');
const config=require('./config/config')
const logger = require('./helper/logger');
const routes=require('./routes');

const app=express();

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false}));

//Check datbase connected or not
sql.connect(config.dbconn,(err)=>{
    if(err) {
       // console.log(err);
        logger.error('Error while connecting with database');
    } else {
        logger.info('Database is connected');
    }
    });



app.use('/', routes); 


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    res.status(404).json({ status: "Page not found" }).end();

});

app.listen(config.port,function(){
console.log('Listening on port',config.port);
});