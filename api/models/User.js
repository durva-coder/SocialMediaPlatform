/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// User Model

var bcrypt = require('bcrypt');
module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    profilePic: {
      type: 'string',
      required: true,
    },
    // one to many association between user & posts
    posts: {
      collection: 'post',
      via: 'owner'
    },
    // many to many association between likedpost & post
    likedPosts: {
      collection: 'post',
      via: 'likes'
    },
    // reflexive association of user
    follwers:{
      collection: 'user',
      via: 'following'
    },
    // reflexive association of user
    following:{
      collection: 'user',
      via: 'follwers'
    },
    isActive:{
      type: 'boolean',
      defaultsTo: true
    },
    // one to many association between comments & user
    comments:{
      collection: 'comments',
      via: 'user'
    }

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

