/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Admin Model

var bcrypt = require('bcrypt');
module.exports = {

  attributes: {

    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },

  },

  // bcrypting a password before save to database
  beforeCreate: function(values, proceed) {
   
    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {

        if (err) return err;

        console.log(hash);
        values.password = hash;

        proceed();
    });
  },


};

