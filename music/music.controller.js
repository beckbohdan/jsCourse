const Music = require('./music.model');

/**
 * Load music and append to req.
 */
function load(req, res, next, id) {
  Music.get(id)
    .then((music) => {
      req.music = music; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get music
 * @returns {Music}
 */
function get(req, res) {
  return res.json(req.music);
}

/**
 * Create new music
 * @property {string} req.body.musicname - The musicname of user.
 * @property {string} req.body.ArtNumber - The ArtNumber of user.
 * @returns {music}
 */
function create(req, res, next) {
  const music = new Music({
    username: req.body.music,
    mobileNumber: req.body.ArtNumber
  });

  music.save()
    .then(savedMusic => res.json(savedMusic))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.musicname - The musicname of music.
 * @property {string} req.body.ArtNumber - The ArtNumber of music.
 * @returns {Music}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get music list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Music.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
