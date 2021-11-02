const router = require('express').Router();
const authorization = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use(require('./auth'));

router.use(authorization);

router.use(require('./users'));
router.use(require('./movie'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
