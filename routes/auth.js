const routerAuth = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');
const {
  createUser, login,
} = require('../controllers/users');

routerAuth.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routerAuth.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = routerAuth;
