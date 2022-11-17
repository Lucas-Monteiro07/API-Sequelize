const database = require('../models')

class Service{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegisto(id){
        return database[this.nomeDoModelo].findOne({where: {id: Number(id)}})
    }

    async atualizaRegisto(id, dados){
        return database[this.nomeDoModelo].update(dados, {where: Number(id)})
    }

    async criaRegistro(dados){
        return database[this.nomeDoModelo].create(dados)
    }

    async deletaRegistro(id){
        return database[this.nomeDoModelo].destroy({where: {id: Number(id)}})
    }
}