'use strict';

function Data(argument) {
	var assassinos = [	
		'Charles B. Abbage',
		'Donald Duck Knuth',
		'Ada L. Ovelace',
		'Alan T. Uring',
		'Ivar J. Acobson',
		'Ras Mus Ler Dorf'
	];

	var locais = [
		'Redmond',
		'Palo Alto',
		'San Francisco',
		'Tokio',
		'Restaurante no Fim do Universo',
		'São Paulo',
		'Cupertino',
		'Helsinki',
		'Maida Vale',
		'Toronto'
	];

	var armas = [
		'Peixeira',
		'DynaTAC 8000X',
		'Trezoitão',
		'Trebuchet',
		'Maça',
		'Gládio'
	];
	
	return {
		assassinos: assassinos,
		locais: locais,
		armas: armas
	}
}

function Testemunha(assassino, local, arma) {
	if(!assassino || !local || !arma)
		throw new Error('Parâmetros não podem ser nulos!');

	this._assassino = assassino;
	this._local = local;
	this._arma = arma;

	this.validarTeoria;
}

Testemunha.prototype.validarTeoria = function(assassino, local, arma) {
	var self = this;

	if(!valAss() && !valLoc() && !valArm()) {
		return _.random(1,3);
	} else if (!valAss()) {
		return 1;	
	} else if (!valLoc()) {
		return 2;
	} else if (!valArm()) {
		return 3;
	} else {
		return 0;
	}

	function valAss() {
		return self._assassino == assassino;
	}	

	function valLoc() {
		return self._local == local;
	}	

	function valArm() {
		return self._arma == arma;
	}	
}

function Detetive() {
	var _dados = new Data(),
		_informacoesUtilizadas = {
			assassinos: [],
			locais: [],
			armas: []
		},
		_assassino,
		_local,
		_arma;		


	this.criarTeoria;	
	this.criarTeoriaBaseadoEmResposta;	

	this.obterProximaTeoria = function() {
		obterAssassinoParaProximaTeoria();
		obterLocalParaProximaTeoria();
		obterArmaParaProximaTeoria();

		return {
			assassino: _assassino,
			local: _local,
			arma: _arma
		} 
	};

	this.obterProximaTeoriaBaseadoReposta = function(resposta) {

		if(resposta == 1) {
			obterAssassinoParaProximaTeoria();
		} else if (resposta == 2) {
			obterLocalParaProximaTeoria();
		} else if (resposta == 3) {
			obterArmaParaProximaTeoria();
		}

		return {
			assassino: _assassino,
			local: _local,
			arma: _arma
		} 
	};

	function obterAssassinoParaProximaTeoria () {
		var assassinos = _.filter(_dados.assassinos, function(assassino) {
			return !_.contains(_informacoesUtilizadas.assassinos, assassino);
		});

		_assassino = assassinos.shift();
		_informacoesUtilizadas.assassinos.push(_assassino);

		if(_informacoesUtilizadas.assassinos.length == _dados.assassinos.length)
			_informacoesUtilizadas.assassinos = [];
	}

	function obterLocalParaProximaTeoria () {
		var locais = _.filter(_dados.locais, function(local) {
			return !_.contains(_informacoesUtilizadas.locais, local);
		});

		_local = locais.shift();
		_informacoesUtilizadas.locais.push(_local);		

		if(_informacoesUtilizadas.locais.length == _dados.locais.length)
			_informacoesUtilizadas.locais = [];
	}	

	function obterArmaParaProximaTeoria () {
		var armas = _.filter(_dados.armas, function(arma) {
			return !_.contains(_informacoesUtilizadas.armas, arma);
		});

		_arma = armas.shift();
		_informacoesUtilizadas.armas.push(_arma);

		if(_informacoesUtilizadas.armas.length == _dados.armas.length)
			_informacoesUtilizadas.armas = [];
	}
}

Detetive.prototype.criarTeoria = function() {
	return this.obterProximaTeoria();
}

Detetive.prototype.criarTeoriaBaseadoEmResposta = function(resposta) {
	return this.obterProximaTeoriaBaseadoReposta(resposta);
}