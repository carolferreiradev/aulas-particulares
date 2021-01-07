const db = require('../config/db')
const Base = require('./Base')

Base.init({ table: 'teachers' })

module.exports = {
  ...Base,
  all(callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `, function (err, results) {
      if (err) throw `Erro ao buscar lista de resgitros ${err}`

      callback(results.rows)
    })

  },
  find(id, callback) {
    db.query(`
      SELECT *
      FROM teachers
      WHERE id = $1
    `, [id], function (err, results) {
      if (err) throw `Erro ao buscar registro ${err}`

      return callback(results.rows[0])
    })
  },
  findFilter(filter, callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.subjects_taught ILIKE '%${filter}%'
      GROUP BY teachers.id
      ORDER BY total_students ASC
    `, function (err, results) {
      if (err) throw `Erro ao tentar buscar cadastros ${err} `

      callback(results.rows)
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = "",
      filterQuery = "",
      totalQuery = `(
      SELECT count(*) FROM TEACHERS
    ) AS total`

    if (filter) {
      filterQuery = `
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.subjects_taught ILIKE '%${filter}%'
    `
      totalQuery = `(
      SELECT count(*) FROM teachers
      ${filterQuery}
    ) AS total`
    }

    query = `
    SELECT teachers.*, ${totalQuery}, count(students) as total_students
    FROM teachers
    LEFT JOIN students ON (teachers.id = students.teacher_id)
    ${filterQuery}
    GROUP BY teachers.id
    ORDER BY total_students DESC
    LIMIT $1
    OFFSET $2
    `
    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database error ${err}`

      callback(results.rows)
    })
  }

}
