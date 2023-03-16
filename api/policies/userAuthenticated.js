const jwt = require('jsonwebtoken');
// middleware for user
module.exports = function(req, res, proceed){

    try{

        const token = req.cookies.access_token;
        // if not token then redirect to login page
        if(!token){
            return res.status(403).json({
                err: 'failed'
            })
        }

        console.log(token);
        // verify jwt authorisation
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); 
        console.log("decoded",decoded);

        // user data
        req.userData = decoded;
        proceed();

    } catch(error){
        // if not token then redirect to login page
        return res.status(500).json({
            err: 'failed'  
        })

    }

}