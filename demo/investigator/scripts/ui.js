(function ($) {
    $('.cena-1 a').click(function (e) {
        e.preventDefault();

        $('.cena-1').fadeOut();
        $('.cena-2').fadeIn();

        investigar();
    });

    $('.repetir').click(function (e) {
        e.preventDefault();

        $('.cena-log').html('');

        investigar();
    });


    function investigar() {
        var resposta,
               data = new Data(),
               randomAssassino = data.assassinos[_.random(0, data.assassinos.length - 1)],
               randomLocal = data.locais[_.random(0, data.locais.length - 1)],
               randomArma = data.armas[_.random(0, data.armas.length - 1)];

        var testemunha = new Testemunha(randomAssassino, randomLocal, randomArma),
            detetive = new Detetive();

        var templateAcerto = "<p class='acerto'>Nosso assassino é {0}, ataca em locais como {1} e sua arma preferida é {2}</p>";
        var templatePalpite = "<p>Talvez foi {0}, próximo há {1}, usando {2}</p>";

        var teoria = detetive.criarTeoria();
        resposta = testemunha.validarTeoria(teoria.assassino, teoria.local, teoria.arma);

        while (resposta != 0) {
            teoria = detetive.criarTeoriaBaseadoEmResposta(resposta);

            resposta = testemunha.validarTeoria(teoria.assassino, teoria.local, teoria.arma);

            var log = templatePalpite.replace('{0}', teoria.assassino).replace('{1}', teoria.local).replace('{2}', teoria.arma);

            $('.cena-log').append(log);
        };

        var mensagemAcerto = templateAcerto.replace('{0}', teoria.assassino).replace('{1}', teoria.local).replace('{2}', teoria.arma);

        $('.cena-log').append(mensagemAcerto);
    };
})(jQuery);