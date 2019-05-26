require('dotenv').config();

/* Dependencies */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use("/command", require('./routes/commandLogRoutes'));
app.use("/guild", require('./routes/guildLogRoutes'));
app.use("/user", require('./routes/userLogRoutes'));

/* Default Routes */
app.use("/", (req, res) => {
  res.json({
    message: "Fireside-Logging API"
  });
});

app.listen(PORT, () => {
  console.log(`Fireside-Logs: Listening on port ${PORT}`);
});
