import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class UserObject {
    @Field() id: string
    @Field() name: string
    @Field() email: string
    @Field() password: string
}

@InputType()
export class UserInput {
    @Field() name: string
    @Field() email: string
    @Field() password: string
}

@InputType()
export class UserUpdate {
    @Field() id: string
    @Field({ nullable: true }) name?: string
    @Field({ nullable: true }) email?: string
    @Field({ nullable: true }) password?: string
}
