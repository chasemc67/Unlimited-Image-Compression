'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ImageSchema = new mongoose.Schema({
  image: "string"
});

export default mongoose.model('Image', ImageSchema);
