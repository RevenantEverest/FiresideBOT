require('dotenv').config();

/* Dependencies */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

/* Route Imports */
const apiErrorLogsRouter = require('./routes/apiErrorLogRoutes');
const commandErrorLogsRouter = require('./routes/commandErrorLogRoutes');
const apiLogsRouter = require('./routes/apiLogRoutes');
const commandLogsRouter = require('./routes/commandLogRoutes');

/* Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use("/error/api", apiErrorLogsRouter);
app.use("/error/commands", commandErrorLogsRouter);
app.use("/log/api", apiLogsRouter);
app.use("/log/commands", commandLogsRouter);

/* Default Routes */
app.use("/", (req, res) => {
  res.json({
    message: "Fireside-Logging API"
  });
});

app.listen(PORT, () => {
  console.log(`Fireside-Logs: Listening on port ${PORT}`);
});
