const express = require('express');
const router = express.Router();
const Alumno = require('../Models/alumno');
const mongoose = require('mongoose');


router.post('/', (req, res) => {

    const alumno = new Alumno({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password,
        rol: req.body.rol,
        fechadenacimiento: req.body.fechadenacimiento,
        estudios: req.body.estudios,
        nivel: req.body.nivel,
        estudiosfinalizados: req.body.estudiosfinalizados,
        clases: req.body.clases
    });

    alumno.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Alumno creado',
            alumno: result
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
