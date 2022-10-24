const database = require("../models");

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    try {
      const todasAsTurmas = await database.Turmas.findAll();
      return res.status(200).json(todasAsTurmas)
    } catch (error) {
      res.status(500).send(`Deu erro: ${error}`);
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await database.Turmas.findOne({ where: {id: Number(id)}})
      return res.status(200).json(umaTurma)
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`)
    }
  }

  static async criaTurma (req, res){
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma)
      return res.status(201).json(novaTurmaCriada)
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`)
    }
  }

  static async atualizaTurma (req, res){
    const { id } = req.params
    const atualização = req.body
    try {
      await database.Turmas.update(atualização, { where: {id: Number(id)}})
      const TurmaAtualizada = await database.Turmas.findOne({ where: {id: Number(id)}})
      return res.status(201).json(TurmaAtualizada)
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`)
    }
  }

  static async deletaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await database.Turmas.destroy({ where: {id: Number(id)}})
      return res.status(200).send(`Turma ${id} deletado com sucesso!`)
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`)
    }
  }
}

module.exports = TurmaController;
