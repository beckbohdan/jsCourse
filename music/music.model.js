const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const {validate} = require('node-model-validation');
/**
 * Music Schema
 */
const MusicSchema = new mongoose.Schema({
  musicname: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music'
  },
  artist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  ganre: {
    type: String,
    required: false,
  },
  price: {
    value: { type: Number, trim: true },
    currency: { type: String,
      uppercase: true,
      required: true,
      trim: true,
      default: 'UAH' }
  },
  availability: {
    type: Boolean,
    default: true
  },
  dimensions: {
    length: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    height: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    width: { type: Number,
      unit: {
        type: String,
        required: true
      }
    },
    volume: { type: Number,
      unit: {
        type: String,
        required: true
      }
    }
  },
  order: {
    type: Number,
    required: true
  }
});



MusicSchema.method({
});


MusicSchema.statics = {
  /**
   * Get music
   * @param {ObjectId} id - The objectId of music.
   * @returns {Promise<Music, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((music) => {
        if (music) {
          return music;
        }
        const err = new APIError('No such music exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List music in descending order of 'order' output.
   * @param {number} skip - Number of music to be skipped.
   * @param {number} limit - Limit number of music to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ availability: true })
      .sort({ order: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Music
 */
module.exports = mongoose.model('Music', MusicSchema);
