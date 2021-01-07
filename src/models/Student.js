const db = require('../config/db')
const Base = require('./Base')

Base.init({table: 'students'})

module.exports = {
  ...Base,
  all(callback){
    db.query(`
      SELECT * FROM students
      ORDER BY name ASC
    `, function(err, results){
      if(err) throw `Erro ao listar estudantes ${err}`

      callback(results.rows)
    })
  },
  find(id, callback){
    db.query(`
    SELECT students.*, teachers.name AS teacher_name
    FROM students
    LEFT JOIN teachers ON (students.teacher_id = teachers.id)
    WHERE students.id = $1
    `, [id], function(err, results){
      if(err) throw `ERRO AO ACHAR O REGISTRO ${err}`

      return callback(results.rows[0])
    })
  },
  teachersList(callback){
    db.query(`
      SELECT id, name
      FROM teachers
    `, function(err, results){
      if(err) throw `ERRO AO ACHAR O REGISTRO ${err}`

      callback(results.rows)
    })
  },
  paginate(params){
    const {filter, limit, offset, callback} = params

    let query = "",
      filterQuery = "",
      totalQuery = `(
        SELECT count(*) FROM STUDENTS
      ) AS total`

    //MANTENDO O FILTRO
    if(filter){
      filterQuery = `
        WHERE students.name ILIKE '%${filter}%'
        OR students.name ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count(*) FROM students
        ${filterQuery}
      ) AS total`
    }
    
      query = `
      SELECT students.*, ${totalQuery}
      FROM students
      ${filterQuery}
      LIMIT $1
      OFFSET $2
      `
      db.query(query, [limit, offset], function(err, results){
        if(err) throw `Database error ${err}`

        callback(results.rows)
      })
  }
}
