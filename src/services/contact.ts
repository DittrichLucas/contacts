import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Contact } from '../models/contact'
import { ContactInput, ContactUpdate } from '../graphql/dto/contact'

@Service()
export default class ContactService {
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>

    async create(userId: string, contact: ContactInput): Promise<Contact> {
        return this.repository.save({ userId, ...contact })
    }

    async update(userId: string, contact: ContactUpdate): Promise<Contact> {
        await this.repository.update([userId, contact.id], contact)

        return this.repository.findOneOrFail(contact.id)
    }

    async remove(id: string, userId: string): Promise<Contact> {
        const contact = await this.repository.findOneOrFail({
            where: { id, userId }, relations: ['user']
        })

        await this.repository.remove({ ...contact })

        return contact
    }

    async findById(id: string, userId: string): Promise<Contact> {
        return this.repository.findOneOrFail({
            where: { id: id, userId: userId }
        })
    }

    async findByUserId(userId: string): Promise<Contact[]> {
        return this.repository.find({ where: { user: { id: userId } }, relations: ['user'] })
    }
}
