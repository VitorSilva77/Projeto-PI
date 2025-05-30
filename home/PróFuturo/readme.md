## PróFuturo: Plataforma de Cursos Online

### Objetivo e Descrição da Solução

O projeto PróFuturo consiste em uma plataforma web desenvolvida para a oferta e gestão de cursos online. A solução visa proporcionar um ambiente onde usuários podem se cadastrar, explorar os cursos disponíveis, realizar matrículas e acessar o conteúdo educacional. A arquitetura do sistema é composta por uma interface de usuário web (frontend) interativa e uma API RESTful (backend) robusta responsável por toda a lógica de negócio e persistência de dados. O frontend oferece a experiência de navegação e interação para os alunos, enquanto o backend gerencia informações cruciais como dados de usuários, catálogo de cursos, registros de matrículas e processamento de pagamentos, garantindo a integridade e segurança das operações.

### Tecnologias Utilizadas

A construção da plataforma PróFuturo empregou um conjunto de tecnologias modernas e eficientes para garantir desempenho, escalabilidade e manutenibilidade. 

No **backend**, a base da API foi desenvolvida utilizando **Node.js**, um ambiente de execução JavaScript assíncrono e orientado a eventos, ideal para aplicações web de alta performance. Sobre o Node.js, foi utilizado o framework **Express.js**, que simplifica a criação de rotas, gerenciamento de requisições e respostas HTTP, e a estruturação geral da API RESTful. Para a interação com o banco de dados, optou-se pelo **MySQL**, um sistema de gerenciamento de banco de dados relacional amplamente utilizado e confiável. A comunicação entre a aplicação Node.js e o banco de dados MySQL é facilitada pelo **Knex.js**, um query builder SQL versátil que permite escrever consultas SQL de forma programática e segura, suportando diferentes bancos de dados relacionais. A segurança da autenticação de usuários é reforçada pelo uso de **JSON Web Tokens (JWT)**, um padrão aberto para criar tokens de acesso que permitem a transmissão segura de informações entre partes como um objeto JSON. A segurança das senhas dos usuários é garantida através da biblioteca **bcryptjs**, que implementa um algoritmo robusto para hashing de senhas. A gestão de permissões de acesso de diferentes origens (Cross-Origin Resource Sharing) é controlada pela middleware **CORS**. A configuração de variáveis de ambiente sensíveis, como credenciais de banco de dados e chaves secretas, é gerenciada de forma segura através da biblioteca **dotenv**, que carrega variáveis de ambiente a partir de um arquivo `.env`. Durante o desenvolvimento, a ferramenta **nodemon** foi utilizada para reiniciar automaticamente o servidor Node.js a cada alteração no código, agilizando o ciclo de desenvolvimento.

No **frontend**, a interface do usuário foi construída utilizando tecnologias web padrão: **HTML5** para a estruturação semântica do conteúdo, **CSS3** para a estilização e layout visual das páginas, e **JavaScript** para adicionar interatividade, manipular o DOM (Document Object Model) e realizar requisições assíncronas (AJAX/Fetch) para a API backend, proporcionando uma experiência dinâmica e responsiva aos usuários.

Adicionalmente, o projeto inclui **scripts SQL** localizados na pasta `scripts_banco`, que são essenciais para a configuração inicial do banco de dados, incluindo a criação de tabelas, definição de relacionamentos e, possivelmente, a inserção de dados iniciais necessários para o funcionamento da plataforma.

### Instalação do Projeto

Para configurar e instalar o ambiente de desenvolvimento da plataforma PróFuturo localmente, siga os passos detalhados abaixo. Primeiramente, é necessário obter o código-fonte do projeto. Caso ainda não o tenha, clone o repositório ou descompacte o arquivo ZIP fornecido em um diretório de sua preferência.

O próximo passo envolve a configuração do backend. Navegue através do terminal até o diretório específico da API, localizado em `Projeto-PI-main/home/PróFuturo/Api`. Dentro deste diretório, execute o comando `npm install`. Este comando irá ler o arquivo `package.json` e baixar todas as dependências do Node.js necessárias para o funcionamento da API, como Express, Knex, MySQL2, JWT, bcryptjs, entre outras.

Paralelamente, é preciso configurar o banco de dados MySQL. Certifique-se de ter um servidor MySQL instalado e em execução. Crie um banco de dados dedicado para a aplicação PróFuturo. Em seguida, localize a pasta `Projeto-PI-main/home/PróFuturo/scripts_banco`. Esta pasta contém diversos arquivos `.sql`. Execute esses scripts no seu servidor MySQL utilizando uma ferramenta de administração de banco de dados (como MySQL Workbench, DBeaver, ou a linha de comando `mysql`). É importante verificar a ordem correta de execução dos scripts, caso haja dependências entre eles (por exemplo, criação de tabelas antes da inserção de dados ou criação de procedures). Estes scripts são responsáveis por criar a estrutura de tabelas, relacionamentos e, potencialmente, inserir dados iniciais essenciais.

Após configurar o banco de dados e instalar as dependências da API, é necessário configurar as variáveis de ambiente. Na raiz do diretório da API (`Projeto-PI-main/home/PróFuturo/Api`), crie um arquivo chamado `.env`. Dentro deste arquivo, adicione as variáveis de ambiente requeridas pela aplicação, conforme especificado no arquivo de configuração do banco de dados (`src/config/database.js`). As variáveis mínimas necessárias são:

`DB_HOST=seu_host_mysql`
`DB_USER=seu_usuario_mysql`
`DB_PASSWORD=sua_senha_mysql`
`DB_DATABASE=nome_do_banco_criado`

É possível que outras variáveis, como uma `JWT_SECRET` para a assinatura dos tokens JWT, também sejam necessárias. Verifique o código-fonte, especialmente os arquivos de configuração e autenticação, para confirmar todas as variáveis requeridas.

### Execução do Projeto

Com o ambiente devidamente configurado e as dependências instaladas, a execução do projeto envolve iniciar o servidor backend e acessar a interface frontend.

Para iniciar o servidor backend, navegue novamente pelo terminal até o diretório da API: `Projeto-PI-main/home/PróFuturo/Api`. Execute o comando `npm start`. Este comando, definido no `package.json`, geralmente executa `node server.js` (ou o arquivo principal da sua API). Se o `nodemon` estiver configurado como script de desenvolvimento (por exemplo, `npm run dev`), você pode usá-lo para que o servidor reinicie automaticamente ao detectar alterações no código. Após a execução do comando, o terminal deverá indicar que o servidor está ativo e escutando em uma porta específica (geralmente definida no código ou via variável de ambiente).

Para acessar a interface do usuário (frontend), abra um navegador web de sua preferência. Navegue até o diretório `Projeto-PI-main/home/PróFuturo/area_desenvolvimento/` e abra o arquivo `index.html`. Este arquivo é o ponto de entrada principal da aplicação web. A partir dele, você poderá interagir com a plataforma, navegar pelas páginas, visualizar cursos e utilizar as funcionalidades implementadas que se comunicam com a API backend iniciada no passo anterior. Certifique-se de que o servidor backend esteja em execução para que as funcionalidades que dependem de dados (como login, listagem de cursos, etc.) operem corretamente.
