const TABLA = 'pacientes';
const auth = require('../auth');




module.exports = function(dbInyectada){
    let db = dbInyectada;
    if (!db){
        require('../../DB/mysql');
    }

    async function todos(){
        const sql = `CALL sp_obtener_pacientes()`
        try {
            const respuesta = await db.obtenerPacientes(sql);
            return respuesta[0];
        } catch (error) {
            console.error('Error al obtener los pacientes registrados', error);
            throw new Error('Error al obtener paiente');
            
        }
        
    }
    async function obtenerCI(numero_documento){
        const sql = `CALL sp_PacientePorDocumento(?)`;
        const parms = [numero_documento];

        try {
            const respuesta = await db.obtenerCI(sql, parms);
            return respuesta[0];
        } catch (error) {
            console.error('Error al obtener el paciente por numero CI', error);
            throw new error('Error al obtener paciente por documento');
            
        }
    }
   
    
    async function agregar(body){
        const paciente ={
            id_paciente: body.id_paciente,
            numero_documento: body.numero_documento,
            tipo_documento: body.tipo_documento,
            primer_nombre: body.primer_nombre,
            segundo_nombre: body.segundo_nombre,
            primer_apellido: body.primer_apellido,
            segundo_apellido: body.segundo_apellido,
            fecha_nacimiento: body.fecha_nacimiento,
            hora_nacimiento: body.hora_nacimiento,
            sexo: body.sexo,
            lugar_nacimiento_pais: body.lugar_nacimiento_pais,
            departamento: body.departamento,
            distrito: body.distrito,
            nacionalidad: body.nacionalidad,
            etnias: body.etnias,
            estado_civil: body.estado_civil,
            residencia_habitual_departamento: body.residencia_habitual_departamento,
            residencia_habitual_distrito_ciudad: body.residencia_habitual_distrito_ciudad,
            residencia_habitual_barrio_compania: body.residencia_habitual_barrio_compania,
            area: body.area,
            direccion: body.direccion,
            numero_casa: body.numero_casa,
            numero_telefono: body.numero_telefono,
            correo_electronico: body.correo_electronico,
            nivel_educativo: body.nivel_educativo,
            ano_cursado: body.ano_cursado,
            seguro_medico: body.seguro_medico,
            situacion_laboral: body.situacion_laboral,
            ocupacion: body.ocupacion,
            profesion: body.profesion,
            id_clinica: body.id_clinica,
            estado: body.estado,
            tipo_usuario: body.tip
        };

        const sql = `
        CALL sp_addPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
    `;
    const params = [
        paciente.numero_documento,
        paciente.tipo_documento,
        paciente.primer_nombre,
        paciente.segundo_nombre,
        paciente.primer_apellido,
        paciente.segundo_apellido,
        paciente.fecha_nacimiento,
        paciente.hora_nacimiento,
        paciente.sexo,
        paciente.lugar_nacimiento_pais,
        paciente.departamento,
        paciente.distrito,
        paciente.nacionalidad,
        paciente.etnias,
        paciente.estado_civil,
        paciente.residencia_habitual_departamento,
        paciente.residencia_habitual_distrito_ciudad,
        paciente.residencia_habitual_barrio_compania,
        paciente.area,
        paciente.direccion,
        paciente.numero_casa,
        paciente.numero_telefono,
        paciente.correo_electronico,
        paciente.nivel_educativo,
        paciente.ano_cursado,
        paciente.seguro_medico,
        paciente.situacion_laboral,
        paciente.ocupacion,
        paciente.profesion,
        paciente.id_clinica,
        paciente.estado
    ];

    try {
        const respuesta = await db.agregarPaciente(sql, params);
        console.log('Respuesta', respuesta);
        return true;
    } catch (error) {
        console.error('Error al agregar paciente:', error);
        return false;
        
    }
    }
    
    async function eliminar(id_paciente){
        const sql = `CALL sp_eliminar_paciente(?)`;
        const params = [id_paciente];

        try {
            await db.eliminarPaciente(sql, params);
            console.log('Paciente eliminado con éxito');
            return true;
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            throw new Error('Error al eliminar paciente');
        }
    }
    
    return{
        todos,
        obtenerCI,
        agregar,
        eliminar,
    }
    
}