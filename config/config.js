// connection to database
const config={
 "dbconn": {
    server: 'localhost',
   user: 'sa',
   password: '123456',
   database: 'ITILDB',

   options: {
       encrypt: true // Use this if you're on Windows Azure
   }
},
"port":process.env.PORT || 3005,
};
module.exports=config;