import { Entity, OneToOne, PrimaryColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Session {
    @PrimaryColumn()
    token: string

    @OneToOne(() => User, user => user.id)
    userId: User
}
