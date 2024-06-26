const mysql = require('mysql');
const config = require('../config');

const dbconfig ={
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 2000);
        }else{
            console.log('DB Conectada')

        }
    });
    conexion.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result)=> {
           return error ? reject(error) : resolve(result);
            resolve(result);
        })
    });

}

function uno(tabla, id_usuario){
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario=${id_usuario}`, (error, result)=> {
            return error ? reject(error) : resolve(result);
        })
    });

}




function insertar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET= ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    });
}

function actualizar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET id_usuario= ?`, [data.id_usuario], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    });
}

function agregar(tabla, data) {
    if (data && data.id_usuario ==0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
}
}

function eliminar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE id_usuario= ?`, data.id_usuario, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    });
}

module.exports =  {
    todos,
    uno,
    agregar,
    eliminar
}