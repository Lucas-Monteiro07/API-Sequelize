const BodyParser = require('body-parser')
const pessoas = require('./pessoasRoutes')
const turmas = require('./turmasRoutes')
const niveis = require('./niveisRoutes')


module.exports = app => {
    app.use(BodyParser.json());
    app.use(pessoas);
    app.use(turmas);
    app.use(niveis);
}



