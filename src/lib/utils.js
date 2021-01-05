module.exports = {
    age(timestamp) {
        const hoje = new Date()
        const nascimento = new Date(timestamp)

        let idade = hoje.getUTCFullYear() - nascimento.getUTCFullYear()

        const mes = hoje.getUTCMonth() - nascimento.getUTCMonth()

        if (mes < 0 || mes == 0 && hoje.getUTCDate() < nascimento.getUTCDate()) {
            idade = idade - 1
        }
        return idade
    },
    graduation(graduation) {
        let escolaridade

        switch (graduation) {
            case "medio":
                escolaridade = 'Ensino Médio Completo'
                break;
            case "superior":
                escolaridade = 'Ensino Superior Completo'
                break;
            case "mestrado":
                escolaridade = 'Mestrado'
                break;
            case "doutorado":
                escolaridade = 'Doutorado'
                break;

            default:
                break;
        }
        return escolaridade

    },
    schoolYear(year) {
        let escolaridade

        switch (year) {
            case '5ano':
                escolaridade =  '5º Ano do Ensino Fundamental'
                break;
            case '6ano':
                escolaridade =  '6º Ano do Ensino Fundamental'
                break;
            case '7ano':
                escolaridade =  '7º Ano do Ensino Fundamental'
                break;
            case '8ano':
                escolaridade =  '8º Ano do Ensino Fundamental'
                break;
            case '9ano':
                escolaridade =  '9º Ano do Ensino Fundamental'
                break;
            case '1ano':
                escolaridade =  '1º Ano do Ensino Médio'
                break;
            case '2ano':
                escolaridade =  '2º Ano do Ensino Médio'
                break;
            case '3ano':
                escolaridade =  '3º Ano do Ensino Médio'
                break;

            default:
                break;
        }
        return escolaridade
    },
    date(timestamp) {
        const data = new Date(timestamp)

        const year = data.getUTCFullYear()
        const month = `0${data.getUTCMonth() + 1}`.slice(-2)
        const day = `0${data.getUTCDate()}`.slice(-2)

        
        return {
            year,
            month,
            day,
            iso:`${year}-${month}-${day}`,
            birthday: `${day}/${month}`,
            format: `${day}-${month}-${year}`
        }
    }
}