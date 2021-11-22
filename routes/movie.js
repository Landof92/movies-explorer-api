const routerMovie = require("express").Router();
const { celebrate } = require("celebrate");
const Joi = require("joi");
const validateUrl = require("../utils/validateUrl");

const { getMovie, createMovie, deleteMovie } = require("../controllers/movie");

routerMovie.get("/movies", getMovie);
routerMovie.post(
  "/movies",
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
      movieId: Joi.number().required(),
    }),
  }),
  createMovie
);
routerMovie.delete(
  "/movies/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie
);

module.exports = routerMovie;
