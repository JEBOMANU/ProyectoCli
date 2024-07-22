const express = require('express');

const respuesta = require('../red/respuestas');
const controlador= require('./index');

const router = express.Router();

router.get('/', todosAdmision);
router.post('/',  agregar);
router.post('/asignar', asignarProfesional)

router.delete('/', eliminar);

 async function todosAdmision (req, res, next){
    try {
        const items = await controlador.obtenerTodasAdmision()
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregarAdmision(req.body);
        let mensaje;
        if (req.body.id_admision == 0) {
            mensaje = 'Item guardado con éxito';
        } else {
            mensaje = 'Item actualizado con éxito';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
}

        async function eliminar (req, res, next){
            try {
                const {id_admision} = req.body
                await controlador.eliminar(id_admision);
                respuesta.success(req, res, 'item eliminado' , 200);
            } catch (err) {
                next(err);
                
            }
        }

        async function asignarProfesional(req, res, next) {
            try {
                const { id_admision, tipo_consulta, fecha_admision, id_clinica } = req.body;
                const profesionalAsignado = await controlador.asignarProfesional(id_admision, tipo_consulta, fecha_admision, id_clinica);
        
                if (profesionalAsignado.id_profesional_asignado) {
                    respuesta.success(req, res, { mensaje: 'Profesional asignado con éxito', id_profesional: profesionalAsignado.id_profesional_asignado }, 200);
                } else {
                    respuesta.success(req, res, { mensaje: 'No hay profesionales disponibles' }, 200);
                }
            } catch (err) {
                next(err);
            }
        }


module.exports = router;