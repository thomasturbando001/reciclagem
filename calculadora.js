// ===== PARTE 1: SELECIONANDO ELEMENTOS QUE JÁ EXISTEM NO HTML =====
// Aqui estamos "pegando" elementos que já foram criados no arquivo HTML
// É como se fosse uma ponte entre o HTML e o JavaScript

const enunciadoPrincipal = document.querySelector(".enunciado-principal"); // Pega a div onde aparece o texto das perguntas
const botaoPrincipal = document.querySelector(".botao-principal"); // Pega o botão que o usuário clica
const inputRange = document.querySelector("#input-range"); // Pega a barra deslizante (slider)
const labelRange = document.querySelector("#lenRange"); // Pega o texto que mostra a % da barra
const inputRadioSim = document.querySelector("#radio-sim"); // Pega o botão de opção "Sim"
const inputRadioNao = document.querySelector("#radio-nao"); // Pega o botão de opção "Não"
const labelRadioSim = document.querySelector("#label-radio-sim"); // Pega o texto "Sim" do botão
const labelRadioNao = document.querySelector("#label-radio-nao"); // Pega o texto "Não" do botão
const imgResultado = document.querySelector(".img-planeta"); // Pega a imagem dos planetas
const textoResultado = document.querySelector(".qtd-planetas"); // Pega onde aparece o resultado final

// ===== PARTE 2: CRIANDO NOVOS ELEMENTOS NO JAVASCRIPT =====
// Aqui estamos criando elementos HTML usando JavaScript
// É como se estivéssemos "construindo" pedaços do HTML dentro do JS

const inputNome = document.createElement("input"); // Cria um campo de texto para o nome
const inputNumber = document.createElement("input"); // Cria um campo numérico (quantas pessoas na casa)
const inputBox = document.createElement("div"); // Cria uma caixa para organizar os botões de rádio
const divRadio1 = document.createElement("div"); // Cria uma div para organizar o botão "Não"
const divRadio2 = document.createElement("div"); // Cria uma div para organizar o botão "Sim"
const divResultado = document.createElement("div"); // Cria uma div para mostrar o resultado final

// ===== PARTE 3: ADICIONANDO CLASSES CSS AOS ELEMENTOS =====
// Classes CSS servem para aplicar estilos (cores, tamanhos, etc.) aos elementos
// É como dar uma "identidade visual" para cada elemento

inputRange.classList.add("input-range"); // Aplica estilo CSS na barra deslizante
inputBox.classList.add("input-box"); // Aplica estilo CSS na caixa dos botões de rádio
divResultado.classList.add("resultado-div"); // Aplica estilo CSS na área do resultado

// ===== PARTE 4: CONFIGURANDO PROPRIEDADES DOS INPUTS =====
// Aqui definimos como os campos de entrada devem se comportar

inputNome.type = "text"; // Define que o campo do nome aceita texto
inputNumber.type = "number"; // Define que o campo aceita apenas números
inputNumber.value = "1"; // Define o valor inicial como 1
inputNumber.min = 1; // Define que o valor mínimo é 1 (não pode ser negativo)

// ===== PARTE 5: VARIÁVEIS PARA CONTROLAR O QUESTIONÁRIO =====
// Essas variáveis guardam informações importantes durante o questionário

const respostas = [5]; // Array que vai guardar as respostas do usuário (inicialmente tem 1 elemento)
let paginaAtual = 0; // Controla em qual pergunta estamos (começa em 0 = tela inicial)
let resultadoFinal; // Vai guardar o total de pontos no final
let qtdPlanetas; // Vai guardar quantos planetas seriam necessários
let nome; // Vai guardar o nome que o usuário digitou
let segundos = 0; // Contador de tempo em segundos
let atualizaTimer; // Variável que controla o timer
let timer; // Objeto para formatar o tempo
let pontos = [5]; // Array que guarda a pontuação de cada pergunta

// ===== PARTE 6: INICIANDO O QUESTIONÁRIO =====
seletorPagina(); // Chama a função que mostra a tela inicial

// ===== PARTE 7: FUNÇÃO PARA CRIAR O TIMER =====
// Esta função transforma os segundos em um formato de tempo (minutos:segundos)
function criaTimer() {
  timer = new Date(segundos * 1000); // Cria um objeto Date baseado nos segundos
}

// ===== PARTE 8: PRIMEIRO EVENT LISTENER DO BOTÃO =====
// Este "ouvinte" é responsável por controlar o timer
// Event Listener = "fica escutando" quando algo acontece (neste caso, clique no botão)

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault(); // Impede o comportamento padrão do botão (não recarregar a página)

  // Se estamos na página 1 (primeira pergunta), inicia o cronômetro
  if (paginaAtual === 1) {
    atualizaTimer = setInterval(function () {
      segundos++; // Adiciona 1 segundo
      criaTimer(); // Atualiza o formato do timer
    }, 1000); // Executa a cada 1000ms (1 segundo)
  }

  // Se estamos na página 6 (última pergunta), para o cronômetro
  if (paginaAtual === 6) {
    clearInterval(atualizaTimer); // Para o timer
  }
});

// ===== PARTE 9: SEGUNDO EVENT LISTENER DO BOTÃO (PRINCIPAL) =====
// Este é o "cérebro" do questionário - controla a navegação entre as páginas

botaoPrincipal.addEventListener("click", function (evento) {
  evento.preventDefault(); // Não recarrega a página

  paginaAtual++; // Avança para a próxima página (+1)

  // Se chegou na página 8, volta para o início (página 0)
  if (paginaAtual === 8) {
    paginaAtual = 0; // Reinicia o questionário
  }

  // VALIDAÇÃO: Verifica se o usuário digitou o nome antes de continuar
  if (!inputNome.value && paginaAtual === 2) {
    paginaAtual = 1; // Volta para a página 1
    alert("Ops! Informe seu nome antes de continuar."); // Mostra mensagem de erro
  }

  // ===== COLETANDO AS RESPOSTAS DE CADA PÁGINA =====
  if (paginaAtual === 3) {
    respostas[0] = Number(inputRange.value); // Consumo de carne
  } else if (paginaAtual === 4) {
    respostas[1] = Number(inputRange.value); // Alimentos não processados
  } else if (paginaAtual === 5) {
    respostas[2] = Number(inputNumber.value); // Pessoas na casa
  } else if (paginaAtual === 6) {
    respostas[3] = inputRadioSim.checked ? 1 : 0; // Energia elétrica
  } else if (paginaAtual === 7) {
    respostas[4] = Number(inputRange.value); // Viagens de avião
  }

  seletorPagina(); // Atualiza a tela
});

// ===== PARTE 10: ESCUTANDO MUDANÇAS NO CAMPO DO NOME =====
inputNome.addEventListener("change", function () {
  nome = inputNome.value;
});

// ===== PARTE 11: CONFIGURAÇÃO INICIAL DA BARRA DESLIZANTE =====
labelRange.innerHTML = inputRange.value + "%";

// ===== PARTE 12: ESCUTANDO MUDANÇAS NA BARRA DESLIZANTE =====
inputRange.addEventListener("input", function () {
  labelRange.innerHTML = `${inputRange.value}%`;
});

// ===== PARTE 13: FUNÇÃO PRINCIPAL - CONTROLA QUAL TELA MOSTRAR =====
function seletorPagina() {
  if (paginaAtual === 0) {
    resultadoFinal = 0;
    enunciadoPrincipal.innerHTML = `Olá! Vamos calcular a sua pegada ecológica?`;
    botaoPrincipal.innerHTML = "Iniciar";

  } else if (paginaAtual === 1) {
    enunciadoPrincipal.innerHTML = "";
    enunciadoPrincipal.appendChild(inputNome);
    inputNome.value = "";
    inputNome.classList.add("input-text");
    inputNome.setAttribute("placeholder", "Digite seu nome:");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 2) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequência você consome produtos de origem animal?`;
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 3) {
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.innerHTML = `${nome}, dos alimentos que você consome, qual a porcentagem que não é processada, não é embalada ou que é cultivada localmente?`;
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 4) {
    enunciadoPrincipal.innerHTML = `${nome}, quantas pessoas residem no seu agregado familiar?`;
    enunciadoPrincipal.appendChild(inputNumber);
    inputNumber.value = 1;
    inputNumber.classList.add("input-number");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 5) {
    enunciadoPrincipal.innerHTML = `${nome}, você tem energia elétrica em casa?`;
    enunciadoPrincipal.appendChild(inputBox);
    inputBox.appendChild(divRadio1);
    inputBox.appendChild(divRadio2);
    divRadio1.appendChild(inputRadioNao);
    divRadio2.appendChild(inputRadioSim);
    divRadio1.appendChild(labelRadioNao);
    divRadio2.appendChild(labelRadioSim);
    divRadio1.classList.add("radio");
    divRadio2.classList.add("radio");
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 6) {
    enunciadoPrincipal.innerHTML = `${nome}, com que frequência você viaja de avião por ano?`;
    inputRange.value = "50";
    labelRange.innerHTML = "50%";
    enunciadoPrincipal.appendChild(inputRange);
    enunciadoPrincipal.appendChild(labelRange);
    botaoPrincipal.innerHTML = "Continuar";

  } else if (paginaAtual === 7) {
    calculaResultado();
    enunciadoPrincipal.innerHTML = `<p class="descricao-resultado">Aqui está a sua pegada ecológica, ${nome}!</p>`;
    enunciadoPrincipal.appendChild(divResultado);
    divResultado.appendChild(imgResultado);
    divResultado.appendChild(textoResultado);
    textoResultado.innerHTML = qtdPlanetas === 1 ? "1 planeta." : `${qtdPlanetas} planetas.`;
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Como seria se todas as pessoas no mundo vivessem como você?</p>`;
    enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Você demorou ${adicionaZeroTempo(timer.getMinutes())}:${adicionaZeroTempo(timer.getSeconds())}s para responder a este questionário.</p>`;
    botaoPrincipal.innerHTML = "Refazer";
    enunciadoPrincipal.style.width = "100%";
    botaoPrincipal.style.marginBottom = "20px";
  }
}

// ===== PARTE 14: FUNÇÃO QUE CALCULA O RESULTADO =====
function calculaResultado() {
  pontos[0] = Math.floor(respostas[0] / 20) * 5;
  let i = Math.floor(respostas[1] / 20);
  pontos[1] = (5 - i) * 5;

  if (respostas[2] <= 2) {
    pontos[2] = 5;
  } else if (respostas[2] <= 5) {
    pontos[2] = 10;
  } else {
    pontos[2] = 20;
  }

  pontos[3] = respostas[3] * 20;
  pontos[4] = Math.floor(respostas[4] / 20) * 5;

  for (let i = 0; i < 5; i++) {
    resultadoFinal += pontos[i];
  }

  qtdPlanetas = Math.floor(resultadoFinal / 20);
}

// ===== PARTE 15: FUNÇÃO AUXILIAR PARA FORMATAR O TEMPO =====
function adicionaZeroTempo(numero) {
  return numero < 10 ? `0${numero}` : numero;
}
