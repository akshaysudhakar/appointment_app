const sequelize = require('sequelize');


module.exports =   new sequelize('appointment_app','root','Akshay@2000',{
    host : 'localhost',
    dialect : 'mysql'
});