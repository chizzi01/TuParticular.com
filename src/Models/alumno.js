const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
    fechadenacimiento: Date,
    estudios: String,
    nivel: String,
    estudiosfinalizados: Boolean,
    clases: [{
        nombre: String,
        descripcion: String,
        precio: Number,
        duracion: Number,
        foto: String,
        estado: String
    }]
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
