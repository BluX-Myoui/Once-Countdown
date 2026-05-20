function errorMiddleware(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err.message === 'NOT_FOUND') {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    if (err.message === 'VALIDATION_ERROR') {
        return res.status(400).json({ error: err.details || 'Datos invalidos' });
    }

    if (err.message === 'FORBIDDEN') {
        return res.status(403).json({ error: err.details || 'Operacion no permitida' });
    }

    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorMiddleware;
