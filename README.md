# schedule

![Build project](https://github.com/DittrichLucas/schedule/workflows/Build%20project/badge.svg)

TODOS:
- [x] Implantar gitflow básico https://tableless.com.br/git-flow-introducao/
- [x] Nome dos arquivos para inglês
- [x] Criar docker-compose para subir a base de dados (ainda está apontando para o IP do Cuchi)
- [x] Criar atalhos para subir e parar os containers
- [x] Alterar todas as variáveis para inglês
- [x] Criar classes para contatos, sessoes e usuarios
    - [x] Contacts
    - [x] Sessions
    - [x] Users
- [x] Vou precisar usar o typedi para injetar as classes
- [x] Tipar melhor as respostas e requisições
- [x] Adicionar typeorm
    - [x] Create models for all entities integrating with TypeORM (Get rid of Postgres dependency (!))
    - [x] Criar conexão usando arquivo de configuração do typeorm
    - [x] Create repositories for specific operations
- [ ] Rewrite TODO items in English
- [ ] Criar um readme decente
- [x] Use Redis for sessions
- [ ] Adicionar um logger
- [ ] Usar variáveis de ambiente
- [ ] Substituir tslint por eslint (tslint foi deprecado para o eslint)
- [ ] Adicionar o https://tsed.io/ [NOPE :)]
    - TypeGraphQL already does this job (and it runs on top of Express)
    - If we don't use REST, we have no reason to use it
    - NestJS
- [ ] Hospedar isso no heroku
- [ ] Adicionar commit com emoji https://gitmoji.carloscuesta.me/
- [ ] Criar testes para todas as entidades
- [ ] Add a REST API for everything

# TODO:
- Use *Payload types for method signature DONE
- Create interface in this file for the contacts DONE
- Get rid of MessagePromise. Return Promise<Contact> when necessary DONE
- Invert knowledge domain: a user should know what a contact is, but a
  contact doesn't need to know a user. Add method findContacts
- Add types for the return of methods in resolvers DONE
- Spike TypeOrm configuration if you have some free time!

# More TODOs:
- [X] Ensure the app runs :)
- [X] Use proper .update method when updating values, so that you don't
      have to perform two database operations
- [X] /\ same for remove
- [X] Get rid of any cyclic imports from resolvers <-> services (dto)
- [ ] Adicionar camada de repositórios
- [X] Make migrations work (experiment: change from postgres to mysql)
- [X] Configure Redis and use it for sessions
- [ ] If you have time, implement support to class-validator
- [ ] If you have more time, implement class validator verifications
      as part of a TypeOrm subscriber
- [ ] If you REALLY have a lot of free time, make this work with Express (REST)

Add to the future: setting up pipelines (Github or BB)
- And add migrations to the pipeline process!

- [ ] internacionalização
