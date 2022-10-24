const database = require("../models");

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todasAsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todasAsNiveis)
    } catch (error) {
      res.status(500).send(`Deu erro: ${error}`);
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params
    try {
      const umNivel = await database.Niveis.findOne({ where: {id: Number(id)}})
      return res.status(200).json(umNivel)
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`)
    }
  }

  static async criaNivel (req, res){
    const novoNivel = req.body
    try {
      const novoNivelCriada = await database.Niveis.create(novaNivel)
      return res.status(201).json(novoNivelCriada)
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`)
    }
  }

  static async atualizaNivel (req, res){
    const { id } = req.params
    const atualização = req.body
    try {
      await database.Niveis.update(atualização, { where: {id: Number(id)}})
      const NivelAtualizado = await database.Niveis.findOne({ where: {id: Number(id)}})
      return res.status(201).json(NivelAtualizado)
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`)
    }
  }

  static async deletaUmNivel(req, res) {
    const { id } = req.params
    try {
      const umNivel = await database.Niveis.destroy({ where: {id: Number(id)}})
      return res.status(200).send(`Nivel ${id} deletado com sucesso!`)
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`)
    }
  }
}

module.exports = NivelController;
