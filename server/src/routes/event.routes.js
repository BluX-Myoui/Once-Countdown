const { Router } = require('express');
const eventController = require('../controllers/event.controller');

const router = Router();

router.get('/meta', eventController.metaTipos);
router.get('/featured', eventController.obtenerDestacado);
router.get('/', eventController.listarEventos);
router.post('/', eventController.crearEvento);
router.get('/:id', eventController.obtenerEvento);
router.patch('/:id', eventController.actualizarEvento);
router.delete('/:id', eventController.eliminarEvento);

module.exports = router;
