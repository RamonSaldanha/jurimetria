
module.exports = function(app){
  const { check } = require('express-validator');
	
  app.get('/', app.controllers.HomeController.dashboard);

  app.get('/adicionar', app.controllers.HomeController.adicionarView);
  app.post('/adicionar-sentencas', [
    check('numero_processo').not().isEmpty().withMessage('Número do processo é obrigatório'),
    check('teor').not().isEmpty().withMessage('O campo teor é obrigatório'),
    check('julgador').not().isEmpty().withMessage('O campo julgador é obrigatório'),
  ], app.controllers.HomeController.adicionarSentenca);
  app.get('/avaliar', app.controllers.HomeController.avaliarView);


  app.get('/delete/:id', app.controllers.HomeController.delete);

  app.post('/gostei', app.controllers.HomeController.gostei);
  app.post('/nao-gostei', app.controllers.HomeController.naoGostei);
  app.post('/nao-se-aplica', app.controllers.HomeController.naoSeAplica);

};