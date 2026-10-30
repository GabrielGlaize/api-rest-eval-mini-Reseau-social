const express = require('express');
const app = express();
// const userRouter = require('./route/user.route.js');
// const productRouter = require('./route/product.route.js');
// const authRouter = require('./route/auth.route.js');
// const { limiter } = require('./middleware/limiter.middleware.js');

app.use(express.json());
// app.use(limiter(5,100));

// app.use('/user', userRouter);
// app.use('/product', productRouter);
// app.use('/auth', authRouter);

module.exports = app;