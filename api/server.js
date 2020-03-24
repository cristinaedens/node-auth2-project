    const express = require('express');
    const helmet = require('helmet');
    const cors = require('cors');

    const authRouter = require('../auth/auth-router');
    const usersRouter = require('../users/user-router');
    const restricted = require('../auth/restricted-middleware');

    const server = express();

    server.use(helmet());
    server.use(express.json());
    server.use(cors());

    server.use('/api/auth', authRouter);
    server.use('/api/users', restricted, checkRole('user'), usersRouter);

    server.get('/', (req, res) => {
        res.send('Edens Code!');
    });

    module.exports = server;

    function checkRole(role) {
        return (req, res, next) => {
            if (req.decodedToken && req.decodedToken.role && req.decodedToken.role.toLowerCase() === role) {
                next();
            } else {
                res.status(403).json({ message: "You shall not pass!" });
            }
        };
    };

    // ╔═══╗─────╔╗─╔═══╗──────────╔═╗╔═╗────╔═══╗────╔╗
    // ╚╗╔╗║────╔╝╚╗║╔═╗║──────────║║╚╝║║────║╔═╗║────║║
    // ─║║║╠══╦═╬╗╔╝║║─╚╬══╦══╦╗─╔╗║╔╗╔╗╠╗─╔╗║║─╚╬══╦═╝╠══╗
    // ─║║║║╔╗║╔╗╣║─║║─╔╣╔╗║╔╗║║─║║║║║║║║║─║║║║─╔╣╔╗║╔╗║║═╣
    // ╔╝╚╝║╚╝║║║║╚╗║╚═╝║╚╝║╚╝║╚═╝║║║║║║║╚═╝║║╚═╝║╚╝║╚╝║║═╣
    // ╚═══╩══╩╝╚╩═╝╚═══╩══╣╔═╩═╗╔╝╚╝╚╝╚╩═╗╔╝╚═══╩══╩══╩══╝
    // ────────────────────║║─╔═╝║──────╔═╝║
    // ────────────────────╚╝─╚══╝──────╚══╝
    // ───╔═══╗─────╔╗────────╔═══╗─╔╗
    // ───║╔═╗║────╔╝╚╗───────║╔══╝─║║
    // ───║║─╚╬═╦╦═╩╗╔╬╦═╗╔══╗║╚══╦═╝╠══╦═╗╔══╗
    // ╔══╣║─╔╣╔╬╣══╣║╠╣╔╗╣╔╗║║╔══╣╔╗║║═╣╔╗╣══╣
    // ╚══╣╚═╝║║║╠══║╚╣║║║║╔╗║║╚══╣╚╝║║═╣║║╠══║
    // ───╚═══╩╝╚╩══╩═╩╩╝╚╩╝╚╝╚═══╩══╩══╩╝╚╩══╝