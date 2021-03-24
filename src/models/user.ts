import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Contact } from './contact'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty({ groups: ['create', 'update'] })
    @Column()
    name: string

    @IsNotEmpty({ groups: ['create', 'update'] })
    @IsEmail()
    @Column()
    email: string

    @IsNotEmpty({ groups: ['create', 'update'] })
    @MinLength(8)
    @Column()
    password: string

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]
}
