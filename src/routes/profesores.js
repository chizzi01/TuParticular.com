const express = require('express');
const router = express.Router();
const Profesor = require('../Models/profesor');
const mongoose = require('mongoose');


router.post('/', (req, res) => {

    const profesor = new Profesor({
        // _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        titulo: req.body.titulo,
        experiencia: req.body.experiencia,
        rol: req.body.rol,
        clases: req.body.clases
    });

    profesor.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Profesor creado',
            profesor: result
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
