# Arquitetura da Solução

O software é dividido entre uma aplicação monolítica (**Frontend Web + Backend API**) através do framework [**React**](https://react.dev), [**Next.js**](https://nextjs.org), e **aplicação mobile,** criada com [**React Native**](https://reactnative.dev), que poderá consumir a API dita anteriormente. Ele apresentará uma abordagem **offline-first**, onde o os dados serão salvos localmente em um banco [**SQLite**](https://www.sqlite.org) ou no [**LocalStorage**](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) do navegador. Caso o usuário deseje **sincronizar seus dados** com mais de um dispositivo, ou **compartilhar com outras pessoas**, ele deverá fazer login ou criar um conta para tal. Feito isso, ele poderá configurar para sempre sincronizar os dados com o nosso banco [**MongoDB**](https://www.mongodb.com/pt-br), fazer sincronias periódicamente em determinados horários ou fazê-la manualmente.

Decidimos trabalhar com esses frameworks, pela possibilidade de integração e utilização de forma harmoniosa, o que facilita tanto ao usuario, ao utilizar a aplicação, quanto aos desenvolvedores do projeto. 

Além de serem ferramentas amplamente utilizadas no mercado, as escolhas da arquitetura do projeto justificam-se da seguinte forma: 
React: flexibilidade, reutilização de componentes e integração com o React Native. 
Next.Js:  compatibilidade com o TypeScript e criação de aplicações web rápidas e seguras.
Prisma: ORM para Node.js compatível com Typescript, que facilita a interação com o banco de dados.
MongoDB: compatibilidade com o Node.js e necessidade de utilizar um banco de dados NoSQL no projeto.

A aplicação Next.js e o banco de dados MongoDB serão hospedados na [**Vercel**](https://vercel.com) pela simplicidade e pela opção gratuita.


![Software Architecture](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/73408251/6ed198e5-d5aa-497e-9986-5536cb739f19)

## Diagrama de Classes
![Uploading Software Architecture.png…]()

<p align="center">
 <img src="../docs/img/classes.png">
</p>

## Modelo ER

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/101607336/378b5aad-6901-4509-aff2-d347e5f88459)


## Esquema Relacional

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/101607336/4f68b189-be24-4c9e-b62c-e8f86a8bcfac)


## Modelo Físico

O uso combinado do Prisma e MongoDB é uma escolha mais harmoniosa para aplicações. O Prisma sendo um ORM mais intuitivo, simplificando a intereção com banco de dados e promovendo mais produtividade.

Com o uso do Prisma Studio, facilita a interação com o MOngoDB, fornecendo uma interface de usuário visual e intuitiva, permitindo criar, ler, atualizar e excluir (CRUD) registros diretamente da interface.

Por ser uma ferramente gráfica de gerenciamento e visualização de dados, oferece uma interface simples e convidativa para interafir com o banco deixando tudo de forma bem intuitiva.

Em resumo, o Prisma Studio é uma ferramenta aliada para nós desenvolvedores e proporciona uma maneira intuitiva e eficaz de interagir e visualizar os dados do banco de dados. Trazendo uma experiência de gerenciamento de dados mais rica e eficiente em comparação com interfaces de linha de comando tradicionais.

## Tecnologias Utilizadas

### Ferramentas e Serviços

- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código fonte.
- [Postman](https://taskit-pucminas.postman.co/) - Ferramenta para testar APIs REST.
- [Docker](https://www.docker.com/) - Plataforma para criação e execução de containers.
- [GitHub](https://github.com) - Plataforma de hospedagem de código fonte e controle de versão.
- [GitHub Actions](https://github.com/actions) - Ferramenta de integração contínua do GitHub.
- [Vercel](https://vercel.com/) - Plataforma de hospedagem de aplicações web serverless e bancos de dados.

### API

- [Node.js](https://nodejs.dev) - Ambiente de execução Javascript server-side.
- [Typescript](https://typescriptlang.org) - Superset do Javascript que adiciona tipagem estática e outros recursos.
- [Next.js 13](https://nextjs.org) - Framework para React.js que conta com um backend embutido, podendo ser utilizado também como uma API.
- [Prisma](https://prisma.io) - ORM para Node.js compatível com Typescript, que facilita a interação com o banco de dados.
- [MOngoDB](https://www.mongodb.com/pt-br) - Banco de dados principal da aplicação.
- [Swagger UI](https://swagger.io) - Ferramenta para documentação de APIs REST.

### Web

- [React.js](https://reactjs.dev) - Biblioteca para criação de interfaces de usuário.
- [Next.js 13](https://nextjs.org) - Framework para React.js que permite criar aplicações web rápidas e seguras.
- [NativeWind](https://nativewind.dev) - Framework CSS que permite criar interfaces de usuário de forma rápida e consistente.

### App

- [React Native](https://reactnative.dev) - Biblioteca para criação de interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS que permite criar interfaces de usuário de forma rápida e consistente.

> Uma relação completa das tecnologias utilizadas pode ser encontrada no arquivo [package.json](../src/web/package.json) dentro do diretório do projeto.

## Hospedagem

A hospedagem foi feita na plataforma [Vercel](https://vercel.com/) utilizando o GitHub Actions para fazer build e deploy da aplicação. Para isso, foi necessário criar um access token na Vercel, permitindo que o comando de deploy fosse utilizado na pipeline.

Caso a build seja um sucesso, e não haja falhas nos testes unitários, o deploy ocorre automáticamente quando um pull request é concluído para a branch main, ou quando um commit é feito diretamente nela.

## Qualidade de Software

Escolhemos trabalhar contemplando as principais características de qualidade que podem ser atribuídas ao sistema. Entre elas:

Adequação funcional: O nosso sistema está focado em ser capaz de realizar as tarefas propostas e objetivos específicos.

Confiabilidade (Tolerância a falhas): Um sistema que seja capaz de operar diante de falhas.
    -Maturidade: Capacidade de atingir as necessidade de confiabilidade.

Compatibilidade (Interoperabilidade): Uma das subcaracterísticas chave do nosso projeto, pois trata-se da possibilidade de dois ou mais sistemas trocarem informações.

Portabilidade: Um ponto extremamente importante, no qual é necessário que nosso sistema consiga ser funcional em um novo hardware, software e outros ambientes.
