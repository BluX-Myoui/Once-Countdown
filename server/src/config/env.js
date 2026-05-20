const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const PORT = Number(process.env.PORT) || 3001;

if (!Number.isFinite(PORT) || PORT < 1) {
    throw new Error('PORT invalido en .env');
}

module.exports = { PORT };
