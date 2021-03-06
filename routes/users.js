const routerUser = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');

const {
  userMe, updateUser,
} = require('../controllers/users');

routerUser.get('/users/me', userMe);
routerUser.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = routerUser;
