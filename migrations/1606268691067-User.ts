import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1606268691067 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isUnique: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'text',
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }
}
