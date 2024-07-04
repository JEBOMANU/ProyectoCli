const express = require('express');

const respuesta = require('../red/respuestas');
const controlador= require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/filtrar',  uno);
router.post('/',  agregar);

router.put('/', eliminar);

 async function todos (req, res, next){
    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

   

    async function uno(req, res, next) {
        try {
            const { numero_documento } = req.body;
            const paciente = await controlador.obtenerCI(numero_documento);
            res.json(paciente);
        } catch (error) {
            next(error);
        }
    }
    

        async function agregar (req, res, next){
            try {
                const items = await controlador.agregar(req.body);
                if(req.body.id_paciente == 0){
                    mensaje = 'Item guardado con exito';
                }else{
                    mensaje = 'Item actualizado con exito';
                }
                respuesta.success(req, res, mensaje , 201);
            } catch (err) {
                next(err);
                
            }
        }

        async function eliminar (req, res, next){
            try {
                const {id_paciente} = req.body
                await controlador.eliminar(id_paciente);
                respuesta.success(req, res, 'item eliminado' , 200);
            } catch (err) {
                next(err);
                
            }
        }
module.exports = router;