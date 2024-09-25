const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes')
const body = require('body-parser')
const app = express()

const PORT = 5000;
mongoose.connect('mongodb://127.0.0.1:27017/TODOLISTAPP')
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection error: ', err));
app.use(body.json());
app.use('/api', todoRoutes)

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
    }
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`)
})