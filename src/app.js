const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuario = require('./modulos/usuario/rutas');
const error = require('./modulos/red/errors');
const auth = require('./modulos/auth/rutas');
const paciente = require('./modulos/pacientes/rutas')
const admisiones = require('./modulos/admisiones/rutas');



const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/usuario', usuario)
app.use('/api/auth', auth)

app.use('/api/paciente', paciente)

app.use('/api/admisiones', admisiones)

app.use(error);

module.exports = app;