const express = require('express');
const router = express.Router();
const Clase = require('../Models/clase');
const Profesor = require('../Models/profesor');
const auth = require('../backend/middleware/auth');
const Usuario = require('../Models/usuario');
const Alumno = require('../Models/alumno');
const mongoose = require('mongoose');
const { check } = require('express-validator');
const clase = require('../Models/clase');
const nodemailer = require('nodemailer');
const usuario = require('../Models/usuario');


function sendMail(email, asunto, contenido) {
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
        subject: asunto,
        // 'Estado de solicitud'
        html:  contenido 
        // '<h1>Estado de solicitud</h1><h2>La solicitud de la clase </h2><strong>' + nombreClase + '</strong><h2> ha sido </h2> <strong>' + estado + '</strong>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


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
            profesor: usuario.nombre,
            tipo: req.body.tipo,
            frecuencia: req.body.frecuencia,
        });

        clase = await clase.save();
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
        let clase = await Clase.findById(req.params.id);
        clase.alumnos.forEach(async (alumno) => {
            alumno = await Alumno.findById(alumno);
            alumno.clases = alumno.clases.filter(clase => clase != req.params.id);
            alumno.save();
        });
        await Clase.findByIdAndDelete(req.params.id);
        return res.send(clase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/update/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        const clase = profesor.clases.filter(clase => clase == req.params.id);
        if (clase.length > 0) {
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
        res.json({ msg: "Clase actualizada" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/all', auth, async (req, res) => {
    try {
        let clases = await Clase.find();
        clases.forEach(clase => { clase.comentarios = clase.comentarios.filter(comentario => {return comentario.aceptado == true});
        // clase.comentarios= Promise.all(clase.comentarios.map(async (comentario) => {
        //     let alumno = await Alumno.findById(comentario.alumno);
        //     let usuario = await Usuario.findOne({alumnoId: alumno._id});
        //     comentario.alumno = usuario.nombre;
        //     return comentario;
        // }));


    });
        res.send(clases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post('/contratar', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        const clase = await Clase.findById(req.body.idClase);

        const solicitudes = clase.solicitudes.filter(solicitud => solicitud.alumno.toString() === usuario.alumnoId.toString());
        if (solicitudes.length > 0) {
            return res.status(400).json({ msg: "Ya se ha enviado una solicitud" });
        }

        clase.solicitudes.push({
            nombreClase: clase.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            motivo: req.body.motivo,
            horario: req.body.horario,
            alumno: alumno._id
        });
        clase.save();
        res.json({ msg: "Solicitud enviada" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.get('/solicitudes', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        if (!profesor) {
            return res.status(400).json({ msg: "No es un profesor" });
        }
        let clases = profesor.clases;
        let solicitudes = await Promise.all(clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            let solicitudes = clase.solicitudes;
            solicitudes["claseId"] = clase._id;
            return clase.solicitudes;
        }));

        res.send(solicitudes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/aprobar', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        let clases = await Promise.all(profesor.clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            return clase;
        }));
        let clase = clases.filter(clase => (clase.solicitudes.filter(solicitud => solicitud._id == req.body._id)).length > 0);
        if (clase.length == 0) {
            return res.status(400).json({ msg: "No es el profesor de la clase" });
        }
        clase = clase[0];
        clase.alumnos.push(req.body.alumno);
        clase.solicitudes = clase.solicitudes.filter(solicitud => solicitud._id != req.body._id);
        clase.save();
        const alumno = await Alumno.findById(req.body.alumno);
        alumno.clases.push(clase._id);
        alumno.save();
        sendMail(req.body.email, "Estado de la solicitud", '<h1>Estado de solicitud</h1><h3>La solicitud de la clase </h3><h3>' + clase.nombre + '</h3><p> ha sido </h2> <strong> Aprobada </strong>');
        res.json({ msg: "Alumno agregado" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.put('/rechazar', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        let clases = await Promise.all(profesor.clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            return clase;
        }));
        let clase = clases.filter(clase => (clase.solicitudes.filter(solicitud => solicitud._id == req.body._id)).length > 0);
        if (clase.length == 0) {
            return res.status(400).json({ msg: "No es el profesor de la clase" });
        }
        clase = clase[0];
        clase.solicitudes = clase.solicitudes.filter(solicitud => solicitud._id != req.body._id);
        clase.save();
        sendMail(req.body.email, "Estado de la solicitud", '<h1>Estado de solicitud</h1><h3>La solicitud de la clase </h3><h3>' + clase.nombre + '</h3><p> ha sido </h2> <strong> Rechazada </strong>');
        res.json({ msg: "Solicitud rechazada" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.get('/clasesAlumno', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        let clases = await Promise.all(alumno.clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            return clase;
        }));
        res.send(clases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.put('/finalizar/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        let clases = await Promise.all(alumno.clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            return clase;
        }));
        let clase = clases.filter(clase => clase._id == req.params.id);
        if (clase.length == 0) {
            return res.status(400).json({ msg: "No es el alumno de la clase" });
        }
        clase = clase[0];
        clase.alumnos = clase.alumnos.filter(alumno => alumno != req.usuario.id);
        clase.save();
        alumno.clases = alumno.clases.filter(clase => clase != req.params.id);
        alumno.save();
        res.json({ msg: "Clase finalizada" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.put('/comentar/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        if (!req.body.comentario) {
            return res.status(400).json({ msg: "No se envió comentario" });
        }
        let clase = await Clase.findById(req.params.id);
        if (clase.alumnos.filter(al => al.toString() == alumno._id.toString()).length == 0) {
            return res.status(400).json({ msg: "No es el alumno de la clase" });
        }
        clase.comentarios.push({ alumno: alumno._id, texto: req.body.comentario });
        clase.save();
        res.json({ msg: "Comentario agregado" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.get('/comentariosSolicitados', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        if (!profesor) {
            return res.status(400).json({ msg: "No es un profesor" });
        }
        let comentarios = await Promise.all(profesor.clases.map(async (clase) => {
            clase = await Clase.findById(clase);
            let comentarios = clase.comentarios.filter(comentario => {
                return (comentario.aceptado == false);
            });
            comentarios = await Promise.all(comentarios.map(async (comentario) => {
                let alumno = await Alumno.findById(comentario.alumno);
                let usuarioAlumno = await Usuario.findOne({ alumnoId: alumno._id });
                return { solicitante: usuarioAlumno.nombre + " " + usuarioAlumno.apellido, comentario: comentario.texto, clase: clase._id, id : comentario._id }
            }));

            return comentarios;
        }));
        comentarios = comentarios.filter(comentario => comentario.length > 0);
        console.log(comentarios);
        res.send(comentarios);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.put('/aceptarComentario/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        if (!profesor) {
            return res.status(400).json({ msg: "No es un profesor" });
        }
        let clase = await Clase.findById(req.body.claseId);
        let comentario = clase.comentarios.filter(comentario => comentario._id.toString() == req.params.id.toString());
        if (comentario.length == 0) {
            return res.status(400).json({ msg: "No existe el comentario" });
        }
        comentario = comentario[0];
        comentario.aceptado = true;
        clase.save();
        res.json({ msg: "Comentario aceptado" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



router.put('/rechazarComentario/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const profesor = await Profesor.findById(usuario.profesorId);
        if (!profesor) {
            return res.status(400).json({ msg: "No es un profesor" });
        }
        let clase = await Clase.findById(req.body.claseId);
        let comentario = clase.comentarios.filter(comentario => comentario._id.toString() == req.params.id.toString());
        const alumno = await Alumno.findById(comentario[0].alumno);
        const usuarioAlumno = await Usuario.findOne({ alumnoId: alumno._id });
        clase.comentarios = clase.comentarios.filter(comentario => comentario._id.toString() != req.params.id.toString());
        clase.save();
        sendMail(usuarioAlumno.email, "Comentario rechazado", " Su comentario ha sido rechazado debido a: " + req.body.motivo);
        res.json({ msg: "Comentario rechazado" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.put('/calificar/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        if (!req.body.calificacion) {
            return res.status(400).json({ msg: "No se envió calificación" });
        }
        if (req.body.calificacion < 1 || req.body.calificacion > 5) {
            return res.status(400).json({ msg: "Calificación inválida" });
        }
        let clase = await Clase.findById(req.params.id);
        if (clase.alumnos.filter(al => al.toString() == alumno._id.toString()).length == 0) {
            return res.status(400).json({ msg: "No es el alumno de la clase" });
        }
        if (clase.calificadores.filter(cal => cal.toString() == alumno._id.toString()).length > 0) {
            return res.status(400).json({ msg: "Ya calificó la clase" });
        }
        clase.calificadores.push(alumno._id);
        clase.rating = (parseInt(clase.rating) + parseInt(req.body.calificacion));
        clase.save();
        res.json({ msg: "Calificación agregada" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/calificaciones', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        const alumno = await Alumno.findById(usuario.alumnoId);
        if (!alumno) {
            return res.status(400).json({ msg: "No es un alumno" });
        }
        let clases = await Promise.all(alumno.clases.map(async (clase) => {
            clase = await Clase.findById (clase);
            let profesor = await Profesor.findById(clase.profesor);
            let usuarioProfesor = await Usuario.findOne({ profesorId: profesor._id });
            return { nombre: usuarioProfesor.nombre + " " + usuarioProfesor.apellido, rating: clase.rating, id: clase._id }
        }));
        res.send(clases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
