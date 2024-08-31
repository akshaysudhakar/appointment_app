const sequelize = require('sequelize')
const sequelise = require('./../utils/database')




module.exports =sequelise.define('appointments',{
    id : {
        type : sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name :{
        type : sequelize.STRING,
        allowNull : false,
    },
    email :{
        type : sequelize.STRING,
        allowNull : false,
        unique : true
    },
    phone :{
        type : sequelize.STRING,
        allowNull : false,
        unique : true
    }
})