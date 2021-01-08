const express = require('express')
const routes = express.Router()
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

/*ROTA INICIAL*/
routes.get('/', function(req, res){return res.redirect('/teachers')});

/*ROTAS PROFESSORES*/
routes.get('/teachers', teachers.index);
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.post('/execution-sucess', teachers.post)
routes.put('/execution-sucess', teachers.update)
routes.delete('/delete', teachers.delete)

/*ROTAS ESTUDANTES*/
routes.get('/students', students.index);
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.update)
routes.delete('/delete', students.delete)

//routes.get('/execution-sucess', )

//notificar o usuário com a mensagem de sucesso ou erro
// return res.render('orders/sucess')

module.exports = routes