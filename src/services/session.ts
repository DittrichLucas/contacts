import { Inject, Service } from 'typedi'
import { SessionStore } from '../store/session-store'
import RedisSessionStore from '../store/redis-session-store'
import UserService from './user'

@Service()
export default class SessionService {
    constructor(
        @Inject(() => UserService)
        private readonly userService: UserService,
        @Inject(() => RedisSessionStore)
        private readonly sessionStore: SessionStore
    ) { }

    async login(email: string, password: string): Promise<{ token: string }> {
        const user = await this.userService.findByEmail(email)

        if (user.password !== password) {
            throw new Error('Incorrect username or password!')
        }

        const token = await this.sessionStore.create(user.id)
        return { token }
    }

    async logout(token: string): Promise<{ message: string }> {
        return this.sessionStore.delete(token)
    }
}
