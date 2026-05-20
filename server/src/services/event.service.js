const { SEED } = require('../data/this-is-for-seed');

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

let events = SEED.map(normalizeEvent);

function sortByNextCelebration(list) {
    const now = Date.now();
    return [...list].sort((a, b) => {
        const aT = new Date(a.startsAt).getTime();
        const bT = new Date(b.startsAt).getTime();
        const aPast = aT < now;
        const bPast = bT < now;
        if (aPast !== bPast) return aPast ? 1 : -1;
        if (!aPast) return aT - bT;
        return bT - aT;
    });
}

function isProtectedFromDelete(event) {
    if (!event.official || event.type !== 'world_tour') return false;
    return new Date(event.startsAt).getFullYear() >= 2026;
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
    return sortByNextCelebration(list);
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
    if (isProtectedFromDelete(events[index])) {
        const err = new Error('FORBIDDEN');
        err.details = 'Los eventos oficiales del World Tour 2026 no se pueden borrar';
        throw err;
    }
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
