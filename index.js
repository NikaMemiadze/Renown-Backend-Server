const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoute')
const profileRouter = require('./routes/profileRoute')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

mongoose
  .connect('mongodb://127.0.0.1:27017/renown')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error)=>console.log("Failed to connect"));

app.use((err, req, res, next) => {
    err.statuCode = err.statuCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statuCode).json({
      status: err.status,
      message: err.message,
    })
})
  
const PORT = 3000;
  app.listen(PORT, () => {
      console.log(`App running on ${PORT}`);
  });
