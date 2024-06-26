const db = require('../../DB/mysql');

const TABLA = 'usuarios'

function todos(){
    return db.todos(TABLA)
}

function uno(id_usuario){
    return db.uno(TABLA, id_usuario)
}

function agregar(body){    
    return db.agregar(TABLA, body)
}

function eliminar(body){    
    return db.eliminar(TABLA, body)
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar
}