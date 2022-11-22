const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaseSchema = new Schema({
nombre: String,
descripcion: String,
duración: Number,
precio: Number,
frecuencia: String,
tipo: String,
aprobado: Boolean, default: false
});

module.exports = mongoose.model('Clase', ClaseSchema);
