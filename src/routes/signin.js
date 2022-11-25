const express = require("express");
const router = express.Router();
const auth = require("../backend/middleware/auth");
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/usuario");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');


router.post("/", [[check("email", "Please include a valid email").isEmail(), check("password", "Password is required").exists()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({  errors: [{ msg: "Credenciales Invalidas" }] });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Credenciales Invalidas" }] });
        }

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => { if (err) throw err; res.json({ token }); });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;