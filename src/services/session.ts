import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import Session from '../models/session'
import UserService from './user'

@Service()
export default class SessionService {
    constructor(
        @InjectRepository(Session) private readonly repository: Repository<Session>,
        @Inject(() => UserService) private readonly userService: UserService
    ) {}

    async login(email: string, password: string): Promise<Session> {
        const user = await this.userService.findByEmail(email)

        if (user.password !== password) {
            throw new Error('Incorrect username or password!')
        }

        return this.repository.save({ user })
    }

    async whoami(userId: string): Promise<{ name: string, id: string, password: string }> {
        const { user } = await this.repository.findOneOrFail({ where: { user: { id: userId } }, relations: ['user'] })
        return user
    }

    async logout(userId: string): Promise<{ message: string }> {
        const session = await this.repository.findOneOrFail({ where: { user: { id: userId } } })
        await this.repository.remove(session)

        return { message: 'Closed session!' }
    }

    async find(token: string) {
        return this.repository.findOne({ where: { token }, relations: ['user'] })
    }
}
