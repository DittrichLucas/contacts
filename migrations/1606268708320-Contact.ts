import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey
} from 'typeorm'

export class Contact1606268708320 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: 'contact',
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
                }
            ]
        }), true)

        await queryRunner.addColumn('contact', new TableColumn({
            name: 'userId',
            type: 'uuid'
        }))

        await queryRunner.createForeignKey('contact', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contact')
    }
}
