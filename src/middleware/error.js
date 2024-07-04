function error(message, code) {
    let e = new Error(message);

    if(code){
        e.statusCode = code
    }
    return e;
}
module.exports = error;


//  {
//   "id_usuario": 1,
//   "codigo_usuario":123,
//   "tipo_documento": "DNI",
//   "contrasena": "444",
//   "nombres":"manuel",
//   "apellidos":"benit",
//   "tipo_usuario":"Medico",
//   "asignacion_clinica":"UNIDA- 1",
//   "estado":"ACIVO"
  
// } 