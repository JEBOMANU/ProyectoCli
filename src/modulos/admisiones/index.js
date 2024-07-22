const db = require('../../DB/mysql');
const ctrl = require('./../admisiones/controlador');

module.exports = ctrl(db);