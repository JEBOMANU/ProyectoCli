const TABLA = 'admisiones';
const auth = require('../auth');

module.exports = function(dbInyectada){
    let db = dbInyectada;
    if (!db){
        require('../../DB/mysql');
    }

    async function obtenerTodasAdmision(){
        const sql = `CALL sp_obtener_admisiones()`
        try {
            const respuesta = await db.obtenerAdmision(sql);
            return respuesta[0];
        } catch (error) {
            console.error('Error al obtener los pacientes registrados', error);
            throw new Error('Error al obtener paiente');
            
        }
        
    
    }
    async function agregarAdmision(body) {
        const admision = {
            id_paciente: body.id_paciente,
            tipo_consulta: body.tipo_consulta,
            fecha_admision: body.fecha_admision,
            id_profesional: body.id_profesional,
            id_clinica: body.id_clinica,
            estado: body.estado
        };
    
        const sql = `
            CALL sp_addAdmision(?, ?, ?, ?, ?, ?);
        `;
    
        const params = [
            admision.id_paciente,
            admision.tipo_consulta,
            admision.fecha_admision,
            admision.id_profesional,
            admision.id_clinica,
            admision.estado
        ];
    
        try {
            const respuesta = await db.agregarAdmision(sql, params);
            console.log('Respuesta', respuesta);
            return true;
        } catch (error) {
            console.error('Error al agregar o actualizar admisión:', error);
            return false;
        }
    }

    async function eliminar(id_admision){
        const sql = `CALL sp_eliminarAddmision(?)`;
        const params = [id_admision]

        try {
            await db.eliminarAdmision(sql, params);
            console.log('Admision eliminado con éxito');
            return true;
        } catch (error) {
            console.error('Error al eliminar admision :', error);
            throw new Error('Error al eliminar admision');
        }
    }

    async function asignarProfesional(id_admision, tipo_consulta, fecha_admision, id_clinica) {
        const sql = `CALL sp_asignarProfesional(?, ?, ?, ?)`;
        const params = [id_admision, tipo_consulta, fecha_admision, id_clinica];
    
        try {
            const [result] = await db.query(sql, params);
            return result[0]; // Devuelve el ID del profesional asignado
        } catch (error) {
            console.error('Error al asignar profesional:', error);
            throw new Error('Error al asignar profesional');
        }
    }
    
    module.exports = {
        asignarProfesional,
    };
    
    
    
    
    return{
        obtenerTodasAdmision,
        agregarAdmision,
        eliminar,
        asignarProfesional

    }
    
}