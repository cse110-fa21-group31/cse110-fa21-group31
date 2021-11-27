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


//import util from '../../scripts/util.js'

async function routes (fastify, options) {  
  fastify.get('/', function (req, reply) 
  {
    return reply.sendFile('source/pages/homePage.html')
  }) 
 // fastify.get('/', async (request, reply) => {
  //    return { hello: 'world' }
 //   })
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

  fastify.get('/editPage', (req, reply) => 
  {
   // reply.send(editPage);
   reply.sendFile('source/pages/editPage.html')
  })
  fastify.get('/index', (req, reply) => 
  {
  //  reply.send(exampleRoute);
  reply.sendFile('index.html')
  })
  fastify.get('/indexSearch', (req, reply) => 
  {
   // reply.send(indexSearch);
   reply.sendFile('source/scripts/homePage.js')
  })
  fastify.get('/recipeDetail', (req, reply) => 
  {
   // reply.send(recipeDetail);
   reply.sendFile('source/pages/recipeDetail.html')
  })
  fastify.get('/userInfo', (req, reply) => 
  {
  //  reply.send(recipeExpand);
  reply.sendFile('source/pages/userInfo.html')
  })
  fastify.get('/userLogin', (req, reply) => 
  {
   // reply.send(userLogin);
   reply.sendFile('source/pages/login.html')
  })

  //fastify.get('/util', (req, reply) => 
  //{
   // reply.send(util);
  //})

  
   // fastify.get('/items', async (request, reply) => {
     //   return { hello: 'found items' }
     // })
  }
  
 export default {routes};
 //module.exports = routes;
