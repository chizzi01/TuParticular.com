const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    password: String,
    rol: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
