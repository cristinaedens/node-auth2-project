const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');
const { jwtSecret } = require('../config/secrets');

//endpoints for /api/auth

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: "There was a glitch in the matrix", err });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "Invalid Credentials." })
            };
        })
        .catch(err => {
            res.status(500).json({ message: "You should have taken the blue pill", err });
        });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || "user",
    };

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;