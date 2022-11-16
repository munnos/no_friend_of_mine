const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Telling express what to use

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Only start app once the database is open - is what the once method does
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
