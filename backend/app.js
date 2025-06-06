const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const complaintsRoute = require('./routes/complaints');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  tls: true,
})
  .then(() => {
    console.log('Conexão bem sucedida com o MongoDB');
  })
  .catch((error) => {
    console.error(' Conexão com o MongoDb falhou', error.message);
  });

app.use('/api/complaints', complaintsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));