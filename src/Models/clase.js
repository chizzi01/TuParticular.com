const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaseSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    profesor: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    frecuencia: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    alumnos: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    }],
    solicitudes: [{
        nombreClase: {
            type: String,
        },
        email:{
            type: String,
        },
        telefono:{
            type: Number,
        },
        horario: {
            type: String,
        },
        motivo: {
            type: String,
        },
        alumno : {
            type: Schema.Types.ObjectId,
            ref: 'Alumno'
        }
        
    }],
    comentarios: [{
        texto : {
            type: String,
        },
        alumno : {
            type: Schema.Types.ObjectId,
            ref: 'Alumno'
        },
        aceptado: {
            type: Boolean,
            default: false
        }
    }],
    calificadores: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    }],
});

module.exports = mongoose.model('Clase', ClaseSchema);
