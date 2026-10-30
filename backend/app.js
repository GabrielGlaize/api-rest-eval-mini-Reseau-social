const express = require('express');
const app = express();
const database = require('./config/database.js');
const userRouter = require('./route/user.route.js');
// const productRouter = require('./route/product.route.js');
// const authRouter = require('./route/auth.route.js');
// const { limiter } = require('./middleware/limiter.middleware.js');

app.use(express.json());
// app.use(limiter(5,100));

//route pour vérifier si le serveur est en ligne
app.get('/health', async (req, res) => {
    try {
        await database.authenticate();
        res.status(200).json({ status: 'ok', database: 'connected' });
    } catch (error) {
        console.error('Health check database failed:', error.message);
        res.status(503).json({ status: 'error', database: 'disconnected' });
    }
});

app.use('/user', userRouter);
// app.use('/product', productRouter);
app.use('/auth', authRouter);

module.exports = app;