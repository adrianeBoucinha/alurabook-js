//CODAR DE FORMA MAIS CLEAN

//PARA PEGAR O VALUE DO CEP NO HTML E USAR A FUNCAO BUSCAENDERECO
var cep = document.getElementById('cep');
//FOCUSOUT É QUANDO CLICA PRA FORA DO CAMPO
cep.addEventListener('focusout', () =>  {
    buscaEndereco(cep.value)
})

async function buscaEndereco(cep) {
    //PARA APARECER NA TELA A MENSAGEM DE ERRO, COMEÇA VAZIO, POR NÃO TER ERRO, MAS SE TIVER ERRO, CAI NO CATCH
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';

    try { 
        //AWAIT SERVE PARA ASSINCRONIDADE, MELHORAR A RESPOSTA DA API
        var consultaCep = await fetch (`https://viacep.com.br/ws/${cep}/json`);
        var consultaCepConvertida = await consultaCep.json();
        //A VIA CEP TEM SUA PRÓPRIA FORMA DE ERRO, PARA CUSTOMIZAR, PRECISA FAZER O IF E THROW ERROR
        if (consultaCepConvertida.erro) {
            throw Error ('CEP Inexistente');
        }
        //PARA PREENCHER AUTOMÁTICO RUA, CIDADE, ESTADO
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        //LOCALIDADE É COMO APARECE NO OBJETO DENTRO DO CONSOLE.LOG
        cidade.value = consultaCepConvertida.localidade; 
        //LOGRADOURO É COMO APARECE NO OBJETO DENTRO DO CONSOLE.LOG
        logradouro.value = consultaCepConvertida.logradouro; 
        //UF É COMO APARECE NO OBJETO DENTRO DO CONSOLE.LOG
        estado.value = consultaCepConvertida.uf; 
        //BAIRRO É COMO APARECE NO OBJETO DENTRO DO CONSOLE.LOG
        bairro.value = consultaCepConvertida.bairro;

        return consultaCepConvertida;
    } catch (erro) {
        //MENSAGEM DE ERRO, COM A CLASSE PARA FICAR CUSTOMIZADO
        mensagemErro.classList.add('erro__texto');
        mensagemErro.innerHTML = `<p>CEP INVÁLIDO. TENTE NOVAMENTE</p>`;
    }
}







//PARA FINS DE TESTE DE COMO O PROMISE.ALL RESOLVE AS API
//let ceps = ['01001000', '01001001'];
//let conjuntosCeps = ceps.map(valores => buscaEndereco(valores));
//Promise.all(conjuntosCeps).then(respostas => console.log(respostas));



////CADA THEN, TEM UM CALLBACK, E PARA TER UM CÓDIGO LIMPO, RECOMENDA-SE NÃO USAR TANTO THEN

//var consultaCep = fetch ('https://viacep.com.br/ws/01001000/json')
//.then(resposta => resposta.json()) 
//.then(r => {
//    if(r.erro) {
//        throw Error('Esse CEP não existe')
//    } else 
//    console.log(r)})
//.catch(erro => console.log(erro))
//.finally(mensagem =>console.log('Processamento Concluído'));
//
//console.log(consultaCep)
//