import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Session {
    @Field() token: string
}

@ObjectType()
export class UserSession {
    @Field() id: string
    @Field() name: string
    @Field() password: string
}

@ObjectType()
export class Logout {
    @Field() message: string
}
