import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class Session1606268716183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.createTable(new Table({
            name: 'session',
            columns: [{
                name: 'token',
                type: 'uuid',
                isPrimary: true,
                isUnique: true,
                default: 'uuid_generate_v4()'
            }]
        }), true)

        await queryRunner.addColumn('session', new TableColumn({
            name: 'userId',
            type: 'uuid'
        }))

        await queryRunner.createForeignKey('session', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('session')
    }

}
