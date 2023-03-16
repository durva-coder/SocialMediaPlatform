/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { constants } = require('../../config/constants');

module.exports = {
  
    
    // admin login 
    login: function(req, res){
        const { email, password } = req.body;

        console.log('login', req.body);

        // finding the admin through email
        Admin.find({email}, function(err, admin){
            console.log(admin);

            // if admin not exists
            if(admin.length == 0){
                return res.status(403).json({
                    status: 403,
                    err: 'admin not exists'
                })
            }
            // if having error 
            if(err){
                return res.status(500).json({
                    status: 500,
                    err: err
                })
            }
            // compare the encrypted password and entered password
            bcrypt.compare(password, admin[0].password, async function(err, result) {
                console.log(req.body.password);
                console.log(admin[0].password);
                // if result is true then admin will successfully login
                if(result) {
                    console.log(result);
                    const token = jwt.sign({
                        adminId: admin[0].id
                    },
                    process.env.JWT_TOKEN
                    );
                    res.cookie("access_token", token, { // cookie for login and logout
                        httpOnly: true,
                        
                    })
                    let admin1 = admin.pop()
                    console.log(admin1);
                    // not viewing password in admin's details
                    const { password, ...result1} = admin1;
                    return res.status(200).json({
                        status: 200,
                        data: result1,
                        message: 'Admin login successful'
                    })

                } else {
                    //password is not a match
                    return res.status(500).json({
                        status: 500,
                        err: 'password not match'
                    })
                    
                }
            });
        })
    },

    // admin logout
    logout: function(req, res){
        // clear cookie for logout
         res.clearCookie('access_token');
         return res.status(200).json({
            status: 200,
            message: 'Admin logout successfully'
        })
        
    },

    // list all the users by searching and pagination
    listUsers: async function(req, res){

        // getting item name or search keyword
        const { name } = req.query;
        console.log('uyu',name);

        const { email } = req.query;
        console.log('uyu',email);

        // getting skip & limit for pagination
        let skip = req.query.skip
        console.log(skip);
        let limit = req.query.limit
        console.log(limit);

        // searching users via name
        if(name){

            const result = await User.findOne({
                name : {'contains' : name},
            })

            console.log(result);
            const { password, ...result1} = result
            return res.status(200).json({
                status:200,
                data: result1,
                message: "Searched User"
            })
       
        }

        // searching users via email
        if(email){

            const result = await User.findOne({
                email : {'contains' : email}
            })

            console.log(result);
            const { password, ...result1} = result
            return res.status(200).json({
                status:200,
                data: result1,
                message: "Searched User"
            })
       
        }

        // Pagination
        if(skip && limit){
           
            let user = await User.find({select: constants.GET_USER_FIELDS}).limit(limit).skip(skip*limit);

            return res.status(200).json({
                status: 200,
                data: user,
                
            })
        
        }

        // otherwise enter any query
        else{
            return res.status(400).json({
                status:400,
                message: 'Please enter any query'
            })
        }

    },

    // listing all posts of particular user
    listAllPosts: async function(req, res){
        // getting the search keyword
        let name = req.query.name;
        console.log(name);

        let user = await User.find({name})
        console.log('hgfhfjfj',user);

        if(user.length == 0){
            return res.json({
                message: 'Oops User not exists'
            })
        }

        // getting all the user's posts & show the latest post firsts
        let posts = await User.findOne({ name: name }).populate('posts', {sort: 'createdAt DESC'})
      
        console.log(posts);
        // not showing password field in user's details
        const { password, ...result1} = posts
        return res.status(200).json({
            status: 200,
            data: result1,
            message: "All the Posts"
        })
    },

    // user active/ inactive
    isActiveStatus: async function(req, res){
        // getting user id whom status needs to change
        let userId = req.query.userId;
        console.log(userId);

        // getting status 
        let isActive = req.query.isActive;
        console.log('jghfg',isActive);

        // update the status 
        const updateUser = await User.updateOne({ id: userId}).set({ isActive: isActive});
        // not showing password field in user's details
        const {password, ...result1} = updateUser;
        return res.status(200).json({
            status: 200,
            data: result1,
            message: 'Change status'
        })

        
    },

};

