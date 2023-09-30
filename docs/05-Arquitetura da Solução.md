# Arquitetura da Solução

O software é dividido entre uma aplicação monolítica (**Frontend Web + Backend API**) através do framework [**React**](https://react.dev), [**Next.js**](https://nextjs.org), e **aplicação mobile,** criada com [**React Native**](https://reactnative.dev), que poderá consumir a API dita anteriormente. Ele apresentará uma abordagem **offline-first**, onde o os dados serão salvos localmente em um banco [**SQLite**](https://www.sqlite.org) ou no [**LocalStorage**](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) do navegador. Caso o usuário deseje **sincronizar seus dados** com mais de um dispositivo, ou **compartilhar com outras pessoas**, ele deverá fazer login ou criar um conta para tal. Feito isso, ele poderá configurar para sempre sincronizar os dados com o nosso banco [**PostgreSQL**](https://www.postgresql.org/), fazer sincronias periódicamente em determinados horários ou fazê-la manualmente.

A aplicação Next.js e o banco de dados PostgreSQL serão hospedados na [**Vercel**](https://vercel.com) pela simplicidade e pela opção gratuita.

![architecture](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/26356962/2be1a776-04af-4f54-9322-7064f4b728b1)

## Diagrama de Classes

<p align="center">
 <img src="../docs/img/classes.png">
</p>

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

O uso combinado do Prisma e POstgreSQL é uma escolha mais harmoniosa para aplicações. O Prisma sendo um ORM mais intuitivo, simplificando a intereção com banco de dados e promovendo mais produtividade.

Com o uso do Prisma Studio, facilita a interação com o PostgreSQL, fornecendo uma interface de usuário visual e intuitiva, permitindo criar, ler, atualizar e excluir (CRUD) registros diretamente da interface.

Por ser uma ferramente gráfica de gerenciamento e visualização de dados, oferece uma interface simples e convidativa para interafir com o banco deixando tudo de forma bem intuitiva.

Em resumo, o Prisma Studio é uma ferramenta aliada para nós desenvolvedores e proporciona uma maneira intuitiva e eficaz de interagir e visualizar os dados do banco de dados. Trazendo uma experiência de gerenciamento de dados mais rica e eficiente em comparação com interfaces de linha de comando tradicionais.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

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
