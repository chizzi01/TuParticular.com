const express = require("express");
const router = express.Router();
const auth = require("../backend/middleware/auth");
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/usuario");

// router.get("/", auth, async (req, res) => {
//     try {
//         const usuario = await Usuario.findById(req.usuario.id);
//         usuario.password= req.body.password;

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// });

// router.put("/", auth, async (req, res) => {
//     try {
//         console.log("entro");
//         const usuario = await Usuario.findById(req.usuario.id);
//         usuario.password= req.body.password;
//         usuario.save();
//         return res.json(usuario);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// });

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.set('view engine', 'ejs');


router.get('/changePassword', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        usuario.password = req.body.password;
        usuario.save();
        return res.json(usuario);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/changePassword', auth, async (req, res) => {
    try {
        const email = req.body.email;
        res.send(email);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});





module.exports = router;