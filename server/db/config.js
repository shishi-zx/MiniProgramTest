const {Sequelize} = require('sequelize')
const config = require('../config')

const dbInstance = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: true,
    timeout: 10000,
    timezone: '+08:00'
})

module.exports = dbInstance

// try {
//     await dbInstance.authenticate();
// console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// dbInstance.close()

