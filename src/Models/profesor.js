const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfesorSchema = new Schema({
    titulo: String,
    experiencia: String,
    clases: [{
        type: Schema.Types.ObjectId,
        ref: 'Clase'
    }]
});

module.exports = mongoose.model('Profesor', ProfesorSchema);
