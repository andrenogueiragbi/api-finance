require('dotenv').config()

/* //FROM MYSQL
module.exports = {
    dialect: 'mysql',
    database: process.env.DATABASE_TEST || false,
    username: process.env.DB_USER_TEST || false,
    password: process.env.DB_PASS_TEST || false,
    host: process.env.DB_HOST_TEST || false,
    logging: false,
    warnings: false,
    define: {
        timestamps: true,
        underscored: true,
    },

} */

//FROM MYSQL
module.exports = {
    dialect: process.env.DB_DIALECT ,
    database: process.env.DATABASE ,
    username: process.env.DB_USER ,
    password: process.env.DB_PASS ,
    host: process.env.DB_HOST ,
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};


