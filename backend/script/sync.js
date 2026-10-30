const database = require('../config/database.js');
// const {associate} = require('../config/association.js');
const User = require('../Model/user.model.js');
// const Role = require('../model/role.model.js');

async function sync() {
    try {
        // await associate();
        await database.sync({alter: true});
        console.log('Database schema synchronized.');
    } catch (error) {
        console.error('Database synchronization failed:', error);
        process.exitCode = 1;
    } finally {
        await database.close();
    }
}

sync();