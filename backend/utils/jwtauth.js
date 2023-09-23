var { expressjwt: jwt } = require("express-jwt");


let secretKey=process.env.secret;

const auth=jwt({
    secret: secretKey,
    algorithms: ["HS256"],
    //algorithms: ['RS256']
  }).unless({
    path:[
        '/users/login',               //excludes login and registerfrom requiring token to authinticate !!
        '/users/v1/create',
        {url:/products(.*)/,methods:['GET','OPTIONS']},       // Regular expression is used to specify every api of products , we did this because we dont need auth to show intiial products to users, but they cannot post or delete
        {url:/category(.*)/,methods:['GET','OPTIONS']}       
    ],
   
  });

  module.exports=auth;