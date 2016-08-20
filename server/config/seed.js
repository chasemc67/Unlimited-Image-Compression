/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Image from '../api/image/image.model';

Image.find({}).removeAsync()
  .then(function() {
    Image.create({
      image: [0]
    });
  });