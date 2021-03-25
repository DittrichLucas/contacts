import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

import { User } from './user'

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @RelationId('user')
    @Column({ name: 'userId' })
    userId: string

    @IsNotEmpty({ groups: ['create', 'update'] })
    @IsString()
    @Column()
    name: string

    @IsNotEmpty({ groups: ['create', 'update'] })
    @IsEmail()
    @Column()
    email: string

    @ManyToOne(() => User, (user) => user.contacts)
    user: User
}
