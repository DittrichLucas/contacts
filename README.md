<!-- Logo -->
<p align="center">
  <img width="150" src="./doc/assets/contacts.png" alt="adonimals-UI logo" />

</p>
<div align="center">
    Icon made by
    <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a>
    from
    <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
</div>

<!-- Name -->
<h1 align="center" style="margin-top:10px">Contacts</h1>

<!-- Badges -->
<div align="center">

![Build Status](https://github.com/DittrichLucas/contacts/workflows/Build%20project/badge.svg)

</div>

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
    - [x] create models for all entities integrating with TypeORM (Get rid of Postgres dependency (!))
    - [x] create connection using TypeORM configuration file
    - [ ] create repositories for specific operations (?)
- [x] Replace tslint with eslint (tslint has been deprecated for eslint)
- [x] Rewrite TODO items in English
- [x] Create a decent readme
- [x] Use Redis for sessions
- [x] Ensure the app runs :)
- [x] Use proper .update method when updating values, so that you don't have to perform two database operations
- [x] /\ same for remove
- [x] Get rid of any cyclic imports from resolvers <-> services (dto)
- [x] Make migrations work (experiment: change from postgres to mysql)
- [x] Configure Redis and use it for sessions
- [x] Implement support to class-validator
- [x] Implement class validator verifications as part of a TypeOrm subscriber
- [ ] Setting up pipelines (Github or BB)
    - [ ] add migrations to the pipeline process!
- [ ] Add logger
- [ ] Use environments variables
- [ ] Add a REST API for everything
    - [ ] add [decorators](https://tsed.io/)
    - [ ] nestJS
- [ ] Create tests for all entities
- [ ] Host the API on heroku
- [ ] Add commit with [emoji](https://gitmoji.carloscuesta.me/)
- [ ] Internationalization
