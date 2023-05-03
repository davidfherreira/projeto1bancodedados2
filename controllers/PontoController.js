const Ponto = require('../models/ponto');

const addPonto = async (request, response) =>{

    const nome = request.body.nome;
    const geometria = {type: 'Point', coordinates:[request.body.lng, request.body.lat]}
    const descricao = request.body.descricao;

    console.log(geometria);

    const ponto = Ponto.build({nome, geometria,descricao});
    ponto.save().then(()=>{
        response.status(200).send('Ponto salvo!');
    }).catch(err =>{
        response.status(400).send('Falha ao salvar');
    });

};

const getPontos = async (response) =>{
    const pontos = await Ponto.findAll();
    response.status(200).send(pontos);
}

const sincronizar = async(request, response) =>{
    await Ponto.sync();
    response.status(200).send('Sincronizado');
};

const renderPontos = async (request, response) => {
    const pontos = await Ponto.findAll();
    response.render('pontos', { pontos });
  };

module.exports = {addPonto, sincronizar, getPontos,renderPontos};