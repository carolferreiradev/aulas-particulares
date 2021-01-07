const StudentsModel = require('./src/models/Student')
const TeachersModel = require('./src/models/Teacher')
const { date } = require('./src/lib/utils')

const faker = require('faker')

let totalStudents = 5,
    totalTeachers = 10

let resultTeachers = []

async function createTeacher() {
  const teachersList = []

  while (teachersList.length < totalTeachers) {
    teachersList.push({
      avatar_url: faker.image.people(),
      name: faker.name.findName(),
      birth_date: date(faker.date.past()).iso,
      education_level: 'Doutorado',
      class_type: 'presencial',
      subjects_taught: faker.random.word(),
      created_at: date(faker.date.past()).iso
    })
  }
  const teacherIdsPromise = teachersList.map(teacher => TeachersModel.create(teacher))
  resultTeachers = await Promise.all(teacherIdsPromise) 
}
console.log(resultTeachers)
async function createStudent() {
  let studentList = []

  while (studentList.length < totalStudents) {
    studentList.push({
      avatar_url: faker.image.people(),
      name: faker.name.findName(),
      nascimento: date(faker.date.past()).iso,
      email: faker.internet.email(),
      ano_escolar: '5º Ano do Ensino Fundamental',
      carga_horaria: faker.random.number(33),
      teacher_id: resultTeachers[Math.floor(Math.random() * resultTeachers)]
    })
  }
  const studentPromise = studentList.map(student => StudentsModel.create(student))
  await Promise.all(studentPromise)
}
async function init() {
  await createTeacher()
  //await createStudent()
}

init()