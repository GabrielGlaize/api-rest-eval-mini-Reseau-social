const http = require('http');
const app = require('./app');
const { associate } = require('./config/association.js');
const database = require('./config/database.js');

async function launch() {
    try {
        const server = http.createServer(app);

        server.on('listening', () => {
            console.log('Serveur en écoute sur le port ' + server.address().port);
        });

        await database.authenticate();
        associate();
        console.log('Connected to the database successfully.');
        server.listen(3001);
    }
    catch (error) {
        console.error('Connection to database failed:', error);
    }
}

launch();