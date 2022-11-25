const express = require('express');
const router = express.Router();
const Clase = require('../Models/clase');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

router.post('/', (req, res) => {

    const clase = new Clase({
        nombre: String,
        descripcion: String,
        duración: Number,
        precio: Number,
        frecuencia: String,
        tipo: String,
        aprobado: Boolean, default: false
    });

    clase.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Clase creada',
            clase: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
    );
});

module.exports = router ;
