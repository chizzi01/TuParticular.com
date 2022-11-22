const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../Models/usuario');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {

 const saltpassword = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(req.body.password, saltpassword);

    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: hashpassword,
        rol: req.body.rol,
    });

    usuario.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Usuario creado',
            usuario: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
    );
});

module.exports = router;
