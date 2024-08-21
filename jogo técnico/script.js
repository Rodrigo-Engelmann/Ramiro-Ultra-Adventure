// Variáveis globais para rodar o jogo de levantamento de peso:
let refreshIntervalId; // variável que "representa" o "serInterval" do minigame de levantar peso, tendo como função parar o seu timer
let segundos = 0;
let clicks = 0;
let peso = 0;
let dia = true;
let jogoRodando = false;
let massaMuscular = 0;
let energia = 3;
let fome = 0; // fome = valor de 0 até 0.1
let milissegundos = 1000 //Servirá para mostrar a quantidade de milissegundos que terá o minigame de levantamento de peso
let valorInicialPeso = 0 // variável global que tem como utilidade lembrar o valor do primeiro peso (é importante para algumas contas no decorrer do código)


// Variáveis globais para salvarem o progresso do jogador.
let SAVEmassaMuscular = 0;
let SAVEenergia = 0;
let SAVEfome = 0;
let SAVEQuantItens = [0,0,0,0,0,0,0,0];
let SAVEQuantPalavras = [0,0,0,0,0,0];

// Variável global que impede do jogador multiplicar itens falhando em desafios.
let SAVELock = true;

// Variável da vida do jogador
let vida = 0;

// Variáveis globais para o sistema de inventário:
let itens = ["Café       (⚡ = 3,0)","Energético (⚡ + 1,5)","Whey       (⚡ + 1,0)","Água       (⚡ + 0,5)","Hamburger  (🍖 = 0,0)","Xis        (🍖 - 0,5)","Sanduíche  (🍖 - 0,3)","Miojo      (🍖 - 0,2)"];
let quantItens = [0,0,0,0,0,0,0,0];

let palavras = ["Foco         (⏱️ x 1,7)","Determinação (⏱️ x 1,5)","Motivação    (⏱️ x 1,3)","Esperança    (⚡ x 1,3)","Desejo       (⚡ x 1,2)","Coragem      (⚡ x 1,1)"];
let quantPalavras = [0,0,0,0,0,0];

// Variáveis globais para o sistema de animação de texto:
let refreshIntervalId2; // variável que "representa" o "serInterval" do sistema de animação de texto, tendo como função parar o seu timer
let textoArray = "";
let textoFinal = "";
let i = 0

// Variáveis globais para o sistema de narrativa, que funciona junto ao sistema de animação de texto:
let i2 = 0;
let valorNarrativa = 0; // representa a função que será retornada após a função da animação de texto acabar o seu processo

// Variáveis globais para o sistema de visualização de cenário
let valorCenario = 0;

// Variáveis globais para outros sistemas:
let day = 1; // já existia uma variável chamada dia, então tive que chamar essa de "day". Esta serve para mostrar o dia (em número) para o jogador



let i3 = 0

menu ()








function menu () {
    // pergunta a dificuldade para o jogador
    let dificuldade = 0
    let textDificuldade = ""
    while (dificuldade != 1 && dificuldade != 2 && dificuldade != 3 && dificuldade != 4) {
        dificuldade = Number(prompt("Qual dificuldade você deseja?\n1 - PESADELO\n2 - Difícil\n3 - Médio\n4 - Fácil"))
    }
    // pega o valor da dificuldade e transcreve em valores que ajudarão o jogador (isso em modos mais fáceis)
    switch (dificuldade) {
        case 1:
            textDificuldade = "PESADELO";
            massaMuscular = 0.5;
            quantItens = [0,0,0,0,0,0,0,0];
            quantPalavras = [0,0,0,0,0,0];
            vida = 1;
            break;
        case 2:
            textDificuldade = "DIFÍCIL";
            massaMuscular = 0.6;
            quantItens = [1,0,0,0,0,0,0,0];
            quantPalavras = [1,0,0,0,0,0];
            vida = 2;
            break;
        case 3:
            textDificuldade = "médio";
            massaMuscular = 0.7;
            quantItens = [1,1,0,0,0,1,0,0];
            quantPalavras = [1,0,0,0,0,1];
            vida = 3;
            break;
        case 4:
            textDificuldade = "fácil";
            massaMuscular = 0.8;
            quantItens = [1,1,1,0,0,1,0,0];
            quantPalavras = [1,1,0,0,1,0];
            vida = 4;
            break;
    }
    // parte visual que será exibida após o jogador ser questionado sobre a dificuldade
    console.log('%c            Seja bem vindo(a) ao Ramiro Ultra Adventure!\n            =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n                       dificuldade: ' + textDificuldade + '\n                        _______________\n                       |DESEJA COMEÇAR?|\n                       |_______________|', 'color:gray;font-size:15px');
    alert("CLIQUE EM OK PARA COMEÇAR O JOGO!")
    narrativa()
}






// A PARTIR DE AGORA É A PARTE DO SISTEMA PARA O DESENVOLVIMENTO DA NARRATIVA DO JOGO, QUE ENVOLVE PERGUNTAS, CAMINHOS E TUDO QUE GIRA EM TORNO DA HISTÓRIA:

//  DAQUI PRA FRENTE É A NARRAÇÃO DO PRIMEIRO DIA:

function narrativa () {
    valorNarrativa = 1;
    let text = [ // Aqui é o array que escreve coisas no console... A partir dele, todas os textos são mandados para a função "texto" que processa as informações para animá-los.
        "*Você está em um local desconhecido... Aparentemente ao topo de um pódio...*",
        "*Há holofotes direcionados à ti...*",
        "*Você olha ao redor... busca entender do que se trata...*",
        "*Você está confuso...*",
        "*E então compreende o que está acontecendo...*",
        " - E-Eu... Eu ganhei uma medalha olímpica?!?!?!",
        "*Você acorda... ERA SÓ UM SONHO*",
        "*Você se levanta da cama e vai até a escrivaninha*",
        " - Eu tenho um caderno velho com algumas páginas sobrando...",
        "*Você abre o caderno, pega uma caneta e então começa a escrever:*",
        "''Dia 1 - Segunda-feira:",
        "Querido diário...",
        "Essa é minha primeira anotação em ti! meu nome é Ramiro, tenho 15 anos, sou estudante de ensino médio e moro em Cuba.",
        "Para explicar o motivo que me fez começar a escrever em ti, tudo começou ontem quando fui à casa de um amigo meu ver as olimpíadas de levantamento de peso!",
        "Eu tenho o sonho de trabalhar profissionalmente na parte dos esportes...",
        "mas depois de assistir à aquele jogo ontem eu tirei a minha dúvida de qual deveria investir o meu tempo!",
        "Eu quero fazer levantamento de peso!",
        "a minha jornada nesse esporte será registrada por aqui! Agora tenho que me preparar para sair, até mais!\n\nAss.: Ramiro M. R.''",
        " - Meus pais estão fora... O que devo fazer agora?"
        ];
    texto(text, 100);

    switch (i2) { // aqui é onde as coisas mudam no meio da narrativa, é onde perguntas são feitas ao jogador, onde os cenários são colocados no console, etc...
        case 0:
            valorCenario = 3;
            break;
        case 6:
            valorCenario = 2;
            break;
        case 10:
            valorCenario = 4;
            break;
        case 19:
            valorCenario = 0;
            let resposta = -1;
            while (resposta != 1 && resposta != 2) { // Laço de repetição que obriga o jogador a colocar um dos valores solicitados
                resposta = Number(prompt("1 - Ir direto para a escola\n2 - Ir pegar alguma coisa pra beber ou comer antes de sair"))
            }
            switch (resposta) {
                case 1:
                    i2 = 0
                    narrativa2()
                    break;
                case 2:
                    i2 = 0
                    narrativa3()
                    break;
            }
            break;

    }
}

function narrativa2 () {
    valorNarrativa = 2;
    let text = [
        "*Você sai de sua casa e caminha diretamente à escola*",
        "*Chegando lá, você percebe que está bem à tempo para a aula*",
        "*Você passa cinco horas na escola, o que te cansa e faz perder um pouco de energia",
        "*Além disso, No primeiro período (o de Espanhol) você fez um texto avaliativo sobre os seus sonhos para o futuro... O que te motiva bastante.*",
        "_=-PALAVRAS ADQUIRIDAS: DETERMINAÇÃO + 1, FOCO + 1-=_\n_=-QUANTIDADE DE ENERGIA ALTERADA: ENERGIA - 1-=_",
        " - Agora que a aula acabou... O que devo fazer?"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 1;
            break;
        case 1:
            valorCenario = 5;
            break;
        case 4:
            quantPalavras[2]++
            quantPalavras[0]++
            energia--
            break;
        case 6:
            valorCenario = 0;
            let resposta = -1;
            while (resposta != 1 && resposta != 2) {
                resposta = Number(prompt("1 - Treinar levantamento de peso\n2 - Ir para casa descansar"))
            }
            switch (resposta) {
                case 1:
                    i2 = 0
                    inventGeral(10,9)
                    break;
                case 2:
                    i2 = 0
                    narrativa2b()
                    break;
            }
            break;
    }
}

function narrativa3 () {
    valorNarrativa = 5;
    let text = [
        "*Você vai até a cozinha de sua casa procurar alguma coisa para comer... Mesmo demorando um pouco, você acha um sanduíche e uma água, colocando-os na mochila*",
        "_=-ITENS ADQUIRIDOS: SANDUÍCHE + 1 E ÁGUA + 1-=_",
        "*Após pegar a comida e a bebida, você sai de sua casa e caminha diretamente à escola*",
        "*Chegando lá, é percebido pela professora um atraso seu*",
        "*De acordo com as regras da escola, você será obrigado a esperar até o segundo período para ser liberado à entrar*",
        "*Após passa cinco horas na escola, sua você se cansa o que te faz perder energia.*",
        "_=-QUANTIDADE DE ENERGIA ALTERADA: ENERGIA - 1-=_",
        " - Agora que a aula acabou... O que devo fazer?"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            quantItens[3]++;
            quantItens[6]++;
            valorCenario = 2;
            break;
        case 2:
            valorCenario = 1;
            break;
        case 3:
            valorCenario = 5;
            break;
        case 6:
            energia--
            break;
        case 8:
            valorCenario = 0;
            let resposta = -1;
            while (resposta != 1 && resposta != 2) {
                resposta = Number(prompt("1 - Treinar levantamento de peso\n2 - Ir para casa descansar"))
            }
            switch (resposta) {
                case 1:
                    i2 = 0
                    inventGeral(10,9)
                    break;
                case 2:
                    i2 = 0
                    narrativa2b()
                    break;
            }
            break;
    }
}

function narrativa2b () {
    valorNarrativa = 3;
    let text = [
        "*Você chega em casa*",
        "*Lá estão os seus pais que te comprimentam e preparam a janta pra ti*",
        "*Após a janta, você toma um banho e vai direto dormir*",
        "_=-QUANTIDADE DE ENERGIA ALTERADA: ENERGIA = 3-=_"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 1;
            break;
        case 4:
            energia = 3;
            D2narrativa1b();
            break;
    }
}

function narrativa2c () {
    valorNarrativa = 4;
    let text = [
        "*Após passar pelo treino você chega em casa*",
        "*E lá se encontram os teus pais que perguntam sobre a sua demora para chegar em casa*",
        "*Você conta que foi treinar e sobre o seu sonho de ser profissional no esporte de levantamento de peso*",
        "*Como reação eles te apoiam*",
        "_=-PALAVRA ADQUIRIDA: MOTIVAÇÃO + 1-=_",
        "*Após a janta, você toma um banho e vai direto dormir*",
        "_=-QUANTIDADE DE ENERGIA ALTERADA: ENERGIA = 3-=_"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 1;
            quantPalavras[2]++;
            break;
        case 6:
            i2 = 0
            energia = 3;
            D2narrativa1 ()
            break;
    }
}


// DAQUI PRA FRENTE É A NARRAÇÃO DO SEGUNDO DIA:

function D2narrativa1 () {
    valorNarrativa = 6;
    let text = [
        "''Dia 2 - Sábado:",
        "Querido diário...",
        "Ontem eu treinei pela primeira vez! E fui até que bem!",
        "Hoje que é sábado eu desejo aproveitar bem o meu tempo para treinar mais...",
        "Vou ir almoçar e em seguida treinar!!! Até mais!\n\nAss.: Ramiro M. R.''",
        " - Vou almoçar agora...",
        "*Você abre a porta para a sala e lá se encontram os teu pais...*",
        "*Você os ajuda a preparar o almoço para em seguida desfrutar dele...*",
        "*Vocês conversam sobre este teu sonho de treinar levantamento de peso, e em seguida sua mãe lhe dá de presente um energético (ela comprou durante a manhã, enquanto você dormia)*",
        "_=-FOME MODIFICADA: FOME = 0-=_\n_=-ITEM ADQUIRIDO: EMERGÉTICO + 1-=_",
        "*Você se arruma e vai treinar*"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            day++
            valorCenario = 4;
            quantItens[1]++;
            fome = 0;
            break;
        case 5:
            valorCenario = 2;
            break;
        case 11:
            inventGeral(10,9);
            break;                
    }
}

function D2narrativa1b () {
    valorNarrativa = 8;
    let text = [
        "''Dia 2 - Sábado:",
        "Querido diário...",
        "Ontem eu perdi uma oportunidade de treinar...",
        "Mas como hoje é sábado, eu vou aproveitar bem o meu tempo para isso...",
        "Agora vou almoçar, e depois treinar!!! Até mais!\n\nAss.: Ramiro M. R.''",
        " - Vou para a sala ver o que vai ter de almoço...",
        "*Você abre a porta para a sala e lá se encontram os teu pais...*",
        "*Você os ajuda a preparar o almoço para em seguida desfrutar dele...*",
        "*Você que ainda não tinha contado para os seus pais do sonho de treinar levantamento de peso, aproveita o momento para comentar. Eles reagem de forma positiva, o que te dá determinação*",
        "_=-FOME MODIFICADA: FOME = 0-=_\n_=-PALAVRA ADQUIRIDA: DETERMINAÇÃO + 1-=_",
        "*Você se arruma e vai treinar*"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            day++
            valorCenario = 4;
            quantPalavras[1]++;
            fome = 0;
            break;
        case 5:
            valorCenario = 2;
            break;
        case 11:
            inventGeral(10,9);
            break;
    }
}

function D2narrativa2 () {
    valorNarrativa = 7;
    let text = [
        "*Você volta para a sua casa*",
        "*Você abre a porta... Estranhamente destrancada, e o que vê o faz ficar choque por alguns instantes...*",
        "*Não há ninguém... e ao centro da sala é perceptível que algum acidente aconteceu...*",
        "*Há um vaso quebrado, marcas escuras nas paredes... Quando se aproxima... Nota algo que não estava alí quando saiu...*",
        "*Havia um papel com a letra de sua mãe sob a mesa de jantar...*",
        "*Você se aproxima e lê o que está escrito...*",
        "'Vou levar o teu pai ao hospital, não se preocupe que vai dar tudo certo! Volto ao anoitecer para casa...'",
        "*Sabendo que a mãe não quis descrever o que aconteceu pela pressa que tinha para levar o pai ao hospital, aguardou de forma ansiosa ao seu retorno*",
        "*Eis que o relógio marca onze horas da noite*",
        "*Você cogita em dormir, mas decide simplesmente preparar algo para comer e esperar mais um pouco*",
        "*_=-FOME MODIFICADA: FOME = 0-=_*",
        "*O relógio marca uma hora da manhã*",
        "*Você decide dormir de uma vez por todas*"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 1;
            break;
        case 1:
            valorCenario = 2;
            break;
        case 10:
            fome = 0;
            break;
        case 13:
            i2 = 0;
            D3narrativa1()
            break;
    }
}


// DAQUI PRA FRENTE É A NARRAÇÃO DO TERCEIRO DIA:

function D3narrativa1 () {
    valorNarrativa = 9;
    let text = [
        "_=-QUANTIDADE DE ENERGIA ALTERADA: ENERGIA = 3-=_",
        "*Eis que você acorda...*",
        "*A dúvida de como seu pai está te faz despertar rapidamente*",
        "*Você vai até a cozinha e encontra a sua mãe*",
        "*Ela está chorando*",
        "*Seu pai morreu...*",
        "*Deseja perguntar algo para sua mãe?*",
        "*TRÊS ANOS DEPOIS...*"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            energia = 3;
            valorCenario = 1;
            break;
        case 7:
            let resposta = 0
            while (resposta != 1 && resposta != 2) {
                resposta = Number (prompt("Deseja perguntar algo para sua Mãe?\n1 - Sim\n2 - Não"))
            }
            if (resposta === 1) {
                let resposta2 = 0;
                while (resposta2 != 4) {
                    resposta2 = Number(prompt("Perguntas disponíveis:\n1 - O que aconteceu para o Pai morrer?\n2 - O hospital não conseguiu ajudá-lo?\n3 - Como fazemos agora para sobreviver?\n4 - Parar de falar com a Mãe"));
                    console.clear()

                    switch (resposta2) {
                        case 1:
                            console.log("\n\n\nMãe responde: 'Um assaltante veio... Ele reagiu e tomou um tiro...'")
                            break;
                        case 2:
                            console.log("\n\n\nMãe responde: 'Não... o Pai morreu ainda no caminho pro hospital pelo sangramentos do tiro que tomou...'")
                            break;
                        case 3:
                            console.log("\n\n\nMãe responde: 'Posso buscar um emprego... Se isso falhar eu pesso ajuda para amigos ou parentes mais distantes... Mas não consigo pensar agora sobre isso...'")
                            break;
                    }
                }
            }
            break;
        case 8:
            i2 = 0
            D4narrativa();
            break;
    }
} 


// DAQUI PRA FRENTE É A NARRAÇÃO PÓS MORTE DO PAI DO PERSONAGEM (e quando ele encontra uma forma de sair de Cuba):

function D4narrativa () {
    valorNarrativa = 10;
    let text = [
        "*Dia 1068*",
        "*Exatamente no dia de hoje você está há três anos treinando, mas uma infeliz notícia veio à tona...*",
        "*Hoje sua mãe contrariou câncer... Você esteve no hospital junto à ela durante a manhã e a tarde mas, agora, de noite, você foi liberado*",
        "*Em meio à tudo isso, você nota uma grande pedra em seu caminho...*",
        "*É a sua terra... Cuba*",
        "*No fundo você reconhece o quão impossível é ter um futuro profissional com o levantamento de peso nesse país...*",
        "*Além disso, há nele um atraso tecnológico absurdo, o que complica a situação para o tratamento de sua mãe...*",
        "*E para piorar, você acabou de completar 18 anos, sabendo que vai precisar trabalhar em um momento próximo e questiona o que deve fazer para ter uma vida próspera*",
        "*Aí você chega na conclusão que deve fugir de Cuba... Para recomeçar a vida em um local melhor*",
        "*Você fará isso a partir de uma brecha, onde você pode ir de avião à Nicarágua (que não precisam de visto) e simplesmente fugir*",
        "*A sua ideia é após ir à Nicarágua, imigrar para o Reino Unido na cidade de Blackpool*",
        "*Você conseguiu achar um barco que faz essa rota à Nicarágua, e ela acontecerá amanhã*",
        "*Mesmo com medo de algo dar errado, você criou coragem e manteve sua determinação e esperança sobre o futuro*",
        "_=-PALAVRAS ADQUIRIDAS: DETERMINAÇÃO + 1, ESPERANÇA + 1, CORAGEM + 1-=_",
        "*Fugindo desses planos, o que deseja fazer agora?*"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 4;
            day = 1068;
            break;
        case 12:
            let resposta2
            while (resposta2 != 1 && resposta2 != 2) {
                resposta2 = Number(prompt("Você deseja sair de cuba ou não?\n1 - NÃO! Quero ficar em Cuba!!\n2 - SIM! Quero sair de Cuba!"))
            }
            if (resposta2 === 2) {
                break;
            } else {
                i2 = 0;
                final0()
            }
            break;
        case 14:
            quantPalavras[1]++;
            quantPalavras[3]++;
            quantPalavras[5]++;
            let resposta = 0

            while (resposta != 1 && resposta != 2){
                resposta = Number(prompt("O que deseja fazer agora?\n1 - Treinar levantamento de peso para tentar se despreocupar um pouco\n2 - Aguardar e dar uma relaxada"))
            }
            switch (resposta) {
                case 1:
                    i2 = 0;
                    inventGeral(30,27)
                    break;
                case 2:
                    i2 = 0;
                    D4narrativa2();
                    break;
            }
            break;
    }
}

function final0 () {
    valorNarrativa = 21;
    let text = [
        "*Você decide ficar em Cuba...*",
        "*Após poucos anos sua mãe morre pelo câncer...*",
        "*Você tem uma vida financeiramente pobre e triste, tendo somente os teus amigos ao teu lado*",
        "*E você nunca realiza o seu sonho de trabalhar com levantamento de peso, o que te frustra bastante*",
        "FIM... Obrigado por jogar"
    ];
    texto(text, 100);

    if (i2 === 5) {
        let resposta = 0
        while (resposta != 1 && resposta != 2) {
            resposta = Number(prompt("Você deseja retornar ao menu principal e recomeçar a aventura ou voltar para seu último save?\n1 - RETORNAR PARA MEU ÚLTIMO SAVE\n2 - VOLTAR AO MENU PRINCIPAL"))
        }
        if (resposta === 1){
            i2 = 0;
            vida--;
            if (vida === 0) {
                alert("Você está com zero vidas... GAME OVER");
                menu();
            }
            D4narrativa();
        } else {
            i2 = 0;
            menu();
        }
    }
}

function D4narrativa2 () {
    valorNarrativa = 11;
    let text = [
        "*Após você ir para o treino, decide ficar em casa*",
        "*Lá você dá uma relaxada e tenta se desestressar... prepara dois xis brasileiros (um tu fez de sobra), toma um banho e vai dormir. Estando pronto e determinado para o próximo dia*",
        "_=-ITEM ADQUIRIDO: XIS + 1-=_ _=-PALAVRA ADQUIRIDA: DETERMINAÇÃO + 1-=_"
        ];
    texto(text, 100);


    switch (i2) {
        case 0:
            quantItens[5]++;
            quantPalavras[1]++;
            valorCenario = 4;
            break;
        case 3:
            i2 = 0;
            D5narrativa1();
            break;
    }
}

function D4narrativa3 () {
    valorNarrativa = 12;
    let text = [
        "*Após o treino você decide voltar para casa*",
        "*Você chega lá e logo faz sua janta e prepara um sanduíches para alguma eventual necessidade*",
        "*E precebe que mesmo com tantas preocupações o treino te fez muito bem, você conseguiu manter seu foco e desejo de se tornar profissional*",
        "_=-PALAVRAS ADQUIRIDAS: FOCO E DESEJO-=_",
        "*Após isso, você se arruma e vai dormir*",
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            valorCenario = 4;
            quantPalavras[0]++; 
            quantPalavras[4]++;
            quantItens[6]++;
            day = 1068;
            break;
        case 5:
            i2 = 0;
            D5narrativa1()
            break;
    }
}

// DAQUI PRA FRENTE É A NARRAÇÃO DO DIA DA FUGA DE CUBA:

function D5narrativa1 () {
    valorNarrativa = 13;
    let text = [
        "*O dispertador toca*",
        "*Você acorda... São cinco da manhã, você precisa fazer as malas, buscar a sua mãe e sair*",
        "*Você pega tudo e vai para o local combinado... E lá está ele... o barco de fuga...*",
        "*É um barco de pescador bem simples, provavelmente para não chamar muito a atenção*",
        "*Você se encontra com o piloto/comandante, e ele te direciona para dentro do barco...*",
        "*E então você aguarda o barco zarpar...*",
        "*Ele sai e após quase três horas de viagem, chega à Nicarágua... Após isso, você pega um avião até o Reino Unido e termina a sua jornada com sucesso!*",
        "*Lá, você conseguiu um trabalho em um circo... Ficando nessa por três anos, sem largar o levantamento de peso*",
        "*Após todo esse tempo, você conseguiu uma oportunidade de se mostrar...*",
        "*A cada quatro anos acontece o campeonato britânico de levantamento de peso, que definirá a partir dos três melhores atletas quem vai e quem não vai para as olimpíadas*",
        "*E ele vai acontecer daqui poucos dias... Você sabe que essa é chance de mostrar o seu talento*",
        "*Você deseja se inscrever?*",
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            day++;
            valorCenario = 7;
            break;
        case 2:
            valorCenario = 6;
            break;
        case 7:
            valorCenario = 7;
            break;
        case 12:
            let resposta = 0
            while (resposta != 1 && resposta != 2) {
                resposta = Number(prompt("Você deseja se inscrever no campeonato?\n1 - sim\n2 - não"))
            }
            if (resposta === 1) {
                i2 = 0;
                D5narrativa2();
            } else {
                i2 = 0;
                D5final1();
            }
            break;
    }
}


function D5final1 () {
    valorNarrativa = 17;
    let text = [
        "*Você decide não se inscrever*",
        "*Durante o resto de sua vida você continuou trabalhando no circo, se casando e tendo filhos nesse meio tempo...*",
        "*Sua situação financeira não foi das melhores, você não conseguiu trabalhar com o que sonhava, mas pelo menos conseguiu sustentar sua família*",
        ];
        texto(text, 100);
        switch (i2) {
            case 3:
                alert("CLIQUE EM OK PARA VOLTAR PARA O ÚLTIMO SAVE");
                vida--;
                if (vida === 0) {
                    alert("Você está com zero vidas... GAME OVER");
                    menu();
                }
                D5narrativa1();
                break;
        }
}


function D5narrativa2 () {
    valorNarrativa = 14;
    let text = [
        "*Você decide se increver no campeonato...*",
        "*O que você deseja fazer agora?*"
    ]
    texto(text, 100);
    
    
    switch (i2) {
        case 0:
            fome = 0;
            valorCenario = 7;
            break;
        case 2:
            let resposta = 0;
            while (resposta != 1 && resposta != 2) {
                resposta = Number(prompt("O que desejo fazer agora?\n1 - Treinar\n2 - Aguardar pelo campeonato"));
            }
            switch (resposta) {
                case 1:
                    i2 = 0;
                    inventGeral(10,9);
                    break;
                case 2:
                    i2 = 0;
                    D5narrativa3b();
                    break;
            }
            break;
    }
}


function D5narrativa3 () {
    valorNarrativa = 15;
    let text = [
        "*Após um ótimo desempenho no treino (se mantendo focado e determinado), você volta para casa se considedando pronto para o campeonato*",
        "_=-ITENS ADQUIRIDOS: FOCO + 1 E DETERMINAÇÃO + 1-=_",
        "*Eis que você está no dia do campeonato",
        "*Antes dele, você prepara uma comida para não estar com fome na hora*",
        "_=-FOME ALTERADA: FOME = 0-=_ _=-ENERGIA ALTERADA: ENERGIA = 3-=_",
        "*Você vai para a competição, e é o seu momento de brilhar!*",
        "*O TERCEIRO LUGAR CONSEGUIU LEVANTAR 117KG, você precisa passar desse peso para ganhar!*"
    ];
    texto(text, 100);
    
    
    switch (i2) {
        case 0:
            if (SAVELock === true) {
                energia = 3;
                fome = 0;
                quantPalavras[0]++;
                quantPalavras[1]++;
            }

            valorCenario = 7;
            break;
        case 2:
            if (SAVELock === true) {
                day++;
                save();
            }
            break;
        case 7:
            i2 = 0;
            inventGeral(22,27);
            break;
    }
}


function D5narrativa3b () {
    valorNarrativa = 18;
    let text = [
        "*Após um tempo para descansar, você se mantém determinado e esperançoso*",
        "_=-PALAVRAS ADQUIRIDAS: ESPERANÇA + 1 E DETERMINAÇÃO + 1-=_",
        "*Eis que você está no dia do campeonato",
        "*Antes dele, você prepara uma comida para não estar com fome na hora*",
        "_=-FOME ALTERADA: FOME = 0-=_ _=-ENERGIA ALTERADA: ENERGIA = 3-=_",
        "*Você vai para a competição, e é o seu momento de brilhar!*",
        "*O TERCEIRO LUGAR CONSEGUIU LEVANTAR 117KG, você precisa passar desse peso para ganhar!*"
    ];
    texto(text, 100);
    
    
    switch (i2) {
        case 0:
            if (SAVELock === true) {
                energia = 3;
                fome = 0;
                quantPalavras[3]++;
                quantPalavras[1]++;
            }

            valorCenario = 7;
            break;
        case 2:
            if (SAVELock === true) {
                day++;
                save();
            }
            break;
        case 7:
            i2 = 0;
            inventGeral(22,27);
            break;
    }
}


function D5narrativa4 () {
    valorNarrativa = 16;
    let text = "";

if ((peso-9) < 120) {
    text = [
        `Você conseguiu levantar ${peso-9}KG, ficando...`,
        "fora do pódio... Você não conseguiu entrar nas olimpíadas... Tente novamente",
    ];
    texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.

    switch (i2) {
        case 2:
            console.clear();
            console.log("%cVOCÊ PERDEU...\nCLIQUE EM OK PARA VOLTAR PARA O ÚLTIMO SAVE ANTES DA COMPETIÇÃO", 'color:red;font-size:20px')
            alert("Clique em OK para voltar para o último save antes da competição...");
            runSave();
            vida--;
            if (vida === 0) {
                alert("Você está com zero vidas... GAME OVER");
                menu();
            }
            i2 = 0;
            D5narrativa3();
}   } else {
    SAVELock = true;

    text = [
        `Você conseguiu levantar ${peso-9}KG, ficando...`,
        "DENTRO DO PÓDIO!!!!! VOCÊ CONSEGUIU ENTRAR NAS OLIMPÍADAS!!!! PARABÉNS!!!!",
    ];
    texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.

    if (i2 === 2) {
        i2 = 0;
        D6narrativa1();
    }

    }
}



function D6narrativa1 () {
    valorNarrativa = 19;
    let text = [
        "*Eis que chega o dia das olimpíadas*",
        "*Você se considera pronto para esse momento, e acaba comprando várias coisas para comer lá*",
        "_=-ITENS ADQUIRIDOS: CAFÉ + 1, WHEY + 1, HAMBURGER + 1 E MIOJO + 1-=_",
        "*Depois de uma jornada tão desafiadora, você reconhece a importância de ter um bom foco e desejo para vencer as olimpíadas*",
        "_=-PALAVRAS ADQUIRIDAS: FOCO + 1 E DESEJO + 1-=_",
        "Os placares até agora foram:\nBRONZE: 138KG🥉\nPRATA: 151KG🥈\nOURO: 160KG🥇\nVOCÊ DEVE PASSAR ELES!"
    ];
    texto(text, 100);


    switch (i2) {
        case 0:
            quantItens[0]++;
            quantItens[2]++;
            quantItens[4]++;
            quantItens[7]++;
            quantPalavras[4]++;
            quantPalavras[0]++;
            valorCenario = 7;
            save()
            break;
        case 6:
            i2 = 0;
            inventGeral(6,27);
            break;
    }
}


function D5final2 () {
    valorNarrativa = 20;
    let text = "";

    if ((peso-9) < 120) {
        text = [
            `Você conseguiu levantar ${peso-9}KG, ficando...`,
            "fora do pódio... Você não ganhou nenhuma medalha... Tente novamente",
        ];
        texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.

        switch (i2) {
            case 2:
                console.clear();
                console.log("%cVOCÊ PERDEU...\nCLIQUE EM OK PARA VOLTAR PARA O ÚLTIMO SAVE ANTES DA COMPETIÇÃO", 'color:red;font-size:20px')
                alert("Clique em OK para voltar para o último save antes da competição...");
                runSave();
                vida--;
                if (vida === 0) {
                    alert("Você está com zero vidas... GAME OVER");
                    menu();
                }
                i2 = 0;
                D6narrativa1();
            }

    } else if ((peso-9) > 138 && (peso-9) <= 151){
        SAVELock = true;

        text = [
        `Você conseguiu levantar ${peso-9}KG, ficando...`,
        "DENTRO DO PÓDIO!!!!! VOCÊ FICOU COM BRONZE!!! PARABÉNS!!!!🥉",
        "*Sua vida foi de muito sucesso...*",
        "*Você foi do nada às olimpíadas... Hoje, você se casou e teve filhos*",
        "*Além disso, Conseguiu participar em outros momentos das olimpíadas mas nunca pegou ouro...*",
        ];


        
        texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.

    } else if ((peso-9) > 151 && (peso-9) <= 160){
        SAVELock = true;

        text = [
            `Você conseguiu levantar ${peso-9}KG, ficando...`,
            "DENTRO DO PÓDIO!!!!! VOCÊ FICOU COM PRATA!!! PARABÉNS!!!!🥈",
            "*Sua vida foi de muito sucesso...*",
            "*Você foi do nada às olimpíadas... Hoje, você se casou e teve filhos*",
            "*Além disso, Conseguiu participar em outros momentos das olimpíadas mas nunca pegou ouro...*",
        ];
        texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.
    
    } else if ((peso-9) > 160){
        SAVELock = true;
        valorCenario = 3;

        text = [
            `Você conseguiu levantar ${peso-9}KG, ficando...`,
            "DENTRO DO PÓDIO!!!!! VOCÊ FICOU COM OURO!!!🥇🤯",
            "*Sua vida foi de muito sucesso à partir daí... Você se casou e teve filhos*",
            "*Teve outros ouros em levantamento de peso, e continua sua jornada incessantemente mostrando como a disciplina e desejo podem levar alguém do absoluto nada à uma estrela mundial que hoje representa os refugiados*",
            "*Meus parabéns... Seu pai estaria orgulhoso de você...*",
        ];
        texto(text, 100); //tive que colocar dentro da condição por conta de um bug que estava rodando ele uma vez a naus antes de sair dessa função.
    }
    
    if ((peso-9) <= 160 && i2 == 6) {
        alert("FIM... OBRIGADO POR JOGAR...")
        let resposta = 0
        while (resposta != 1 && resposta != 2) {
            resposta = Number(prompt("Deseja voltar para o último save?\n1 - Sim\n2 - Não/Desistir do primeiro lugar nas Olimpíadas"))
        }
        if (resposta === 1) {
            runSave();
            valorNarrativa = 19;
            i2 = 0;
            inventGeral(15,27);
        } else {
            menu();
        }
    } else if (resposta === 2){
        menu();
    }
}






// A PARTIR DE AGORA É O CÓDIGO PARA O SISTEMA DE ESCRITA PROGRESSIVA/ANIMADA DOS TEXTOS QUE SERÃO EXIBIDOS NO CONSOLE:

function texto(string,delay) {

    if (jogoRodando == false) {

        if (i2 >= string.length) {
            return;
        }

        textoArray = string[i2].split('')
        textoFinal = "";
        i = 0;
        i3 = 0

        refreshIntervalId2 = setInterval(textoAnimado, delay);
    }
}


function textoAnimado () {
    // sistema que faz funcionar textos ímpares, pois como as mensagens são colocadas de duas em duas letras, dava problema antes dessa adição (ele verifica se as duas próximas letras realmente existem, se não só mostra uma, ou nenhuma)
    if (jogoRodando == false) {
        if (textoArray[i3] != undefined && textoArray[i3+1] != undefined) {
            textoFinal += (textoArray[i3] + textoArray[i3+1]);
        } else if (textoArray[i3] != undefined) {
            textoFinal += (textoArray[i3])
        }

        console.clear();
        elementosVisuais();
        cenario();
        console.log(textoFinal);
        i++;
        i3 += 2;

        if (i3 >= textoArray.length) {
            clearInterval(refreshIntervalId2);
            i2++;
            alerta ();

            switch (valorNarrativa) {
                case 1:
                    narrativa();
                    break;
                case 2:
                    narrativa2();
                    break;
                case 3:
                    narrativa2b();
                    break;
                case 4:
                    narrativa2c();
                    break;
                case 5:
                    narrativa3();
                    break;
                case 6:
                    D2narrativa1();
                    break;
                case 7:
                    D2narrativa2();
                    break;
                case 8:
                    D2narrativa1b();
                    break;
                case 9:
                    D3narrativa1();
                    break;
                case 10:
                    D4narrativa();
                    break;
                case 11:
                    D4narrativa2();
                    break;
                case 12:
                    D4narrativa2();
                    break;
                case 13:
                    D5narrativa1();
                    break;
                case 14:
                    D5narrativa2();
                    break;
                case 15:
                    D5narrativa3();
                    break;
                case 16:
                    D5narrativa4();
                    break;
                case 17:
                    D5final1();
                    break;
                case 18:
                    D5narrativa3b();
                    break;
                case 19:
                    D6narrativa1();
                    break;
                case 20:
                    D5final2();
                    break;
                case 21:
                    final0();
                    break;
            }
        }
    }
}


function alerta () {
    alert("Pressione ENTER para continuar");
    return;
}










// A PARTIR DE AGORA É O CÓDIGO PARA O INVENTÁRIO E SUA INTEGRIDADE COM O MINIGAME DE LEVANTAMENTO DE PESO:

function inventGeral (valorSeg,valorPeso) {
    let selecionado = 0
    while (selecionado != 1 && selecionado != 2 && selecionado != 3) {
        selecionado = Number(prompt("ANTES DO TREINO, DESEJA ABRIR QUE INVENTÁRIO?\n1 - ITENS\n2 - PALAVRAS\n3 - NENHUM/CONTINUAR"))
    }

    switch (selecionado) {
        case 1:
            inventItens(valorSeg,valorPeso)
            break;
        case 2:
            inventPalavras(valorSeg,valorPeso)
            break;
        case 3:
            if (fome < 0.1) {
                jogo(valorSeg,valorPeso)
            }else{
                console.clear()
                console.log('%cVocê não tem força para levantar peso!\nComa algo antes de prosseguir!', 'color:orange;font-size:15px')
                    
                if (valorNarrativa === 6 || valorNarrativa === 8 || valorNarrativa === 10 || valorNarrativa === 14) {
                    let resposta = 0;
                    while (resposta != 1 && resposta != 2) {
                        resposta = Number(prompt("O que você deseja fazer?\n1 - Buscar por algo para comer no inventário\n2 - Parar treino"))
                    }
                    switch (resposta) {
                        case 1:
                            inventGeral(10,9)
                            break;
                        case 2:
                            i2 = 0
                            if (valorNarrativa === 6 || valorNarrativa === 8) {
                                D2narrativa2();
                            } else if (valorNarrativa === 10) {
                                D4narrativa3();
                            } else if (valorNarrativa === 14) {
                                D5narrativa3();
                            }
                            return;
                            break;
                        }
                    } else {
                        alerta ()
                        inventGeral (valorSeg,valorPeso)
                    }
                }
            break;
    }
}


function inventItens (valorSeg,valorPeso) {
    let listaItens = ""

    for (let i = 0; i < itens.length; i++) {
        if (quantItens[i] > 0) {
            listaItens += (`\n${i+1} - ${itens[i]} ${quantItens[i]}X`)
        } else {
            listaItens += (`\n${i+1} - ...`)
        }
    }

    console.clear()
    elementosVisuais()
    console.log(`%cItens presentes no inventário:`, `font-size:20px;`, listaItens, `\n9 - SAIR`)
    let resposta = Number(prompt("Insira o NÚMERO do item que deseja utilizar"))-1
    console.clear()

    quantItens[resposta]--


    if (quantItens[resposta] > -1) {
        switch (resposta) {
            case 0:
                energia = 3
                break;
            case 1:
                energia += 1.5
                break;
            case 2:
                energia ++
                break;
            case 3:
                energia += 0.5
                break;
            case 4:
                fome = 0
                break;
            case 5:
                fome -= 0.05
                break;
            case 6:
                fome -= 0.03
                break;
            case 7:
                fome -= 0.02
                break;
        	}

        if (fome < 0) {
            fome = 0
        }
    }

    inventGeral(valorSeg,valorPeso)

}


function inventPalavras (valorSeg,valorPeso) {
    let listaPalavras = ""

    for (let i = 0; i < palavras.length; i++) {
        if (quantPalavras[i] > 0) {
            listaPalavras += (`\n${i+1} - ${palavras[i]} ${quantPalavras[i]}X`)
        } else {
            listaPalavras += (`\n${i+1} - ...`)
        }
    }
    
    console.clear()
    elementosVisuais(),
    console.log(`%cPalavras presentes no inventário:`, `font-size:20px;`, listaPalavras, "\n7 - SAIR")
    let resposta = Number(prompt("Insira o NÚMERO da palavra que deseja utilizar"))-1
    console.clear()

    quantPalavras[resposta]--

    if (quantPalavras[resposta] > -1) {
        switch (resposta) {
            case 0:
                milissegundos = 1700
                break;
            case 1:
                milissegundos = 1500
                break;
            case 2:
                milissegundos = 1300
                break;
            case 3:
                energia *= 1.3
                break;
            case 4:
                energia *= 1.2
                break;
            case 5:
                energia *= 1.1
                break;
        	}
    }

    inventGeral(valorSeg,valorPeso)

}
















// A PARTIR DE AGORA É O CÓDIGO PARA RODAR O MINIGAME DE LEVANTAMENTO DE PESO!

// A função "jogo" é a que deve ser chamada para rodar o jogo
function jogo (valorSeg,valorPeso) {
    alert("Clique ENTER para começar o minigame de levantamento de peso!")
    segundos = valorSeg;
    clicks = 0;
    peso = valorPeso;
    valorInicialPeso = valorPeso;
    jogoRodando = true;

    console.log(`%cClique no botão presente na página do site para levantar peso!`, 'color:red;font-size:17px', `\nTempo restante: ${segundos} segundos.`)
    refreshIntervalId = setInterval(competicaoTempo, milissegundos);
}


// Essa função é a que mostrará o tempo restante no minigame de levantar peso:
function competicaoTempo() {
    segundos -= 1;

    if (segundos <= 0) {
        clearInterval(refreshIntervalId);
        console.log(`%cO TEMPO ACABOU!`, `color:red;font-size:15px;`, `\nVocê conseguiu levantar ${peso-9}KG!!\n💪 + ${(peso-9)/100}`)
        jogoRodando = false
        milissegundos = 1000 // tempo volta ao normal (já que algumas "palavras" conseguem mudar ele)
        massaMuscular += (peso-9)/100
        alert ("O tempo acabou... Pressione ENTER para continuar")
        switch (valorNarrativa) {
            case 2:
            case 5:
                narrativa2c();
                break;
            case 6:
            case 8:
            case 10:
            case 14:
                inventGeral(10,9);
                break;
            case 15:
            case 18:
                D5narrativa4();
                break;
            case 19:
                i2 = 0;
                D5final2();
                break;
            }
        }
}


// Essa função é a que tem as principais coisas para rodar o minigame do levantamento de peso.
function clickBotao(){
    
    if (jogoRodando == true) {
        if (segundos > 0) {
            clicks += (massaMuscular + energia)
        
            console.clear()
            console.log(`%c${peso}KG!`, `color:red;font-size:20px;`);
            elementosVisuais()
            console.log(`Tempo restante: ${segundos} segundos.`);

            // parte visual do personagem levantando o peso no console:
            if (clicks <= (peso/3)) {
                console.log("   .................\n   ........O........\n   .......⎡⎪⎤........\n   .......||........\n   .....➓———➓......")
            } else if (clicks <= (peso/3 + peso/3 + peso/4)) {
                console.log("   .................\n   ........O........\n   ......➓———➓.....\n   ........═........\n   ........⎦⎣........")
            } else {
                console.log("   ......➓———➓.....\n   .......⎪O⎪......\n   .......┕|┙.......\n   ........═........\n   ........⎦⎣........")
            }

            if (fome < 0.1) {
                fome += 0.0005
            }


            if (clicks >= peso) {
                clicks = 0
                peso += 9
                if (dia == true) {
                    energia -= fome + 0.025
                } else {
                    energia -= fome + 0.05
                }
            }
        }

    }

}





// uma função que mostra os valores de energia, massa muscular e fome:
function elementosVisuais () {
    console.log(` ${energia.toFixed(1)}⚡   ${(fome * 10).toFixed(2)}/1.00🍖   ${massaMuscular.toFixed(2)}💪   Vidas: ${vida}❤️   Dia ${day}🗓️`)
}


// A PARTIR DE AGORA É O CÓDIGO PARA O SISTEMA DE CENÁRIO! ELE SERÁ EXECUTADO EM MOMENTOS QUE PRECISE DE ALGUM, E SERÁ CHAMADO JUNTO A PARAMETRO QUE IDENTIFICARÁ QUAL DOS CENÁRIOS SERÁ EXIBIDO NA TELA
function cenario() {
    switch (valorCenario) {
        case 1:
            // se valorCenario = 1, então imprimir casa:
            console.log(`
                         _______             
                        //    //∖            
                       //    //  ∖           
                      //____//  / ∖          
                     //     ∖∖ / / ∖         
                    //_______∖∖ / / ∖        
                   //|  ___  |∖∖ / / ∖       
                  // | |_|_| | ∖∖ / / /      
                 //  | |_|_| |  ∖∖ / /       
                //___|_______|___∖∖_/        
                  |   _______   |   |        
                  |   |     |   |  /         
                  |   |   - |   | /          
                  |___|_____|___|/           
                  `);
            break;
       case 2: 
            console.log(`
                 _____
                /    ∖∖
               | /∖∖_/∖∖  
               || C C ||
               ∖|  ^  |/
                |  _  |
                 ∖___/
                  | |
                __| |__
               /  ∖_/  ∖
              | /     ∖ |
              | |     | |
                `);
            break;
        case 3:
            console.log(`
                       O
                      /|∖
                      / ∖
                     ------
              ------ | 1º |
              | 2º | |    | ------
              |    | |    | | 3º |
              |    | |    | |    |
                `)
                break;
        case 4:
            console.log(`
                ┌───────────────────────────────┐
                │                               │
                │   Dia ${day}                       │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   _________________________   │
                │   ___________.                │
                │                               │
                │                               │
                └───────────────────────────────┘
                `);
            break;
        case 5:
            console.log(`
                     ________________________
                    /________________________∖
                   /__________ESCOLA__________∖
               /////∖∖∖∖∖________________/////∖∖∖∖∖
              //////∖∖∖∖∖∖  ___    ___  //////∖∖∖∖∖∖
              |   ____   | |_|_|  |_|_| |   ____   |
              |  |_||_|  | |_|_|  |_|_| |  |_||_|  |
              |  |_||_|  |              |  |_||_|  |
              |   ____   | _   ____   _ |   ____   |
              |  |_||_|  ||_| |    | |_||  |_||_|  |
              |  |_||_|  ||_| |   -| |_||  |_||_|  |
              |__________|____|____|____|__________| 
            `);
            break;
        case 6:
            console.log(`
                                               __/__
                                        ______/_____∖_
            ________  _________________/   /-------/ |∖∖∖∖∖
            ∖\       ∖/_|_|_|_|_|_|_|_|/   /_______/  |_||_|
             ∖\                                        ∖||_|
              ∖\_______________________________________|_/
               ∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖/
         ___~~~_∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖∖/~~~___~
         ~___~~~___~~~___~~~___~~~___~~~___~~~___~~~___~~~___
`);
       case 7: 
            console.log(`
                _-----_
                | |∖∖ | 
               /∖/C C∖/∖
               ∖|  ∖  |/
                |  _  |
                 ∖ 3 /
                  | |
                __| |__
               /  ∖_/  ∖
              | /     ∖ |
              | |     | |
                `);
            break;
    }
}


// Esse é o sistema de save do jogo, ele salva os valores do jogo em variáveis globais, depois elas são recolocadas no jogo
function save () {
    SAVELock = false;
    SAVEmassaMuscular = massaMuscular;
    SAVEenergia = energia;
    SAVEfome = fome;

    for (let i = 0; i < quantPalavras.length; i++) {
        SAVEQuantPalavras[i] = quantPalavras[i];
    }
    for (let i = 0; i < quantItens.length; i++) {
        SAVEQuantItens[i] = quantItens[i];
    }
    return;
}


function runSave () {
    massaMuscular = SAVEmassaMuscular;
    energia = SAVEenergia;
    fome = SAVEfome;

    for (let i = 0; i < quantPalavras.length; i++) {
        quantPalavras[i] = SAVEQuantPalavras[i];
    }
    for (let i = 0; i < quantItens.length; i++) {
        quantItens[i] = SAVEQuantItens[i];
    }
    return;
}
