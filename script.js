const confirmar = document.querySelector('.confirmar');
const botaoContinuar = document.querySelector('.continuar');

const formulario = document.querySelector('.formulario');
const mensagemSucesso = document.querySelector('.mensagem-sucesso');

const inputNome = document.querySelector('.input-nome');
const inputNumero = document.querySelector('.input-numero');
const inputExpMM = document.querySelector('.input-exp-MM');
const inputExpAA = document.querySelector('.input-exp-AA');
const inputCVC = document.querySelector('.input-cvc');

const nomeCartao = document.querySelector('.nome-cartao');
const numeroCartao = document.querySelector('.numero-cartao');
const dataExpCartao = document.querySelector('.data-exp-cartao');
const cvcCartao = document.querySelector('.cvc');

const erroNome = document.querySelector('.erro-nome');
const erroNumero = document.querySelector('.erro-numero');
const erroDataExp = document.querySelector('.erro-data-exp');
const erroCVC = document.querySelector('.erro-cvc');
const erroGeral = document.querySelector('.erro-geral');

function haNumero(str) {
    return str.match(/\d/g) != null;
}

function haLetra(str) {
    return str.match(/[a-zA-Z]/g) != null;
}

// Atualizar nome no cartão
inputNome.addEventListener('input', (e) => {
    nomeCartao.innerText = e.target.value;
    
    erroNome.style.display = 'none';
    e.target.style.color = 'black';
    if (haNumero(e.target.value)) {
        erroNome.style.display = 'block';
        e.target.style.color = 'red';
    }
});

// Atualizar número do cartão com formatação de espaço
inputNumero.addEventListener('input', (e) => {
    // Remove espaços existentes
    let valor = e.target.value.replace(/\s+/g, '');

    // Limita o número de dígitos a 16
    if (valor.length > 16) {
        valor = valor.slice(0, 16);
    }

    // Adiciona espaços a cada 4 dígitos
    valor = valor.replace(/(\d{4})/g, '$1 ').trim();

    // Atualiza o valor do campo de entrada e do cartão
    e.target.value = valor;
    numeroCartao.innerText = valor;

    // Validação para evitar letras
    erroNumero.style.display = 'none';
    e.target.style.color = 'black';
    if (haLetra(valor.replace(/\s+/g, ''))) {
        erroNumero.style.display = 'block';
        e.target.style.color = 'red';
    }
});

// Atualizar data de validade (MM/AA)
inputExpMM.addEventListener('input', (e) => {
    const ano = inputExpAA.value == null ? '00' : inputExpAA.value;
    dataExpCartao.innerText = e.target.value + '/' + ano;

    erroDataExp.style.display = 'none';
    e.target.style.color = 'black';
    if (haLetra(e.target.value)) {
        erroDataExp.style.display = 'block';
        e.target.style.color = 'red';
    }
});

inputExpAA.addEventListener('input', (e) => {
    const mes = inputExpMM.value == null ? '00' : inputExpMM.value;
    dataExpCartao.innerText = mes + '/' + e.target.value;

    erroDataExp.style.display = 'none';
    e.target.style.color = 'black';
    if (haLetra(e.target.value)) {
        erroDataExp.style.display = 'block';
        e.target.style.color = 'red';
    }
});

// Atualizar CVC
inputCVC.addEventListener('input', (e) => {
    cvcCartao.innerText = e.target.value;

    erroCVC.style.display = 'none';
    e.target.style.color = 'black';
    if (haLetra(e.target.value)) {
        erroCVC.style.display = 'block';
        e.target.style.color = 'red';
    }
});

// Botão Confirmar
confirmar.addEventListener('click', () => {
    const erro = 
        haNumero(inputNome.value) || 
        haLetra(inputNumero.value.replace(/\s+/g, '')) ||
        haLetra(inputExpMM.value) ||
        haLetra(inputExpAA.value) ||
        haLetra(inputCVC.value);
    
    erroGeral.style.display = 'none';
    if (erro) {
        erroGeral.style.display = 'block';
    } else {
        formulario.style.display = 'none';
        mensagemSucesso.style.display = 'flex';
    }
});

// Botão Continuar
botaoContinuar.addEventListener('click', () => {
    formulario.style.display = 'block';
    mensagemSucesso.style.display = 'none';
});
