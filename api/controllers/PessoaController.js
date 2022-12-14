// const database = require("../models");

const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices("Pessoas");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      res.status(500).send(`Deu erro: ${error}`);
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(201).json(novaPessoaCriada);
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`);
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const atualização = req.body;
    try {
      await database.Pessoas.update(atualização, { where: { id: Number(id) } });
      const PessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(201).json(PessoaAtualizada);
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`);
    }
  }

  static async deletaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).send(`Pessoa ${id} deletado com sucesso!`);
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`);
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      res.status(500).send(`Algo deu errado amigo: ${error.message}`);
    }
  }

  static async criaMatricula(req, res) {
    const { estudante_id } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudante_id) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(201).json(novaMatriculaCriada);
    } catch (error) {
      res.status(500).send(`Deu erro amigo -> ${error.message}`);
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      database.sequelize.transaction(async (t) => {
        await database.Pessoas.update(
          { ativo: false },
          { where: { id: Number(estudanteId) } },
          { transaction: t }
        );
        await database.Matriculas.update(
          { status: "Cancelado" },
          { where: { estudante_id: Number(estudanteId) } },
          { transaction: t }
        );
        return res.status(200).json({
          message: `Matrículas referente ao estudante ${estudanteId} canceladas com sucesso!`,
        });
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
