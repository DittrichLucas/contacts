import 'reflect-metadata'

import { Container } from 'typedi'
import { createConnection, useContainer } from 'typeorm'

import Server from './server'

useContainer(Container)
createConnection().then(() => {
    const server = Container.get(Server)
    return server.start()
})
