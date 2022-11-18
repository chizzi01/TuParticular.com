const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfesorSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    password: String,
    titulo: String,
    experiencia: String,
    rol: String,
    clases: [{
        nombre: String,
        descripcion: String,
        precio: Number,
        duracion: Number,
        foto: String,
        estado: String
    }]
});

module.exports = mongoose.model('Profesor', ProfesorSchema);
