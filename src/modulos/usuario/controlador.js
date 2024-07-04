const TABLA = 'usuarios';
const auth = require('../auth');




module.exports = function(dbInyectada){
    let db = dbInyectada;
    if (!db){
        require('../../DB/mysql');
    }

    function todos(){
        return db.todos(TABLA)
    }
    function uno(id){
        return db.uno(TABLA, id)
    }
    
    async function agregar(body){
        const usuario ={
            id_usuario: body.id_usuario,
            tipo_documento: body.tipo_documento,
            nombres: body.nombres,
            apellidos: body.apellidos,
            tipo_usuario: body.tipo_usuario,
            asignacion_clinica: body.asignacion_clinica,
            estado: body.estado,
        }
        const respuesta = await db.agregar(TABLA, usuario)
        console.log('Respuesta', respuesta);
        var insertId = 0;

        if(body.id_usuario == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id_usuario;
        }

        if (body.usuario || body.password) {
            await auth.agregar({
                id_auth: insertId,
                usuario: body.usuario,
                password: body.password,
            })
            
        } 

        return true;
    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body)
    }

    return{
        todos,
        uno,
        agregar,
        eliminar,
    }
    
}