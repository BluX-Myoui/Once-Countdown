const EVENT_TYPES = ['world_tour', 'comeback', 'mv_release', 'fanmeet', 'other'];
const TOUR_NAMES = ['THIS IS FOR'];

function uid() {
    return `ev-${Date.now().toString(36)}`;
}

function normalizeEvent(raw) {
    const type = EVENT_TYPES.includes(raw.type) ? raw.type : 'other';
    return {
        id: raw.id,
        title: String(raw.title || '').trim(),
        type,
        era: raw.era ? String(raw.era).trim() : '',
        tourName: raw.tourName && TOUR_NAMES.includes(raw.tourName) ? raw.tourName : raw.tourName || '',
        venue: raw.venue ? String(raw.venue).trim() : '',
        city: raw.city ? String(raw.city).trim() : '',
        country: raw.country ? String(raw.country).trim() : '',
        startsAt: raw.startsAt,
        endsAt: raw.endsAt || null,
        notes: raw.notes ? String(raw.notes).trim() : '',
        featured: Boolean(raw.featured),
        official: Boolean(raw.official)
    };
}

const SEED = [
    {
        id: 'ev-tif-2026',
        title: 'TWICE WORLD TOUR «THIS IS FOR» — Inicio',
        type: 'world_tour',
        era: 'THIS IS FOR',
        tourName: 'THIS IS FOR',
        venue: 'KSPO DOME',
        city: 'Seoul',
        country: 'Corea del Sur',
        startsAt: '2026-05-15T18:00:00.000Z',
        endsAt: '2026-05-15T23:00:00.000Z',
        notes: 'Acto inaugural del world tour 2026. Cuenta atras principal del hub.',
        featured: true,
        official: true
    },
    {
        id: 'ev-tif-tokyo',
        title: 'THIS IS FOR — Tokyo',
        type: 'world_tour',
        era: 'THIS IS FOR',
        tourName: 'THIS IS FOR',
        venue: 'Tokyo Dome',
        city: 'Tokyo',
        country: 'Japon',
        startsAt: '2026-07-10T10:00:00.000Z',
        endsAt: null,
        notes: 'Parada Asia del recorrido mundial.',
        featured: false,
        official: true
    },
    {
        id: 'ev-tif-la',
        title: 'THIS IS FOR — Los Angeles',
        type: 'world_tour',
        era: 'THIS IS FOR',
        tourName: 'THIS IS FOR',
        venue: 'SoFi Stadium',
        city: 'Los Angeles',
        country: 'EE.UU.',
        startsAt: '2026-09-20T02:00:00.000Z',
        endsAt: null,
        notes: 'Fecha estimada para planificacion ONCE internacional.',
        featured: false,
        official: true
    },
    {
        id: 'ev-cb-2026',
        title: 'Comeback — Nuevo mini album (placeholder)',
        type: 'comeback',
        era: 'ERA 2026',
        tourName: '',
        venue: '',
        city: '',
        country: '',
        startsAt: '2026-11-01T15:00:00.000Z',
        endsAt: null,
        notes: 'Sustituye por fecha real cuando JYP anuncie comeback.',
        featured: false,
        official: false
    }
];

let events = SEED.map(normalizeEvent);

function sortByDate(list) {
    return [...list].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}

function obtenerTodas(filtros = {}) {
    let list = events.map((e) => ({ ...e }));
    if (filtros.type) {
        list = list.filter((e) => e.type === filtros.type);
    }
    if (filtros.tourName) {
        list = list.filter((e) => e.tourName === filtros.tourName);
    }
    if (filtros.upcoming === 'true') {
        const now = Date.now();
        list = list.filter((e) => new Date(e.startsAt).getTime() > now);
    }
    return sortByDate(list);
}

function obtenerPorId(id) {
    const event = events.find((e) => e.id === id);
    if (!event) throw new Error('NOT_FOUND');
    return { ...event };
}

function obtenerDestacado() {
    const featured = events.find((e) => e.featured);
    if (featured) return { ...featured };
    const upcoming = obtenerTodas({ upcoming: 'true' });
    return upcoming[0] ? { ...upcoming[0] } : null;
}

function crearEvento(data) {
    const event = normalizeEvent({
        id: uid(),
        ...data,
        featured: Boolean(data.featured)
    });
    if (!event.title || event.title.length < 3) {
        const err = new Error('VALIDATION_ERROR');
        err.details = 'El titulo debe tener al menos 3 caracteres';
        throw err;
    }
    if (!event.startsAt || Number.isNaN(new Date(event.startsAt).getTime())) {
        const err = new Error('VALIDATION_ERROR');
        err.details = 'startsAt debe ser una fecha ISO valida';
        throw err;
    }
    if (event.featured) {
        events = events.map((e) => ({ ...e, featured: false }));
    }
    events = [event, ...events];
    return { ...event };
}

function actualizarEvento(id, data) {
    const index = events.findIndex((e) => e.id === id);
    if (index < 0) throw new Error('NOT_FOUND');

    if (data.featured === true) {
        events = events.map((e) => ({ ...e, featured: e.id === id }));
    }

    const updated = normalizeEvent({
        ...events[index],
        ...data,
        id
    });

    if (!updated.title || updated.title.length < 3) {
        const err = new Error('VALIDATION_ERROR');
        err.details = 'El titulo debe tener al menos 3 caracteres';
        throw err;
    }

    events[index] = updated;
    return { ...updated };
}

function eliminarEvento(id) {
    const index = events.findIndex((e) => e.id === id);
    if (index < 0) throw new Error('NOT_FOUND');
    events.splice(index, 1);
}

module.exports = {
    EVENT_TYPES,
    TOUR_NAMES,
    obtenerTodas,
    obtenerPorId,
    obtenerDestacado,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};
