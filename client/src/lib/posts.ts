/**
 * Sistema de gerenciamento de posts em Markdown
 * Compatível com exportação do Obsidian
 */

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  author: string;
  location: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// Posts de exemplo - podem ser substituídos por importação do Obsidian
export const POSTS: Post[] = [
  {
    title: "Passei Uma Sessão Inteira Trabalhando no Repositório Errado. E o Claude Não Teve Culpa Nenhuma.",
    date: "21 de agosto de 2026",
    excerpt: "Uma sessão inteira no repo errado. Um grep que não achou o que estava lá. 137 testes verdes cobrindo um commit que mentia. Três dores, duas skills.",
    slug: "duas-skills-que-nasceram-de-tres-erros",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `*De: Minas Gerais, sexta-feira*

Caro amigo,

Vou começar contando três besteiras que eu fiz.

Não são besteiras de iniciante. São besteiras de quem já sabe programar, já usa IA todo dia, e mesmo assim tomou na cara.

Se você usa Claude Code em projeto de verdade, aposto que pelo menos uma delas já aconteceu com você. Talvez ainda esteja acontecendo e você não sabe.

Escuta só.

---

## Besteira nº 1: uma sessão inteira no repositório errado

Sessão inteira. Do começo ao fim.

Eu pedindo, a IA lendo arquivo, propondo, editando. Tudo funcionando lindo.

Só que na minha máquina existia mais de uma cópia daquele projeto. E eu estava mexendo na cópia morta.

Sabe o que é pior? A IA não tinha como saber. Ela abriu o caminho que eu dei. Fez exatamente o que eu pedi.

O trabalho estava certo. O alvo é que estava errado.

---

## Besteira nº 2: o grep me disse que não existia

Eu procurei por uma regra no código. Grep por um nome de método.

Não achou nada no lugar que eu esperava. Conclusão óbvia: a regra não é aplicada ali.

Errado.

O método estava lá. Só que escrito de outro jeito — passado como referência, não como chamada. Meu grep procurava uma forma sintática. O código usava a outra.

Aquele "não achou" virou três conclusões erradas, uma empilhada na outra. E as três estavam escritas com uma segurança linda.

---

## Besteira nº 3: 137 testes verdes cobrindo um commit que mentia

Esse é o meu favorito, porque é o mais assustador.

A suíte inteira verde. Cento e trinta e sete testes passando.

E o commit afirmava uma coisa que não era verdade.

Como? Porque os testes cobriam o pedaço que tinha sido alterado. O caminho real — o caso de uso completo, entrando pela porta da frente — ninguém exercitou.

Verde no pedaço não é verde no sistema. Verdade.

---

## O que essas três têm em comum

Demorei pra enxergar. Mas quando enxerguei, não teve como desver.

Em nenhuma das três a IA errou.

Ela leu o arquivo que existia. Ela rodou o grep que eu mandei. Ela rodou os testes que estavam lá. Executou tudo direitinho.

> O ERRO NÃO ESTAVA NA EXECUÇÃO. ESTAVA NO PEDIDO — QUE JÁ NASCEU TORTO, E NINGUÉM CONFERIU ANTES DE SAIR CODANDO.

Tá comigo? Porque aqui mora o pulo do gato.

A gente melhorou muito o "como pedir pra IA escrever código". Prompt melhor, contexto melhor, modelo melhor.

E quase ninguém trabalhou no que vem **antes** disso: confirmar o alvo, provar o terreno, achar o que você nem sabe que não sabe.

Aí a IA fica excelente em construir a coisa errada, muito rápido, com uma confiança enorme.

---

## Existem três jeitos padronizados de isso dar errado

Isso não é achismo meu. São falhas que já têm nome, e nomear ajuda a enxergar:

- **goal drift** — o objetivo vai perdendo fidelidade turno após turno. Piora depois que a conversa é compactada, porque o que você combinou lá atrás simplesmente sumiu do contexto.
- **self-preferential bias** — quem escreveu o código é quem julga o código. E aprova. Toda vez.
- **agentic laziness** — para no item 20 de 50 e declara "pronto".

Olha as minhas três besteiras de novo e você vai ver as três falhas ali dentro, inteirinhas.

---

## Então eu parei e escrevi duas skills

Não pra deixar a IA mais esperta. Ela já é.

Pra deixar o **pedido** menos torto antes de virar código.

São duas, e elas se encaixam numa ordem: **/lapidar-zero** roda antes de tudo. **/lapidar** é a esteira de desenho. Depois delas vem o TDD.

Vou te mostrar o que cada uma faz de concreto.

---

## A primeira: /lapidar-zero

Ela roda **antes de qualquer código ou plano**. A primeira frase que ela diz é: *"não escrevo código até você liberar."*

E aí ela passa por seis fases. Sem pular.

**Fase 0 — o alvo.** Antes de ler uma linha de código, responde: qual repositório (caminho absoluto), qual branch, tem mais de uma cópia do projeto na máquina, tem produção rodando, tem trabalho não commitado que pode ser destruído.

Essa fase existe por causa da minha besteira nº 1. Custa trinta segundos e teria salvado um dia inteiro.

**Fase 1 — recon.** Vários subagentes disparados na mesma resposta, cada um num domínio, todos **somente leitura**. Nenhum deles tem ferramenta de escrita antes do gate. A promessa de "não escrevo nada ainda" vira restrição de verdade, não boa intenção.

E tem uma regra de busca que nasceu direto da besteira nº 2:

\`\`\`
Procure pelo CAMINHO DE CHAMADA,
não pelo que a função checa.

E busque em pelo menos DUAS
formas sintáticas:

   metodo(     e     ::metodo
\`\`\`

Tem outra regra dessa fase que eu aprendi apanhando: quando um agente não acha algo no repositório, ele precisa perguntar antes de concluir — *isso viveria no git?* Container Docker, variável de ambiente, serviço do sistema, credencial: nada disso mora no repositório. Já declarei que um harness de teste "não existia" quando ele era um container parado na minha própria máquina.

**Fase 2 — extração socrática.** Uma pergunta por mensagem. Sempre com recomendação e trade-off, nunca um menu neutro.

E tem um detalhe que mudou meu jogo. Existe um tipo de dúvida que **não** se resolve perguntando: é aquela do "eu sei quando eu vejo". Design, formato, layout.

Pra essa, a regra é parar de perguntar e mostrar. Gera quatro direções radicalmente diferentes e deixa a pessoa reagir.

**Fase 3 — o adversário.** Um subagente cuja missão não é revisar. É **refutar**. Default dele: "isso está errado, prove o contrário."

A regra que faz isso funcionar cabe numa linha:

> O VERIFICADOR NUNCA É O AUTOR.

Junto vem o blindspot pass, que é a pergunta que ninguém faz sozinho: *o que essa decisão causa que eu não olhei?*

Porque decisão certa também gera estrago. Eu religuei uma suíte de testes que estava desligada — decisão certa — e inflei conta de nuvem sem perceber. Efeito de segunda ordem não aparece se você não for atrás dele.

**Fase 4 — os treze níveis, especificados antes do código.** Caminho feliz, beiradas, lixo na entrada, lista vazia, concorrência, efeito real no banco, asserção negativa, caminho infeliz que parece feliz, mutation testing, e mais quatro pra sistema probabilístico.

Mas o que faz diferença não é a lista. É a regra que vem junto:

> NÍVEL SEM ORÁCULO EXECUTÁVEL NÃO CONTA COMO ESPECIFICADO.

Oráculo é o comando que prova. A suíte, a query no banco, a chamada direta na API, o browser. Se você não sabe qual comando fecha o loop daquele nível, você não especificou nada — escreveu um desejo.

**Fase 5 — o gate.** Aqui a skill **pede** liberação. Quem libera é você.

E tem uma invenção nossa que eu recomendo com força: um quiz. Três a cinco perguntas sobre o que muda de comportamento — e **você** precisa acertar antes de liberar.

Parece besteira. Não é. Checklist que o autor preenche é fácil demais de aprovar sem ler. O quiz inverte: se você não sabe responder o que o próprio sistema vai fazer, ninguém está pronto pra codar.

Na primeira vez que rodei, o quiz pegou um erro de negócio meu que nenhum adversário técnico teria visto.

E se você erra uma pergunta, o problema não é seu. Ou eu não expliquei, ou eu não entendi. Volta a fase.

**Fase 6 — TDD, e só depois do gate.**

> NENHUM CÓDIGO DE PRODUÇÃO SEM UM TESTE FALHANDO ANTES.

Com uma exigência que veio da besteira nº 3: o teste vive no **caminho real**, o caso de uso completo pelo ponto de entrada. Não no pedacinho que você acabou de mexer.

---

## A segunda: /lapidar

Essa é a esteira de desenho. Ela conserta dois vícios.

**Vício 1: perguntar ao humano o que o repositório responde.**

A lei dela é dura, e eu gosto:

> Se a resposta está no repo, no banco, no log ou no Docker, perguntar é PROIBIDO. Vá buscar.

"Onde fica o gate de pagamento?" é obrigação da máquina descobrir. "O usuário pode esperar dois segundos a mais?" é pergunta legítima pra você — porque depende do que você quer, não do que existe.

**Vício 2: gastar esteira pesada num CRUD de vinte linhas.**

Por isso ela tem marchas, e classifica pelo **raio de dano do diff** — não pelo módulo que você tocou:

\`\`\`
ESBOÇO
 reversível por deploy, não mexe
 em estado salvo nem em contrato
 → recomendação na conversa.
   Zero arquivo, zero esteira.

PADRÃO  (o default)
 muda contrato, schema ou enum
 → terreno + até 3 perguntas
   + spec curta + matriz

BLINDAGEM
 irreversível sem intervenção
 manual: move dinheiro, altera
 sessão/auth, backfill em produção
 → PADRÃO + blindspot + adversário
   em processo separado + matriz
   com execução PROVADA
\`\`\`

Ela declara a marcha em quatro linhas e espera um OK de uma palavra. Você digita "esboço" e a esteira inteira cai na hora, sem discussão.

---

## "Isso não é cerimônia demais?"

Foi a primeira coisa que eu pensei também. E é uma objeção justa.

Duas respostas.

A primeira: a própria **/lapidar-zero** tem uma saída. Se as primeiras fases mostrarem que não existe nada de desconhecido e o risco é baixo, ela declara isso e propõe o **gate curto** — alvo confirmado, oráculos nomeados, liberação, tudo numa mensagem só. Cerimônia é meio, não fim.

A segunda é a conta. Trinta segundos confirmando o repositório contra um dia inteiro no repositório errado.

Não é lentidão. É a coisa mais rápida que eu faço no dia.

---

## E quando um erro escapar mesmo assim

Vai escapar. Vaza sempre um.

Aí vale o hábito que eu considero o mais importante de todos:

> QUANDO A IA ERRA, NÃO PEÇA PRA ELA FAZER DIFERENTE. MANDE ESCREVER A REGRA NUM ARQUIVO.

Correção no chat conserta um turno. Regra escrita conserta todos os próximos.

E antes de escrever prosa, pergunta se o erro cabe numa regra **executável** — um lint, um passo de CI, um teste. Porque aí a classe inteira do erro morre sozinha, pra sempre, sem depender de alguém lembrar de ler.

---

## Como começar sem se comprometer com nada

Não instala as duas de uma vez. Não muda seu jeito de trabalhar hoje.

Faz só isto, na próxima feature que você for pedir pra IA:

Antes de qualquer outra coisa, mande ela responder quatro perguntas: qual é o caminho absoluto do repositório, qual é a branch, existe outra cópia desse projeto na máquina, e tem alguma coisa não commitada aí.

Trinta segundos. É a Fase 0 inteira, de graça, sem instalar nada.

Se isso te salvar uma vez — e vai salvar — aí você pega o resto.

As duas skills estão aqui:

\`\`\`
github.com/LuizC-ai/lapidar
\`\`\`

São arquivos de texto. Você lê, discorda, corta o que não serve, adapta pro seu projeto. É pra isso que estão lá.

Fim de papo.

P.S. Se você só for levar uma frase daqui, leva esta: **o verificador nunca é o autor**. Vale pra IA revisando o próprio código, e vale pra você revisando o seu. É a coisa mais barata de implementar e a que mais pega defeito.

P.S. 2 — Repara que nenhuma das minhas três besteiras foi culpa de modelo ruim. Nenhuma se resolveria trocando de IA, nem esperando a próxima versão. Todas se resolviam com trinta segundos de conferência antes de começar. É por isso que essas skills existem, e é por isso que elas rodam ANTES, e não depois.

Atenciosamente,
Luiz — que já perdeu um dia inteiro no repositório errado pra você não precisar`,
  },
  {
    title: "Eu Achava Que Entendia Como uma IA Funciona — Até Perguntar o Que Acontece Depois do Enter",
    date: "21 de agosto de 2026",
    excerpt: "Token, probabilidade, função, self. Eu travava em cada uma dessas palavras — então fui desmontando uma por uma até virarem peças que dá pra enxergar.",
    slug: "como-uma-ia-funciona-por-tras-da-resposta",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `*De: Minas Gerais, sexta-feira*

Caro amigo,

Eu achava que sabia o que uma IA fazia.

Você digita, ela responde. Fim.

Aí, numa dessas noites em que a curiosidade fala mais alto, eu parei pra perguntar o que acontece entre o meu Enter e a resposta aparecendo na tela.

E percebi que não entendia nem metade.

As perguntas foram vindo uma atrás da outra:

- O que é um token, afinal?
- Por que todo mundo diz que a IA "trabalha com probabilidade"?
- Como ela decide o que vem depois?
- O que é uma função?
- O que são objetos e métodos?
- E quando uma IA usa uma ferramenta, quem executa essa ferramenta de verdade?

Não vou responder tudo isso de uma vez. Eu também não entendi de uma vez.

A gente vai desmontando devagar. Uma peça por vez.

---

## Primeiro: ela não pensa como a gente pensa

Essa parte demorou um pouco pra fazer sentido pra mim.

Quando você conversa com uma pessoa, ela entende a sua pergunta, procura a resposta na cabeça e te conta.

Com uma IA dessas de conversar, o caminho é outro.

Ela recebe um texto. Um texto grande: a sua pergunta, tudo que já foi dito na conversa, as instruções que ela recebeu antes.

E o trabalho dela é sempre o mesmo: **continuar esse texto**.

Um pedacinho de cada vez.

> Não é que ela "sabe a resposta e escreve". É que ela vai escolhendo o próximo pedaço, e mais o próximo, e mais o próximo — até formar uma resposta inteira.

Sabe o que é mais doido nisso? Esse mecanismo simples, repetido milhares de vezes, é o que faz parecer que tem alguém pensando do outro lado.

O nome desse tipo de programa é **LLM** — sigla de Large Language Model, ou modelo de linguagem grande.

Grande porque foi treinado com uma quantidade absurda de texto. Modelo de linguagem porque a única coisa que ele aprendeu a fazer foi essa: prever a continuação.

---

## Antes de tudo, o texto vira pedacinhos

Aqui tem um detalhe que eu não fazia ideia.

A IA não enxerga a sua frase do jeito que você enxerga.

Ela não vê palavras separadas por espaço. Ela vê uma sequência de pedaços de texto, e cada pedaço tem um número associado.

Esses pedaços são os **tokens**.

Uma frase como "Me explica IA" vira algo mais ou menos assim:

\`\`\`
  texto:    Me explica IA
              ↓
  pedaços:  [Me][ ex][plica][ IA]
              ↓
  números:  3092 1148 9573 1502
\`\`\`

Repara em duas coisas.

Primeiro: o pedaço nem sempre é uma palavra inteira. "explica" foi partido no meio.

Um token pode ser uma palavra inteira, um pedaço de palavra, um sinal de pontuação, um espaço em branco, uma quebra de linha.

Palavra comum costuma virar um token só. Palavra comprida ou rara vira vários.

Segundo: os números do meu exemplo são ilustrativos. Cada modelo tem a sua própria tabela de pedaços, montada durante o treino. O mesmo texto pode ser cortado de um jeito no ChatGPT e de outro jeito no Claude.

O que importa é a ideia: **antes de qualquer coisa acontecer, o seu texto é cortado em pedaços e cada pedaço vira um número.**

E é com esses números que a máquina trabalha. Não com letras.

---

## Por que todo mundo fala em "probabilidade"

Essa foi a parte que mais me confundiu no começo.

Pensa em duas perguntas bem diferentes.

A primeira: "Qual é a capital do Brasil?"

Só tem um jeito bom de continuar esse texto. É Brasília. A resposta é factual e o mundo inteiro escreveu isso um milhão de vezes.

A segunda: "Escreve uma história sobre um cachorro."

Agora não existe uma resposta certa. Existem milhões de continuações razoáveis. Pode começar com o cachorro dormindo. Pode começar com ele fugindo. Pode começar com a dona chegando em casa.

A LLM trata as duas do mesmo jeito.

Ela olha todo o texto que recebeu e monta uma espécie de lista de candidatos para o próximo token, cada um com um peso — o quanto aquele pedaço combina com o que veio antes.

Na primeira pergunta, um candidato tem peso altíssimo e o resto quase zero.

Na segunda, dezenas de candidatos têm peso parecido.

Agora vem o detalhe que quase todo texto por aí simplifica errado — e eu simplifiquei errado na minha cabeça também por um tempo:

> A IA **não** pega sempre o candidato mais provável. Existe uma etapa de escolha depois da lista de pesos, e essa etapa tem regulagem.

Se ela sempre pegasse o topo da lista, o texto sairia engessado e repetitivo. Toda história de cachorro começaria igual.

Então quem construiu o sistema tem botões pra ajustar o quanto ela pode arriscar na escolha: às vezes ela pega o favorito, às vezes ela pega um candidato bom que estava logo abaixo.

Por isso você faz a mesma pergunta duas vezes e recebe respostas diferentes.

E por isso "a IA é probabilística" não quer dizer que ela chuta. Quer dizer que a escolha do próximo pedaço passa por peso e sorteio, não por uma tabela fixa de respostas.

---

## O caminho inteiro, num desenho

Junta tudo que a gente viu e o percurso fica assim:

\`\`\`
      VOCÊ ESCREVE
           ↓
    "Me explica IA"
           ↓
       vira TOKENS
  [Me][ ex][plica][ IA]
           ↓
        A LLM LÊ
    tudo de uma vez
           ↓
   PROBABILIDADES do
     próximo pedaço
           ↓
    escolhe 1 token
           ↓
   junta no texto e
   volta pro começo ↺
           ↓
       RESPOSTA
\`\`\`

Vamos desmontar etapa por etapa.

**Você escreve.** Sua frase entra junto com o resto: o histórico da conversa e as instruções que o sistema deu pro modelo antes de você chegar.

**Vira tokens.** Esse texto todo é cortado em pedaços e cada pedaço vira número.

**A LLM lê tudo de uma vez.** Ela não lê da esquerda pra direita como a gente. O texto inteiro entra junto, e cada pedaço é analisado levando em conta os outros.

**Probabilidades.** Sai uma lista de candidatos a próximo token, cada um com o seu peso.

**Escolhe 1 token.** Um único pedaço. Não a frase toda. Um pedaço.

**Volta pro começo.** E aqui está o pulo do gato: o token escolhido é grudado no fim do texto, e a máquina roda tudo de novo — agora com esse pedaço a mais.

De novo. E de novo. E de novo.

Quando você vê a resposta aparecendo aos pouquinhos na tela, não é animação bonitinha de interface. É literalmente isso acontecendo, pedaço por pedaço.

**Resposta.** Em algum momento o modelo escolhe um token que significa "acabou", e o ciclo para.

---

## Tá. E como uma IA faz alguma coisa no mundo real?

Foi aqui que apareceu outra dúvida pra mim.

Se a única coisa que ela faz é continuar texto, como é que existe IA que consulta o seu saldo, marca uma consulta, busca um pedido, manda um e-mail?

Escrever "seu saldo é 850" é fácil. Qualquer um escreve. Inclusive errado.

Saber que o saldo é 850 é outra história. Esse número mora num banco de dados, dentro de um sistema, atrás de um código que alguém escreveu.

E aí a pergunta que abriu tudo pra mim foi:

> Tá, mas quem escreveu esse código? E quem roda ele na hora H?

Pra chegar nessa resposta eu precisei voltar bem atrás. Precisei entender o que é uma função.

Se você nunca programou, respira. É mais simples do que o nome sugere.

---

## O que é uma função

Uma função é um pedaço de código com nome, que recebe alguma informação e devolve um resultado.

Só isso.

Olha essa aqui, escrita em Python:

\`\`\`python
def consultar_saldo(conta_id):
    return 850
\`\`\`

Duas linhas. Vamos ler cada pedaço.

**def** é a palavra que avisa: estou criando uma função. Vem de "define", definir.

**consultar_saldo** é o nome que eu dei. Podia ser qualquer um. Nome bom é o que explica o que a coisa faz.

**(conta_id)** é a informação que a função recebe pra trabalhar. Nesse caso, qual conta a gente quer consultar. Isso aqui tem nome: **parâmetro**.

**return 850** é o que ela devolve pra quem pediu. Devolver é diferente de mostrar na tela — ela entrega o valor de volta.

Ah, e aquele espaço no começo da segunda linha não é decoração. Em Python, o recuo é o que diz "esta linha está dentro da função". Perder o recuo é perder o sentido.

Criar a função não faz nada acontecer. É só uma receita guardada.

Pra ela rodar, alguém precisa chamar:

\`\`\`python
resultado = consultar_saldo(123)
\`\`\`

E aí acontece isso:

\`\`\`
   consultar_saldo(123)
           ↓
     conta_id = 123
           ↓
       return 850
           ↓
     resultado = 850
\`\`\`

O 123 entra pela porta e vira o valor de conta_id lá dentro. A função faz o trabalho dela. O 850 volta pela porta e fica guardado em resultado.

Uma função de verdade não devolveria sempre 850, claro. Ela iria consultar o banco. Mas o formato é exatamente esse: **entra informação, sai resultado.**

---

## Quando a função mora dentro de um objeto

Um sistema real tem centenas de funções. Se todas ficarem soltas no mesmo lugar, vira gaveta de bagunça.

Então a gente agrupa o que é parecido. E aí aparecem três palavras que assustam mais do que deveriam.

- **Classe** é o molde. A planta da casa.
- **Objeto** é a casa construída a partir daquela planta.
- **Método** é uma ação que o objeto sabe fazer.

Método é só o nome que a gente dá pra uma função quando ela mora dentro de uma classe. Mesma coisa, endereço diferente.

Na prática:

\`\`\`python
class Banco:

    def buscar_saldo(self, conta_id):
        return 850
\`\`\`

Isso é o molde. Ainda não existe banco nenhum. Existe a planta de como um banco funciona.

Pra ter um banco de verdade, você constrói um:

\`\`\`python
banco = Banco()
\`\`\`

Repara nos parênteses. Eles são o "constrói agora". A variável banco agora guarda um objeto — um Banco pronto pra usar.

E aí você pede pra ele trabalhar:

\`\`\`python
banco.buscar_saldo(123)
\`\`\`

Lê da esquerda pra direita: pega o banco, chama o método buscar_saldo dele, passando 123.

O ponto ali no meio é a coisa mais literal do mundo. É o "de". O buscar_saldo **de** banco.

---

## O tal do self

Essa palavra me travou por um tempo, e o problema era que eu procurava mágica onde não tinha.

Olha de novo:

\`\`\`
banco.buscar_saldo(123)
\`\`\`

Você passou um valor só: o 123. Mas lá na definição do método tem dois nomes entre parênteses: self e conta_id.

Sobrou um. Por quê?

Porque o Python precisa saber **qual objeto** está executando aquele método.

Você pode ter três bancos criados a partir do mesmo molde. Quando você chama o método, ele precisa saber em qual dos três está mexendo.

Então o Python passa o objeto sozinho, na primeira posição:

\`\`\`
   banco.buscar_saldo(123)

   self      →  banco
   conta_id  →  123
\`\`\`

É isso. Não tem truque.

E quando você vê uma linha assim dentro de um método:

\`\`\`python
self.nome
\`\`\`

leia como **"o nome deste objeto aqui"**.

Não o nome de qualquer banco. O nome deste, o que está rodando agora.

---

## E aquele __init__ estranho?

Se você já abriu um código Python, já viu essa palavra com dois underlines de cada lado. Parece código de robô. Não é.

Ela é a função que roda automaticamente na hora em que o objeto nasce. Serve pra deixar ele pronto pra uso.

\`\`\`
class Banco:

    def __init__(self, nome):
        self.nome = nome
\`\`\`

Agora, quando você constrói um banco, dá pra dizer qual é:

\`\`\`python
banco1 = Banco("Banco A")
\`\`\`

O que acontece nessa linha, em câmera lenta:

\`\`\`
   Banco("Banco A")
          ↓
     cria um objeto
          ↓
     roda o __init__
          ↓
   self = banco1
   nome = "Banco A"
          ↓
   self.nome = nome
          ↓
   banco1.nome = "Banco A"
\`\`\`

Traduzindo a última parte: a informação que chegou de fora foi guardada dentro do objeto.

A partir daí, esse banco sabe o próprio nome. Ele carrega isso com ele.

Se você criar um segundo — Banco("Banco B") — vai ser outro objeto, com outro nome guardado, saído do mesmo molde.

Molde igual. Objetos diferentes.

---

## Tá, mas o que tudo isso tem a ver com o ChatGPT?

Agora as duas pontas se encontram.

Quando você usa uma IA que consulta o seu saldo, existe uma função de verdade em algum lugar. Escrita por uma pessoa. Rodando num servidor.

Mais ou menos assim:

\`\`\`
def consultar_saldo(conta_id):
    saldo = banco.buscar_saldo(conta_id)
    return saldo
\`\`\`

Olha só como tudo que a gente viu aparece nessas três linhas.

Tem uma função com nome e parâmetro. Tem um objeto chamado banco. Tem um método sendo chamado nele. Tem um valor sendo devolvido.

Isso é o que o pessoal chama de **ferramenta**: uma função comum, do sistema, que a IA pode pedir pra usar.

E eu escrevi **pedir** de propósito.

> A LLM não roda código. Ela não abre o banco de dados, não executa a função, não toca em nada. Ela só produz texto — e esse texto pode ser um pedido, escrito num formato que o sistema entende.

Quem executa é o programa que está em volta dela. O backend. O código que alguém escreveu.

Isso muda completamente a imagem que eu tinha na cabeça. Eu imaginava a IA como uma coisa só, poderosa, mexendo no mundo. É mais parecido com uma dupla: um lado fala, o outro lado faz.

---

## O segundo desenho: quando a IA pede ajuda

O caminho completo, do seu "oi" até o número aparecer na tela:

\`\`\`
   VOCÊ
   "qual é o meu saldo?"
        ↓
      A LLM
        ↓
  precisa de ferramenta?
        ↓
       SIM
        ↓
   PEDIDO ESTRUTURADO
   consultar_saldo(123)
        ↓
   O SEU BACKEND
   (quem executa)
        ↓
   a função Python roda
        ↓
      O BANCO
        ↓
    resultado: 850
        ↓
   backend devolve
   o número pra LLM
        ↓
   a LLM escreve a frase
        ↓
   VOCÊ
   "Seu saldo é R$ 850,00"
\`\`\`

Presta atenção em dois pontos desse desenho.

O primeiro: entre a LLM e o banco de dados sempre tem o backend no meio. Sempre. A IA não fala direto com o banco.

O segundo: a LLM entra duas vezes. Uma pra pedir a ferramenta, outra pra transformar o resultado cru em frase de gente. O 850 vira "seu saldo é R$ 850,00" na segunda passada.

Esse mecanismo tem nome: **Tool Calling**, ou chamada de ferramenta.

E é exatamente aqui que eu vou parar hoje. Porque a pergunta que sobra é grande demais pra caber no fim de uma carta.

---

## O que eu tirei disso

Eu comecei esse estudo achando que precisava entender tudo de uma vez.

Não precisava.

Primeiro eu precisei entender o que era uma função.

Depois descobri que uma função podia morar dentro de um objeto, e aí ela ganhava outro nome.

Depois apareceu o self, que era só o objeto se apresentando.

E aos poucos aquelas palavras que pareciam complicadas começaram a virar peças que eu consigo enxergar.

Ainda tem muita coisa pela frente. Um monte.

Mas agora eu consigo olhar pra um código e fazer a pergunta certa:

"Tá. O que está acontecendo aqui?"

E eu acho que é assim que a gente começa.

P.S. Na próxima carta eu vou abrir a caixa que mais me deixou curioso: como é que uma LLM sabe que aquela função existe? Ninguém sussurra no ouvido dela. Alguém precisa contar — e o jeito como isso é contado é a parte mais engenhosa da história toda.

Atenciosamente,
Luiz`,
  },
  {
    title: "Como Treinar uma IA para Vender Mais (Sem Parecer um Robô)",
    date: "15 de abril de 2026",
    excerpt: "Descobri que a maioria dos prompts falha porque as pessoas tentam ser muito técnicas. A IA quer histórias. Quer emoção. Quer saber por que você está fazendo aquilo.",
    slug: "treinar-ia-vender-mais",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 15 de abril de 2026

Querido Amigo,

Você já parou para pensar no que realmente faz uma IA funcionar bem? Não é a quantidade de dados. Não é o modelo mais avançado. É a **intenção clara**.

Passei os últimos 3 meses testando diferentes abordagens com Claude, GPT-4 e Gemini. E descobri algo que ninguém fala: a maioria dos prompts falha porque as pessoas tentam ser muito técnicas. A IA quer histórias. Quer emoção. Quer saber por que você está fazendo aquilo.

Quando comecei a treinar minha IA pessoal com histórias de vendas reais (casos que funcionaram, casos que falharam), os resultados melhoraram em 340%. Não estou exagerando. Os textos começaram a converter melhor. Os emails começaram a ter mais resposta.

A métrica que importa: **taxa de cliques + taxa de resposta**. Não é o tamanho do texto. Não é se parece "natural". É se a pessoa do outro lado quer responder.

Aqui está o sistema que usei:

1. Coleta de histórias reais (seus melhores casos de vendas)
2. Análise do padrão emocional (por que funcionou?)
3. Treinamento da IA com esses padrões
4. Teste A/B com a audiência real
5. Refinamento contínuo

O resultado? Meus emails de vendas agora têm 47% de taxa de abertura. Antes eram 12%.

P.S. A coisa mais importante que aprendi: a IA é um amplificador. Se você coloca lixo, ela amplifica lixo. Se você coloca ouro, ela amplifica ouro. Invista tempo em coletar suas melhores histórias.

Atenciosamente,
Luiz`
  },
  {
    title: "O Código que Salvou Meu Negócio (E Pode Salvar o Seu)",
    date: "8 de abril de 2026",
    excerpt: "Tinha um problema: meu sistema de automação estava caindo 3 vezes por semana. Perdia vendas. Perdia confiança do cliente. Até que descobri o padrão.",
    slug: "codigo-salvou-negocio",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 8 de abril de 2026

Querido Amigo,

Tinha um problema que tirava meu sono: meu sistema de automação estava caindo 3 vezes por semana.

Perdia vendas. Perdia confiança do cliente. Até que descobri o padrão.

Não era a infraestrutura. Era o código. Especificamente, era a forma como eu estava lidando com erros de conexão.

Implementei um sistema de retry com backoff exponencial + circuit breaker. Simples. Elegante. Funcionou.

Desde então, meu sistema tem 99.8% de uptime. Não é perfeito, mas é suficiente para não perder vendas.

A lição: **confiabilidade não é um luxo, é um investimento**. Cada minuto de downtime custa dinheiro.

P.S. Se você está construindo algo que gera receita, invista em observabilidade. Saiba quando as coisas quebram ANTES de seus clientes descobrirem.

Atenciosamente,
Luiz`
  },
  {
    title: "Por Que Meu Primeiro Produto Fracassou (E Como o Segundo Virou Receita)",
    date: "1º de abril de 2026",
    excerpt: "O primeiro produto que lancei foi um fracasso total. Ninguém comprou. Ninguém nem olhou. Mas aprendi mais com esse fracasso do que com qualquer sucesso.",
    slug: "primeiro-produto-fracassou",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 1º de abril de 2026

Querido Amigo,

O primeiro produto que lancei foi um fracasso total.

Ninguém comprou. Ninguém nem olhou. Passei 2 meses construindo. Lancei. Silêncio.

Mas aprendi mais com esse fracasso do que com qualquer sucesso.

Descobri que eu tinha construído a solução para um problema que ninguém tinha. Eu estava tão apaixonado pela tecnologia que esqueci de perguntar: **alguém realmente quer isso?**

Com o segundo produto, fiz diferente. Antes de escrever uma linha de código, conversei com 50 pessoas. Perguntei sobre seus problemas. Escutei.

Construí exatamente o que eles pediram. Nada mais. Nada menos.

Resultado: 200 vendas no primeiro mês.

A diferença entre fracasso e sucesso não foi a qualidade do código. Foi a qualidade da pesquisa.

P.S. Seu próximo produto já está sendo rejeitado. A questão é: você vai descobrir antes ou depois de gastar 2 meses construindo?

Atenciosamente,
Luiz`
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(post => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS.sort((a, b) => {
    // Ordena por data decrescente (mais recente primeiro)
    const dateA = new Date(a.date.split(' de ').reverse().join('-')).getTime();
    const dateB = new Date(b.date.split(' de ').reverse().join('-')).getTime();
    return dateB - dateA;
  });
}

export function getPostExcerpt(content: string, maxLength: number = 150): string {
  // Remove quebras de linha e espaços extras
  const text = content.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  // Encontra o primeiro parágrafo
  const paragraphs = text.split('.');
  let excerpt = '';
  
  for (const para of paragraphs) {
    if (excerpt.length < maxLength) {
      excerpt += para + '.';
    } else {
      break;
    }
  }
  
  return excerpt.trim();
}
