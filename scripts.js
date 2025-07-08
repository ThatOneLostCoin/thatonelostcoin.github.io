//Starting variables
let startScreen = document.querySelector(".tela-inicial"); //Start screen container
let startButton = document.getElementById("start-button"); //"Start" button
let difficulty_select = document.querySelector(".difficulty-select"); //Diff. selection screen
let easy_btn = document.getElementById("easy"); //"Easy" button
let medium_btn = document.getElementById("medium"); //"Medium" button
let hard_btn = document.getElementById("hard"); //"Hard" button

let displayContainer = document.querySelector(".display-principal");
let rep_display = document.querySelector(".rep_display"); //Line with question count and UFRJ's logo
let question_show = document.getElementById("question"); //Question's command
let optA = document.getElementById("A"); //Alternative A
let optB = document.getElementById("B"); //Alternative B
let optC = document.getElementById("C"); //Alternative C
let optD = document.getElementById("D"); //Alternative D

let scoreContainer = document.querySelector(".pontuação"); // Final score container
let userScore = document.getElementById("user-score"); // Line that shows user score
let reset = document.getElementById("reset"); //Reset button

let score = 0;
let difficulty = null;
let game_questions = []; //To be used later
let selectedOption = null; //Does something fancy...

//Questions and options matrix
let Questions = [
    ['Qual estado descreve o equilíbrio em um reator nuclear, onde a taxa de produção de nêutrons é igual à taxa de perda, resultando em uma reação em cadeia autossustentável e potência constante?', // Q1
        'Estado crítico',
        'Estado supercrítico',
        'Estado subcrítico',
        'Estado de fusão'],

    ['Em um Reator de Água Pressurizada (PWR), qual é a dupla função da água leve (H₂O) no circuito primário?', // Q2
        'Moderadora e refrigerante',
        'Apenas refrigerante e geradora de vapor',
        'Apenas moderadora e combustível',
        'Blindagem e controle de reação'],

    ['Qual componente de um Reator de Água Pressurizada (PWR) é responsável por controlar a taxa da reação em cadeia, absorvendo nêutrons quando inserido no núcleo?', // Q3
        'Barras de controle',
        'Vaso de pressão do reator',
        'Varetas de combustível',
        'Gerador de vapor'],

    ['Qual é o tipo de reator nuclear mais comum no mundo, constituindo a base para a propulsão naval militar e para as usinas de Angra 1 e 2?', // Q4
        'Reator de Água Pressurizada (PWR)',
        'Reator a Sal Fundido (MSR)',
        'Reator de Água Pesada Pressurizada (PHWR)',
        'Reator de Água Fervente (BWR)'],

    ['A principal inovação dos Pequenos Reatores Modulares (SMRs) que visa reduzir custos e prazos de construção é:', // Q5
        'A fabricação modular em série em ambiente de fábrica',
        'O uso de combustíveis mais potentes, como o plutônio',
        'A eliminação completa dos sistemas de segurança',
        'A operação em temperaturas muito mais baixas que os reatores convencionais'],

    ['Qual é a principal vantagem operacional da propulsão nuclear que a diferencia de todos os outros combustíveis alternativos?', // Q6
        'Autonomia de 20 a 30 anos sem necessidade de reabastecimento',
        'Custo de instalação inicial mais baixo',
        'Facilidade de produção do combustível em qualquer porto',
        'Emissões zero no ciclo de vida completo (Well-to-Wake)'],

    ['Qual é a principal função do pressurizador em um Reator de Água Pressurizada (PWR)?', // Q7
        'Manter a alta pressão no circuito primário para evitar que a água ferva',
        'Gerar o vapor que aciona a turbina',
        'Resfriar a água do circuito secundário após passar pela turbina',
        'Filtrar e purificar a água do reator para remover impurezas'],

    ['A Agência Internacional de Energia Atômica (AIEA) e outras entidades definem um Pequeno Reator Modular (SMR) como uma unidade com capacidade elétrica de até:', // Q8
        '300 MWe',
        '100 MWe',
        '500 MWe',
        '1000 MWe'],

    ['Qual é a principal diferença entre um reator térmico e um reator rápido (FBR)?', // Q9
        'Reatores térmicos usam nêutrons lentos (moderados), enquanto reatores rápidos usam nêutrons de alta energia sem moderador',
        'Reatores térmicos são usados para aquecimento, enquanto reatores rápidos são para eletricidade',
        'Reatores térmicos usam plutônio, enquanto reatores rápidos usam urânio',
        'Reatores térmicos são experimentais, enquanto reatores rápidos são a tecnologia dominante'],

    ['De acordo com a Union of Concerned Scientists (UCS), qual é uma das principais preocupações de segurança relacionadas às usinas nucleares?', // Q10
        'A vulnerabilidade a ataques terroristas e a necessidade de proteger o material nuclear',
        'A emissão de grandes quantidades de CO₂ durante a operação',
        'O ruído excessivo gerado pelas turbinas',
        'O consumo excessivo de combustíveis fósseis para iniciar a reação'],

    ['No modelo de negócio de "Energia como Serviço" (leasing), quem é o proprietário do reator nuclear e assume a responsabilidade pelo custo inicial e descomissionamento?',
        'Uma empresa de energia nuclear especializada (o fornecedor)', // Q11
        'O armador (operador do navio)',
        'O governo do país de bandeira do navio',
        'Um consórcio internacional de seguradoras'],

    ['Qual é o principal princípio de segurança nuclear estabelecido pela Agência Internacional de Energia Atômica que determina que múltiplas camadas de barreiras independentes devem ser implementadas para prevenir acidentes?', // Q12
        'Defesa em Profundidade',
        'Cultura de Segurança',
        'Otimização da Proteção Radiológica (ALARA)',
        'Justificação das Atividades'],

    ['Qual evento geopolítico recente levou os EUA a investir bilhões de dólares para expandir sua capacidade doméstica de enriquecimento de urânio?', // Q13
        'A proibição da importação de urânio enriquecido de origem russa',
        'A assinatura de um novo acordo climático global',
        'O aumento da demanda por energia de data centers',
        'A descoberta de novas reservas de urânio na Austrália'],

    ['Qual é a solução de longo prazo mais amplamente aceita internacionalmente para o descarte final do combustível nuclear usado de alta atividade?', // Q14
        'Descarte em repositórios geológicos profundos',
        'Lançamento em órbita solar',
        'Armazenamento em instalações na superfície em áreas desérticas',
        'Neutralização química em instalações de reprocessamento'],

    ['Plantas Nucleares Flutuantes (FNPP) são um subconjunto de qual categoria de planta nuclear?', // Q15
        'Plantas Nucleares Transportáveis',
        'Plantas Nucleares Embarcadas',
        'Plantas Nucleares Removíveis',
        'Reatores Modulares Pequenos'], // Easy ends here

    ['Qual é a principal vantagem de segurança dos Reatores a Sal Fundido (MSR) e dos Reatores Rápidos Refrigerados a Chumbo (LFR) em comparação com os de Reatores de Água Pressurizada PWRs tradicionais?', // Q16
        'Operam próximo da pressão atmosférica',
        'Operam com urânio natural, eliminando a necessidade de enriquecimento',
        'Não produzem nenhum tipo de resíduo nuclear',
        'São significativamente menores e não requerem blindagem'],

    ['Qual é a principal razão pela qual a convergência de SMRs com tecnologias de Geração IV é considerada um ponto de inflexão para a propulsão marítima?', // Q17
        'Porque combina pela primeira vez um perfil de segurança intrínseco com um modelo de produção econômico e escalável',
        'Porque permite o uso de reatores de fusão em navios',
        'Porque elimina a necessidade de uma tripulação a bordo',
        "Porque permite que os navios operem debaixo d'água como submarinos"],

    ['De acordo com nosso artigo, qual é a principal razão pela qual o combustível TRISO, usado em Reatores de Alta Temperatura Refrigerados a Gás (HTGR), é considerado extremamente seguro?', // Q18
        'Suas múltiplas camadas de revestimento cerâmico podem suportar temperaturas superiores a 1600°C sem falhar',
        'Ele não contém urânio, usando apenas tório como combustível',
        'Ele opera em temperaturas abaixo de zero, prevenindo o superaquecimento',
        'Ele se dissolve completamente em água em caso de vazamento'],

    ['Qual é a principal diferença no ciclo de vapor entre um Reator de Água Fervente (BWR) e um Reator de Água Pressurizada (PWR)?', // Q19
        'O BWR gera vapor diretamente no vaso do reator em um único circuito, enquanto o PWR usa um circuito secundário separado',
        'O BWR usa água pesada, enquanto o PWR usa água leve',
        'O BWR não usa turbinas a vapor, gerando eletricidade diretamente do calor',
        'O BWR opera a uma pressão muito mais alta que o PWR'],

    ['Qual é o princípio fundamental da lei de responsabilidade nuclear que estabelece que toda a responsabilidade legal por um dano nuclear recai exclusivamente sobre o operador da instalação?', // Q20
        'Princípio da canalização da responsabilidade',
        'Princípio da responsabilidade ilimitada',
        'Princípio da imunidade soberana',
        'Princípio do poluidor-pagador'], // Medium ends here

    ['Qual tecnologia de combustível, usada em Reatores de Alta Temperatura Refrigerados a Gás (HTGR), consiste em partículas de urânio revestidas com cerâmica, tornando um colapso do núcleo (meltdown) praticamente impossível?', // Q21
        'Combustível TRISO',
        'Combustível MOX',
        'Pastilhas de UO₂ em Zircaloy',
        'Sais de tório dissolvidos'],

    ['Qual empresa, em parceria com a Westinghouse, anunciou planos para desenvolver uma usina de energia nuclear flutuante (FNPP) usando o microrreator eVinci™?', // Q22
        'CORE POWER',
        'Maersk',
        'HD Hyundai',
        'TerraPower'],

    ['Qual foi um desafio operacional específico do equipamento de carga do NS Savannah que tornou-o ineficiente?', // Q23
        'Seu sistema de manuseio de carga era inadequado para cargas pesadas e seu design de mastro impedia a operação eficiente das escotilhas',
        'Seus guindastes eram movidos a diesel, contradizendo sua propulsão nuclear',
        'O navio não possuía guindastes, dependendo exclusivamente da infraestrutura portuária',
        'Os porões de carga não eram pressurizados, limitando os tipos de mercadorias que podiam ser transportadas'],

    ['No estudo da American Bureau of Shipping, qual foi a conclusão sobre a instalação de microrreatores no petroleiro Suezmax?',  // Q24
        'Aumentaria a velocidade do navio, mas com uma ligeira redução na capacidade de carga',
        'Aumentaria tanto a capacidade de carga quanto a velocidade',
        'Reduziria tanto a capacidade de carga quanto a velocidade',
        'Não teria impacto algum no desempenho do navio'],

    ['Qual é o principal objetivo da Análise de Risco Probabilística (PRA) na indústria nuclear?', // Q25
        'Identificar sistematicamente cenários de falha, quantificar sua probabilidade e avaliar suas consequências',
        'Calcular o custo exato de construção de um novo reator',
        'Determinar a localização ideal para novas usinas nucleares',
        'Treinar operadores de reatores em simulações de acidentes']] // Hard ends here

const medium = 5; //How many medium questions in the matrix
const hard = 5; //How many hard ones

window.onload = () => { //When the game first loads...
    startScreen.classList.remove("hide"); //Show start screen
    displayContainer.classList.add("hide"); //Hide the rest
};

function reorder_questions(quest, dif){ //It's just wizardry, Harry
    switch (dif){
    case 1: //Easy
        game_questions = quest.slice(0, (quest.length - (hard + medium))).sort(() => Math.random() - 0.5); //Slices the main matrix to get rid of medium and hard, then randomizes it
        break;
    case 2: //Medium
        game_questions = quest.slice(0, (quest.length - hard)).sort(() => Math.random() - 0.5); //Same but only excludes hard
        break;
    default: //Hard
        game_questions = quest.sort(() => Math.random() - 0.5); //Just randomizes
        break;
    }
    return game_questions;
};

function clearSelection() { //Just removes highlights on the buttons that have been chosen once
    [optA, optB, optC, optD].forEach(opt => {
        opt.classList.remove("selected");
    });
    selectedOption = null;
}

function clearDifficultySelection() { //Upon reseting, reset difficulty level
    [easy_btn, medium_btn, hard_btn].forEach(btn => {
        btn.classList.remove("selected");
    });
    difficulty = null;
}

function selectOption(option, value) { //Highlights buttons that are chosen
    // Clear previous selection
    clearSelection();
    
    // Mark this option as selected
    option.classList.add("selected");
    selectedOption = value;
}

function selectDifficulty(button, value) { //Actually selects the difficulty value for the quiz
    // Clear previous selection
    clearDifficultySelection();
    
    // Mark this difficulty as selected
    button.classList.add("selected");
    difficulty = value;
}

function end_screen(gam_quest, pts){ //Displays different messages according the user score
    let phrase = "";
    if (pts <= 0.2*(gam_quest.length)) {
        phrase = `Você fez ${pts} pontos. Não se preocupe, reveja nosso artigo e tente novamente.`;
    } else if (pts > 0.2*(gam_quest.length) && pts < 0.4*(gam_quest.length)){
        phrase = `Você fez ${pts} pontos. Pode fazer melhor, veja nosso artigo e tente novamente.`;
    } else if (pts >= 0.4*(gam_quest.length) && pts < 0.6*(gam_quest.length)){
        phrase = `Você fez ${pts} pontos. Muito bem! Se quiser aprender mais, veja nosso artigo e tente novamente.`;
    } else if (pts >= 0.6*(gam_quest.length) && pts < 0.8*(gam_quest.length)){
        phrase = `Você fez ${pts} pontos. Excelente! Se quiser saber ainda mais, veja nosso artigo e tente de novo.`;
    } else if (pts >= 0.8*(gam_quest.length) && pts <gam_quest.length){
        phrase = `Você fez ${pts} pontos. Parabéns!!! Já aprendeu muito sobre reatores embarcados e suas aplicações.`;
    } else if (pts == gam_quest.length){
        phrase = `Você fez ${pts} pontos! Nota impecável! Esperamos que tenha aprendido algo com o nosso artigo.`;
    };
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = phrase;

    reset.addEventListener("click", () => { //Reset button only takes you to start screen again
        scoreContainer.classList.add("hide");
        startScreen.classList.remove("hide");
    });
};

async function game_loop(dif) { //Main loop
    game_questions = reorder_questions(Questions, dif); //Reorders according to diff. chosen
    rep_display.innerHTML = `Questão 1 de ${game_questions.length}`; //Resets the count display after a possible reset

    function game_card(x){ //Fuction that creates the display of a given question
        question_show.querySelector("p").innerText = game_questions[x][0]; //Shows the question's command in it's given place
        let alternatives = [1,2,3,4].map(j => game_questions[x][j]).sort(() => Math.random() - 0.5); //Randomizes alternatives
        optA.innerText = alternatives[0]; //Displays them in the new order
        optB.innerText = alternatives[1];
        optC.innerText = alternatives[2];
        optD.innerText = alternatives[3];

        return alternatives.indexOf(game_questions[x][1]); //Returns the index of the correct answer for later comparison
    };

    let correct;
    for (let i in game_questions) { //The game loop itself
        rep_display.innerHTML = `Questão ${Number(i)+1} de ${game_questions.length}`; //Updates question counter
        correct = game_card(i); //Sets correct answer
        clearSelection(); //Clear selection before new question is shown

        function wait_opt_input() { //Waits for user input on the alternative, that's the reason why the main loop HAS to be async
            return new Promise(resolve => {
                function handleClick(optionValue) {
                    if (selectedOption === optionValue) {
                        // Second click - confirm the selection
                        resolve(optionValue);
                    } else {
                        // First click - select an option
                        selectOption(this, optionValue);
                    }
                }

                optA.onclick = function() { handleClick.call(this, 0); };
                optB.onclick = function() { handleClick.call(this, 1); };
                optC.onclick = function() { handleClick.call(this, 2); };
                optD.onclick = function() { handleClick.call(this, 3); };
            });
        }

        let choice = await wait_opt_input();
        if (correct == choice) score++; //Checks if the chosen alternative matches the correct one
    };

    end_screen(game_questions, score);
}

function initial(dif){ //Starts the game
    score = 0;
    game_loop(dif);
}

startButton.addEventListener("click", () => { //When the start button is clicked
    startScreen.classList.add("hide"); //Hides start screen
    difficulty_select.classList.remove("hide"); //Shows diff. selection

    function wait_dif_input() { //Waits for user input on difficulty
    return new Promise((resolve) => {
        clearDifficultySelection(); // Clears any previous selection
            
        function handleDifficultyClick(difficultyValue) { //Same idea behind the alternative choice
            if (difficulty === difficultyValue) {
                // Second click - confirm selection
                resolve(difficultyValue);
            } else {
                // First click - select difficulty
                selectDifficulty(this, difficultyValue);
            }
        }

        easy_btn.onclick = function() { handleDifficultyClick.call(this, 1); }; //Attaches the value 1 to difficulty if easy is pressed
        medium_btn.onclick = function() { handleDifficultyClick.call(this, 2); }; //Same but 2
        hard_btn.onclick = function() { handleDifficultyClick.call(this, 3); }; //Same but 3
    });
    }

    (async () => { //Actual function behind difficulty choice
        let difficulty = await wait_dif_input(); //Waits user input and set value according to the above
        difficulty_select.classList.add("hide"); //Hides diff. choice screen
        displayContainer.classList.remove("hide"); //Shows questions
        initial(difficulty); //Starts the game itself
    })();
});

/*Sorry about the atrocities seen in this code, I am but a mere mortal (who didn't even know JavaScript at all) standing on the shoulders of giants,
lack of sleep and way too many exams. This is, right now, the best I can do. */


/*
let toAddLater = [
    ['Além da propulsão, o que é o conceito de "reverse cold ironing" que pode ser habilitado por navios nucleares? ',
        'A capacidade do navio de fornecer eletricidade para a rede portuária enquanto está atracado',
        'O uso do reator para aquecer a carga do navio',
        'Um método para resfriar rapidamente o reator em caso de emergência',
        'A produção de gelo para fins comerciais usando a energia do reator'],

    ['Além do custo do reator, qual fator de custo operacional é projetado para ser significativamente MAIOR em um navio nuclear em comparação com um navio convencional?',
        'Custos com a tripulação, que precisa ser maior e com treinamento especializado',
        'Custo de lubrificantes para o motor',
        'Taxas portuárias de atracação',
        'Custo de pintura e manutenção do casco'],

    ['Qual é o principal desafio técnico associado ao uso do tório como combustível nuclear?',
        'O reprocessamento do combustível irradiado e o manuseio de subprodutos altamente radioativos como o U-232',
        'A mineração do tório é extremamente difícil e trata-se de um elemento muito raro',
        'O tório não pode sustentar uma reação em cadeia',
        'O tório só pode ser usado em reatores de fusão']
]
*/