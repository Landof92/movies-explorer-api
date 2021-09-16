const routerMovie = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const validateUrl = require('../utils/validateUrl');

const {
  getMovie, createMovie, deleteMovie,
} = require('../controllers/movie');

routerMovie.get('/', getMovie);
routerMovie.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateUrl),
      trailer: Joi.string().required().custom(validateUrl),
      thumbnail: Joi.string().required().custom(validateUrl),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.string().required(),
    }),
  }),
  createMovie);
routerMovie.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = routerMovie;
