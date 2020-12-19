import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Contact } from './contact'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[]
}
