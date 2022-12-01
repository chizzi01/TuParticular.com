const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaseSchema = new Schema({
    nombre: String,
    profesor: String,
    descripcion: String,
    duracion: String,
    precio: Number,
    frecuencia: String,
    tipo: String,
    alumnos: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    }]
});

module.exports = mongoose.model('Clase', ClaseSchema);
