/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('user', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('full_name');
    table.string('email');
    table.string('password');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('chats', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamps(true, true);
  });

  await knex.schema.createTable('user_chats', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').unsigned().index().references('id').inTable('user').onDelete('CASCADE');
    table.uuid('chat_id').unsigned().index().references('id').inTable('chats').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('messages', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').unsigned().index().references('id').inTable('user').onDelete('CASCADE');
    table.uuid('chat_id').unsigned().index().references('id').inTable('chats').onDelete('CASCADE');
    table.string('content');
    table.timestamp('sent_at').defaultTo(knex.fn.now());
    table.timestamp('delivered_at').nullable();
    table.timestamp('read_at').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('messages');
  await knex.schema.dropTableIfExists('user_chats');
  await knex.schema.dropTableIfExists('chats');
  await knex.schema.dropTableIfExists('user');
};
