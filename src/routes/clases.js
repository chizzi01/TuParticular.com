const express = require('express');
const router = express.Router();
const Clase = require('../Models/clase');
const Profesor = require('../Models/profesor');
const auth = require('../backend/middleware/auth');
const Usuario = require('../Models/usuario');
const mongoose = require('mongoose');
const { check } = require('express-validator');
const clase = require('../Models/clase');

router.post('/', auth, [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('duracion', 'La duracion es obligatoria').not().isEmpty(),
    check('frecuencia', 'La frecuencia es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById({ _id: usuario.profesorId });

        let clase = new Clase({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            duracion: req.body.duracion,
            precio: req.body.precio,
            profesor: req.body.profesor,
            tipo: req.body.tipo,
            frecuencia: req.body.frecuencia,
        });

        clase = await clase.save();
        console.log(profesor.titulo);
        profesor.clases.push(clase._id);
        profesor.save();
        res.send(clase);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});

router.get('/', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        const clases = profesor.clases;
        let payload = [];
        for (let i = 0; i < clases.length; i++) {
            let clase = await Clase.findById({ _id: clases[i] });
            payload.push(clase);
        }
        console.log(payload);
        res.send(payload);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        const clases = profesor.clases.filter(clase => clase != req.params.id);
        profesor.clases = clases;
        profesor.save();
        const clase = await Clase.findByIdAndDelete(req.params.id);
        return res.send(clase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        const clase = profesor.clases.filter(clase => clase == req.params.id);
        console.log(req.params.id);
        if (clase.length > 0) {
            console.log("entro");
            const clase = await Clase.findById(req.params.id);
            clase.nombre = req.body.nombre;
            clase.descripcion = req.body.descripcion;
            clase.duracion = req.body.duracion;
            clase.precio = req.body.precio;
            clase.profesor = req.body.profesor;
            clase.tipo = req.body.tipo;
            clase.frecuencia = req.body.frecuencia;
            clase.save();
        }
        res.json( {msg: "Clase actualizada"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
