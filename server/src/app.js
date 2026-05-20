const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const loggerAcademico = require('./middleware/logger.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const eventRoutes = require('./routes/event.routes');

const app = express();
const clientDist = path.join(__dirname, '../../client/dist');

const corsOrigins = [
    'http://localhost:5174',
    'http://127.0.0.1:5174'
];

if (process.env.VERCEL_URL) {
    corsOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.FRONTEND_URL) {
    corsOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(express.json());
app.use(loggerAcademico);

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', service: 'ONCE Countdown API' });
});

app.use('/api/v1/events', eventRoutes);

if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
}

app.use(errorMiddleware);

module.exports = app;
