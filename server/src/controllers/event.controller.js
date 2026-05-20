const eventService = require('../services/event.service');

function listarEventos(req, res, next) {
    try {
        const { type, tourName, upcoming } = req.query;
        res.json(eventService.obtenerTodas({ type, tourName, upcoming }));
    } catch (err) {
        next(err);
    }
}

function obtenerDestacado(req, res, next) {
    try {
        const event = eventService.obtenerDestacado();
        if (!event) {
            return res.status(404).json({ error: 'No hay evento destacado' });
        }
        res.json(event);
    } catch (err) {
        next(err);
    }
}

function obtenerEvento(req, res, next) {
    try {
        res.json(eventService.obtenerPorId(req.params.id));
    } catch (err) {
        next(err);
    }
}

function crearEvento(req, res, next) {
    try {
        const created = eventService.crearEvento(req.body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

function actualizarEvento(req, res, next) {
    try {
        res.json(eventService.actualizarEvento(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
}

function eliminarEvento(req, res, next) {
    try {
        eventService.eliminarEvento(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

function metaTipos(req, res) {
    res.json({
        eventTypes: eventService.EVENT_TYPES,
        tourNames: eventService.TOUR_NAMES
    });
}

module.exports = {
    listarEventos,
    obtenerDestacado,
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
    metaTipos
};
