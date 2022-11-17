const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaUmaPessoa)
router.get('/pessoas/:estudanteid/matricula/:matriculaid', PessoaController.pegaUmaMatricula)
router.post('/pessoas/:estudanteid/cancela', PessoaController.cancelaPessoa)

module.exports = router