require('dotenv').config();
module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },

    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWOR || '',
        database: process.env.DB_NAME || 'Ejemplo'

    }
}
//Martinezcristy07@gmail.com