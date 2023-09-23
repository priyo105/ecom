var { expressjwt: jwt } = require("express-jwt");


let secretKey=process.env.secret;

const auth=jwt({
    secret: secretKey,
    algorithms: ["HS256"],
    isRevoked:isRevoked
  }).unless({
    path:[
        '/users/login',               //excludes login and registerfrom requiring token to authinticate !!
        '/users/v1/create',
        {url:/products(.*)/,methods:['GET','OPTIONS']},       // Regular expression is used to specify every api of products , we did this because we dont need auth to show intiial products to users, but they cannot post or delete
        {url:/category(.*)/,methods:['GET','OPTIONS']}       
    ],
   
  });

  async function isRevoked(req,payload,done){
    console.log(payload.payload.isAdmin);
    if(!payload.payload.isAdmin){
        return true
    }
        return false
  }

  module.exports=auth;