/**
 * Seed fan — calendario «THIS IS FOR» (Wikipedia / anuncios JYP, may 2026).
 * Una entrada por ciudad; varias noches en `notes`. Fecha = primer show.
 * Referencia "hoy" del hub: 2026-05-20 (parada Turin).
 */

const TOUR = 'THIS IS FOR';
const ERA = 'THIS IS FOR';

function tourStop(id, title, city, country, venue, startsAt, notes, featured = false) {
    return {
        id,
        title: `THIS IS FOR — ${title}`,
        type: 'world_tour',
        era: ERA,
        tourName: TOUR,
        venue,
        city,
        country,
        startsAt,
        endsAt: null,
        notes,
        featured,
        official: true
    };
}

/** World Tour — Asia / Oceanía 2025 (realizado) */
const TOUR_2025 = [
    tourStop('ev-tif-incheon', 'Incheon', 'Incheon', 'Corea del Sur', 'Inspire Arena', '2025-07-19T09:00:00.000Z', 'Inicio del tour · 19–20 jul · realizado'),
    tourStop('ev-tif-osaka', 'Osaka', 'Osaka', 'Japon', 'Kyocera Dome Osaka', '2025-07-26T09:00:00.000Z', '26–27 jul · realizado'),
    tourStop('ev-tif-nagoya', 'Nagoya', 'Nagoya', 'Japon', 'Vantelin Dome Nagoya', '2025-08-23T09:00:00.000Z', '23–24 ago · realizado'),
    tourStop('ev-tif-fukuoka', 'Fukuoka', 'Fukuoka', 'Japon', 'Mizuho PayPay Dome', '2025-08-30T09:00:00.000Z', '30–31 ago · realizado'),
    tourStop('ev-tif-tokyo-dome', 'Tokyo (Dome)', 'Tokyo', 'Japon', 'Tokyo Dome', '2025-09-16T09:00:00.000Z', '16–17 sep · leg Japon otono · realizado'),
    tourStop('ev-tif-macau', 'Macau', 'Macau', 'China', 'Venetian Arena', '2025-09-27T10:00:00.000Z', '27–28 sep · realizado'),
    tourStop('ev-tif-bulacan', 'Bulacan', 'Bulacan', 'Filipinas', 'Philippine Arena', '2025-10-04T10:00:00.000Z', '4 oct · realizado'),
    tourStop('ev-tif-singapore', 'Singapur', 'Singapore', 'Singapur', 'Singapore Indoor Stadium', '2025-10-11T10:00:00.000Z', '11–12 oct · realizado'),
    tourStop('ev-tif-kl', 'Kuala Lumpur', 'Kuala Lumpur', 'Malasia', 'National Hockey Stadium', '2025-10-25T10:00:00.000Z', '25 oct · realizado'),
    tourStop('ev-tif-sydney', 'Sydney', 'Sydney', 'Australia', 'Qudos Bank Arena', '2025-11-01T09:00:00.000Z', '1–2 nov · realizado'),
    tourStop('ev-tif-melbourne', 'Melbourne', 'Melbourne', 'Australia', 'Rod Laver Arena', '2025-11-08T09:00:00.000Z', '8–9 nov · realizado'),
    tourStop('ev-tif-kaohsiung', 'Kaohsiung', 'Kaohsiung', 'Taiwan', 'National Stadium', '2025-11-22T10:00:00.000Z', '22–23 nov · realizado'),
    tourStop('ev-tif-hongkong', 'Hong Kong', 'Hong Kong', 'China', 'Kai Tak Stadium', '2025-12-06T10:00:00.000Z', '6–7 dic · realizado'),
    tourStop('ev-tif-bangkok', 'Bangkok', 'Pak Kret', 'Tailandia', 'Impact Arena', '2025-12-13T10:00:00.000Z', '13–14 dic · realizado')
];

/** World Tour — 2026 (Norteamérica, Taipei, Tokyo Stadium, Europa) */
const TOUR_2026 = [
    tourStop('ev-tif-vancouver', 'Vancouver', 'Vancouver', 'Canada', 'Rogers Arena', '2026-01-09T03:00:00.000Z', '9–10 ene · realizado'),
    tourStop('ev-tif-seattle', 'Seattle', 'Seattle', 'EE.UU.', 'Climate Pledge Arena', '2026-01-13T03:00:00.000Z', '13–14 ene · realizado'),
    tourStop('ev-tif-oakland', 'Oakland', 'Oakland', 'EE.UU.', 'Oakland Arena', '2026-01-17T03:00:00.000Z', '17–18 ene · realizado'),
    tourStop('ev-tif-la', 'Los Angeles', 'Inglewood', 'EE.UU.', 'Kia Forum', '2026-01-21T03:00:00.000Z', '21–25 ene (4 shows) · realizado'),
    tourStop('ev-tif-phoenix', 'Phoenix', 'Phoenix', 'EE.UU.', 'Mortgage Matchup Center', '2026-01-28T03:00:00.000Z', '28 ene · realizado'),
    tourStop('ev-tif-dallas', 'Dallas', 'Dallas', 'EE.UU.', 'American Airlines Center', '2026-01-31T03:00:00.000Z', '31 ene – 1 feb · realizado'),
    tourStop('ev-tif-dc', 'Washington D.C.', 'Washington D.C.', 'EE.UU.', 'Capital One Arena', '2026-02-13T03:00:00.000Z', '13–14 feb · realizado'),
    tourStop('ev-tif-ny', 'Nueva York', 'Elmont', 'EE.UU.', 'UBS Arena', '2026-02-18T03:00:00.000Z', '18–21 feb · realizado'),
    tourStop('ev-tif-philly', 'Filadelfia', 'Philadelphia', 'EE.UU.', 'Xfinity Mobile Arena', '2026-02-24T03:00:00.000Z', '24 feb · realizado'),
    tourStop('ev-tif-atlanta', 'Atlanta', 'Atlanta', 'EE.UU.', 'State Farm Arena', '2026-02-27T03:00:00.000Z', '27 feb · realizado'),
    tourStop('ev-tif-montreal', 'Montreal', 'Montreal', 'Canada', 'Bell Centre', '2026-03-03T03:00:00.000Z', '3 mar · realizado'),
    tourStop('ev-tif-hamilton', 'Hamilton', 'Hamilton', 'Canada', 'TD Coliseum', '2026-03-06T03:00:00.000Z', '6–7 mar · realizado'),
    tourStop('ev-tif-taipei', 'Taipei', 'Taipei', 'Taiwan', 'Taipei Dome', '2026-03-20T10:00:00.000Z', '20–22 mar · realizado'),
    tourStop('ev-tif-orlando', 'Orlando', 'Orlando', 'EE.UU.', 'Kia Center', '2026-03-27T02:00:00.000Z', '27–28 mar · realizado'),
    tourStop('ev-tif-charlotte', 'Charlotte', 'Charlotte', 'EE.UU.', 'Spectrum Center', '2026-03-31T02:00:00.000Z', '31 mar · realizado'),
    tourStop('ev-tif-boston', 'Boston', 'Boston', 'EE.UU.', 'TD Garden', '2026-04-03T02:00:00.000Z', '3–4 abr · realizado'),
    tourStop('ev-tif-chicago', 'Chicago', 'Chicago', 'EE.UU.', 'United Center', '2026-04-06T02:00:00.000Z', '6–7 abr · realizado'),
    tourStop('ev-tif-detroit', 'Detroit', 'Detroit', 'EE.UU.', 'Little Caesars Arena', '2026-04-10T02:00:00.000Z', '10 abr · realizado'),
    tourStop('ev-tif-saintpaul', 'Saint Paul', 'Saint Paul', 'EE.UU.', 'Grand Casino Arena', '2026-04-12T02:00:00.000Z', '12 abr · realizado'),
    tourStop('ev-tif-denver', 'Denver', 'Denver', 'EE.UU.', 'Ball Arena', '2026-04-14T02:00:00.000Z', '14 abr · realizado'),
    tourStop('ev-tif-austin', 'Austin', 'Austin', 'EE.UU.', 'Moody Center', '2026-04-17T02:00:00.000Z', '17–18 abr · fin leg NA · realizado'),
    tourStop('ev-tif-tokyo-stadium', 'Tokyo (National Stadium)', 'Tokyo', 'Japon', 'Japan National Stadium', '2026-04-25T09:00:00.000Z', '25–28 abr · 3 shows · realizado'),
    tourStop('ev-tif-lisbon', 'Lisboa', 'Lisbon', 'Portugal', 'MEO Arena', '2026-05-09T18:00:00.000Z', '9 may · Europa · realizado'),
    tourStop('ev-tif-barcelona', 'Barcelona', 'Barcelona', 'Espana', 'Palau Sant Jordi', '2026-05-12T18:00:00.000Z', '12 may · realizado'),
    tourStop('ev-tif-paris', 'Paris', 'Paris', 'Francia', 'Accor Arena', '2026-05-16T18:00:00.000Z', '16–17 may · realizado'),
    tourStop('ev-tif-turin', 'Turin', 'Turin', 'Italia', 'Inalpi Arena', '2026-05-20T18:00:00.000Z', '20 may · hoy / ultima parada Italia'),
    tourStop(
        'ev-tif-berlin',
        'Berlin',
        'Berlin',
        'Alemania',
        'Uber Arena',
        '2026-05-23T18:00:00.000Z',
        '23 may · proxima parada Europa',
        true
    ),
    tourStop('ev-tif-cologne', 'Colonia', 'Cologne', 'Alemania', 'Lanxess Arena', '2026-05-26T18:00:00.000Z', '26 may · pendiente'),
    tourStop('ev-tif-amsterdam', 'Amsterdam', 'Amsterdam', 'Paises Bajos', 'Ziggo Dome', '2026-05-30T18:00:00.000Z', '30–31 may · pendiente'),
    tourStop('ev-tif-london', 'Londres', 'London', 'Reino Unido', 'The O2 Arena', '2026-06-03T18:00:00.000Z', '3–4 jun · cierre del world tour')
];

/** Otros eventos 2026 (fan / placeholder) */
const EVENTS_2026_OTHER = [
    {
        id: 'ev-2026-comeback',
        title: 'Comeback 2026 (por anunciar)',
        type: 'comeback',
        era: '2026',
        tourName: '',
        venue: '',
        city: '',
        country: '',
        startsAt: '2026-09-15T12:00:00.000Z',
        endsAt: null,
        notes: 'Placeholder ONCE — sustituir cuando JYP confirme fecha.',
        featured: false,
        official: false
    },
    {
        id: 'ev-2026-mv',
        title: 'MV comeback season (TBD)',
        type: 'mv_release',
        era: '2026',
        tourName: '',
        venue: 'YouTube',
        city: 'Online',
        country: '',
        startsAt: '2026-08-01T12:00:00.000Z',
        endsAt: null,
        notes: 'Estreno MV — fecha estimada fan.',
        featured: false,
        official: false
    },
    {
        id: 'ev-2026-fanmeet',
        title: 'Fanmeet ONCE (por confirmar)',
        type: 'fanmeet',
        era: '2026',
        tourName: '',
        venue: '',
        city: 'Seoul',
        country: 'Corea del Sur',
        startsAt: '2026-10-20T09:00:00.000Z',
        endsAt: null,
        notes: 'Evento fanmeet / meet — sin fecha oficial.',
        featured: false,
        official: false
    },
    {
        id: 'ev-2026-anniversary',
        title: 'Aniversario TWICE (9 nov)',
        type: 'other',
        era: '2026',
        tourName: '',
        venue: '',
        city: '',
        country: '',
        startsAt: '2026-11-09T12:00:00.000Z',
        endsAt: null,
        notes: 'Fecha simbolica ONCE — 9 de noviembre.',
        featured: false,
        official: false
    }
];

const SEED = [...TOUR_2025, ...TOUR_2026, ...EVENTS_2026_OTHER];

module.exports = { SEED, TOUR_2025, TOUR_2026, EVENTS_2026_OTHER };
