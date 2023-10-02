# Arquitetura da Solução

O software é dividido entre uma aplicação monolítica (**Frontend Web + Backend API**) através do framework [**React**](https://react.dev), [**Next.js**](https://nextjs.org), e **aplicação mobile,** criada com [**React Native**](https://reactnative.dev), que poderá consumir a API dita anteriormente. Ele apresentará uma abordagem **offline-first**, onde o os dados serão salvos localmente em um banco [**SQLite**](https://www.sqlite.org) ou no [**LocalStorage**](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) do navegador. Caso o usuário deseje **sincronizar seus dados** com mais de um dispositivo, ou **compartilhar com outras pessoas**, ele deverá fazer login ou criar um conta para tal. Feito isso, ele poderá configurar para sempre sincronizar os dados com o nosso banco [**PostgreSQL**](https://www.postgresql.org/), fazer sincronias periódicamente em determinados horários ou fazê-la manualmente.

A aplicação Next.js e o banco de dados PostgreSQL serão hospedados na [**Vercel**](https://vercel.com) pela simplicidade e pela opção gratuita.

![architecture](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/26356962/2be1a776-04af-4f54-9322-7064f4b728b1)

## Diagrama de Classes

<p align="center">
 <img src="../docs/img/classes.png">
</p>

## Modelo ER

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/101607336/378b5aad-6901-4509-aff2-d347e5f88459)


## Esquema Relacional

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-aplicdistrib-t5-pmv-ads-2023-2-e4-g2-taskit/assets/101607336/4f68b189-be24-4c9e-b62c-e8f86a8bcfac)


## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

A hospedagem foi feita na plataforma [Vercel](https://vercel.com/) utilizando o GitHub Actions para fazer build e deploy da aplicação. Para isso, foi necessário criar um access token na Vercel, permitindo que o comando de deploy fosse utilizado na pipeline.

Caso a build seja um sucesso, e não haja falhas nos testes unitários, o deploy ocorre automáticamente quando um pull request é concluído para a branch main, ou quando um commit é feito diretamente nela.

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
