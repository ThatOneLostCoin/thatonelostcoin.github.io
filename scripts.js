//Starting variables as per the order of the HTML file
let startScreen = document.querySelector(".tela-inicial"); //Start screen container
let startButton = document.getElementById("start-button"); //"Start" button

let difficulty_select = document.querySelector(".difficulty-select"); //Diff. selection screen
let easy_btn = document.getElementById("easy"); //"Easy" button
let medium_btn = document.getElementById("medium"); //"Medium" button
let hard_btn = document.getElementById("hard"); //"Hard" button

let display_container = document.querySelector(".display-principal"); //The main screen
let rep_display = document.querySelector(".rep_display"); //Line with question count and UFRJ's logo
let card = document.getElementById("card"); //Question-cards
let question_show = document.getElementById("question"); //Question's command
let optA = document.getElementById("A"); //Alternative A
let optB = document.getElementById("B"); //Alternative B
let optC = document.getElementById("C"); //Alternative C
let optD = document.getElementById("D"); //Alternative D
let flash = document.querySelector(".flash"); //Flashcard's div
let flash_quest = document.getElementById("flash-question"); //Flashcard's question
let flash_correct = document.getElementById("flash-correct"); //Flashcard's correct answer and explanation
let next_btn = document.querySelector(".next"); //Flashcard's closing button

let scoreContainer = document.querySelector(".pontuação"); // Final score container
let userScore = document.getElementById("user-score"); // Line that shows user score
let reset = document.getElementById("reset"); //Reset button

let score = 0;
let difficulty = null;
let game_questions = []; //To be used later
let selected_alternative = null; //Does something fancy later on...
let alternatives = []; //Same.
let choice = null; //Same. Those are here to avoid block scope issues later on.

let Questions = [ //Questions and options matrix
    ['Qual uma das desvantagens dos navios cargueiros atuais?',
        'São muito poluentes',
        'São muito caros',
        'São pouco utilizados',
        'São pouco seguros',
        'Os navios cargueiros atuais usam combustíveis fósseis muito poluentes e nocivos ao meio ambiente, tornando-os pouco eficazes e um problema para nosso ecossistema.'
    ], //Q1

    ['Que tipo de combustível um reator usa?',
        'Material físsil',
        'Hidrogênio',
        'Carvão mineral',
        'Amônia verde',
        'Reatores nucleares de fissão utilizam um combustível capaz de ter seus átomos partidos, liberando energia na forma de calor. Tais materiais são chamados físseis pois podem passar pelo processo citado.'
    ], //Q2

    ['Por que os reatores da Geração IV são mais seguros?',
        'São capazes de se desligarem sozinhos em caso de falha',
        'São menos potentes, então não explodem',
        'Não emitem radiação em caso de falha',
        'Operam em altas pressões, o que os torna mais estáveis em condição de risco',
        'Os reatores da Geração IV possuem salvaguardas passivas, capazes de desligá-los em caso de acidentes ou falhas e operam em pressão baixa, o que os torna menos propensos a causar acidentes graves.'
    ], //Q3

    ['Nos novos reatores embarcados, quem ficaria responsável pelo reprocessamento do resíduo nuclear?',
        'As empresas que fornecem o reator',
        'As operadoras dos navios',
        'A tripulação do navio, especialmente treinada para isso',
        'A Skynet',
        'O reprocessamento do resíduo nuclear proveniente de reatores seria de responsabilidade da empresa que os fornece, já com profissionais altamente capacitados para lidar com tais materiais e em locais apropriados e com segurança reforçada.'
    ], //Q4

    ['Quais são as vantagens de um navio movido a propulsão nuclear?',
        'É mais rápido pelo mesmo custo e tem maior autonomia',
        'Tem sempre mais espaço para carga',
        'É mais leve e mais silencioso',
        'Emite mais poluição mas custa bem menos',
        'Navios movidos a propulsão nuclear precisam abastecer apenas uma vez em mais de 5 anos, dependendo do grau de enriquecimento de seu combustível, e consomem pouco para operarem em velocidades maiores, gastando menos com combustível do que se fossem movidos a combustão.'
    ], //Q5

    ['O que um reator nuclear libera durante sua operação?',
        'Vapor de água',
        'Materiais radioativos',
        'Gás carbônico',
        'Fuligem',
        'Reatores nucleares liberam, no geral, apenas vapor de água para o meio ambiente, sendo uma das fontes de energia mais limpas e seguras atualmente.'
    ], //Q6

    ['Qual estado descreve o equilíbrio em um reator nuclear?',
        'Estado crítico',
        'Estado supercrítico',
        'Estado subcrítico',
        'Estado de fusão',
        'O estado crítico é definido como o ponto de equilíbrio onde a taxa de produção de nêutrons é igual à taxa de perda, resultando em uma reação em cadeia autossustentável e uma potência constante. O estado subcrítico ocorre quando se tem menos nêutrons do que o necessário para a reação se autossustentar, fazendo com que ela cesse, e o supercrítico quando se tem excesso de nêutrons, acelerando a reação. Por fim, fusão trata-se de um tipo totalmente diferente de reação, uma tecnologia que, possivelmente, ainda está por vir.'
    ], //Q7

    ['Qual é o tipo de reator nuclear mais comum no mundo, constituindo a base para a propulsão naval militar e para as usinas de Angra 1 e 2?',
        'Reator de Água Pressurizada (PWR)',
        'Reator a Sal Fundido (MSR)',
        'Reator de Água Pesada Pressurizada (PHWR)',
        'Reator de Água Fervente (BWR)',
        'O PWR é o tipo de reator mais difundido globalmente, compondo quase 70% da quota mundial, e é a tecnologia padrão para propulsão naval e para as usinas brasileiras.'
    ], //Q8
    
    ['Qual a principal inovação dos Reatores Modulares Pequenos (SMRs) que visa reduzir custos e prazos de construção?',
        'A fabricação modular em série em ambiente de fábrica',
        'O uso de combustíveis mais potentes, como o plutônio',
        'A eliminação completa dos sistemas de segurança',
        'A operação em temperaturas muito mais baixas que os reatores convencionais',
        'A abordagem SMR substitui a construção sob medida no local pela fabricação de componentes em um ambiente de fábrica controlado, visando reduzir custos através da padronização'
    ], //Q9

    ['Qual é a principal razão pela qual a análise de ciclo de vida é importante na avaliação de combustíveis marítimos?',
       'Ela avalia as emissões desde a extração da matéria-prima até o uso final',
       'Ela considera apenas a eficiência do motor do navio',
       'É uma exigência apenas para navios que transportam petróleo',
       'Ela foca exclusivamente nos custos de produção do combustível',
       'Essa abordagem é crucial porque captura todas as emissões associadas a um combustível, incluindo as da produção e do transporte, fornecendo, assim, uma medida precisa de seu impacto climático <b>total</b>.'
    ], //Q10

    ['Qual o principal veículo de transporte internacional de bens comerciais?',
        'Navio cargueiro',
        'Avião de carga',
        'Trem',
        'Caminhão',
        'A maior parte das indústrias depende, eventualmente, de algum bem importado ou é focada em exportação e, em qualquer um destes casos, a opção mais economicamente viável é a do transporte marítimo em navios de grande capacidade. Em outros termos, eles suportam a indústria moderna na maior parte do mundo.'
    ], //Q11

    ['Além de aplicações militares, existe uma frota de navios com propulsão nuclear em operação hoje, qual?',
        'A de quebra-gelos para navegação em rotas árticas',
        'A de navios de cruzeiro de luxo',
        'A de navios de transporte de contêineres',
        'A de navios de pesquisa oceanográfica',
        'Navios quebra-gelo exploram territórios extremamente hostis, sob condições em que uma pequena falha pode ser fatal para toda a tripulação, o que significa que é necessário que possuam sistemas muito confiáveis e de alta durabilidade pois, em caso de emergência, podem não conseguir socorro a tempo. O fato de possuírem um reator nuclear os torna menos propícios a uma eventual falta de combustível, fornece-lhes uma fonte confiável de calor e confere-os grande autonomia.'
    ], //Q12

    ['Qual é o prazo estimado para o lançamento comercial dos primeiros navios nucleares de nova geração?',
        'Na década de 2030',
        'Já estão em operação comercial desde 2020',
        'Apenas após 2070',
        'Nunca serão comercialmente viáveis',
        'O consenso entre especialistas e desenvolvedores de tecnologia é que os primeiros navios comerciais equipados com reatores de Geração IV poderiam ser lançados no início ou meados da década de 2030.'
    ], //Q13

    ['Como a pegada de carbono da energia nuclear em seu ciclo de vida completo se compara à de outras fontes de energia?',
        'É a mesma ou menor que a das energias renováveis, como eólica e solar',
        'É muito maior que a dos combustíveis fósseis',
        'É idêntica à da amônia verde',
        'Nunca foi estudada e é desconhecida',
        'Estudos demonstram que as emissões de gases de efeito estufa da energia nuclear, desde a extração do minério até a operação das usinas e reatores embarcados, são extremamente baixas, comparáveis às das fontes renováveis como eólica e solar.'
    ], //Q14

    ['Plantas Nucleares Flutuantes (FNPP) são um subconjunto de qual categoria de planta nuclear?',
        'Plantas Nucleares Transportáveis',
        'Plantas Nucleares Embarcadas',
        'Plantas Nucleares Removíveis',
        'Reatores Modulares Pequenos',
        'Plantas Nucleares Flutuantes são apenas Plantas Nucleares Transportáveis feitas para operar sobre corpos de água, muitas vezes para que possam ser levadas de uma localização a outra em que sejam necessárias, algo que é mais prático e mais barato que construir uma central nuclear tradicional e diversas linhas de transmissão de energia. Sem contar que também são capazes de gerar calor para diversos fins, algo que não pode ser transmitido de uma central.'
    ], //Q15 - Easy ends here
    
    ['Qual é a principal diferença entre um reator térmico e um reator rápido (FBR)?',
        'Reatores térmicos usam nêutrons lentos (moderados), enquanto reatores rápidos usam nêutrons de alta energia sem moderador',
        'Reatores térmicos são usados para aquecimento, enquanto reatores rápidos são para eletricidade',
        'Reatores térmicos usam plutônio, enquanto reatores rápidos usam urânio',
        'Reatores térmicos são experimentais, enquanto reatores rápidos são a tecnologia dominante',
        'Após uma reação de fissão existem alguns tipos de nêutrons que podem ser gerados, dois tipos deles são: os rápidos, de energia, e os térmicos, de menor energia. Reatores rápidos utilizam os do primeiro tipo, enquanto os lentos utilizam o do segundo, daí seus respectivos nomes.'
    ], //Q16

    ['Qual é a principal vantagem de segurança dos Reatores a Sal Fundido (MSR) e dos Reatores Rápidos Refrigerados a Chumbo (LFR) em comparação com os de Reatores de Água Pressurizada PWRs tradicionais?',
        'Operam próximo da pressão atmosférica',
        'Operam com urânio natural, eliminando a necessidade de enriquecimento',
        'Não produzem nenhum tipo de resíduo nuclear',
        'São significativamente menores e não requerem blindagem',
        'Reatores de Geração IV como MSRs e LFRs operam em baixa pressão, o que elimina o risco de acidentes de alta pressão e explosões de vapor, uma das principais preocupações de segurança com os PWRs.'
    ], //Q17

    ['Além do custo do reator, qual fator de custo operacional é projetado para ser significativamente <b>maior</b> em um navio nuclear em comparação com um navio convencional?',
        'Custos com a tripulação, que precisa ser maior e com treinamento especializado',
        'Custo de lubrificantes para o motor',
        'Taxas portuárias de atracação',
        'Custo de pintura e manutenção do casco',
        'Em um navio nuclear, é necessário que a tripulação esteja preparada para lidar com potenciais riscos e falhas. Para isso, é essencial que passe por uma série de treinamentos e exercícios, o que, consequentemente, implica em um maior custo.'
    ], //Q18

    ['Qual componente de um Reator de Água Pressurizada (PWR) é responsável por controlar a taxa da reação em cadeia, absorvendo nêutrons quando inserido no núcleo?',
        'Barras de controle',
        'Vaso de pressão do reator',
        'Varetas de combustível',
        'Gerador de vapor',
        'As barras de controle, feitas de materiais como boro ou cádmio, são inseridas ou retiradas do núcleo para absorver nêutrons e, assim, controlar a taxa de fissão e a potência do reator'
    ], //Q19

    ['Qual é a principal função do pressurizador em um Reator de Água Pressurizada (PWR)?',
        'Manter a alta pressão no circuito primário para evitar que a água ferva',
        'Gerar o vapor que aciona a turbina',
        'Resfriar a água do circuito secundário após passar pela turbina',
        'Filtrar e purificar a água do reator para remover impurezas',
        'Seguindo-se o mesmo princípio de uma panela de pressão, ao aumentar-se a pressão interna, mantém-se a água líquida, o que permite obter temperaturas maiores ainda mantendo a eficiência no resfriamento.'
    ], //Q20 - Medium ends here

    ['Qual tecnologia de combustível, usada em Reatores de Alta Temperatura Refrigerados a Gás (HTGR), consiste em partículas de urânio revestidas com cerâmica, tornando um colapso do núcleo (meltdown) praticamente impossível?',
        'Combustível TRISO',
        'Combustível MOX',
        'Pastilhas de UO₂ em Zircaloy',
        'Sais de tório dissolvidos',
        'O combustível TRISO (Tristructural-Isotropic) usado em HTGRs possui múltiplas camadas de revestimento cerâmico que podem suportar temperaturas altíssimas (>1600°C) sem falhar, prevenindo o colapso do núcleo.'
    ], //Q21

    ['O que é Urânio de Baixo Enriquecimento (LEU), o combustível padrão para a maioria dos reatores comerciais?',
        'Urânio com concentração de U-235 aumentada para cerca de 3% a 5%',
        'Urânio com concentração de U-235 acima de 20%',
        'Urânio em seu estado natural, com 0,7% de U-235',
        'Urânio misturado com plutônio',
        'O LEU é o urânio que passou por um processo de enriquecimento para aumentar a concentração do isótopo físsil U-235 para a faixa de 3% a 5%, necessária para a maioria dos reatores comerciais.'
    ], //Q22

    ['O que significa o conceito de "Zona de Planejamento de Emergência (EPZ) contida no casco" para um navio nuclear?',
        'Que, mesmo no pior acidente, a radiação perigosa não ultrapassaria os limites do navio, permitindo o acesso a portos',
        'Uma área designada para exercícios de emergência da tripulação',
        'A zona onde o reator pode ser ejetado em caso de emergência',
        'Uma área de exclusão de 50 km ao redor do navio em operação',
        'Este conceito é crucial para a viabilidade comercial, pois garante que um acidente a bordo não exigiria planos de evacuação para as cidades portuárias, facilitando o acesso irrestrito aos portos.'
    ], //Q23

    ['O que é o Urânio de Alto Ensaio e Baixo Enriquecimento (HALEU)?',
        'Urânio enriquecido a um nível entre 5% e 20%, que permite reatores menores e mais eficientes',
        'Um tipo de combustível que não gera resíduos radioativos',
        'Urânio que só pode ser usado em reatores de fusão',
        'O mesmo que urânio empobrecido, usado para blindagem',
        'O HALEU possui um enriquecimento maior que o LEU, mas ainda abaixo do limite de 20% para urânio altamente enriquecido (HEU). Ele permite projetos de reatores mais compactos e eficientes, mas sua cadeia de suprimentos ainda não está estabelecida comercialmente.'
    ], //Q24

    ['Qual modelo de negócio inovador permite que o armador pague por energia como um serviço (taxa por MWh), transferindo o risco do CAPEX para um fornecedor de tecnologia?',
        'Contrato de compra de energia (PPA) ou leasing do reator',
        'Fretamento por tempo',
        'Compra direta do reator',
        'Financiamento coletivo (crowdfunding)',
        'O modelo de leasing ou PPA permite que o armador evite o alto CAPEX, pagando pela energia como um custo operacional, enquanto o fornecedor de tecnologia assume a propriedade e a responsabilidade pelo reator.'
    ] //Q25 - Hard ends here
    ];

const medium = 5; //How many medium questions in the matrix
const hard = 5; //How many hard ones

window.onload = () => { //When the game first loads...
    startScreen.classList.remove("hide"); //Show start screen
    display_container.classList.add("hide"); //Hide the rest
    flash.classList.add("hide"); //Not needed since flash is part of display_container but just to be safe.
};

function reorder_questions(quest, dif){ //It's just wizardry, Harry...
    switch (dif){
    case 1: //Easy
        game_questions = quest.slice(0, (quest.length - (hard + medium))).sort(() => Math.random() - 0.5); //Slices the main matrix to get rid of medium and hard, then randomizes it
        break;
    case 2: //Medium
        //Firstly, note that we want the final number of questions to always be the same, so we need to cut the main matrix to match the smallest possible number between those 3 cases, aka the Easy one, therefore, the amount of questions that need to be cut from the easy section is the number being added each time, aka, the number of medium questions in this mode and (medium + hard) in the next, so...
        game_easy = quest.slice(0, (quest.length - (medium + hard))).sort(() => Math.random() - 0.5); //Selects easy questions and sorts them (so that it always cuts random ones, not only the last)
        game_medium = quest.slice(game_easy.length, quest.length - hard); //Selects medium questions

        game_easy = game_easy.slice(0, (game_easy.length - medium)); //After slicing, cuts the number to be added, aka medium
        game_questions = game_easy.concat(game_medium); //Joins medium and sorted easy into the new game_questions
        game_questions = game_questions.sort(() => Math.random() - 0.5); //randomizes the new matrix so that medium questions aren't only in the end
        break;
    default: //Hard
        //Repeating this procedure, knowing that the number of question to be added is hard + medium:
        game_easy = quest.slice(0, (quest.length - (medium + hard))).sort(() => Math.random() - 0.5);
        game_medium = quest.slice(game_easy.length, quest.length - hard);
        game_hard = quest.slice(game_easy.length + game_medium.length, quest.length); //Selects hard questions

        game_easy = game_easy.slice(0, (game_easy.length - (medium + hard))); //Cuts medium + hard from easy
        game_questions = game_easy.concat(game_medium, game_hard); //Joins medium and sorted easy into the new game_questions
        game_questions = game_questions.sort(() => Math.random() - 0.5); //Randomizes
        break;
    };
    return game_questions;
};

function clear_alt_btn_selection() { //Removes highlight and selection of the alternative buttons in case user changes idea
    [optA, optB, optC, optD].forEach(opt => {
        opt.classList.remove("selected");
    });
    selected_alternative = null; //Might not be needed at all but just to be sure...
}

function clear_dif_btn_selection() { //Removes highlights and selection of difficulty buttons in case user changes idea
    [easy_btn, medium_btn, hard_btn].forEach(btn => {
        btn.classList.remove("selected");
    });
    difficulty = null; //Same
}

function select_alternative(option, value) { //Highlights the chosen alternative's button and also sets variable value according to new choice
    clear_alt_btn_selection(); //Clears previous alt. selection
    option.classList.add("selected"); //Marks current option as selected
    selected_alternative = value; //Sets alt. var. accordingly
}

function select_difficulty(button, value) { //Highlights the chosen difficulty's button and sets dif. value according to new choice
    clear_dif_btn_selection(); //Clears previous dif. selection
    button.classList.add("selected"); //Marks this difficulty as selected
    difficulty = value; //Sets dif. accordingly
}

function end_screen(gam_quest, pts){ //Displays different messages according the user score
    let score_text = `Você fez ${pts} pontos.`;
    let phrase = "";
    if (pts <= 0.2*(gam_quest.length)) {
        phrase = "Não se preocupe, reveja nosso folder e tente novamente.";
    } else if (pts > 0.2*(gam_quest.length) && pts < 0.4*(gam_quest.length)){
        phrase = "Pode fazer melhor, veja nosso folder e tente novamente.";
    } else if (pts >= 0.4*(gam_quest.length) && pts < 0.6*(gam_quest.length)){
        phrase = "Muito bem! Se quiser aprender mais, veja nosso folder e tente novamente.";
    } else if (pts >= 0.6*(gam_quest.length) && pts < 0.8*(gam_quest.length)){
        phrase = "Excelente! Se quiser saber ainda mais, veja nosso folder e tente de novo.";
    } else if (pts >= 0.8*(gam_quest.length) && pts <gam_quest.length){
        phrase = "Parabéns!!! Já aprendeu muito sobre reatores embarcados e suas aplicações.";
    } else if (pts == gam_quest.length){
        phrase = "Nota impecável! Já virou um expert no assunto, parabéns!";
    };
    display_container.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = `<h1>${score_text}</h1><p>${phrase}<br>Esperamos que tenha gostado de nosso <a href="assets/folder.pdf" target="_blank"><b>folder</b></a> e de nosso jogo de perguntas e respostas!</p>`;

    reset.addEventListener("click", () => { //Reset button only takes you to start screen again
        scoreContainer.classList.add("hide");
        startScreen.classList.remove("hide");
    });
};

async function game_loop(dif) { //Main loop (has to be async for reasons cited bellow)
    game_questions = reorder_questions(Questions, dif); //Reorders according to diff. chosen (check line 218)
    rep_display.innerHTML = `Questão 1 de ${game_questions.length}`; //Resets the count display after a possible reset, otherwise it displays 15/15 after reset.

    function game_card(x,alt){ //Fuction that creates the display of a given question
        question_show.querySelector("p").innerHTML = game_questions[x][0]; //Shows the question's command in it's given place
        optA.innerHTML = alt[0]; //Displays them in the new order
        optB.innerHTML = alt[1];
        optC.innerHTML = alt[2];
        optD.innerHTML = alt[3];

        return alt.indexOf(game_questions[x][1]); //Returns the index of the correct answer for later comparison
    };

    function flash_card(x, user_got_it_right){ //Creates the flash card to be shown after an answer is given
        flash_quest.innerText = game_questions[x][0]; //Displays the question again
        correct_answer = game_questions[x][1]; //Picks the correct answer for said question
        explanation = game_questions[x][5]; //Picks the explanation
        if (user_got_it_right == 1){
            flash_correct.innerHTML = `<p id="answer">Alternativa correta: ${correct_answer}</p><p id="explanation">${explanation}</p>`; //Displays both previously mentioned in separate paragraphs, to later have their style set in the CSS file.
        }else{
            flash_correct.innerHTML = `<p id="answer">Alternativa correta: ${correct_answer}</p><p id="given-answer">Alternativa escolhida: ${alternatives[choice]}</p><p id="explanation">${explanation}</p>`;
        };
        card.classList.add("hide"); //Hides question-card
        flash.classList.remove("hide"); //Shows flashcard
    };

    let correct;
    for (let i in game_questions) { //The game loop itself
        rep_display.innerHTML = `Questão ${Number(i)+1} de ${game_questions.length}`; //Updates question counter
        alternatives = [1,2,3,4].map(j => game_questions[i][j]).sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5); //Associates each alternative to an index and randomizes them twice, since once still let too many A's as correct ones
        correct = game_card(i,alternatives); //Sets correct answer accordingly (check line 308)
        clear_alt_btn_selection(); //Clears alt. button selection before new question is shown (check line 244)

        function wait_opt_input() { //Waits for user input on the alternative, that's the reason why the main function HAS to be async
            return new Promise(resolve => {
                function handle_click(new_selected_alternative) { //Handles user input as follows:
                    if (selected_alternative === new_selected_alternative) { //If the new selection is the same as the previous one, confirming the input,...
                        resolve(new_selected_alternative); //...it resolves the index corresponding to said alternative
                    } else { //Otherwise...
                        select_alternative(this, new_selected_alternative); //...it sets a new value for the previous alternative and keeps trying (check line 258)
                    }
                }

                optA.onclick = function() {handle_click.call(this, 0); }; //Since we're manipulating a single element of the HTML file inside "handle_click", we need to point to what element that is, so that not all buttons inside the class get changed, that's the function of the "this" here (points to optA or B, etc). Moreover, after indicating what to change, we just tell it to run the fuction with the index corresponding to the clicked button as "new_selected_alternative"
                optB.onclick = function() {handle_click.call(this, 1); };
                optC.onclick = function() {handle_click.call(this, 2); };
                optD.onclick = function() {handle_click.call(this, 3); };
            });
        }

        choice = await wait_opt_input();
        if (correct == choice){ //If chosen alternative matches the correct one...
            score++; //Adds to score
            flash_card(i,1); //Calls the flashcard function just with explanation (check line 314)
        }else{
            flash_card(i,0); //Calls the flashcard fuction with correct answer AND explanation (same)
        };

        function wait_next_input(){
            return new Promise(resolve => {
                next_btn.addEventListener("click", () => {
                    flash.classList.add("hide"); //Hides flashcard
                    card.classList.remove("hide"); //Shows question-card again
                    resolve(); //This is here only to force the wait to happen, since it relies on the promise being resolved, therefore, on the button being clicked
                });
            });
        };

        await wait_next_input(); //Waits the "next" button to be clicked
    };

    end_screen(game_questions, score); //After every iteration, aka, after all the questions, calls the end screen (check line 270)
}

function initial(dif){ //Starts the game
    score = 0;
    game_loop(dif);
}

startButton.addEventListener("click", () => { //When the start button is clicked:
    startScreen.classList.add("hide"); //Hides start screen
    difficulty_select.classList.remove("hide"); //Shows diff. selection

    function wait_dif_input() { //Waits for user input on difficulty
    return new Promise((resolve) => {
        clear_dif_btn_selection(); //Check line 251
            
        function handle_difficulty_click(new_selected_difficulty) { //Same idea behind the alternative choice (check line 328)
            if (difficulty === new_selected_difficulty) {
                resolve(new_selected_difficulty); //Confirms selection
            } else {
                select_difficulty(this, new_selected_difficulty); //Selects difficulty
            }
        };

        easy_btn.onclick = function() {handle_difficulty_click.call(this, 1); }; //Sets difficulty value according to button pressed and only manipulates said button
        medium_btn.onclick = function() {handle_difficulty_click.call(this, 2); };
        hard_btn.onclick = function() {handle_difficulty_click.call(this, 3); };
    });
    };

    (async () => { //Actual function behind difficulty choice
        let difficulty = await wait_dif_input(); //Waits user input and sets value according to the above
        difficulty_select.classList.add("hide"); //Hides dif. choice screen
        display_container.classList.remove("hide"); //Shows questions
        initial(difficulty); //Starts the game itself
    })();
});

/*Sorry about the atrocities seen in this code, I am but a mere mortal (who didn't even know JavaScript at all) standing on the shoulders of giants,
lack of sleep and way too many exams. This is, right now, the best I can do. */
