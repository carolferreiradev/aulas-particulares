const db = require('../config/db')

const Base = {
  init({ table }) {
    if (!table) throw new Error('Invalid params')

    this.table = table
    return this
  },
  async create(fields) {
    try {
      let camposDaTabela = []
      dadosASeremInseridosNaTabela = []

      Object.keys(fields).map(key => {
        camposDaTabela.push(key)
        dadosASeremInseridosNaTabela.push(`'${fields[key]}'`)
      })

      const query = `INSERT INTO ${this.table}
      (${camposDaTabela.join(',')})
      VALUES (${dadosASeremInseridosNaTabela.join(',')})
      RETURNING id`

      const results = await db.query(query)
      return results.rows[0].id

    } catch (error) {
      console.error(`ERRO NO ARQUIVO BASE.JS > CREATE: ${error}`)
    }
  },
  async update(id, fields) {
    try {
      let update = []

      Object.keys(fields).map(key => {
        const line = `${key} = '${fields[key]}'`
        update.push(line)
      })

      const query = `
      UPDATE ${this.table} SET
      ${update.join(',')}
      WHERE id = ${id}
      `
      return await db.query(query)

    } catch (error) {
      console.error(`ERRO NO ARQUIVO BASE.JS > UPDATE: ${error}`)
    }
  },
  // async delete() { },
  // async paginate() { }
}

module.exports = Base