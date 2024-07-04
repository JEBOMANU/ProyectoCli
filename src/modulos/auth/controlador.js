const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth')


module.exports = function(dbInyectada){
    let db = dbInyectada;
    if (!db){
        require('../../DB/mysql');
    }

    async function login(usuario, password){
        const data = await db.query(TABLA, {usuario: usuario});

        return bcrypt.compare(password, data.password)
            .then(resultado =>{
                if(resultado === true){
                    return auth.asignarToken({...data})

                }else{
                    throw new ('Informacion Invalida');
                }
            })
    }


    
    async function agregar(data){
        const authData = {
            id_auth: data.id_auth,  
        }

        if(data.usuario){
            authData.usuario = data.usuario
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5) 
        }

        return db.agregar(TABLA, authData)
    }
    
    return{
        agregar,
        login,
    }
    
}