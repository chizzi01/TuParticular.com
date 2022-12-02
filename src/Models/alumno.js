const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
    fechadenacimiento: Date,
    estudios: String,
    nivel: String,
    estudiosfinalizados: Boolean,
    clases: [{
        type: Schema.Types.ObjectId,
        ref: 'Clase'
    }]
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
