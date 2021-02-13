import { Inject, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Contact } from '../models/contact'
import { User } from '../models/user'
import { UserInput, UserUpdate } from '../graphql/dto/user'
import ContactService from './contact'

@Service()
export default class UserService {
    @Inject(() => ContactService)
    private readonly contactService: ContactService

    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) { }

    async create(user: UserInput): Promise<User> {
        return this.repository.save(user)
    }

    async update(user: UserUpdate): Promise<User> {
        await this.repository.update(user.id, user)

        return this.repository.findOneOrFail(user.id)
    }

    async remove(id: string): Promise<User> {
        const user = await this.repository.findOneOrFail(id)

        await this.repository.remove({ ...user })

        return user
    }

    async findAll(): Promise<User[]> {
        return this.repository.find({ order: { name: 'ASC' } })
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOneOrFail({ where: { email: email } })
    }

    async findById(id: string): Promise<User> {
        return this.repository.findOneOrFail(id)
    }

    async findContacts(userId: string): Promise<Contact[]> {
        return this.contactService.findByUserId(userId)
    }
}
