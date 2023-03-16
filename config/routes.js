/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // admin signup
  'POST /signup' : 'AdminController.signup',

  // admin login
  'POST /login' : 'AdminController.login',

  // admin logout
  'GET /logout': 'AdminController.logout',

  // list of all the users with search feature and pagination
  'GET /listUsers' : 'AdminController.listUsers',

  // list of all the posts by a specific user ordered by latest first
  'GET /listAllPosts' : 'AdminController.listAllPosts',

  // make any user inactive, active
  'POST /isActiveStatus' : 'AdminController.isActiveStatus',


  // user signup
  'POST /userSignup' : 'UserController.userSignup',

  // user login
  'POST /userLogin' : 'UserController.userLogin',

  // user logout
  'GET /userLogout': 'UserController.userLogout',

  // user change password 
  'POST /changePassword' : 'UserController.changePassword',

  // user Update Profile
  'POST /updateProfile' : 'UserController.updateProfile',

  // create post
  'POST /createPost' : 'UserController.createPost',

  // List of posts ordered by latest first with pagination
  'GET /listPost' : 'UserController.listPost',

  // likes the post
  'POST /likesPosts' : 'UserController.likesPosts',

  // dislikes the post
  'POST /dislikesPosts' : 'UserController.dislikesPosts',

  // user can add comments
  'POST /addComments' : 'UserController.addComments',

  // user view other user’s profile
  'GET /viewUserProfile' : 'UserController.viewUserProfile',

  // user follow other user
  'POST /addFollowers' : 'UserController.addFollowers',

  // user unfollow other user
  'POST /removeFollwers' : 'UserController.removeFollwers',

  // user view all followers
  'GET /viewAllFollwers' : 'UserController.viewAllFollwers',

  // user view all following
  'GET /viewAllFollowing' : 'UserController.viewAllFollowing',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
