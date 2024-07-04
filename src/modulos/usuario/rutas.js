const express = require('express');
const ctrl = require('./controlador')

const seguridad = require ('./seguridad')
const respuesta = require('../red/respuestas');
const controlador = require('./index');
const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', seguridad(), agregar); //agregar seguridad() en ambos
router.put('/', eliminar);




async function todos (req, res, next){
    try{
        const items = await controlador.todos()
        respuesta.success( req,res, items, 200)
    }catch{
        next(err);
    }
};

async function uno (req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function agregar (req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        let mensaje = '';
        if (!req.body.id_usuario || req.body.id_usuario == 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
};

async function eliminar (req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, "Eliminado Correctamente", 200);
    } catch (err) {
        next(err);
    }
};

router.get('/',async function(req, res, next){
    const items = await controlador.todos()
    
        respuesta.success(req,res, items, 200)
});

module.exports = router;