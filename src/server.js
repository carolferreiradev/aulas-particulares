const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')//importando o arquivo de rotas
const override = require('method-override')

const server = express()

//Habilita o uso do req.body
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(override('_method'))

server.use(routes)//usando a rota

//configurando a template engine
server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log('Server is running')
}) 