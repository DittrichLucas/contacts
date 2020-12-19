import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class ContactObject {
    @Field() id: string
    @Field() userId: string
    @Field() name: string
    @Field() email: string
}

@InputType()
export class ContactInput {
    @Field() name: string
    @Field() email: string
}

@InputType()
export class ContactUpdate {
    @Field() id: string
    @Field({ nullable: true }) userId?: string
    @Field({ nullable: true }) name?: string
    @Field({ nullable: true }) email?: string
}
