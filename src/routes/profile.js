const express = require("express");
const router = express.Router();
const auth = require("../backend/middleware/auth");
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/usuario");
const Alumno = require("../Models/alumno");
const Profesor = require("../Models/profesor");

router.get("/", auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        if (usuario.rol == "Alumno") {
            let alumno = await Alumno.findById(usuario.alumnoId);
            alumno = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                fechadenacimiento: alumno.fechadenacimiento,
                estudios: alumno.estudios,
                nivel: alumno.nivel,
                estudiosfinalizados: alumno.estudiosfinalizados,
                rol: usuario.rol

            }
            return res.json(alumno);
        }

        if (usuario.rol == "Profesor") {
            let profesor = await Profesor.findById(usuario.profesorId);
            profesor = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                titulo: profesor.titulo,
                experiencia: profesor.experiencia,
                rol: usuario.rol
            }
            return res.json(profesor);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/", auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        if (usuario.rol == "Alumno") {
            let alumno = await Alumno.findById(usuario.alumnoId);
            alumno.fechadenacimiento = req.body.fechadenacimiento;
            alumno.estudios = req.body.estudios;
            alumno.nivel = req.body.nivel;
            alumno.estudiosfinalizados = req.body.estudiosfinalizados;
            alumno.save();
            return res.status(201).json({msg: "Datos actualizados"});
        }
        if (usuario.rol == "Profesor") {
            let profesor = await Profesor.findById(usuario.profesorId);
            profesor.titulo = req.body.titulo;
            profesor.experiencia = req.body.experiencia;
            profesor.save();
            return res.status(201).json({msg: "Datos actualizados"});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;