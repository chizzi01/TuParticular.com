const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfesorSchema = new Schema({
    titulo: String,
    experiencia: String,
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
