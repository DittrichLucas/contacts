import { UserInputError } from 'apollo-server'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent
} from 'typeorm'

type ClassConstructor = {
    new(): object
}

@EventSubscriber()
export default class ValidationSubscriber implements EntitySubscriberInterface<unknown> {
    async beforeInsert(event: InsertEvent<unknown>): Promise<void> {
        await this.validate(event.metadata.target as ClassConstructor, event.entity, ['create'])
    }

    async beforeUpdate(event: UpdateEvent<unknown>): Promise<void> {
        await this.validate(event.metadata.target as ClassConstructor, event.entity, ['update'])
    }

    async beforeRemove(event: RemoveEvent<object>): Promise<void> {
        await this.validate(event.metadata.target as ClassConstructor, event.entity, ['remove'])
    }

    private async validate(target: ClassConstructor, values: unknown, groups: string[] = []) {
        const entity = plainToClass(target, values)
        const errors = await validate(entity, { always: true, groups, strictGroups: true })

        if (errors.length > 0) {
            const [{ property, constraints = {} }] = errors
            const message = Object.values(constraints).join(', ')

            throw new UserInputError(message, { argumentName: property })
        }
    }
}
