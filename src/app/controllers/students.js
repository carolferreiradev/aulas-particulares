const { age, graduation, date, schoolYear } = require('../../lib/utils')
const Intl = require('intl')
const Student = require('../../models/Student')

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 5
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page
        }
        return res.render('students/index', { students, pagination, filter })
      }
    }
    Student.paginate(params)
  },
  create(req, res) {
    Student.teachersList(function (options) {
      return res.render('students/create', { teachersOption: options })
    })
  },
  async post(req, res) {
    try {
      const dados = Object.keys(req.body)

      for (dado of dados) {
        if (req.body[dado] == "") {
          return res.send('Preencha todos os dados')
        }
      }

      let { avatar_url, name, nascimento, email, ano_escolar, carga_horaria, teacher } = req.body

      nascimento = date(nascimento).iso,
        ano_escolar = schoolYear(ano_escolar)
      teacher_id = teacher

      const student = await Student.create({
        avatar_url,
        name,
        nascimento,
        email,
        ano_escolar,
        carga_horaria,
        teacher_id
      })
      return res.render('create-edit-delete/create-edit')
    } catch (error) {
      console.log(error)
      return res.render('create-edit-delete/error')
    }

  },
  show(req, res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send('Aluno não encontrado')

      student.nascimento = age(student.nascimento)

      return res.render('students/show', { student })

    })
  },
  edit(req, res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send('Aluno não encontrado')

      student.nascimento = date(student.nascimento).iso

      Student.teachersList(function (teachersOption) {

        return res.render('students/edit', { teachersOption, student })

      })

    })
  },
  async update(req, res) {
    try {
      const dados = Object.keys(req.body)

      for (dado of dados) {
        if (req.body[dado] == "") {
          return res.send('Preencha todos os dados')
        }
      }

      let { id, avatar_url, name, nascimento, email, ano_escolar, carga_horaria, teacher } = req.body

      nascimento = date(nascimento).iso
      ano_escolar = schoolYear(ano_escolar)
      teacher_id = teacher

      await Student.update(id, {
        avatar_url,
        name,
        nascimento,
        email,
        ano_escolar,
        carga_horaria,
        teacher_id
      })
      return res.render('create-edit-delete/create-edit')
    } catch (error) {
      console.log(error)
      return res.render('create-edit-delete/error')
    }

  },
  async delete(req, res) {
    try {
      await Student.delete(req.body.id)
      return res.render('create-edit-delete/delete')
    } catch (error) {
      console.log(error)
      return res.render('create-edit-delete/error')
    }
  },
}