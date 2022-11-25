const express = require('express');
const router = express.Router();
const Usuario = require('../Models/usuario');
const Alumno = require('../Models/alumno');
const Profesor = require('../Models/profesor');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");

router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('telefono', 'El telefono es invalido').isLength({ min: 10 }).isNumeric(),
    check('password', 'El password es invalido').isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let usuario = await Usuario.findOne({ email: req.body.email });
        if (usuario) {
            return res.status(400).json({errors: [{msg: "El correo ya existe"}]});
        }
        const rol = req.body.rol;
        console.log(rol);
        let alumno, profesor;
        if (rol === 'Alumno') {

            alumno = new Alumno({
                fechadenacimiento: null,
                estudios: null,
                nivel: null,
                estudiosfinalizados: null
            });
            await alumno.save().then(result => {
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
        }

        if (rol === 'Profesor') {

            profesor = new Profesor({
                titulo: null,
                experiencia: null
            });
            await profesor.save().then(result => {
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
        }


        const saltpassword = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.password, saltpassword);


        usuario = new Usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            password: hashpassword,
            rol: req.body.rol,
            alumnoId: alumno ? alumno._id : null,
            profesorId: profesor ? profesor._id : null
        });

        await usuario.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Usuario creado',
                alumno: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        );

        // Usuario.methods.comparePassword = function (password) {
        //     return bcrypt.compareSync(password, this.password);
        // };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }

});

module.exports = router;
