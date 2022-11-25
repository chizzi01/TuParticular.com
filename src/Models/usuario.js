const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    alumnoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno'
    },
    profesorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesor'
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);