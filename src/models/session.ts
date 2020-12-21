import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity()
export default class Session {
    @PrimaryGeneratedColumn('uuid')
    token: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}
