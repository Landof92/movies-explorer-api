require('dotenv').config();

const { NODE_ENV, MONGO_URL } = process.env;
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./errors/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const checkCors = require('./utils/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
mongoose.connect(
  NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(checkCors);

app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
