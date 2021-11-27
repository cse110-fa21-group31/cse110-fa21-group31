//const APICalls1 = require('../../scripts/APICalls.js')
/*
const editCreate = require('../../scripts/editCreate.js')
const editPage = require('../../scripts/editPage.js')
const exRoute = require('../../scripts/example.js')
const indexSearch = require('../../scripts/indexSearch.js')
const recipeDetail = require('../../scripts/recipeDetail.js')
const recipeExpand = require('../../scripts/recipeExpand.js')
const userLogin = require('../../scripts/userLogin.js')
*/
import fs from 'fs'

import APICalls from '../../scripts/APICalls.js'
import editCreate from '../../scripts/createPage.js'
import editPage from '../../scripts/editPage.js'
//import exRoute from '../../scripts/example.js'
import indexSearch from '../../scripts/indexSearch.js'
import index from '../../scripts/index.js'
import recipeDetail from '../../scripts/recipeDetail.js'
import userInfo from'../../scripts/userInfo.js'
import userLogin from '../../scripts/userLogin.js'
//import rtr from '../../scripts/router/Router.js'

//import util from '../../scripts/util.js'

async function routes (fastify, options) {  
  fastify.get('/', function (req, reply) 
  {
    return reply.sendFile('source/pages/homePage.html')
  }) 
 // fastify.get('/', async (request, reply) => {
  //    return { hello: 'world' }
 //   })
 fastify.get('/accountSettings', (req, reply) => 
  {
   // reply.send(APICalls);
   reply.sendFile('source/pages/accountSettings.html')
  })
    fastify.get('/APICalls', (req, reply) => 
  {
   // reply.send(APICalls);
   reply.sendFile('source/scripts/APICalls.js')
  })
  fastify.get('/editCreate', (req, reply) => 
  {
   // reply.send(editCreate);
   reply.sendFile('source/pages/editCreate.html')
  })
  fastify.get('/createPage', (req, reply) => 
  {
   // reply.send(editCreate);
   reply.sendFile('source/scripts/createPage.js')
  })
  fastify.get('/createPage.js', (req, reply) => 
  {
   // reply.send(editCreate);
   reply.sendFile('source/scripts/createPage.js')
  })
  fastify.get('/editPage', (req, reply) => 
  {
   // reply.send(editPage);
   reply.sendFile('source/pages/editPage.html')
  })
  fastify.get('/editPageJS', (req, reply) => 
  {
   // reply.send(editPage);
   reply.sendFile('source/scripts/editPage.js')
  })
  fastify.get('/editPage.js', (req, reply) => 
  {
   // reply.send(editPage);
   reply.sendFile('source/scripts/editPage.js')
  })
  fastify.get('/index', (req, reply) => 
  {
  //  reply.send(exampleRoute);
  reply.sendFile('index.html')
  })
  fastify.get('/homePage', (req, reply) => 
  {
   // reply.send(editPage);
   reply.sendFile('source/pages/homePage.html')
  })
  fastify.get('/indexJS', (req, reply) => 
  {
  //  reply.send(exampleRoute);
  reply.sendFile('source/scripts/index.js')
  })
  fastify.get('/indexSearch', (req, reply) => 
  {
   // reply.send(indexSearch);
   reply.sendFile('source/scripts/indexSearch.js')
  })
  fastify.get('/recipeDetail', (req, reply) => 
  {
   // reply.send(recipeDetail);
   reply.sendFile('source/pages/recipeDetail.html')
  })
  fastify.get('/recipeDetailJS', (req, reply) => 
  {
   // reply.send(recipeDetail);
   reply.sendFile('source/scripts/recipeDetail.js')
  })
  fastify.get('/userInfo', (req, reply) => 
  {
  //  reply.send(recipeExpand);
  reply.sendFile('source/pages/userInfo.html')
  })
  fastify.get('/userInfoJS', (req, reply) => 
  {
  //  reply.send(recipeExpand);
  reply.sendFile('source/scripts/userInfo.js')
  })
  fastify.get('/userInfo.js', (req, reply) => 
  {
  //  reply.send(recipeExpand);
  reply.sendFile('source/scripts/userInfo.js')
  })
  fastify.get('/login', (req, reply) => 
  {
   // reply.send(userLogin);
   reply.sendFile('source/pages/login.html')
  })
  fastify.get('/userLogin', (req, reply) => 
  {
   // reply.send(userLogin);
   reply.sendFile('source/scripts/login.js')
  })
  fastify.get('/signup', (req, reply) => 
  {
   // reply.send(userLogin);
   reply.sendFile('source/pages/signup.html')
  })
  
  fastify.get('/utilJS', (req, reply) => 
  {
    reply.sendFile('source/scripts/util.js')
  })
  fastify.get('/APICalls.js', (req, reply) => 
  {
    reply.sendFile('source/scripts/APICalls.js')
  })
  fastify.get('/util.js', (req, reply) => 
  {
    reply.sendFile('source/scripts/util.js')
  })
  fastify.get('/index.js', (req, reply) => 
  {
    reply.sendFile('source/scripts/index.js')
  })
 /* fastify.get('/Router.js', (req, reply) => 
  {
    reply.sendFile('source/scripts/router/Router.js')
  }) */
  fastify.get('/recipeDetail.js', (req, reply) => 
  {
   // reply.send(recipeDetail);
   reply.sendFile('source/pages/recipeDetail.html')
  })
   // fastify.get('/items', async (request, reply) => {
     //   return { hello: 'found items' }
     // })
  }
  
 export default {routes};
 //module.exports = routes;
