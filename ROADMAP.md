## Roadmap

### Scaffold
- [x] Deploy [basic gitflow](https://tableless.com.br/git-flow-introducao/)
- [x] Create docker-compose to upload the database (points to an old IP)
- [x] Create shortcuts to raise and stop containers

### MVP
- [x] Replace tslint with eslint (tslint has been deprecated for eslint)
- [x] Create classes for contacts, sessions and users:
    - [x] contacts
    - [x] sessions
    - [x] users
- [x] Use typedi to inject classes
- [x] Better type responses and requests
- [x] Add typeorm:
    - [x] create models for all entities integrating with TypeORM (Get rid of Postgres dependency (!))
    - [x] create connection using TypeORM configuration file
    - [ ] create repositories for specific operations (?)
- [x] Use Redis for sessions
- [x] Configure Redis and use it for sessions
- [x] Get rid of any cyclic imports from resolvers <-> services (dto)
- [x] Make migrations work (experiment: change from postgres to mysql)
- [x] Implement support to class-validator
- [x] Implement class validator verifications as part of a TypeOrm subscriber
- [ ] Add logger
- [ ] Use environments variables
- [ ] Create tests for all entities
- [x] Ensure the app runs :)

### Improvements
- [x] Rename files to English
- [x] Change all variables to English
- [x] Rewrite TODO items in English
- [x] Create a decent readme
- [x] Use proper .update method when updating values, so that you don't have to perform two database operations
- [x] /\ same for remove
- [ ] Setting up pipelines (Github or BB)
    - [ ] add migrations to the pipeline process!
- [ ] Add a REST API for everything
    - [ ] add [decorators](https://tsed.io/)
    - [ ] nestJS
- [ ] Add commit with [emoji](https://gitmoji.carloscuesta.me/)
- [ ] Internationalization
- [ ] Host the API on heroku
- [ ] Improve lint rules
- [ ] Document functions and classes through comments
