const e = require('connect-flash');
const { Sentence } = require('../models');
const { validationResult } = require('express-validator');


module.exports = function(app) {

	this.dashboard = function(req, res) {

		Sentence.findAll().then(function(sentences) {
			res.render('dashboard', {sentences: sentences});
		})

	}

	this.adicionarView = function(req, res) {
		res.render('adicionar', {errors: []});
	}

	this.adicionarSentenca = function(req, res) {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash('errors', errors.array());
			res.redirect('adicionar');
		} else {

			req.flash('success', 'Sentença adicionada com sucesso');

			Sentence.create({
				teor: req.body.teor,
				numeroProcesso: req.body.numero_processo,
				julgador: req.body.julgador,
			})

			res.redirect('adicionar');
		}
	}

	this.avaliarView = function(req, res) {

		Sentence.findAll({
			where: {
				resultado: null
			}
		}).then(function(sentences) {
			res.render('avaliar', {sentences: sentences});
		})
	
	}

	this.naoSeAplica = function(req, res) {

		Sentence.update({
			resultado: "nao_se_aplica"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
	
	}

	this.delete = function(req, res) {

		Sentence.destroy({
			where: {
				id: req.params.id
			}
		}).then(function() {
			res.redirect('back')
		})
	
	}

	this.gostei = function(req, res) {

		Sentence.update({
			resultado: "gostei"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
		
	}

	this.naoGostei = function(req, res) {

		Sentence.update({
			resultado: "nao_gostei"
		}, {
			where: {
				id: req.body.id
			}
		}).then(function() {
			res.redirect('back')
		})
		
	}

  return this;

}