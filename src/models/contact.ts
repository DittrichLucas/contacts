import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm'
import { User } from './user'

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @RelationId('user')
    @Column({ name: 'userId' })
    userId: string

    @Column()
    name: string

    @Column()
    email: string

    @ManyToOne(() => User, (user) => user.contacts)
    user: User
}
