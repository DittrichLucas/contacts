# contacts

![Build project](https://github.com/DittrichLucas/contacts/workflows/Build%20project/badge.svg)

### Roadmap
- [x] Deploy [basic gitflow](https://tableless.com.br/git-flow-introducao/)
- [x] Rename files to English
- [x] Create docker-compose to upload the database (points to an old IP)
- [x] Create shortcuts to raise and stop containers
- [x] Change all variables to English
- [x] Create classes for contacts, sessions and users:
    - [x] contacts
    - [x] sessions
    - [x] users
- [x] Use typedi to inject classes
- [x] Better type responses and requests
- [x] Add typeorm:
    - [x] Create models for all entities integrating with TypeORM (Get rid of Postgres dependency (!))
    - [x] Criar conexão usando arquivo de configuração do TypeORM
    - [ ] Create repositories for specific operations
- [x] Rewrite TODO items in English
- [ ] Create a decent readme
- [x] Use Redis for sessions
- [ ] Add logger
- [ ] Use environments variables
- [x] Replace tslint with eslint (tslint has been deprecated for eslint)
- [ ] Add a REST API for everything
    - [ ] Add [decorators](https://tsed.io/)
    - [ ] NestJS
- [ ] Add commit with [emoji](https://gitmoji.carloscuesta.me/)
- [ ] Create tests for all entities
- [ ] Host the API on heroku

# TODO:
- [x] Use *Payload types for method signature
- [x] Create interface in this file for the contacts
- [x] Get rid of MessagePromise. Return Promise<Contact> when necessary
- [x] Invert knowledge domain: a user should know what a contact is, but a
  contact doesn't need to know a user. Add method findContacts
- [x] Add types for the return of methods in resolvers
- [x] Spike TypeOrm configuration if you have some free time!

# More TODOs:
- [x] Ensure the app runs :)
- [x] Use proper .update method when updating values, so that you don't
      have to perform two database operations
- [x] /\ same for remove
- [x] Get rid of any cyclic imports from resolvers <-> services (dto)
- [x] Make migrations work (experiment: change from postgres to mysql)
- [x] Configure Redis and use it for sessions
- [x] If you have time, implement support to class-validator
- [x] If you have more time, implement class validator verifications
      as part of a TypeOrm subscriber
- [ ] If you REALLY have a lot of free time, make this work with Express (REST)

Add to the future: setting up pipelines (Github or BB)
- And add migrations to the pipeline process!

- [ ] internationalization
