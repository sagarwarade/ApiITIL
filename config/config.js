// connection to database
const config={
 "dbconn": {
    server: 'database-2.cudn5dfvsenm.ap-south-1.rds.amazonaws.com',
   user: 'admin',
   password: 'greenbot123',
   database: 'ITILDB',

   options: {
       encrypt: true // Use this if you're on Windows Azure
   }
},
"port":process.env.PORT || 3005,
};
module.exports=config;