const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { body } = req;

  Movie.create({ ...body, owner: req.user._id })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(err.name === 'ValidationError' ? 'Переданы некорректные данные при создании карточки фильма' : 'Невалидный id');
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      if (movie.owner.equals(userId)) {
        return Movie.findByIdAndRemove(movie._id)
          .then((movies) => res.status(200).send(movies));
      }
      throw new ForbiddenError('Нельзя удалить чужую карточку фильма');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id');
      }
      throw err;
    })
    .catch(next);
};
