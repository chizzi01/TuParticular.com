const express = require('express');
const router = express.Router();
const Usuario = require('../Models/usuario');
const Alumno = require('../Models/alumno');
const Profesor = require('../Models/profesor');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");
const nodemailer = require('nodemailer');
const auth = require('../backend/middleware/auth');

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


router.post('/sendAuth', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req .body.email });
        if (!usuario) {
            return res.status(400).json({ errors: [{ msg: "El mail es incorrecto" }] });
        }
        const hash = getHash();
        sendMail(req.body.email, hash);
        usuario.authHash = hash;
        usuario.save();
        res.status(200).json({
            message: 'Mail enviado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

function getHash(){
    letras = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    clave = "";
    for (i=0; i<8; i++) clave += letras.charAt(Math.floor(Math.random()*letras.length));
    return clave;
}

function sendMail(email, hash){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'TuParticular.com',
        to: email,
        subject: 'Verificacion de cuenta',
        html: '<h1>Verificacion de cuenta</h1><h2>Tu codigo de verificacion es:</h2><strong> ' + hash + ' </strong>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



router.post('/verifyAuth', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        const hash = req.body.hash;
        if (usuario.authHash != hash) {
            return res.status(400).json({ errors: [{ msg: "El codigo es incorrecto" }] });
        }
        usuario.authHash = null;
        usuario.save();
        res.status(200).json({
            message: 'Codigo correcto',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

router.post('/changePassword',[
    check('newPassword', 'El password es invalido').isLength({ min: 6 }),
    check('email', 'El email es invalido').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        const newPassword = req.body.newPassword;
        const saltpassword = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(newPassword, saltpassword);
        usuario.password = hashpassword;
        usuario.save();
        res.status(200).json({
            message: 'Password cambiado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});





module.exports = router;
