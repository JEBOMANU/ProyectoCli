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

function agregar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    });
}


function eliminar(tabla, data){
    return new Promise((resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE id_usuario= ?`, data.id_usuario, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0])
        })
    });
}

function obtenerPacientes(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function obtenerCI(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}


function agregarPaciente(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

async function eliminarPaciente(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function obtenerAdmision(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function agregarAdmision(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}


async function eliminarAdmision(sql, params) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}


module.exports =  {
    todos,
    uno,
    agregar,
    eliminar,
    query,
    obtenerPacientes,
    obtenerCI,
    agregarPaciente,
    eliminarPaciente,
    obtenerAdmision,
    agregarAdmision,
    eliminarAdmision
}