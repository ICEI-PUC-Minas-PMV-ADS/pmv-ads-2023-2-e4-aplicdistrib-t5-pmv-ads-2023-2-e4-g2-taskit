# Instruções de utilização

## Instalação do Site

0. Ter instalados **node.js** (obrigatório) e **yarn** (opcional, mas basta executar **`npm install -g yarn`** para instalar depois de instalar o node)
1. Executar **`yarn`** ou **`npm install`** para instalar as dependências
2. Adicione um arquivo **`.env`** na raiz do projeto com a seguinte variável de ambiente:
   - **`POSTGRES_PRISMA_URL`**: URL do banco de dados Postgres no formato `"postgres://usuario:senha@endereco:porta/nome_do_banco"`
3. Execução
   1. Ambiente Dev: execute **`yarn dev`** ou **`npm run dev`**
   2. Ambiente Prod: execute **`yarn build`** e **`yarn start`** (ou `npm run build`  ou **`npm run start`**)
4. Acesse `http://localhost:3000`.
5. Caso esteja desenvolvendo, edite algum arquivo e veja as alterações em tempo real.

> Se quiser ter um banco local para desenvolvimento:
> 1. [instale o Docker](https://docs.docker.com/desktop/install/windows-install/)
> 2. Execute no terminal **`docker-compose up`** para subir um banco MongoDB local
> 3. Adicione **`DATABASE_URL="mongodb+srv://taskit:taskit2023@localhost:27001/taskit"`** no arquivo **`.env`** e comente a variável com o endereço do banco de produção (caso tenha).
> 4. Execute **`yarn db:update`**

## Histórico de versões

Todas as versões podem ser encontradas na sessão de [releases no GitHub](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/releases).

### [0.1.0] - 10/09/2023

#### Adicionado

- feat(docs): criar personas
- Update 01-Documentação de Contexto.md
- Update 01-Documentação de Contexto.md
- docs: add matriz de rastreabilidade

[Ver changelog completo da versão 0.1.0](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/commits/0.1.0)

### [0.2.0] - 01/10/2023

#### Adicionado
