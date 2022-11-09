const Sequelize = require('sequelize');
const dbConfig = require('../config/database');



const Log = require('../modals/Log')
const Key = require('../modals/Key')
const User = require('../modals/User')
const Token = require('../modals/Token')





const connection = new Sequelize(dbConfig);

/*try{
    connection.authenticate();
    console.log('Connection has been established successfully');
} catch (error){
    console.error('Unable to connect to the database', error);
}*/

Log.init(connection);
Key.init(connection);
User.init(connection);
Token.init(connection);

module.exports = connection;