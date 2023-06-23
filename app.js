const express = require('express');
const eventRouter = require('./routes/eventRoute.js');
const AppError = require('./utils/appError.js');
const errorHandler = require('./utils/errorHandler.js');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//ROUTE MIDDLEWARE (handling wrong routes)
app.use('/api/v3/events', eventRouter);
app.all('*', function (req, res) {
  const error = new AppError(
    `Route not found on the server: ${req.originalUrl}`,
    404
  );
  res.status(400).json({ status: error.status, message: error.message });
});

//GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

const port = 3000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
//HANDLING ERRORS OUTSIDE EXPESS (Unhandled Rejection) e.g database connection problem
process.on('unhandledRejection', function (err) {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION: Shutting Down');

  //It is a good practice to give time to the server to handle the pending requests "server.close()"
  //Then inside the function we can use process.exit() in order to shut down the app;
  server.close(() => process.exit(1));
});
