const auth = require('../../auth')

module.exports = function chequearAuth(){


    function middleware(req, res, next){
        const id = req.body.id_usuario
        auth.chequearToken.confirmarToken(req, id)//id
        next()
    }

    return middleware
}