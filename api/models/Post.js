/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


// Post Model 

module.exports = {

  attributes: {

    text: {
      type: 'string',
      required: true,
    },
    postImage: {
      type: 'string',
      required: true,
    },
    caption:{
      type: 'string',
      required: true,
    },
    // many to many assocation between user & likes
    likes:{
      collection: 'user',
      via: 'likedPosts'
    },
    // one to many association between user & post
    owner:{
      model: 'user'
    },
    // one to many assocation between post & comments
    comments: {
      collection: 'comments',
      via: 'post'
    }

  },

};

