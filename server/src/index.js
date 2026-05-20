const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
    console.log(`ONCE Countdown Hub API → http://localhost:${PORT}`);
});
